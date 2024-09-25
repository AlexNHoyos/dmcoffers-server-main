
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('hd_support_ticket') // El nombre de la tabla en la base de datos

export class SupportTicket {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: "boolean"})
    public status: boolean;

    @Column()
    public creationuser: string;

    @CreateDateColumn()
    public creationtimestamp: Date;

    @Column({ nullable: true })
    public modificationuser: string;

    @UpdateDateColumn({ nullable: true })
    public modificationtimestamp: Date;

    constructor(
        id: number,
        status: boolean,
        creationuser: string,
        creationtimestamp: Date,
        modificationuser: string,
        modificationtimestamp: Date,
    ) {
        this.id = id;
        this.status = status;
        this.creationuser = creationuser;
        this.creationtimestamp = creationtimestamp;
        this.modificationuser = modificationuser;
        this.modificationtimestamp = modificationtimestamp;
    }
}

