
// 

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FigmaFile } from "./file.entity";


@Entity()
export class FigmaComment {
  @PrimaryGeneratedColumn("uuid")
    id: string
  
  @ManyToOne(()=> FigmaFile, (file)=> file.figma_file_key)
    file: FigmaFile

  @Column()
    figma_id: string
  
  @Column()
    figma_uuid: string

  @Column()
    comment: string
  
  @Column()
    board_name: string
  
  @Column()
    board_number: string

  @Column()
   figma_order_id: string
  
  @Column({ nullable: true })
    due_date: Date

  
  @Column()
    figma_createdOn :Date
  
  @CreateDateColumn({type: Date})
    createdOn: Date
}