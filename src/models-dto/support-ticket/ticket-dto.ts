export class ticketDto{
    id: number | undefined;
    status: boolean | undefined;
    creationuser: string | undefined;
    creationtimestamp: Date | undefined;
    modificationuser: string | undefined;
    modificationtimestamp: Date | undefined;
    description: string | undefined;


    constructor(
        id: number,
        description: string,
        email: string,
    ){
        this.id = id,
        this.description = description
    }
}