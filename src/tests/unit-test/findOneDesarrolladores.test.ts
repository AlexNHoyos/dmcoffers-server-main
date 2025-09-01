import { DesarrolladoresService } from '../../services/desarrolladores/desarrolladores.service';
import "reflect-metadata";

//Simulo el repositorio
const mockDesarrolladoresRepository = {
    findOne : jest.fn(),
};

//Datos simulados
const mockDesarrollador = {
    id : 1,
    name : 'Test developer',
    status : true,
    creation_date: new Date()
};


//Instancia el servicio con el repositorio simulado
const desarolladoresService = new DesarrolladoresService(mockDesarrolladoresRepository as any);

describe('DesarrolladoresService - findOne', () => {
    beforeEach(() =>{
        jest.clearAllMocks();
        mockDesarrolladoresRepository.findOne.mockReset();
    });
    it('Debería devolver algun desarrollador existente con ese id', async() => {
        mockDesarrolladoresRepository.findOne.mockResolvedValue(mockDesarrollador);

        const result = await mockDesarrolladoresRepository.findOne(1);

        expect(result).toEqual(mockDesarrollador);
        expect(mockDesarrolladoresRepository.findOne).toHaveBeenCalledWith(1);
    });
    it('Debería devolver undefined si no encuentra desarrollador', async() => {
        mockDesarrolladoresRepository.findOne.mockResolvedValue(undefined);

        const result = await mockDesarrolladoresRepository.findOne(999);

        expect(result).toBeUndefined();
        expect(mockDesarrolladoresRepository.findOne).toHaveBeenCalledWith(999);
    });
})