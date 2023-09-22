import express from 'express';
import TodoController from '../controllers/todo.controller.js';

const router = express.Router();

router.get('/:id', TodoController.getByID);

router.get('/', TodoController.getAll);

router.post('/', TodoController.create);

router.put('/:id', TodoController.update);

router.delete('/:id', TodoController.deleteById);

export default router;
