// 

import { FastifyReply, FastifyRequest } from "fastify"
import { FigmaModels } from "../model/figma.model"
import { createTask, createFile, createUser, getTasks } from "../dataType"

const okayRes = {
  status: "okay",
  data: [],
  message: "Data fecthed successfully"
}


const errorRes = {
  status: "bad",
  data: [],
  error: "Something went wrong"
}
export class FigmaControllers {
  static createUser = async (req: FastifyRequest<{ Body: createUser }>, reply: FastifyReply) => {
    try {
      const res = await FigmaModels.createUser(req.body)
      reply.code(res.status).send({ ...okayRes, data: res.data })
    } catch (e) {
      reply.code(400).send({ ...errorRes, message: e.message })
    }
  }

  static createFile = async (req: FastifyRequest<{ Body: createFile }>, reply: FastifyReply) => {
    try {
      const res = await FigmaModels.createFile(req.body)
      reply.code(200).send({ ...okayRes, data: res })
    } catch (e) {
      reply.code(400).send({ ...errorRes, message: e.message })
    }
  }

  static createTask = async (req: FastifyRequest<{Body:createTask[] } >, reply:FastifyReply) => {
    try {
      const res = await FigmaModels.createTask(req.body)
      reply.code(200).send({ ...okayRes, data: res })
    } catch (e) {
      reply.code(400).send({ ...errorRes, message: e.message })
    }
  }

  static getTasks = async (req: FastifyRequest<{ Params: getTasks }>, reply: FastifyReply) => {
    try {
      const res = await FigmaModels.getTasks(req.params)
      reply.code(200).send({ ...okayRes, data: res })
    } catch (e) {
      reply.code(400).send({ ...errorRes, message: e.message })
    }
  }
}