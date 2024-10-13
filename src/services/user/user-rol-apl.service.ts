import { injectable } from "inversify";
import { RolApl } from "../../models/roles/rol-apl.entity";
import { UserRolApl } from "../../models/usuarios/user-rol-apl.entity";
import { IUserRolAplService } from "../interfaces/user/IUserRolAplService";

@injectable()
export class UserRolAplService implements IUserRolAplService {

    async SearchUserCurrentRol(userRolAplList: UserRolApl[]): Promise<RolApl | undefined>{
        
        const latestUserRol = userRolAplList.reduce((latest, current) => {
            const latestDate = new Date(latest.creationtimestamp ?? 0); // Si es undefined, usa 0 como fecha predeterminada
            const currentDate = new Date(current.creationtimestamp ?? 0);
            
            return latestDate > currentDate ? latest : current;
        }, userRolAplList[0]);

        if (!latestUserRol) {
            return undefined;
        }

        return await latestUserRol.rolApl
    }

    
}