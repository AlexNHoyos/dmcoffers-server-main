import { CategoriasController } from "../controllers/categorias/categorias.controller";
import { Categorias } from "../models/categorias/categorias.entity";
import { Response } from "express"; 
// Importamos Response de Express
import { ICategoriasService } from "../services/interfaces/categorias/ICategoriasService";

jest.mock('../middleware/auth/authToken', () => ({
    authenticateToken: jest.fn(),
  }));
// Mock del servicio CategoriasService
class MockCategoriasService implements ICategoriasService {
  findAll(): Promise<Categorias[]> {
    throw new Error("Method not implemented.");
  }

  findOne(id: number): Promise<Categorias | undefined> {
    return Promise.resolve(new Categorias(id, "Categoria Mock", new Date(), "user", new Date(), "user"));
  }

  create(entity: Categorias): Promise<Categorias> {
    throw new Error("Method not implemented.");
  }

  update(id: number, entity: Partial<Categorias>): Promise<Categorias> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Promise<Categorias | undefined> {
    throw new Error("Method not implemented.");
  }
}

// Mock del Response de Express
const mockRes = (): Partial<Response> => {
  return {
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    sendStatus: jest.fn().mockReturnThis(),
  };
};

describe("CategoriasController", () => {
  let categoriasController: CategoriasController;
  let mockCategoriaService: MockCategoriasService;

  beforeEach(() => {
    mockCategoriaService = new MockCategoriasService();
    categoriasController = new CategoriasController(mockCategoriaService);
  });

  it("Should return a category by ID", async () => {
    const categoryMock = new Categorias(
      1,
      "Categoria Mock",
      new Date(),
      "user1",
      new Date(),
      "user1"
    );

    // Mock para que findOne devuelva la categoría mockeada
    mockCategoriaService.findOne = jest.fn().mockResolvedValue(categoryMock);

    const res = mockRes(); // Usamos el mock de Response
    const next = jest.fn(); // Mock de la función next

    // Ejecutamos el método findOne del controlador con un ID de 1
    await categoriasController.findOne({ params: { id: "1" } } as any, res as Response, next);

    // Verificamos que `findOne` haya sido llamado con el ID correcto
    expect(mockCategoriaService.findOne).toHaveBeenCalledWith(1);

    // Verificamos que `json` haya sido llamado con el objeto de categoría correcto
    expect(res.json).toHaveBeenCalledWith(categoryMock);
  });

  it("Should return 404 if category not found", async () => {
    // Mock para que findOne devuelva undefined (categoría no encontrada)
    mockCategoriaService.findOne = jest.fn().mockResolvedValue(undefined);

    const res = mockRes(); // Usamos el mock de Response
    const next = jest.fn();  // Mock de la función next

    // Ejecutamos el método findOne con un ID que no existe
    await categoriasController.findOne({ params: { id: "999" } } as any, res as Response, next);

    // Verificamos que `findOne` haya sido llamado con el ID correcto
    expect(mockCategoriaService.findOne).toHaveBeenCalledWith(999);

    // Verificamos que `status` haya sido llamado con el código de error 404 (no encontrado)
    expect(res.status).toHaveBeenCalledWith(404);

    // Verificamos que se haya enviado un mensaje de error
    expect(res.json).toHaveBeenCalledWith({ message: "Category not found" });
  });
});
