
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../usuarios/user.entity';

@Entity('hd_support_ticket') // El nombre de la tabla en la base de datos

export class SupportTicket {

    @PrimaryGeneratedColumn()
    public id?: number;

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

    @Column({  })
    public description: string; 

    @ManyToMany(() => User, (user) => user.ticketlist,{
        nullable: true,
        lazy: true
    })

    @JoinTable({
        name: 'hd_usr_st', //tabla intermedia
        joinColumn: {name:'id_ticket' , referencedColumnName: 'id'},
        inverseJoinColumn: {name:'id_user' , referencedColumnName: 'id' },
    })
    public user?: Promise<User>

    constructor(
        status: boolean,
        creationuser: string,
        creationtimestamp: Date,
        modificationuser: string,
        modificationtimestamp: Date,
        description: string,
        id?: number

    ) {
        this.status = status;
        this.creationuser = creationuser;
        this.creationtimestamp = creationtimestamp;
        this.modificationuser = modificationuser;
        this.modificationtimestamp = modificationtimestamp;
        this.description = description;
        this.id = id;
    }
}

