export class Foro {
    constructor(
        public id: number,
        public id_user: number,
        public description: string,
        public multimedia: string,
        public creationtimestamp: Date,
        public modificationtimestamp: Date
    ) { }
}