import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SweAccModApl } from "../sweaccmodapl/sweaccmodapl.entity.js";

@Entity('swe_itemmenu')
export class SweItemMenu {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public description: string;

    @ManyToOne(() => SweAccModApl, (sweAccModApl) => sweAccModApl.id, {
        nullable: true,
        lazy: true,
    })
    public idSweAccModApl?: Promise<SweAccModApl>;

    @ManyToOne(() => SweItemMenu, (sweItemMenu) => sweItemMenu.subItems, {
        nullable: true,
        lazy: true,
    })
    @JoinColumn({ name: 'id_supitemmenu' })
    public idSupItemMenu?: Promise<SweItemMenu>;

    @OneToMany(() => SweItemMenu, (sweItemMenu) => sweItemMenu.idSupItemMenu)
    public subItems?: SweItemMenu[];

    @Column({ type: 'varchar', length: 255 })
    public creationuser: string;

    @CreateDateColumn()
    public creationtimestamp: Date;

    @Column({ nullable: true })
    public modificationuser: string;

    @UpdateDateColumn({ type: 'varchar', length: 255, nullable: true })
    public modificationtimestamp: Date;

    @Column()
    public endpoint: string;

    @Column()
    public ordernumber: number;

    constructor(
        id: number,
        title: string,
        description: string,
        idSupItemMenu: Promise<SweItemMenu>,
        idSweAccModApl: Promise<SweAccModApl>,
        endpoint: string,
        ordernumber: number,
        creationtimestamp: Date,
        creationuser: string,
        modificationtimestamp: Date,
        modificationuser: string
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.idSupItemMenu = idSupItemMenu;
        this.idSweAccModApl = idSweAccModApl;
        this.endpoint = endpoint;
        this.ordernumber = ordernumber;
        this.creationtimestamp = creationtimestamp;
        this.creationuser = creationuser;
        this.modificationtimestamp = modificationtimestamp;
        this.modificationuser = modificationuser;
    }
}