export class UserAuth {
  constructor(
    public id: number,
    public username: string,
    public password: Buffer,
    public creationuser: string,
    public creationtimestamp: Date,
    public salt: Buffer | null,
    public status: boolean | null
  ) {}
}