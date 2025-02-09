// 

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class FigmaUser {
  @PrimaryGeneratedColumn('uuid')
    id: string
  
  @Column()
    figma_id: string
  
  @Column()
    figma_email: string
  

  @Column()
    figma_handle: string
  
  @Column()
    figma_image: string

  @CreateDateColumn({type: Date})
    createdOn: Date
}