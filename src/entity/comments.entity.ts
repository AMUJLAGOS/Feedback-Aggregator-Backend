
// 

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FigmaFile } from "./file.entity";


@Entity()
export class FigmaComment {
  @PrimaryGeneratedColumn()
    id: string
  
  @ManyToOne(()=> FigmaFile, (file)=> file.figma_file_key)
    file: FigmaFile

  @Column()
    figma_id: string

  @Column()
    comment: string

  @Column()
    figma_order_id: string
}