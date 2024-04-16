import express from 'express';
import { publisherRouter } from './routes/publisher.routes.js';

const app = express();
app.use(express.json());

app.use('/api/publishers', publisherRouter);

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' });
});

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/');
});
/*
//para correr esto hay que hacer npm run start:dev en terminal

import express, { NextFunction, Request, Response } from 'express';
import { Character } from './character/characters.entity.js';
import { CharacterRepository } from './character/character.repository.js';
import { characterRouter } from './character/character.routes.js';
const app = express();
app.use(express.json()); //middleware (callback o handler)
//get --> obtener info sobre recursos
//post --> crear nuevos recursos
//delete --> borrar recursos
//put & patch --> modificar recursos

//get /api/characters/ --> obtener la lista de characters
//get /api/characters/:id --> obtener la lista de characters con id = :id
//post /api/characters/ --> crear nuevos character
//delete /api/characters/:id --> borrar characters con id = :id
//put & patch /api/characters/:id --> modificar los character con id = :id

//character --> /api/characters/

app.use('/api/character', characterRouter);

//get all
app.get('/api/characters', (req, res) => {
  res.json({ data: repository.findAll() });
});
//get one
app.get('/api/characters/:id', (req, res) => {
  const id = req.params.id;
  const character = repository.findOne({ id });
  if (!character) {
    return res.status(404).send({ message: 'Character Not Found' });
  }
  res.json({ data: character });
});

app.post('/api/characters', sanitizeCharacterInput, (req, res) => {
  const input = req.body.sanitizedInput;

  const characterInput = new Character(
    input.name,
    input.characterClass,
    input.level,
    input.hp,
    input.mana,
    input.attack,
    input.items
  );

  const character = repository.add(characterInput);
  return res
    .status(201)
    .send({ message: 'Character created', data: character });
});

app.put('/api/characters/:id', sanitizeCharacterInput, (req, res) => {
  req.body.sanitizedInput.id = req.params.id;
  const character = repository.update(req.body.sanitizedInput);

  if (!character) {
    return res.status(404).send({ message: 'Character Not Found' });
  }

  return res.status(200).send({
    message: 'Character updated successfully',
    data: character,
  });
});

app.patch('/api/characters/:id', sanitizeCharacterInput, (req, res) => {
  req.body.sanitizedInput.id = req.params.id;
  const character = repository.update(req.body.sanitizedInput);

  if (!character) {
    return res.status(404).send({ message: 'Character Not Found' });
  }

  return res.status(200).send({
    message: 'Character updated successfully',
    data: character,
  });
});

app.delete('/api/characters/:id', (req, res) => {
  const id = req.params.id;
  const character = repository.delete({ id });

  if (!character) {
    res.status(404).send({ message: 'Character Not Found' });
  } else {
    res.status(200).send({ message: 'Character deleted successfully' });
  }
});

app.use((req, res) => res.status(404).send({ message: 'Resource not found' }));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
*/
