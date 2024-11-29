module.exports = {
  preset: 'ts-jest', // Usa ts-jest para transpilar archivos .ts
  testEnvironment: 'node', // Usamos un entorno de pruebas adecuado para Node.js
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transforma archivos .ts
    '^.+\\.js$': 'babel-jest', // También se pueden transformar archivos .js si usas ECMAScript modules
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Asegúrate de que se reconozcan las extensiones de los archivos
  transformIgnorePatterns: ['/node_modules/'], // Para evitar que Jest intente transformar node_modules
};
