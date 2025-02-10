// 

import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FigmaTask } from "./comments.entity";


@Entity()
export class Todo {
  @PrimaryGeneratedColumn("uuid")
    id: string
  
  @Column()
    todo: string
  
  @Column({default: false})
    is_resolved: Boolean
  
  @OneToMany(() => FigmaTask, ()=> {})
    comment: FigmaTask
  
  @CreateDateColumn()
  createdOn: Date
  
  
  @Column()
    resolvedOn : Date
  
}