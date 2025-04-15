import { CategoriasService } from "../../services/categorias/categorias.service.js";
import { ValidationError } from "../../middleware/errorHandler/validationError.js";
import "reflect-metadata";
import { beforeEach } from "node:test";

describe('CategoriasService',() => {

    beforeEach(() =>{

    });

    describe('findAll', () =>{

        it('Debería devolver todas las categorias', () =>{
            const categorias = ;
            const result = ;
        });

        it('Debería devolver undefined error si no encuentra las categorias', () =>{

        });
    })
});
