import express from 'express'
import todoRouter from './todo.route.js';

const router = express.Router()

router.use('/todos', todoRouter)

export default router