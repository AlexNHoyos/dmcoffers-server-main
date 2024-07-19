import { User } from "../usuarios/user.entity";
export class UserAuth {
    private _password: string;
    salt: string | undefined;
    id: string | undefined;
    username: string;
    creationuser: string;
    creationtimestamp: Date;
    status: boolean;
    
    constructor(        
        username: string,
        creationuser: string,
        creationtimestamp: Date,
        status: boolean,
        password: string,
        salt?: string,
        id?: string
    ) 
    {
        this.id = id;
        this.username = username;
        this.creationuser = creationuser;
        this.creationtimestamp = creationtimestamp;
        this.status = status;
        this.salt = salt;
        this._password = password
        
    }


    set password(newPassword: string) {
        this._password = newPassword;
    }

    get password(): string {
        return this._password;
    }

}


