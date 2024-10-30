// user.service.ts
import { JuegoRepository } from '../../repositories/juego/juego.dao.js';
import { Juego } from '../../models/juegos/juegos.entity.js';
import { JuegoDto } from '../../models-dto/juegos/juego-dto.entity.js';
import { IJuegoService } from '../interfaces/juego/IJuegoService.js';
import { ValidationError } from '../../middleware/errorHandler/validationError.js';
import { CategoriasRepository } from '../../repositories/categorias/categorias.dao.js';
import { inject, injectable } from 'inversify';
import { PublisherService } from '../publisher/publisher.service.js';
import { DesarrolladoresService } from '../desarrolladores/desarrolladores.service.js';
import { PrecioService } from './precios.service.js';
import { Precio } from '../../models/juegos/precios.entity.js';
import { Categorias } from '../../models/categorias/categorias.entity.js';

@injectable()
export class JuegoService implements IJuegoService {
  private juegoRepository: JuegoRepository;
  private categoriaRepository: CategoriasRepository;
  private publisherService: PublisherService;
  private desarrolladoresService: DesarrolladoresService;
  private precioService: PrecioService;

  constructor(
    @inject(JuegoRepository) juegoRepository: JuegoRepository,
    @inject(CategoriasRepository) categoriaRepository: CategoriasRepository,
    @inject(PublisherService) publisherService: PublisherService,
    @inject(DesarrolladoresService)
    desarrolladorService: DesarrolladoresService,
    @inject(PrecioService) precioService: PrecioService
  ) {
    this.juegoRepository = juegoRepository;
    this.categoriaRepository = categoriaRepository;
    this.publisherService = publisherService;
    this.desarrolladoresService = desarrolladorService;
    this.precioService = precioService;
  }

  async findAll(): Promise<Juego[]> {
    return this.juegoRepository.findAll();
  }

  async findOne(id: number): Promise<Juego | undefined> {
    return this.juegoRepository.findOne(id);
  }

  async create(newJuego: JuegoDto): Promise<JuegoDto> {
    this.validacionField(newJuego);

    const [publisher, developer, categorias] = await Promise.all([
      this.publisherService.findOne(newJuego.id_publisher!),
      this.desarrolladoresService.findOne(newJuego.id_developer!),
      this.categoriaRepository.findByIds(newJuego.categorias || []),
    ]);

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
    juegoToCreate.categorias = Promise.resolve(categorias);

    // Guardar el juego en la base de datos
    const juegoCreado = await this.juegoRepository.create(juegoToCreate);

    const precio = new Precio(
      juegoCreado.id!,
      new Date(),
      newJuego.price,
      new Date(),
      newJuego.creationuser
    );

    // Guardar el precio en la base de datos
    await this.precioService.create(precio);

    return this.convertToDto(juegoCreado, newJuego.price);
  }

  async update(id: number, juegoDto: Partial<JuegoDto>): Promise<JuegoDto> {
    // Recuperar el juego existente con ese id, y sus relaciones
    const existingJuego = await this.juegoRepository.findOne({
      where: { id },
      relations: ['categorias', 'publisher', 'developer', 'precios'],
    });

    if (!existingJuego) {
      throw new ValidationError('El juego no existe', 404);
    }

    // Actualizar propiedades solo si están presentes en el DTO
    existingJuego.gamename = juegoDto.gamename ?? existingJuego.gamename;
    existingJuego.release_date =
      juegoDto.release_date ?? existingJuego.release_date;
    existingJuego.publishment_date =
      juegoDto.publishment_date ?? existingJuego.publishment_date;
    existingJuego.modificationtimestamp = new Date();
    existingJuego.modificationuser = juegoDto.creationuser;

    // Si id_publisher o id_developer cambian, obtener los nuevos y asignarlos
    if (
      juegoDto.id_publisher &&
      juegoDto.id_publisher !== existingJuego.publisher?.id
    ) {
      existingJuego.publisher = await this.publisherService.findOne(
        juegoDto.id_publisher
      );
    }
    if (
      juegoDto.id_developer &&
      juegoDto.id_developer !== existingJuego.developer?.id
    ) {
      existingJuego.developer = await this.desarrolladoresService.findOne(
        juegoDto.id_developer
      );
    }

    // Actualización de categorías (N:M)
    if (juegoDto.categorias && Array.isArray(juegoDto.categorias)) {
      const nuevasCategorias = await this.categoriaRepository.findByIds(
        juegoDto.categorias
      );

      existingJuego.categorias = Promise.resolve(nuevasCategorias);
    }

    // Registrar nuevo precio solo si el precio cambia
    if (juegoDto.price) {
      const precio = new Precio(
        existingJuego.id!,
        new Date(),
        juegoDto.price,
        new Date(),
        existingJuego.creationuser
      );
      await this.precioService.create(precio);
    }

    // Guardar el juego actualizado
    await this.juegoRepository.update(id, existingJuego);

    // Retornar el DTO actualizado
    return this.convertToDto(existingJuego, juegoDto.price);
  }

  async delete(id: number): Promise<Juego | undefined> {
    return this.juegoRepository.delete(id);
  }

  // Agregar mas validaciones
  // const existingJuego = await this.juegoRepository.findByGameName(newJuego.gamename);
  // if (existingJuego) {
  //   throw new ValidationError('El juego ya existe', 400);
  // }
  private validacionField(newJuego: Partial<JuegoDto>): void {
    // Validar que al menos uno de los campos obligatorios esté presente
    if (
      !newJuego ||
      (!newJuego.gamename &&
        !newJuego.id_publisher &&
        !newJuego.id_developer &&
        !newJuego.categorias)
    ) {
      throw new ValidationError(
        'Se deben proporcionar al menos un nombre, publisher, developer o categoría para la actualización',
        400
      );
    }

    if (!newJuego || !newJuego.gamename) {
      throw new ValidationError('El juego debe tener un nombre', 404);
    }
    if (newJuego.id_publisher === undefined) {
      throw new ValidationError(
        'El juego debe tener un publisher asociado',
        400
      );
    }
    if (newJuego.id_developer === undefined) {
      throw new ValidationError(
        'El juego debe tener un developer asociado',
        400
      );
    }
    if (!newJuego.categorias || newJuego.categorias.length === 0) {
      throw new ValidationError(
        'Debe proporcionar al menos una categoría',
        400
      );
    }
  }

  private async convertToDto(juego: Juego, price?: number): Promise<JuegoDto> {
    return {
      id: juego.id,
      gamename: juego.gamename,
      release_date: juego.release_date,
      publishment_date: juego.publishment_date,
      creationuser: juego.creationuser,
      creationtimestamp: juego.creationtimestamp,
      id_publisher: juego.publisher?.id,
      id_developer: juego.developer?.id,
      categorias: juego.categorias
        ? (await juego.categorias).map((c) => c.id)
        : [],
      price,
    };
  }
}
