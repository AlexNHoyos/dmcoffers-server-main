export class Categorias {
    constructor(
        public id: number,
        public descripcion: string,
        public creationtimestamp: Date,
        public creationuser: String, 
        public modificationtimestamp: Date,
        public modificationuser: Date
    ) {}
}