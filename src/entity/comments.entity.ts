
// 

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FigmaFile } from "./file.entity";
import { FigmaUser } from "./user.entity";


@Entity()
export class FigmaTask {
  @PrimaryGeneratedColumn("uuid")
    id: string
  
  @ManyToOne(()=> FigmaFile)
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

  @Column("simple-array",{ nullable: true })
  tags: string[]
  
  @Column({default: false})
  is_resolved: Boolean
  
  @Column()
    creator_img: string

  @Column()
    creator_name: string
  
  @ManyToOne(() => FigmaUser, {onDelete: "SET NULL"})
    user: FigmaUser
  
  @Column()
    figma_createdOn :Date
  
  @CreateDateColumn({type: Date})
    createdOn: Date
}