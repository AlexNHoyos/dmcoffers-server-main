export class Categorias {
  constructor(
    public id: string,
    public description: string,
    public creationtimestamp: Date,
    public creationuser: String,
    public modificationtimestamp: Date,
    public modificationuser: String
  ) {}
}
