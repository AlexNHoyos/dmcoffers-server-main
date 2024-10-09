import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Juego } from '../juegos/juegos.entity.js';

@Entity('pub_category') // El nombre de la tabla en la base de datos
export class Categorias {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public description: string;

  @CreateDateColumn({ type: 'timestamp' })
  public creationtimestamp: Date;

  @Column()
  public creationuser: String;

  @UpdateDateColumn({ nullable: true })
  public modificationtimestamp: Date;

  @Column()
  public modificationuser: String;

  @ManyToMany(() => Juego, (juego) => juego.categorias)
  public juego: Juego[] | undefined;

  constructor(
    id: number,
    description: string,
    creationtimestamp: Date,
    creationuser: String,
    modificationtimestamp: Date,
    modificationuser: String
  ) {
    this.id = id;
    this.description = description;
    this.creationtimestamp = creationtimestamp;
    this.creationuser = creationuser;
    this.modificationtimestamp = modificationtimestamp;
    this.modificationuser = modificationuser;
  }
}
