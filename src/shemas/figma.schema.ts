// 
import { Type as T } from '@sinclair/typebox'
import { FigmaControllers } from '../controllers/figma.controller'


const userSchema = T.Object({
  figma_id: T.String(),
  figma_email: T.String(),
  figma_handle: T.String(),
  figma_image: T.String()
})

const fileSchema = T.Object({
  figma_file_id: T.String(),
  figma_file_key: T.String(),
  figma_name: T.String(),
  user_email: T.String()
})

const tagSchema = T.Object({
  tag: T.String(),
  task_figma_id: T.String(),
  user_figma_id: T.String()
})

const todoSchema = T.Object({
  todo: T.String(),
  task_id: T.String(),
  user_id: T.String(),
  file_id: T.String(),
  todo_id: T.String()
})



export const createUserOpts = {
  schema: {
    body: userSchema
  },
  handler: FigmaControllers.createUser
}

export const createFileOpts = {
  schema: {
    body: fileSchema
  },
  handler: FigmaControllers.createFile
}

export const createTaskOpts = {
  handler: FigmaControllers.createTask
}

export const getTasksOpts = {
  handler: FigmaControllers.getTasks
}

export const addTagOpts = {
  schema: {
    body: tagSchema
  },
  handler: FigmaControllers.addTag
}

export const todoOpts = {
  chema: {
    body: todoSchema
  },
  handler: FigmaControllers.createTodo
}