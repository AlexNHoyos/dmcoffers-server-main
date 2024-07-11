export class Hosting {
    constructor(
        public id: string,
        public name: string,
        public creationuser: string,
        public creationtimestamp: Date,
        public modificationuser: string,
        public modificationtimestamp: Date,
        public status: boolean
    ) {
    }
}
