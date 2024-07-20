import { User } from "./user.entity";
export class UserAuth {
    private _password: string;
    salt: string | undefined;
    id: string | undefined;
    modificationuser: string | undefined;
    creationuser: string;
    creationtimestamp: Date;

    
    constructor(        
        creationuser: string,
        creationtimestamp: Date,
        password: string,
        salt?: string,
        id?: string,
        modificationuser?: string
    ) 
    {
        this.id = id;
        this.creationuser = creationuser;
        this.creationtimestamp = creationtimestamp;
        this.salt = salt;
        this._password = password
        this.modificationuser = modificationuser;
        
    }


    set password(newPassword: string) {
        this._password = newPassword;
    }

    get password(): string {
        return this._password;
    }

}


