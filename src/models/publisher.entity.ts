// Definimos la clase Publisher para representar la entidad de un publicador
export class Publisher {
  // Constructor de la clase Publisher
  constructor(
    // Propiedades de la entidad Publisher
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
    // Inicializamos las propiedades de la clase con los valores proporcionados en el constructor
    this.id = id;
    this.publishername = publishername;
    this.foundation_date = foundation_date;
    this.dissolution_date = dissolution_date;
    this.status = status;
    this.creationtimestamp = creationtimestamp;
    this.creationuser = creationuser;
    this.modificationtimestamp = modificationtimestamp;
    this.modificationuser = modificationuser;
  }
}
