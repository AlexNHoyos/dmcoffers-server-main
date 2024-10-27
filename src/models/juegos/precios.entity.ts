import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Juego } from '../juegos/juegos.entity.js';

@Entity('pub_game_price')
export class Precio {
  @PrimaryColumn({ type: 'bigint' })
  public id_game: number | undefined;

  @PrimaryColumn({ type: 'timestamp', name: 'valid_until_date' })
  public valid_from: Date | undefined;

  @Column({ type: 'float' })
  public price: number | undefined;

  @Column({ type: 'timestamp' })
  public creationtimestamp: Date | undefined;

  @Column({ type: 'varchar', length: 25 })
  public creationuser: string | undefined;

  @Column({ type: 'timestamp', nullable: true })
  public modificationtimestamp: Date | undefined;

  @Column({ type: 'varchar', length: 25, nullable: true })
  public modificationuser: string | undefined;

  @ManyToOne(() => Juego, (juego) => juego.precios)
  @JoinColumn({ name: 'id_game' })
  public juego: Juego | undefined;

  constructor(
    id_game: number,
    valid_from: Date,
    price?: number,
    creationtimestamp?: Date,
    creationuser?: string,
    modificationtimestamp?: Date,
    modificationuser?: string
  ) {
    this.id_game = id_game;

    this.valid_from = valid_from;
    this.price = price;
    this.creationtimestamp = creationtimestamp;
    this.creationuser = creationuser;
    this.modificationtimestamp = modificationtimestamp;
    this.modificationuser = modificationuser;
  }
}
