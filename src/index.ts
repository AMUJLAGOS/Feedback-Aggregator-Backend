import Fastify from "fastify";
import { AppDataSource } from "./data-source";

const fastify = Fastify({
  logger: false
})


fastify.register(require('./routes/figma.routes'), { prefix: '/api/v1' })

async function main() {
  try {
    await AppDataSource.initialize()
    console.log('database connected!')
  } catch (e) {
    console.log(e)
  }
  try {
    await fastify.listen({ port: 3030 })
     console.log('server up!')
  } catch (e) {
    fastify.log.error(e)
    process.exit(1)
  }
}

main()