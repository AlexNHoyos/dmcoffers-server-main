import { DataSource } from 'typeorm';
import { Container } from 'inversify';
import { DesarrolladoresService } from '../../services/desarrolladores/desarrolladores.service';
import { DesarrolladoresRepository } from '../../repositories/desarrolladores/desarrolladores.dao';
import { Desarrollador } from '../../models/desarrolladores/desarrolladores.entity';
import { Juego } from '../../models/juegos/juegos.entity';
import { ValidationError } from '../../middleware/errorHandler/validationError';

// Configuración de la base de datos en memoria
let dataSource: DataSource;
let container: Container;

beforeAll(async () => {
  // Inicializar base de datos en memoria
  dataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    entities: [Desarrollador, Juego],
    synchronize: true, // Crea las tablas automáticamente
  });
  await dataSource.initialize();

  // Configurar contenedor de Inversify
  container = new Container();
  container.bind(DesarrolladoresRepository).toConstantValue(new DesarrolladoresRepository());
  container.bind(DesarrolladoresService).to(DesarrolladoresService);
});

afterAll(async () => {
  await dataSource.destroy(); // Cierra la conexión
});

describe('DesarrolladoresService Integration Tests', () => {
  let service: DesarrolladoresService;

  beforeEach(async () => {
    // Limpiar la base de datos antes de cada test
    await dataSource.getRepository(Juego).clear();
    await dataSource.getRepository(Desarrollador).clear();
    service = container.get(DesarrolladoresService);
  });

  describe('create', () => {
    it('should create a new desarrollador and return it', async () => {
      const newDesarrollador = new Desarrollador(
        0, // ID se genera automáticamente
        'Estudio Rosario Ink',
        new Date('2020-01-01'),
        new Date('2023-01-01'),
        true,
        new Date(),
        'system',
        new Date(),
        'admin'
      );

      const result = await service.create(newDesarrollador);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.developername).toBe('Estudio Rosario Ink');
      expect(result.foundation_date).toEqual(new Date('2020-01-01'));
      expect(result.dissolution_date).toBeNull();
      expect(result.status).toBe(true);
      expect(result.creationuser).toBe('system');

      // Verificar en la base de datos
      const saved = await dataSource.getRepository(Desarrollador).findOneBy({ id: result.id });
      expect(saved).toBeDefined();
      expect(saved?.developername).toBe('Estudio Rosario Ink');
    });

    it('should create a desarrollador with associated juegos', async () => {
      const newDesarrollador = new Desarrollador(
        0,
        'Estudio Tatuajes Luna',
        new Date('2019-06-01'),
        new Date('2023-06-01'),
        true,
        new Date(),
        'system',
        new  Date(),
        'admin'
      );

      const juego = new Juego();
      juego.gamename = 'Tatuaje Tribal';
      juego.developer = newDesarrollador;

      newDesarrollador.juegos = [juego];

      const result = await service.create(newDesarrollador);

      expect(result.juegos).toBeDefined();
      expect(result.juegos).toHaveLength(1);
      expect((result.juegos ?? [])[0]?.gamename).toBe('Tatuaje Tribal');

      // Verificar relación en la base de datos
      const savedJuego = await dataSource.getRepository(Juego).findOne({
        where: { developer: { id: result.id } },
        relations: ['developer'],
      });
      expect(savedJuego).toBeDefined();
      expect(savedJuego?.gamename).toBe('Tatuaje Tribal');
      expect(savedJuego?.developer?.id).toBe(result.id);
    });
  });

  describe('findAll', () => {
    it('should return all desarrolladores', async () => {
      const dev1 = new Desarrollador(
        0,
        'Estudio Tinta Negra',
        new Date('2022-05-01'),
        new Date('2023-05-01'),
        true,
        new Date(),
        'system',
        new Date(),
        'admin',
      );

      const dev2 = new Desarrollador(
        0,
        'Estudio Tinta Negra',
        new Date('2022-05-01'),
        new Date('2023-05-01'),
        true,
        new Date(),
        'system',
        new Date(),
        'admin',
      );

      await dataSource.getRepository(Desarrollador).save([dev1, dev2]);

      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result.map(d => d.developername)).toContain('Estudio Arte Piel');
      expect(result.map(d => d.developername)).toContain('Estudio Tinta Negra');
    });

    it('should return an empty array if no desarrolladores exist', async () => {
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a desarrollador by id with associated juegos', async () => {
      const dev = new Desarrollador(
        0,
        'Estudio Dragón',
        new Date('2020-10-01'),
        new Date('2023-10-01'),
        true,
        new Date(),
        'system',
        new Date(),
        'admin'
      );

      const juego = new Juego();
      juego.gamename = 'Tatuaje Geométrico';
      juego.developer = dev;

      dev.juegos = [juego];

      const saved = await dataSource.getRepository(Desarrollador).save(dev);

      const result = await service.findOne(saved.id);

      expect(result).toBeDefined();
      expect(result?.developername).toBe('Estudio Dragón');
      expect(result?.juegos).toHaveLength(1);
      expect((result?.juegos ?? [])[0]?.gamename).toBe('Tatuaje Geométrico');
    });

    it('should return undefined if desarrollador does not exist', async () => {
      const result = await service.findOne(999);
      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update a desarrollador and set status to false if dissolution_date is in the past', async () => {
      const dev = new Desarrollador(
        0,
        'Estudio Estrella',
        new Date('2019-01-01'),
        new Date('2022-01-01'),
        true,
        new Date(),
        'system',
        new Date(),
        'admin'
      );

      const saved = await dataSource.getRepository(Desarrollador).save(dev);

      const updateData = new Desarrollador(
        saved.id,
        'Estudio Sol Actualizado',
        new Date('2018-01-01'),
        new Date('2023-01-01'), // Fecha pasada
        true,
        saved.creationtimestamp,
        saved.creationuser,
        new Date(),
        'admin'
      );

      const result = await service.update(saved.id, updateData);

      expect(result).toBeDefined();
      expect(result.developername).toBe('Estudio Sol Actualizado');
      expect(result.dissolution_date).toEqual(new Date('2023-01-01'));
      expect(result.status).toBe(false); // Cambia a false por dissolution_date
      expect(result.modificationuser).toBe('admin');

      // Verificar en la base de datos
      const updated = await dataSource.getRepository(Desarrollador).findOneBy({ id: saved.id });
      expect(updated?.status).toBe(false);
      expect(updated?.modificationuser).toBe('admin');
    });

    it('should throw an error if desarrollador does not exist', async () => {
      const updateData = new Desarrollador(
        999,
        'Estudio Estrella',
        new Date('2019-01-01'),
        new Date('2022-01-01'),
        true,
        new Date(),
        'system',
        new Date(),
        'admin'
      );

      await expect(service.update(999, updateData)).rejects.toThrow(ValidationError);
    });
  });

  describe('delete', () => {
    it('should delete a desarrollador and return it', async () => {
      const dev = new Desarrollador(
        0,
        'Estudio Estrella',
        new Date('2019-01-01'),
        new Date('2022-01-01'),
        true,
        new Date(),
        'system',
        new Date(),
        'admin'
      );

      const saved = await dataSource.getRepository(Desarrollador).save(dev);

      const result = await service.delete(saved.id);

      expect(result).toBeDefined();
      expect(result?.developername).toBe('Estudio Estrella');

      // Verificar que se eliminó
      const deleted = await dataSource.getRepository(Desarrollador).findOneBy({ id: saved.id });
      expect(deleted).toBeNull();
    });

    it('should return undefined if desarrollador does not exist', async () => {
      const result = await service.delete(999);
      expect(result).toBeUndefined();
    });
  });
});