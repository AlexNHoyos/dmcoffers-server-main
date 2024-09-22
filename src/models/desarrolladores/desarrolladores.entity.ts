export class Desarrollador {
    constructor(
        public id: string,
        public developername: string,
        public foundation_date: Date,
        public dissolution_date: Date,
        public status: boolean,
        public creationtimestamp: Date,
        public creationuser: String,
        public modificationtimestamp: Date,
        public modificationuser: Date
    ) { }
}