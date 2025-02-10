// 

import { FastifyInstance } from "fastify"
import { createTaskOpts, createFileOpts, createUserOpts, getTasksOpts } from "../shemas/figma.schema"


// 


async function figmaRoutes(fastify:FastifyInstance, options) {
  fastify.post('/create-user', createUserOpts)
  fastify.post('/create-file', createFileOpts)
  fastify.post('/create-task', createTaskOpts)
  fastify.get('/get-tasks/:user_figma_id/:figma_file_key', getTasksOpts)
}


module.exports = figmaRoutes