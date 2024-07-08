export class supportTicket {
    constructor(
        public id: string,
        public status: boolean,
        public creationuser: string,
        public creationtimestamp: Date,
        public modificationuser: string,
        public modificationtimestamp: Date,
    ) {
    }
}

