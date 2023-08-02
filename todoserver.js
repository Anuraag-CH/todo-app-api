const express = require('express');
const mongoose = require('mongoose');

const app = express()

app.use(express.json())

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema)


// connect to mongo
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/todos', async (req, res) => {
    // list all mongo details of todo

    const todos = await Todo.find()
    res.json(todos)

})

app.get('/todos/:id', async (req, res) => {
    const { id } = req.params
    const todo = await Todo.findOne({ _id: id })
    res.json(todo)

})

app.post('/todos', async (req, res) => {

    const todo = new Todo(req.body)
    await todo.save()
    res.status(201).send(todo.id)

})

app.delete('/todos', async (req, res) => {


})

app.use((req, res, next) => {
    res.status(404).send();
});


app.listen(3000, () => (console.log("listening on port 3000")))
