export class User {
    constructor(
        public id: string,
        public realname: string,
        public surname: string,
        public username: string,
        public birth_date: Date,
        public delete_date: Date,
        public creationuser: string,
        public creationtimestamp: Date,
        public modificationuser: string,
        public modificationtimestamp: Date,
        public status: boolean
    ) {
    }
}

