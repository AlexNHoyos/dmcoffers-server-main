// src/tests/unit-test/findAllCategories.test.ts

import { CategoriasService } from "../../services/categorias/categorias.service.js";
import "reflect-metadata";

// Simula el repositorio
const mockCategoriasRepository = {
  findAll: jest.fn(), // Mock del método findAll
};

// Datos simulados
const mockCategorias = [
  { id: 1, nombre: 'Categoría 1' },
  { id: 2, nombre: 'Categoría 2' },
];

// Instancia el servicio con el repositorio simulado
const categoriasService = new CategoriasService(mockCategoriasRepository as any);

describe('CategoriasService - findAll', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  it('Debería devolver todas las categorías', async () => {
    // Configura el mock para devolver las categorías simuladas
    mockCategoriasRepository.findAll.mockResolvedValue(mockCategorias);
    
    // Ejecuta el método findAll
    const result = await categoriasService.findAll();
    
    // Verifica los resultados
    expect(result).toEqual(mockCategorias);
    expect(mockCategoriasRepository.findAll).toHaveBeenCalled();
  });

  it('Debería devolver un array vacío si no hay categorías', async () => {
    // Configura el mock para devolver un array vacío
    mockCategoriasRepository.findAll.mockResolvedValue([]);
    
    // Ejecuta el método findAll
    const result = await categoriasService.findAll();
    
    // Verifica los resultados
    expect(result).toEqual([]);
    expect(mockCategoriasRepository.findAll).toHaveBeenCalled();
  });
});