import { Publisher } from '../publicadores/publisher.entity.js';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Hosting } from './hosting.entity.js';

@Entity('hs_publisher_service') // El nombre de la tabla en la base de datos
export class HostingPublisher {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Publisher, (publisher) => publisher.hostingpublisher, {
        nullable: false,
        eager: false,
    })
    @JoinColumn({ name: 'id_publisher' })
    public publisher: Publisher | undefined;

    @ManyToOne(() => Hosting, (hosting) => hosting.hostingpublisher, {
        nullable: false,
        eager: true,
    })
    @JoinColumn({ name: 'id_hosting_service' })
    public hosting: Hosting | undefined;

    @Column({ name: 'storage_type', type: 'varchar' })
    public storageType: string;

    @Column({ name: 'storage_ammount' })
    public storageAmmount: number;

    @Column({ name: 'ram_ammount' })
    public ramAmmount: number;

    @Column({ name: 'cpu_specs', type: 'varchar' })
    public cpuSpecs: string;

    @Column({ name: 'uptime_percentage' })
    public uptimePercentage: number;

    constructor(
        id: number,
        storageType: string,
        storageAmmount: number,
        ramAmmount: number,
        cpuSpecs: string,
        uptimePercentage: number
    ) {
        this.id = id;
        this.storageType = storageType;
        this.storageAmmount = storageAmmount
        this.ramAmmount = ramAmmount;
        this.cpuSpecs = cpuSpecs;
        this.uptimePercentage = uptimePercentage;
    }
}
