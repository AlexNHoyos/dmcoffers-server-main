import request from 'supertest';
import app from '../app';
import { container } from '../config/dependency-injection/inversify.config';
import { CategoriasController } from '../controllers/categorias/categorias.controller';

//mock de categorias 
jest.mock('../../services/categorias/categorias.service.js');

describe("findAll categorias", ()=> {

    const categoriasServiceMock = container.get(CategoriasController);

    beforeEach(() => {
        // Limpiar mocks antes de cada prueba
        jest.clearAllMocks();
      });

    it("Should return array with categories", async()=>{
       const mockCategorias = [{id: 1, name: 'Categoria 1'}, { id: 2, name: 'Categoria 2' }] 
       categoriasServiceMock.findAll = jest.fn().mockResolvedValue(mockCategorias);
        
       const response = await request(app).get('/api/categories')
       expect(response.status).toBe(200);
       expect(response.body).toEqual(mockCategorias);
    })

    it("Should return 404 not found", async()=>{
        categoriasServiceMock.remove = jest.fn().mockResolvedValue(null);
        const response = await request(app).get('/api/categories/999');
        expect(response).toBe(404);
        expect(response.body.message).toBe('Categorias no encontradas');
    })
})

describe("findOne categorie", ()=>{
    const categoriasServiceMock = container.get(CategoriasController);

    beforeEach(()=> {
        jest.clearAllMocks();
    })

    it("Should return one category by id", async()=>{
        const id = 1;
        const mockCategoria = {id, name:''};
        categoriasServiceMock.findOne = jest.fn().mockResolvedValue(mockCategoria);

        const response = await request(app).get('/api/categories');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCategoria)
    })

    it(("Should return 404 not found"), async()=>{
        categoriasServiceMock.remove = jest.fn().mockResolvedValue(null);
        const response = await request(app).get('/api/categories/999');

        expect(response).toBe(400);
        expect(response.body.message).toEqual('Categoria no encontrada');
    })
})