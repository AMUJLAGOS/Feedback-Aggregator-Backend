// 

import { FastifyInstance } from "fastify"
import { createTaskOpts, createFileOpts, createUserOpts, getTasksOpts, addTagOpts, createTodoOpts, getTaskTodoOpts, getFileTodo, changeStatus, changeTodoStatus } from "../shemas/figma.schema"


// 


async function figmaRoutes(fastify: FastifyInstance, options) {
  fastify.post('/create-user', createUserOpts)
  fastify.post('/create-file', createFileOpts)
  fastify.post('/create-task', createTaskOpts)
  fastify.get('/get-tasks/:user_figma_id/:figma_file_key', getTasksOpts)
  fastify.post('/add-tag', addTagOpts)
  fastify.post('/create-todo', createTodoOpts)
  fastify.get('/get-todo-task/:task_id', getTaskTodoOpts)
  fastify.get('/get-todo-file/:todo_id/:file_id/:user_id', getFileTodo)
  fastify.patch('/change-status', changeStatus)
  fastify.patch('/change-todo-status', changeTodoStatus)
}


module.exports = figmaRoutes