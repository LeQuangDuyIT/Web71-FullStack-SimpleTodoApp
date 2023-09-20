import express from 'express';
import { db } from '../config/database.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Get one by id
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  const existingTodo = await db.todos.findOne({ _id: new ObjectId(id) });

  if (!existingTodo) {
    return res.status(401).res({ message: 'Không tìm thấy' });
  }

  res.json({ data: existingTodo });
});

// Get all
router.get('/', async (_, res) => {
  const todosList = await db.todos.find().toArray();

  res.json({ data: todosList });
});

// Create
router.post('/', async (req, res) => {
  const { _id, title, ...restData } = req.body;

  if (!title) {
    return res.status(401).json({ message: 'Nhập thiếu thông tin' });
  }

  const newTodo = {
    title,
    ...restData
  };

  await db.todos.insertOne(newTodo);

  res.status(201).json({ message: 'Thêm todo thành công' });
});

// Update
router.put('/:id', async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const existingTodo = await db.todos.findOne({ _id: new ObjectId(id) });
  if (!existingTodo) {
    return res.status(401).json({ message: 'Không tìm thấy id cần update' });
  }

  if (!title || title === '') {
    return res.status(401).json({ message: 'Dữ liệu không hợp lệ' });
  }

  const updatedTodo = {
    ...existingTodo,
    title,
    updateAt: new Date()
  };

  await db.todos.updateOne({ _id: new ObjectId(id) }, { $set: updatedTodo });

  res.json({ message: 'Update thành công' });
});

// Delete
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const existingTodo = await db.todos.findOne({ _id: new ObjectId(id) });
  if (!existingTodo) {
    return res.status(401).json({ message: 'Không tìm thấy id cần xóa' });
  }

  await db.todos.deleteOne({ _id: new ObjectId(id) });

  res.json({ message: 'Đã xóa' });
});

export default router;
