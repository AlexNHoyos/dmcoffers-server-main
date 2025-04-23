import { DesarrolladoresService } from "/../services/desarrolladores/desarrolladores.service";
import "reflect-metadata";

//Simulo el repositorio
const mockDesarrolladoresRepository = {
    findOne : jest.fn(),
};

//Datos simulados
const mockDesarrolladores = [
    {id: 1},
    {id: 2}
]

//Instancia el servicio con el repositorio simulado
const dessarolladoresService = new DesarrolladoresService(mockDesarrolladoresRepository as any);

describe('DesarrolladoresService', () => {
    
})