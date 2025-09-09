import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { HostingPublisher } from './hosting-publisher.entity.js';

@Entity('hs_hosting_service') // El nombre de la tabla en la base de datos
export class Hosting {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public creationuser: string;

  @CreateDateColumn({ type: 'timestamp' })
  public creationtimestamp: Date;

  @Column({ nullable: true })
  public modificationuser: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  public modificationtimestamp: Date;

  @Column()
  public status: boolean;

  @OneToMany(() => HostingPublisher, (hostingpublisher) => hostingpublisher.hosting)
  public hostingpublisher: HostingPublisher[] | undefined;

  constructor(
    id: number,
    name: string,
    creationuser: string,
    creationtimestamp: Date,
    modificationuser: string,
    modificationtimestamp: Date,
    status: boolean
  ) {
    this.id = id;
    this.name = name;
    this.creationuser = creationuser;
    this.creationtimestamp = creationtimestamp;
    this.modificationuser = modificationuser;
    this.modificationtimestamp = modificationtimestamp;
    this.status = status;
  }
}
