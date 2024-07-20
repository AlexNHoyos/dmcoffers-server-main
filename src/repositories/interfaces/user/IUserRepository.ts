
import { UserAuth } from '../../../models/usuarios/user-auth.entity';
import { User } from '../../../models/usuarios/user.entity';
import { IBaseRepository } from '../IBaseRepository';

export interface IUserRepository extends IBaseRepository<User | UserAuth > {
    
    findByUserName(userName: string): Promise<User | undefined>;
   
    registerUser( user: User, userAuth: UserAuth): Promise<[User, UserAuth]>; 
  }
  