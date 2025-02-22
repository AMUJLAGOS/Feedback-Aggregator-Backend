// 

import { AppDataSource } from "../data-source";
import { createTask, createFile, createUser, getTasks, AddTag, CreateTodo, Status } from "../dataType";
import { FigmaTask } from "../entity/comments.entity";
import { FigmaFile } from "../entity/file.entity";
import { Todo } from "../entity/todo.entity";
import { FigmaUser } from "../entity/user.entity";


const userRepo = AppDataSource.getRepository(FigmaUser)
const fileRepo = AppDataSource.getRepository(FigmaFile)
const taskRepo = AppDataSource.getRepository(FigmaTask)
const todoRepo = AppDataSource.getRepository(Todo)

export class FigmaModels {
  static createUser = async (payload: createUser) => {
    const checkUser = await userRepo.createQueryBuilder('user').where('user.figma_email = :email', { email: payload.figma_email }).getOne()

    if (checkUser) {
      return { data: checkUser, status: 200 }
    }
    const user = new FigmaUser
    user.figma_email = payload.figma_email
    user.figma_handle = payload.figma_handle
    user.figma_id = payload.figma_id
    user.figma_image = payload.figma_image

    const saveUser = await userRepo.save(user)
    return { data: saveUser, status: 201, message: 'User created' }
  }

  static createFile = async (payload: createFile) => {
    const checkFile = await fileRepo.createQueryBuilder('file').where('file.figma_file_key = :key', { key: payload.figma_file_key }).getOne()

    if (checkFile) {
      return checkFile
    }

    const newFile = new FigmaFile
    newFile.figma_file_id = payload.figma_file_id
    newFile.figma_file_key = payload.figma_file_key
    newFile.figma_name = payload.figma_name
    // const getUser = await userRepo.findOneBy({ figma_email: payload.user_email })
    // newFile.user = getUser
    const saveFile = await fileRepo.save(newFile)

    return saveFile
  }

  static createTask = async (payload: createTask[]) => {

    for (const item of payload) {
      const checkTask = await taskRepo.createQueryBuilder('comment').where('comment.figma_uuid = :uuid', { uuid: item.figma_uuid }).getOne()
      if (checkTask) {
        if (checkTask.comment !== item.message) {
          checkTask.comment = item.message
          const updateTask = await taskRepo.save(checkTask)
          continue
        }
        continue
      }
      const newTask = new FigmaTask
      newTask.comment = item.message
      newTask.figma_id = item.figma_id
      newTask.figma_order_id = item.figma_order_id
      newTask.figma_uuid = item.figma_uuid
      newTask.board_name = item.board_name
      newTask.board_number = item.board_number
      newTask.creator_img = item.creator_img
      const getFile = await fileRepo.findOneBy({ figma_file_key: item.file_key })
      const getUser = await userRepo.findOneBy({ figma_id: item.user_id })
      newTask.figma_createdOn = new Date(item.figma_createdOn)
      newTask.file = getFile
      newTask.user = getUser
      newTask.creator_name = item.creator_name
      await taskRepo.save(newTask)
    }
    return { message: 'all saved' }
  }

  static getTasks = async (payload: getTasks) => {
    const getTasks = await taskRepo.createQueryBuilder('tasks').leftJoinAndSelect('tasks.user', 'user').leftJoin('tasks.file', 'file').leftJoinAndSelect('tasks.todos', "todos").where('user.figma_id = :user_id', { user_id: payload.user_figma_id }).andWhere('file.figma_file_id = :file_id', { file_id: payload.figma_file_key }).orderBy('tasks.figma_order_id', 'DESC').getMany()

    return getTasks
  }

  static addTag = async (payload: AddTag) => {
    const getTask = await taskRepo.createQueryBuilder('task').leftJoin('task.user', 'user').where('task.figma_id = :figma_id', { figma_id: payload.task_figma_id }).andWhere('user.figma_id = :user_id', { user_id: payload.user_figma_id }).getOne()

    if (!getTask) {
      return 'no task'
    }
    if (getTask.tags !== null) {
      if (getTask.tags.includes(payload.tag)) {
        getTask.tags = getTask.tags.filter(obj => obj !== payload.tag)
        const save = await taskRepo.save(getTask)
        return save.tags
      }
      getTask.tags = [...getTask.tags, payload.tag]
      const saved = await taskRepo.save(getTask)
      return saved.tags
    }
    getTask.tags = [payload.tag]
    const saved = await taskRepo.save(getTask)
    return saved.tags
  }

  static getTags = async (payload: { task_id: string }) => {
    // const getTaskT
  }

  static createTodo = async (payload: CreateTodo) => {
    const getUser = await userRepo.findOneBy({ figma_id: payload.user_id })
    const getTask = await taskRepo.findOneBy({ figma_id: payload.task_id })
    const getFile = await fileRepo.findOneBy({ figma_file_id: payload.file_id })

    if (!getUser && getTask && getFile) {
      throw new Error('Input a valid user or task')
    }
    const newTodo = new Todo
    newTodo.task = getTask
    newTodo.user = getUser
    newTodo.todo = payload.todo
    newTodo.file = getFile
    await todoRepo.save(newTodo)
  }

  static getAllTaskTodo = async (payload: CreateTodo) => {
    const getTaskTodo = await todoRepo.createQueryBuilder('todo').leftJoin('todo.task', 'task').where('task.id = :task_id', { task_id: payload.task_id }).orderBy('todo.is_resolved', "ASC").getMany()

    return getTaskTodo
  }

  static getFileTodo = async (payload: CreateTodo) => {
    console.log(payload)
    const getTaskTodo = await todoRepo.createQueryBuilder('todo').leftJoin('todo.user', 'user').leftJoin('todo.file', 'file').where('file.figma_file_id = :file_id', { file_id: payload.file_id }).andWhere('user.figma_id = :user_id', { user_id: payload.user_id }).getMany()

    return getTaskTodo
  }

  static changeTodoStatus = async (payload: Status) => {
    const getTodo = await todoRepo.createQueryBuilder('todo').leftJoin('todo.user', 'user').where("todo.id = :id", { id: payload.todo_id }).andWhere('user.figma_id = :user_id', { user_id: payload.user_id }).getOne()

    getTodo.is_resolved = !getTodo.is_resolved
    getTodo.resolvedOn = new Date()
    await todoRepo.save(getTodo)

    return 'status changed'
  }

  static changeStatus = async (payload: Status[]) => {

    for (const item of payload) {
      const getTask = await taskRepo.createQueryBuilder('task').leftJoin('task.user', 'user').where("task.id = :task_id", { task_id: item.task_id }).andWhere('user.figma_id = :user_id', { user_id: item.user_id }).getOne()

      getTask.is_resolved = !getTask.is_resolved
      await taskRepo.save(getTask)
    }
    return 'status changed'
  }

  static addDueDate = async (payload: { task_id: string, date: string }) => {
    const getTask = await taskRepo.createQueryBuilder('task').where('task.id = :task_id', { task_id: payload.task_id }).getOne()
    getTask.due_date = new Date(payload.date)

    const saved = await taskRepo.save(getTask)
    return saved
  }
}