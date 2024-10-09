import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';

import { Publisher } from '../publicadores/publisher.entity.js';
import { Desarrollador } from '../desarrolladores/desarrolladores.entity.js';

@Entity('pub_game')
export class Juego {
  @PrimaryGeneratedColumn()
  public id: number | undefined;

  @Column({ type: 'varchar', length: 255 })
  public gamename: string | undefined;

  @Column({ type: 'date' })
  public release_date: Date | undefined;

  @Column({ type: 'date' })
  public publishment_date: Date | undefined;

  @CreateDateColumn()
  public creationtimestamp: Date | undefined;

  @Column({ type: 'varchar', length: 255 })
  public creationuser: string | undefined;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  public modificationtimestamp: Date | undefined;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public modificationuser: string | undefined;

  @ManyToOne(() => Publisher, (publisher) => publisher.juegos, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'id_publisher' })
  public publisher: Publisher | undefined;

  @ManyToOne(() => Desarrollador, (desarrollador) => desarrollador.juegos, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'id_developer' })
  public developer: Desarrollador | undefined;

  constructor(
    id?: number,
    gamename?: string,
    release_date?: Date,
    publishment_date?: Date,
    creationtimestamp?: Date,
    creationuser?: string,
    modificationtimestamp?: Date,
    modificationuser?: string
  ) {
    this.id = id;
    this.gamename = gamename;
    this.release_date = release_date;
    this.publishment_date = publishment_date;
    this.creationtimestamp = creationtimestamp;
    this.creationuser = creationuser;
    this.modificationtimestamp = modificationtimestamp;
    this.modificationuser = modificationuser;
  }
}
