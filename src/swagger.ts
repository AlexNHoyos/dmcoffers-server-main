import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from 'url';

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options: swaggerJSDoc.Options = {
    definition: {
      openapi: '3.0.1',
      info: {
        title: 'Api Desarrollo de Sofware UTN',
        version: '1.0.0',
        description: `Esta es la API para el proyecto de Desarrollo de Software UTN.\n\n**[Ver JSON de Swagger](http://localhost:3000/swagger.json)**`,
      },
      components: {
        securitySchemes: {
          apiAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT', 
          },
        },
      },
      security: [
        {
          apiAuth: [], 
        },
      ],
    },
    apis: [`${path.join(__dirname, './routes/**/*.routes.js')}`],
  };

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;