import { RolApl } from "../roles/rol-apl.js";
import { User } from "./user.entity.js";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Relation, ManyToOne, JoinColumn } from 'typeorm';


@Entity('swe_usrrolapl')
export class UserRolApl {

    @PrimaryGeneratedColumn({type: "int"})
    id: number | undefined;
    
    @Column({name: "id_rolapl", type: "bigint"})
    id_rolapl: number | undefined; 
   
    @Column({name: "id_usrapl", type: "bigint"})
    id_usrapl: number | undefined; 
    
    @Column({name: "creationuser",type: "varchar"})
    public creationuser: string | undefined;

    @CreateDateColumn({name: "creationtimestamp", type: "timestamp", })
    creationtimestamp: Date | undefined;

    @Column({name: "status",type: "boolean"})
    public status: boolean | undefined;

    @ManyToOne(() => User, (user) => user.userRolApl)
    @JoinColumn({ name: 'id_usrapl' }) 
    public user!: Relation<User>;

    @ManyToOne(() => RolApl, (rolApl) => rolApl.userRolApl)
    @JoinColumn({ name: 'id_usrapl' }) 
    public rolApl?: Relation<RolApl>;

    constructor(   
        id: number,
        id_rolapl: number,
        id_usrapl: number,
        creationuser?: string,
        creationtimestamp?: Date,
        status?: boolean,
        

    ) 
    {
        this.id = id;
        this.id_rolapl = id_rolapl;
        this.id_usrapl = id_usrapl;   
        this.creationuser = creationuser;
        this.creationtimestamp = creationtimestamp;
        this.status = status;
  
    }

  

}


