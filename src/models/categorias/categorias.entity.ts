export class Categorias {
    constructor(
        public id: string,
        public descripcion: string,
        public creationtimestamp: Date,
        public creationuser: String,
        public modificationtimestamp: Date,
        public modificationuser: Date
    ) { }
}