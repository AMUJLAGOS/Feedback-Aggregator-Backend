// 

import { AppDataSource } from "../data-source";
import { createTask, createFile, createUser, getTasks } from "../dataType";
import { FigmaTask } from "../entity/comments.entity";
import { FigmaFile } from "../entity/file.entity";
import { FigmaUser } from "../entity/user.entity";


const userRepo = AppDataSource.getRepository(FigmaUser)
const fileRepo = AppDataSource.getRepository(FigmaFile)
const taskRepo = AppDataSource.getRepository(FigmaTask)

export class FigmaModels {
  static createUser = async (payload: createUser) => {
    const checkUser = await userRepo.createQueryBuilder('user').where('user.figma_email = :email', { email: payload.figma_email }).getOne()
    
    if (checkUser) {
      return {data:checkUser, status: 200}
    }
    const user = new FigmaUser
    user.figma_email = payload.figma_email
    user.figma_handle = payload.figma_handle
    user.figma_id = payload.figma_id
    user.figma_image = payload.figma_image

    const saveUser = await userRepo.save(user)
    return  {data: saveUser, status: 201, message: 'User created'}
  }

  static createFile = async (payload:createFile) => {
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
      const getUser = await userRepo.findOneBy({figma_id: item.user_id})
      newTask.figma_createdOn = new Date(item.figma_createdOn)
      newTask.file = getFile
      newTask.user = getUser
      newTask.creator_name = item.creator_name
      await taskRepo.save(newTask)
    }
    return {message: 'all saved'}
  }

  static getTasks = async (payload: getTasks) => {
    const getTasks = await taskRepo.createQueryBuilder('tasks').leftJoinAndSelect('tasks.user', 'user').leftJoin('tasks.file', 'file').where('user.figma_id = :user_id', { user_id: payload.user_figma_id }).andWhere('file.figma_file_id = :file_id', { file_id: payload.figma_file_key }).orderBy('tasks.figma_order_id', 'DESC').getMany()
    
    return getTasks
  }

  
}