const request = require('supertest');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, completed = false } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const newTask = { id: uuidv4(), title, completed };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  const [removed] = tasks.splice(index, 1);
  res.json(removed);
});

describe('Todo API', () => {
  beforeEach(() => {
    tasks = [];
  });

  test('GET /tasks should return empty array initially', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /tasks should create new task', async () => {
    const newTask = { title: 'Test task' };
    const res = await request(app).post('/tasks').send(newTask);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test task');
    expect(res.body.completed).toBe(false);
  });

  test('DELETE /tasks/:id should remove task', async () => {
    const newTask = { title: 'To delete' };
    const created = await request(app).post('/tasks').send(newTask);
    const res = await request(app).delete(`/tasks/${created.body.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(created.body.id);
  });
});