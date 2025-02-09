// 

import { AppDataSource } from "../data-source";
import { createComment, createFile, createUser } from "../dataType";
import { FigmaComment } from "../entity/comments.entity";
import { FigmaFile } from "../entity/file.entity";
import { FigmaUser } from "../entity/user.entity";


const userRepo = AppDataSource.getRepository(FigmaUser)
const fileRepo = AppDataSource.getRepository(FigmaFile)
const commentRepo = AppDataSource.getRepository(FigmaComment)

export class FigmaModels {
  static createUser = async (payload:createUser) => {
    const checkUser = await userRepo.createQueryBuilder('user').where('user.figma_email = :email', { email: payload.figma_email }).getOne()
    
    if (checkUser) {
      return checkUser
    }
    const user = new FigmaUser
    user.figma_email = payload.figma_email
    user.figma_handle = payload.figma_handle
    user.figma_id = payload.figma_id
    user.figma_image = payload.figma_image

    const saveUser = await userRepo.save(user)
    return saveUser
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
    const getUser = await userRepo.findOneBy({ figma_email: payload.user_email })
    newFile.user = getUser
    const saveFile = await fileRepo.save(newFile)

    return saveFile
  }

  static createComment = async (payload:createComment) => {
    const checkComment = await commentRepo.createQueryBuilder('comment').where('comment.figma_uuid = :uuid', { uuid: payload.figma_uuid }).getOne()
    if (checkComment) {
      if (checkComment.comment !== payload.comment) {
        checkComment.comment = payload.comment
        const updateComment = await commentRepo.save(checkComment)
        return updateComment
      }
      return checkComment
    }

    const newComment = new FigmaComment
    newComment.comment = payload.comment
    newComment.figma_id = payload.figma_id
    newComment.figma_order_id = payload.figma_order_id
    newComment.figma_uuid = payload.figma_uuid
    newComment.board_name = payload.board_name
    newComment.board_number = payload.board_number
    const getFile = await fileRepo.findOneBy({ figma_file_key: payload.file_key })
    newComment.createdOn = new Date(payload.createdOn)
    newComment.file = getFile

    const saveComment = await commentRepo.save(newComment)
    return saveComment
  }
}