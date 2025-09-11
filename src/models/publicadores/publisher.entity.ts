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
import { HostingPublisher } from '../../models/hosting/hosting-publisher.entity.js';

@Entity('pub_game_publisher') // El nombre de la tabla en la base de datos
// Definimos la clase Publisher para representar la entidad de un publicador
export class Publisher {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public publishername: string;

  @Column({ type: 'timestamp' })
  public foundation_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  public dissolution_date: Date | null;

  @Column({ type: 'boolean' })
  public status: boolean;

  @CreateDateColumn()
  public creationtimestamp: Date;

  @Column()
  public creationuser: string;

  @UpdateDateColumn({ nullable: true })
  public modificationtimestamp: Date | null;

  @Column({ nullable: true })
  public modificationuser: string;

  @OneToMany(() => Juego, (juegos) => juegos.publisher)
  public juegos: Juego[] | undefined;

  @OneToMany(() => HostingPublisher, (hostingpublisher) => hostingpublisher.publisher)
  public hostingpublisher: HostingPublisher[] | undefined; 

  // Constructor de la clase Publisher
  constructor(
    // Propiedades de la entidad Publisher
    id: number,
    publishername: string,
    foundation_date: Date,
    dissolution_date: Date | null,
    status: boolean,
    creationtimestamp: Date,
    creationuser: string,
    modificationtimestamp: Date | null,
    modificationuser: string
  ) {
    (this.id = id), (this.publishername = publishername);
    this.foundation_date = foundation_date;
    this.dissolution_date = dissolution_date;
    this.status = status;
    this.creationtimestamp = creationtimestamp;
    this.creationuser = creationuser;
    this.modificationtimestamp = modificationtimestamp;
    this.modificationuser = modificationuser;
  }
}
