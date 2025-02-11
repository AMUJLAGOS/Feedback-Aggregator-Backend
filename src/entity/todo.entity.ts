// 

import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FigmaTask } from "./comments.entity";
import { FigmaUser } from "./user.entity";
import { FigmaFile } from "./file.entity";


@Entity()
export class Todo {
  @PrimaryGeneratedColumn("uuid")
    id: string
  
  @Column()
    todo: string
  
  @Column({default: false})
    is_resolved: Boolean
  
  @ManyToOne(() => FigmaTask)
    task: FigmaTask
  
  @ManyToOne(() => FigmaFile)
    file: FigmaFile
  
  @ManyToOne(() => FigmaUser)
    user:FigmaUser
  
  @CreateDateColumn()
  createdOn: Date
  
  @Column({nullable:true})
    resolvedOn : Date
  
}