import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { SweAccModApl } from "../sweaccmodapl/sweaccmodapl.entity.js";

@Entity('swe_itemmenu')
export class SweItemMenu {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public description: string;

    @ManyToOne(() => SweAccModApl, {
        nullable: true,
        lazy: true,
    })
    @JoinColumn({ name: 'id_sweaccmodapl' })  // Se define el nombre de la FK en la BD
    public idSweAccModApl?: Promise<SweAccModApl>;

    @ManyToOne(() => SweItemMenu, {
        nullable: true
    })
    @JoinColumn({ name: 'id_supitemmenu' })
    public idSupItemMenu?: SweItemMenu;

    @Column({ type: 'varchar', length: 255 })
    public creationuser: string;

    @CreateDateColumn()
    public creationtimestamp: Date;

    @Column({ nullable: true })
    public modificationuser?: string;

    @UpdateDateColumn({ type: 'varchar', length: 255, nullable: true })
    public modificationtimestamp?: Date;

    @Column()
    public endpoint: string;

    @Column()
    public ordernumber: number;

    constructor(
        id: number,
        title: string,
        description: string,
        idSupItemMenu: SweItemMenu,
        idSweAccModApl: Promise<SweAccModApl>,
        endpoint: string,
        ordernumber: number,
        creationtimestamp: Date,
        creationuser: string,
        modificationtimestamp?: Date,
        modificationuser?: string
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
