import { Router } from 'express';
import Task from "../models/Task";
import { client } from '../database';

const router = Router();

router.get('/tasks', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('crud');
    const tasksCollection = db.collection('tasks');
    const tasks = await tasksCollection.find().toArray();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send('Error fetching users');
  }
});


router.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Getting task with id ${id}`);
});

router.post('/tasks', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('crud');
    const newTask = new Task(req.body);
    const savedTask = await db.collection('tasks').insertOne(newTask);
    res.json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).send('Error creating task');
  }
});

router.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;
  res.send(`Task with id ${id} updated: ${JSON.stringify(updatedTask)}`);
});

router.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Task with id ${id} deleted`);
});

export default router;
