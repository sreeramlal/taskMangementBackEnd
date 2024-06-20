const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoList = require('./models/todoList');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://ym4786:dvO3HzJH24suegpR@cluster0.7oaqul3.mongodb.net/', { // Db Link
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post('/addTodoList', async (req, res) => {   
    const { task, status, deadline, description } = req.body;
    const newTodo = new todoList({
        task,
        status,
        deadline,
        description
    });
    try {
        await newTodo.save();
        res.status(201).send(newTodo);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/getTodoList', async (req, res) => {  
    try {
        const todos = await todoList.find();
        res.status(200).send(todos);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.put('/updateTodoList/:id', async (req, res) => {
    const { id } = req.params;
    const { task, status, deadline, description } = req.body;
    try {
        const updatedTodo = await todoList.findByIdAndUpdate(id, { task, status, deadline, description }, { new: true });
        res.status(200).send(updatedTodo);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/deleteTodoList/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await todoList.findByIdAndDelete(id);
        res.status(200).send({ message: 'Todo item deleted successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
