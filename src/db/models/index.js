const { Person, PersonSchema } = require('./persons.model.js');
function setupModels() {
  Person.init(PersonSchema, Person.config(sequelize));
}

module.exports = setupModels;
