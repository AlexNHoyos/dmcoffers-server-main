export class Publisher {
  constructor(
    public id: string,
    public publishername: string,
    public foundation_date: Date,
    public dissolution_date: Date,
    public status: boolean,
    public creationtimestamp: Date,
    public creationuser: string,
    public modificationtimestamp: Date,
    public modificationuser: string
  ) {
    /*
    this.id = id;
    this.publishername = publishername;
    this.foundation_date = foundation_date;
    this.dissolution_date = dissolution_date;
    this.status = status;
    th
    this.creationtimestamp = creationtimestamp;
    this.creationuser = creationuser;
    this.modificationtimestamp = modificationtimestamp;
    this.modificationuser = modificationuser;*/
  }
}
