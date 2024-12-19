import { CategoriasController } from "../controllers/categorias/categorias.controller";
import { Categorias } from "../models/categorias/categorias.entity";
import { Response } from "express";
import { ICategoriasService } from "../services/interfaces/categorias/ICategoriasService";
import { container } from "../config/dependency-injection/inversify.config";

jest.mock('../../shared/Utils/Keys', () => ({
  secretKeyJWT: 'mocked-secret-key',
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

  beforeEach(() => {
    // Aseguramos que el MockCategoriasService se registre en el contenedor
    container.rebind<ICategoriasService>("ICategoriasService").to(MockCategoriasService);
    // Ahora obtenemos el controlador directamente desde el contenedor de Inversify
    categoriasController = container.get<CategoriasController>(CategoriasController);
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

    // Usamos el mock de Response
    const res = mockRes();
    const next = jest.fn();

    // Ejecutamos el método findOne del controlador con un ID de 1
    await categoriasController.findOne({ params: { id: "1" } } as any, res as Response, next);

    // Verificamos que `findOne` haya sido llamado con el ID correcto
    expect(res.json).toHaveBeenCalledWith(categoryMock);
  });

  it("Should return 404 if category not found", async () => {
    // Mock para que findOne devuelva undefined (categoría no encontrada)
    container.rebind<ICategoriasService>("ICategoriasService").to(MockCategoriasService);
    const res = mockRes();
    const next = jest.fn();

    // Ejecutamos el método findOne con un ID que no existe
    await categoriasController.findOne({ params: { id: "999" } } as any, res as Response, next);

    // Verificamos que `status` haya sido llamado con el código de error 404 (no encontrado)
    expect(res.status).toHaveBeenCalledWith(404);

    // Verificamos que se haya enviado un mensaje de error
    expect(res.json).toHaveBeenCalledWith({ message: "Category not found" });
  });
});
