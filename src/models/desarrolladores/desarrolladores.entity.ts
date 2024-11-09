import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { Juego } from '../juegos/juegos.entity.js';
@Entity('pub_game_developer') // El nombre de la tabla en la base de datos
export class Desarrollador {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public developername: string;

  @Column({ type: 'timestamp' })
  public foundation_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  public dissolution_date: Date;

  @Column()
  public status: boolean;

  @CreateDateColumn()
  public creationtimestamp: Date;

  @Column()
  public creationuser: String;

  @UpdateDateColumn({ nullable: true })
  public modificationtimestamp: Date;

  @Column({ nullable: true })
  public modificationuser: string;

  @OneToMany(() => Juego, (juego) => juego.developer)
  public juegos: Juego[] | undefined;

  constructor(
    id: number,
    developername: string,
    foundation_date: Date,
    dissolution_date: Date,
    status: boolean,
    creationtimestamp: Date,
    creationuser: String,
    modificationtimestamp: Date,
    modificationuser: string
  ) {
    this.id = id;
    this.developername = developername;
    this.foundation_date = foundation_date;
    this.dissolution_date = dissolution_date;
    this.status = status;
    this.creationtimestamp = creationtimestamp;
    this.creationuser = creationuser;
    this.modificationtimestamp = modificationtimestamp;
    this.modificationuser = modificationuser;
  }
}
