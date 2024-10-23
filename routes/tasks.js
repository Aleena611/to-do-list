// routes/tasks.js
const express = require('express');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

// Get all tasks for a user
router.get('/', authenticateToken, async (req, res) => {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
});

// Add a new task
router.post('/', authenticateToken, async (req, res) => {
    const task = new Task({
        userId: req.user.userId,
        task: req.body.task,
    });
    await task.save();
    res.status(201).json(task);
});

// Update a task
router.put('/:id', authenticateToken, async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');

    if (task.userId.toString() !== req.user.userId) {
        return res.status(403).send('Unauthorized');
    }

    task.completed = req.body.completed || task.completed;
    await task.save();
    res.json(task);
});

// Delete a task
router.delete('/:id', authenticateToken, async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');

    if (task.userId.toString() !== req.user.userId) {
        return res.status(403).send('Unauthorized');
    }

    await task.remove();
    res.send('Task deleted');
});

module.exports = router;
