import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';

const create = async (req, res) => {
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
};

const getAll = async (_, res) => {
  const todosList = await db.todos.find().toArray();
  res.json({ data: todosList });
};

const getByID = async (req, res) => {
  const id = req.params.id;

  const existingTodo = await db.todos.findOne({ _id: new ObjectId(id) });

  if (!existingTodo) {
    return res.status(401).res({ message: 'Không tìm thấy' });
  }

  res.json({ data: existingTodo });
};

const update = async (req, res) => {
  const { title, isCompleted } = req.body;
  const { id } = req.params;

  const existingTodo = await db.todos.findOne({ _id: new ObjectId(id) });
  if (!existingTodo) {
    return res.status(401).json({ message: 'Không tìm thấy id cần update' });
  }

  if (!title || title === '') {
    return res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
  }

  const updatedTodo = {
    ...existingTodo,
    title,
    isCompleted,
    updateAt: new Date().getTime()
  };

  await db.todos.updateOne({ _id: new ObjectId(id) }, { $set: updatedTodo });

  res.json({ message: 'Update thành công' });
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const existingTodo = await db.todos.findOne({ _id: new ObjectId(id) });
  if (!existingTodo) {
    return res.status(401).json({ message: 'Không tìm thấy id cần xóa' });
  }

  await db.todos.deleteOne({ _id: new ObjectId(id) });

  res.json({ message: 'Đã xóa' });
};

const TodoController = {
  create,
  getAll,
  getByID,
  update,
  deleteById
};

export default TodoController;
