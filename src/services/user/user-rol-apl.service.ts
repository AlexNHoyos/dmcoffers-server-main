import { inject, injectable } from "inversify";
import { RolApl } from "../../models/roles/rol-apl.entity.js";
import { UserRolApl } from "../../models/usuarios/user-rol-apl.entity.js";
import { IUserRolAplService } from "../interfaces/user/IUserRolAplService.js";
import { UserRolRepository } from "../../repositories/usuarios/user-rol-apl.repository.js";

@injectable()
export class UserRolAplService implements IUserRolAplService {

    private _userRolRepository: UserRolRepository;

    constructor(
     @inject(UserRolRepository) userRolAplService: UserRolRepository,
    ){
        this._userRolRepository = userRolAplService;
    }

    async SearchUserCurrentRol(userRolAplList: UserRolApl[]): Promise<RolApl | undefined>{
        
        const latestUserRol = userRolAplList.reduce((latest, current) => {
            const latestDate = new Date(latest.creationtimestamp ?? 0); // Si es undefined, usa 0 como fecha predeterminada
            const currentDate = new Date(current.creationtimestamp ?? 0);
            
            return latestDate > currentDate ? latest : current;
        }, userRolAplList[0]);

        if (!latestUserRol) {
            return undefined;
        }

        return await latestUserRol.rolApl;
    }

    async AsignRolUser(userRolApl: UserRolApl): Promise<RolApl | undefined>{

        const userRolAsigned = this._userRolRepository.create(userRolApl);
        
        const currentRol = (await userRolAsigned).rolApl;
        
        return currentRol;
    }
}