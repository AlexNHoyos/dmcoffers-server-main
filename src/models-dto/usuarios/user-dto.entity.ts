export class UserDto {
    idUser: number | undefined;
    idUserAuth: number | undefined;
    realname: string | undefined;
    surname: string | undefined;
    username: string | undefined;
    birth_date: Date | undefined;
    delete_date: Date | undefined;
    creationuser: string | undefined;
    creationtimestamp: Date | undefined;
    modificationuser: string | undefined;
    modificationtimestamp: Date | undefined;
    password: string | undefined;
     status: boolean | undefined;

    constructor(
        idUser?: number,
        idUserAuth?: number,
        realname?: string,
        surname?: string,
        username?: string,
        birth_date?: Date,
        delete_date?: Date,
        creationuser?: string,
        creationtimestamp?: Date,
        password?: string,
        status?: boolean,
        modificationuser?: string,
        modificationtimestamp?: Date,

    ) {
        this.idUser = idUser;
        this.idUserAuth = idUserAuth;
        this.realname = realname;
        this.surname = surname;
        this.username = username;
        this.birth_date = birth_date;
        this.delete_date = delete_date;
        this.creationuser = creationuser;
        this.creationtimestamp = creationtimestamp;
        this.modificationuser = modificationuser;
        this.modificationtimestamp = modificationtimestamp;
        this.password = password;
        this.status = status;
    }
}
