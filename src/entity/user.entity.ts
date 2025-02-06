// 

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class FigmaUser {
  @PrimaryGeneratedColumn()
  id: string
  
  @Column()
  figma_id: string

  @Column()
  figma_access: string
}