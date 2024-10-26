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
      newJuego.initial_price,
      new Date(),
      newJuego.creationuser
    );

    // Guardar el precio en la base de datos
    await this.precioService.create(precio);

    return this.convertToDto(juegoCreado, newJuego.initial_price);
  }

  async update(id: number, juego: Partial<JuegoDto>): Promise<JuegoDto> {
    const existingJuego = await this.juegoRepository.findOne(id);
    if (!existingJuego) {
      throw new ValidationError('El juego indicado no existe', 404);
    }

    await this.juegoRepository.updateGameDetails(id, juego);

    const juegoActualizado = await this.juegoRepository.findOne(id);
    return this.convertToDto(juegoActualizado!);
  }

  async updateJuego(
    id: number,
    juegoDto: Partial<JuegoDto>
  ): Promise<JuegoDto> {
    const existingJuego = await this.juegoRepository.findOne(id);
    if (!existingJuego) {
      throw new ValidationError('El juego indicado no existe', 404);
    }

    // Si hay categorías en el DTO, recuperamos las entidades correspondientes
    let categorias: Categorias[] | undefined = undefined;
    if (juegoDto.categorias && juegoDto.categorias.length > 0) {
      categorias = await this.categoriaRepository.findByIds(
        juegoDto.categorias
      );
    }

    // Construimos un objeto parcial del tipo Juego
    const updatedJuego: Partial<Juego> = {
      ...juegoDto,
      categorias: categorias ? Promise.resolve(categorias) : undefined,
    };

    // Actualizamos el juego usando el DAO
    await this.juegoRepository.update(id, updatedJuego);

    // Recuperamos el juego actualizado
    const juegoActualizado = await this.juegoRepository.findOne(id);

    if (!juegoActualizado) {
      throw new ValidationError('Error al recuperar el juego actualizado', 500);
    }

    // Convertimos el juego actualizado a DTO para el retorno
    return await this.convertToDto(juegoActualizado);
  }

  async updatePrecio(idJuego: number, nuevoPrecio: number): Promise<Precio> {
    const precioActual = new Precio(
      idJuego,
      new Date(),
      nuevoPrecio,
      new Date(),
      'system-user'
    );
    return this.precioService.create(precioActual); // Guardamos el nuevo precio como un registro histórico
  }

  async delete(id: number): Promise<Juego | undefined> {
    return this.juegoRepository.delete(id);
  }

  // Agregar mas validaciones
  // const existingJuego = await this.juegoRepository.findByGameName(newJuego.gamename);
  // if (existingJuego) {
  //   throw new ValidationError('El juego ya existe', 400);
  // }
  private validacionField(newJuego: JuegoDto): void {
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

  private async convertToDto(
    juego: Juego,
    initial_price?: number
  ): Promise<JuegoDto> {
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
      initial_price,
    };
  }
}
