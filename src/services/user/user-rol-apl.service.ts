import { inject, injectable } from "inversify";
import { RolApl } from "../../models/roles/rol-apl.entity.js";
import { UserRolApl } from "../../models/usuarios/user-rol-apl.entity.js";
import { IUserRolAplService } from "../interfaces/user/IUserRolAplService.js";
import { UserRolRepository } from "../../repositories/usuarios/user-rol-apl.dao.js";
import { User } from "../../models/usuarios/user.entity.js";
import { userRolIdCons } from "../../shared/constants/general-constants.js";
import { RolAplRepository } from "../../repositories/rol/rol-apl.dao.js";

@injectable()
export class UserRolAplService implements IUserRolAplService {

    private _userRolRepository: UserRolRepository;
    private _rolAplRepository: RolAplRepository;

    constructor(
     @inject(UserRolRepository) userRolAplService: UserRolRepository,
     @inject(RolAplRepository) rolAplRepository: RolAplRepository,
    ){
        this._userRolRepository = userRolAplService;
        this._rolAplRepository = rolAplRepository;
    }

    async SearchUserCurrentRol(userRolAplList: UserRolApl[]): Promise<RolApl | undefined>{
        
        const latestUserRol = userRolAplList.reduce((latest, current) => {
            const latestDate = new Date(latest.creationtimestamp ?? 0); // Si es undefined, usa 0 como fecha predeterminada
            const currentDate = new Date(current.creationtimestamp ?? 0);
            
            return latestDate > currentDate ? latest : current;
        }, userRolAplList[0]);

        if (!latestUserRol || latestUserRol.status == false) {
            return undefined;
        }

        return await latestUserRol.rolApl;
    }

    async AsignRolUser(user: User, rolName?: string): Promise<RolApl | undefined>{

        let rolToAsign = null;

        if (rolName !== null && rolName !== undefined) {
            const rol = await this._rolAplRepository.findByRolName(rolName!)
            rolToAsign = rol?.id;
        }
        else {
            rolToAsign = userRolIdCons.usuarioTienda;
        };
        

        const newUserRol: UserRolApl = new UserRolApl()
        newUserRol.id = undefined;
        newUserRol.idRolapl = rolToAsign;
        newUserRol.idUsrapl = user.id;
        newUserRol.creationuser = user.creationuser;
        newUserRol.creationtimestamp = user.creationtimestamp;
        newUserRol.status = true;

        const userRolAsigned = this._userRolRepository.create(newUserRol);
        
        const currentRol = (await userRolAsigned).rolApl;
        
        return currentRol;
    }
}