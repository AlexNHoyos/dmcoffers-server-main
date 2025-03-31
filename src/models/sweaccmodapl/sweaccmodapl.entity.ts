import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('swe_accmodapl')
export class SweAccModApl {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public description: string;

    @Column()
    public actionname: string;

    @Column()
    public methodname: string;

    @Column({ type: 'varchar', length: 255 })
    public creationuser: string;

    @CreateDateColumn()
    public creationtimestamp: Date;

    @Column({ nullable: true })
    public modificationuser: string;

    @UpdateDateColumn({ type: 'varchar', length: 255, nullable: true })
    public modificationtimestamp: Date;

    constructor(
        id: number,
        description: string,
        actionname: string,
        methodname: string,
        creationtimestamp: Date,
        creationuser: string,
        modificationtimestamp: Date,
        modificationuser: string
    ) {
        this.id = id;
        this.description = description;
        this.actionname = actionname;
        this.methodname = methodname;
        this.creationtimestamp = creationtimestamp;
        this.creationuser = creationuser;
        this.modificationtimestamp = modificationtimestamp;
        this.modificationuser = modificationuser;
    }

}