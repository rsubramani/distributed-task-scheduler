const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task');

const app = express();
app.use(express.json());

// Ensure a MongoDB connection string is provided
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/scheduler';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('Task Scheduler API');
});

app.post('/tasks', async (req, res) => {
    const { description } = req.body;
    const task = new Task({ description, completed: false });
    await task.save();
    res.status(201).send(task);
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

// Start server, but export the server instance
const server = app.listen(5000, () => {
    console.log('Server running on port 5000');
});

module.exports = { app, server };  // Export both app and server
