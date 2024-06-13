const getPublishers = 'SELECT * FROM pub_game_publisher';
const getPublisherById = 'SELECT * FROM pub_game_publisher WHERE id = $1';
const checkEmailExists = 'SELECT s FROM students s WHERE s.email = $1';
const addPublisher =
  'INSERT INTO pub_game_publisher (publishername, foundation_date, dissolution_date, status, creationtimestamp, creationuser, modificationtimestamp, modificationuser) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
const removePublisher = 'DELETE FROM pub_game_publisher WHERE id = $1';

export {
  getPublishers,
  getPublisherById,
  //checkEmailExists,
  addPublisher,
  removePublisher,
};
