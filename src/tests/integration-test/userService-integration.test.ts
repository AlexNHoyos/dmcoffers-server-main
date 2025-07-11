import { UserService } from '../../services/user/user.service.js';
import request from 'supertest';
import app from '../../app.js';

import { AuthCryptography } from '../../middleware/auth/authCryptography.js';
import { User } from '../../models/usuarios/user.entity.js';
import { UserAuth } from '../../models/usuarios/user-auth.entity.js';

import { AppDataSource } from '../../config/pg-database/db.js';
import { UserRolApl } from '../../models/usuarios/user-rol-apl.entity.js';
import { RolApl } from '../../models/roles/rol-apl.entity.js';
import { id } from 'inversify';
import { response } from 'express';



//Simulo AuthCryptography como un mock
const cryptoService = new AuthCryptography();
const encryptedPassword = cryptoService.encrypt('TestPasswrd123');


describe('User Service - Integration Tests', () => {
  let rol: RolApl; // Declare rol in the outer scope
  beforeAll(async() => {
    if(!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    console.log("DB seeding...");
    await AppDataSource.getRepository(UserRolApl).delete({}); // Limpiar la tabla de usuarios antes de las pruebas
    await AppDataSource.getRepository(UserAuth).delete({}); // Limpiar la tabla de usuarios antes de las pruebas
    await AppDataSource.getRepository(User).delete({});
    await AppDataSource.getRepository(RolApl).delete({});

    await AppDataSource.getRepository(User).delete({ username: 'testUser' }); // Limpiar la tabla de usuarios antes de las pruebas

    rol = await AppDataSource.getRepository(RolApl).save({
      description: 'Usuario',
      creationuser: 'admin',
      creationtimestamp: new Date(),
      status: true,
      delete_date: undefined,
    })
    console.log("Rol insertado:", rol);

    const roles = await AppDataSource.getRepository(RolApl).find();
    console.log("Roles despues del seed:", roles);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('Debería registrar un usuario correctamente', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        id: rol.id ,
        username: 'testUser',
        realname: 'Test',
        surname: 'User',
        birth_date: '1990-01-01',
        creationuser: 'admin',
        creationtimestamp: new Date(),
        password: encryptedPassword,
        status: true,
      });
      console.log("ID:", rol.id);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('idUser');
    expect(response.body.username).toBe('testUser');
  });

  it('Debería devolver todos los usuarios', async () =>  {
    const response = await request(app).get('/api/users/findAll');
      console.log(response.body);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
  })
});
