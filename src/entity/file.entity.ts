// 

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FigmaUser } from "./user.entity";


@Entity()
export class FigmaFile {
  @PrimaryGeneratedColumn()
  id: string
  
  @Column()
  figma_file_id: string

  @Column()
  figma_file_key: string

  @ManyToOne(()=> FigmaUser, (user) => user.id )
  user: FigmaUser
}