// user.service.ts
import { JuegoRepository } from '../../repositories/juego/juego.dao.js';
import { Juego } from '../../models/juegos/juegos.entity.js';
import { JuegoDto } from '../../models-dto/juegos/juego-dto.entity.js';
import { IJuegoService } from '../interfaces/juego/IJuegoService.js';
import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import { CategoriasRepository } from '../../repositories/categorias/categorias.dao.js';

export class JuegoService implements IJuegoService {
  private juegoRepository: JuegoRepository;
  private categoriaRepository: CategoriasRepository;

  constructor() {
    this.juegoRepository = new JuegoRepository();
    this.categoriaRepository = new CategoriasRepository();
  }

  async findAll(): Promise<Juego[]> {
    return this.juegoRepository.findAll();
  }

  async findOne(id: number): Promise<Juego | undefined> {
    return this.juegoRepository.findOne(id);
  }

  async create(newJuego: JuegoDto): Promise<JuegoDto> {
    if (!newJuego || !newJuego.gamename) {
      throw new ValidationError('El juego debe tener un nombre', 404);
    }

    const publisher = await this.juegoRepository.findPublisherById(
      newJuego.id_publisher
    );
    if (!publisher) {
      throw new ValidationError(
        `Publisher con ID ${newJuego.id_publisher} no encontrado`,
        404
      );
    }

    const developer = await this.juegoRepository.findDeveloperById(
      newJuego.id_developer
    );
    if (!developer) {
      throw new ValidationError(
        `Developer con ID ${newJuego.id_developer} no encontrado`,
        404
      );
    }

    const categorias = await this.categoriaRepository.findByIds(
      newJuego.categorias || []
    );

    if (!newJuego.categorias || newJuego.categorias.length === 0) {
      throw new ValidationError(
        'Debe proporcionar al menos una categoría',
        400
      );
    }
    if (!categorias || categorias.length === 0) {
      throw new ValidationError(
        'No se encontraron categorías válidas para asociar',
        400
      );
    }

    // Agregar mas validaciones
    // const existingJuego = await this.juegoRepository.findByGameName(newJuego.gamename);
    // if (existingJuego) {
    //   throw new ValidationError('El juego ya existe', 400);
    // }

    // Crear la entidad del juego a partir del DTO
    const juegoToCreate = new Juego(
      undefined, // id será generado automáticamente por TypeORM
      newJuego.gamename,
      newJuego.release_date,
      newJuego.publishment_date || new Date(),
      new Date(), // creationtimestamp
      newJuego.creationuser,
      undefined, // modificationtimestamp
      undefined // modificationuser
    );

    // Asociar el publisher y developer
    juegoToCreate.publisher = publisher;
    juegoToCreate.developer = developer;
    juegoToCreate.categorias = categorias;

    // Guardar el juego en la base de datos
    const juegoCreado = await this.juegoRepository.create(juegoToCreate);

    // Convertir a DTO para el retorno
    const juegoOutput: JuegoDto = {
      id: juegoCreado.id,
      gamename: juegoCreado.gamename,
      release_date: juegoCreado.release_date,
      publishment_date: juegoCreado.publishment_date,
      creationuser: juegoCreado.creationuser,
      creationtimestamp: juegoCreado.creationtimestamp,
      id_publisher: juegoCreado.publisher?.id,
      id_developer: juegoCreado.developer?.id,
      categorias: juegoCreado.categorias
        ? juegoCreado.categorias.map((c) => c.id)
        : [],
    };

    return juegoOutput;
  }

  async update(id: number, juego: Juego): Promise<Juego> {
    return this.juegoRepository.update(id, juego);
  }

  async delete(id: number): Promise<Juego | undefined> {
    return this.juegoRepository.delete(id);
  }
}
