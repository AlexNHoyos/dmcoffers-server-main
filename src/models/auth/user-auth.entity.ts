import { User } from "../usuarios/user.entity";
export class UserAuth extends User {
    private _password: string;
    salt: string | undefined;

    constructor(
        username: string,
        creationuser: string,
        status: boolean,
        password: string,
        salt?: string
    ) {
        super(username, creationuser);
        this._password = password;
        this.salt = salt;
    }

    set password(newPassword: string) {
        this._password = newPassword;
    }

    get password(): string {
        return this._password;
    }

}


