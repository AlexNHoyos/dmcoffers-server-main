import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinTable,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Publisher } from '../publicadores/publisher.entity.js';
import { Desarrollador } from '../desarrolladores/desarrolladores.entity.js';
import { Categorias } from '../categorias/categorias.entity.js';
import { Precio } from '../precios/precios.entity.js';
import { Oferta } from '../ofertas/ofertas.entity.js';

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
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'id_publisher' })
  public publisher: Publisher | undefined;

  @ManyToOne(() => Desarrollador, (desarrollador) => desarrollador.juegos, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'id_developer' })
  public developer: Desarrollador | undefined;

  @ManyToMany(() => Categorias, (categoria) => categoria.juego, {
    nullable: false,
    lazy: true,
  })
  @JoinTable({
    name: 'pub_game_category', // Nombre de la tabla intermedia
    joinColumn: { name: 'id_game', referencedColumnName: 'id' }, // Referencia a Juego
    inverseJoinColumn: { name: 'id_category', referencedColumnName: 'id' }, // Referencia a Categoria
  })
  public categorias?: Promise<Categorias[]>;

  @OneToMany(() => Precio, (precio) => precio.juego)
  precios?: Precio[];

  @OneToMany(() => Oferta, (oferta) => oferta.juego)
  ofertas?: Oferta[];

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
