const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors())

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Todo = mongoose.model('Todo', todoSchema);

mongoose.connect('mongodb://127.0.0.1:27017/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.get('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id });
    res.json(todo);
});

app.post('/todos', async (req, res) => {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).send(todo.id);
});

app.put('/todos/:id', async (req, res) => {

    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (todo) {
            res.send("Todo Updated");
        }
        else {
            res.sendStatus(404)
        }
    }
    catch (error) {
        res.sendStatus(404)
    }

});

app.delete('/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (todo) {
        res.send("Todo deleted");
    } else {
        res.status(404).send("Todo Not found");
    }
});

app.use((req, res, next) => {
    res.status(404).send();
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});
