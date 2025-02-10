// 

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FigmaUser } from "./user.entity";


@Entity()
export class FigmaFile {
  @PrimaryGeneratedColumn("uuid")
    id: string
  
  @Column()
    figma_file_id: string

  @Column()
    figma_file_key: string

  @Column()
    figma_name: string

  @CreateDateColumn({type: Date})
    createdOn: Date
}