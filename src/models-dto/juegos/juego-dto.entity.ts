export class JuegoDto {
  id?: number | undefined;
  gamename: string | undefined;
  release_date: Date | undefined;
  publishment_date?: Date | undefined;
  creationtimestamp: Date | undefined;
  creationuser: string | undefined;

  id_publisher: number | undefined;
  id_developer: number | undefined;

  constructor(
    gamename: string,
    release_date: Date,
    creationuser: string,
    id_publisher: number,
    id_developer: number,
    publishment_date?: Date
  ) {
    this.gamename = gamename;
    this.release_date = release_date;
    this.creationuser = creationuser;
    this.id_publisher = id_publisher;
    this.id_developer = id_developer;
    this.publishment_date = publishment_date ?? new Date(); // Fecha por defecto
  }
}
