// 

import { DataSource } from "typeorm";
import { FigmaUser } from "./entity/user.entity";
import { FigmaTask } from "./entity/comments.entity";
import { FigmaFile } from "./entity/file.entity";
import { Todo } from "./entity/todo.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123410",
  database: "figma-plugin",
  url: '',
  ssl: false,
  synchronize: true,
  logging: false,
  entities: [FigmaUser, FigmaTask, FigmaFile, Todo],
  subscribers: [],
  migrations: [],
})