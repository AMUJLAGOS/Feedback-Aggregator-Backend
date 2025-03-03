// 

require('dotenv').config()

import { DataSource } from "typeorm";
import { FigmaUser } from "./entity/user.entity";
import { FigmaTask } from "./entity/comments.entity";
import { FigmaFile } from "./entity/file.entity";
import { Todo } from "./entity/todo.entity";

const envConfig = process.env

export const AppDataSource = new DataSource({
  type: "postgres",
  host: envConfig.DATABASE_HOST,
  port: parseInt(envConfig.DATABASE_PORT),
  username: envConfig.DATABASE_NAME,
  password: envConfig.DATABASE_PASS,
  database: envConfig.DATABASE,
  url: '',
  ssl: false,
  synchronize: true,
  logging: false,
  entities: [FigmaUser, FigmaTask, FigmaFile, Todo],
  subscribers: [],
  migrations: [],
})