import { Repository } from '../shared/repository.js';
import { Publisher } from '../models/publisher.entity.js';

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

export class PublisherRepository implements Repository<Publisher> {
  public findAll(): Publisher[] | undefined {
    return publishers;
  }

  public findOne(item: { id: string }): Publisher | undefined {
    return publishers.find((publisher) => publisher.id === item.id);
  }

  public add(item: Publisher): Publisher | undefined {
    publishers.push(item);
    return item;
  }

  public update(item: Publisher): Publisher | undefined {
    const publisherIdx = publishers.findIndex(
      (publisher) => publisher.id === item.id
    );

    if (publisherIdx !== -1) {
      publishers[publisherIdx] = { ...publishers[publisherIdx], ...item };
    }
    return publishers[publisherIdx];
  }

  public delete(item: { id: string }): Publisher | undefined {
    const publisherIdx = publishers.findIndex(
      (publisher) => publisher.id === item.id
    );

    if (publisherIdx !== -1) {
      const deletedPublishers = publishers[publisherIdx];
      publishers.splice(publisherIdx, 1);
      return deletedPublishers;
    }
  }
}
