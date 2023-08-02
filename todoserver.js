const express = require('express');
const mongoose = require('mongoose');

const app = express()

app.use(express.json())

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

const Todo = mongoose.model('Todo', todoSchema)


// connect to mongo
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/todos', async (req, res) => {
    // list all mongo details of todo

    const todos = await Todo.find()
    res.json(todos)

})

app.listen(3000, () => (console.log("listening on port 3000")))
