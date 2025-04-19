import { CategoriasService } from "../../services/categorias/categorias.service.js";
import { ValidationError } from "../../middleware/errorHandler/validationError.js";
import "reflect-metadata";
import { beforeEach } from "node:test";
import { CategoriasRepository } from "../../repositories/categorias/categorias.dao.js";
import { Categorias } from "../../models/categorias/categorias.entity.js";

jest.mock("E:\Users\nico_\OneDrive\Escritorio\Desarrollo\dmcoffers-server-main\src\repositories\categorias\categorias.dao.ts");

describe('CategoriasService',() => {
let categoriasService : CategoriasService;
let categoriasRepositoryMock : jest.Mocked<CategoriasRepository>;
    beforeEach(() =>{
        categoriasRepositoryMock = new CategoriasRepository() as jest.Mocked<CategoriasRepository>;
        categoriasService = new CategoriasService(categoriasRepositoryMock);
    });

    describe('findAll', () =>{

        it('Debería devolver todas las categorias', async () =>{
            const mockCategorias: Categorias[] = [
                {
                    id: 1,
                    description: 'Hola',
                    creationtimestamp: new Date('2023-01-01T00:00:00Z'),
                    creationuser: 'Ferg',
                    modificationtimestamp: new Date('2023-04-25T13:00:00Z'),
                    modificationuser: 'Cou',
                    juego: [],
                  },
                  {
                    id: 2,
                    description: 'Categoría 2',
                    creationtimestamp: new Date('2023-01-02T00:00:00Z'),
                    creationuser: 'Admin',
                    modificationtimestamp: new Date('2023-04-26T15:30:00Z'),
                    modificationuser: 'Admin',
                    juego: [],
                  },
              ];
        
              categoriasRepositoryMock.findAll.mockResolvedValue(mockCategorias);
        
              const result = await categoriasService.findAll();
              expect(result).toEqual(mockCategorias);
              expect(categoriasRepositoryMock.findAll).toHaveBeenCalled();
        });

        it('Debería devolver undefined error si no encuentra las categorias', async() =>{
            categoriasRepositoryMock.findAll.mockResolvedValue([]);
            const result = await categoriasService.findAll();
            expect(result).toEqual([]);
            expect(categoriasRepositoryMock.findAll).toHaveBeenCalled();
        });
    })
});
