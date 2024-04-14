import crypto from 'node:crypto';

export class Juego {
  constructor(
    public id: number,
    public gamename: string,
    public id_publisher: number,
    public id_developer: number,
    public release_date: Date,
    public publishment_date: Date,
    public creationtimestamp: Date,
    public creationuser: string,
    public modificationtimestamp: Date,
    public modificationuser: string
  ) {}
}
