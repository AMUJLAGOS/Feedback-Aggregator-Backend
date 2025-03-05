import Fastify from "fastify";
import { AppDataSource } from "./data-source";
import cors from '@fastify/cors'

const fastify = Fastify({
  logger: false
})


fastify.register(cors, (instance) => {
  return (req, callback) => {
    const corsOptions = {
      origin: "*",
      methods: ['GET', 'HEAD', 'OPTIONS', 'PUT', 'PATCH', 'POST', 'DELETE'],
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Authorization'
      ]
    }
    // callback expects two parameters: error and options
    callback(null, corsOptions)
  }
})


fastify.register(require('./route/figma.routes'), { prefix: '/api/v1' })
// fastify.get()

async function main() {
  try {
    await AppDataSource.initialize()
    console.log('database connected!')
  } catch (e) {
    console.log(e)
  }
  try {
    await fastify.listen({ port: 9000, host: process.env.HOST || '0.0.0.0' })
    console.log('server up!')
  } catch (e) {
    fastify.log.error(e)
    process.exit(1)
  }
}

main()