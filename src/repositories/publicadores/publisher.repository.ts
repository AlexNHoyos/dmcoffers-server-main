// Importamos la interfaz Repository desde nuestro módulo compartido
import { Repository } from '../../shared/repository.js';

// Importamos la entidad Publisher que representa a nuestros publicadores
import { Publisher } from '../../models/publicadores/publisher.entity.js';
// Creamos una lista de publicadores de ejemplo para simular una base de datos (SIN PERSISTENCIA)
const publishers = [
  new Publisher(
    '1',
    'Ubisoft',
    new Date(),
    new Date(),
    true,
    new Date(),
    'Ramiro',
    new Date(),
    'Mauro'
  ),
];

// Definimos la clase PublisherRepository e implementamos la interfaz Repository<Publisher>
export class PublisherRepository implements Repository<Publisher> {
  public findAll(): Publisher[] | undefined {
    return publishers;
  }
  public findOne(pub: { id: string }): Publisher | undefined {
    return publishers.find((publisher) => publisher.id === pub.id);
  }
  public add(pub: Publisher): Publisher | undefined {
    publishers.push(pub);
    return pub;
  }
  public update(pub: Publisher): Publisher | undefined {
    const publisherIdx = publishers.findIndex(
      (publisher) => publisher.id === pub.id
    );

    if (publisherIdx !== -1) {
      // Actualizamos los datos del publicador en la lista
      publishers[publisherIdx] = { ...publishers[publisherIdx], ...pub };
    }
    return publishers[publisherIdx];
  }
  public delete(pub: { id: string }): Publisher | undefined {
    const publisherIdx = publishers.findIndex(
      (publisher) => publisher.id === pub.id
    );

    if (publisherIdx !== -1) {
      // Eliminamos el publicador de la lista y lo devolvemos como resultado
      const deletedPublishers = publishers[publisherIdx];
      publishers.splice(publisherIdx, 1);
      return deletedPublishers;
    }
  }
}
