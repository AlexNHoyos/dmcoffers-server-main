export class User {
    public id: string | undefined;
    public realname: string | undefined;
    public surname: string | undefined;
    public username: string | undefined;
    public birth_date: Date | undefined;
    public delete_date: Date | undefined;
    public creationuser: string | undefined;
    public creationtimestamp: Date | undefined;
    public modificationuser: string | undefined;
    public modificationtimestamp: Date | undefined;
    public status: boolean | undefined;

    constructor(
        id?: string,
        realname?: string,
        surname?: string,
        username?: string,
        birth_date?: Date,
        delete_date?: Date,
        creationuser?: string,
        creationtimestamp?: Date,
        modificationuser?: string,
        modificationtimestamp?: Date,
        status?: boolean
    ) {
        this.id = id;
        this.realname = realname;
        this.surname = surname;
        this.username = username;
        this.birth_date = birth_date;
        this.delete_date = delete_date;
        this.creationuser = creationuser;
        this.creationtimestamp = creationtimestamp;
        this.modificationuser = modificationuser;
        this.modificationtimestamp = modificationtimestamp;
        this.status = status;
    }
}

