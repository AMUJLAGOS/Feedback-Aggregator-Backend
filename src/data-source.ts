// 

import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "",
  port: 600,
  username: "",
  password: "",
  database: "",
  url: '',
  ssl: false,
  synchronize: true,
  logging: false,
  entities: [],
  subscribers: [],
  migrations: [],
})