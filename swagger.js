import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';
const PORT = process.env.PORT || 6000;
const __dirname = path.resolve();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Loan',
      version: '1.0.0',
      description: 'API Docs For Book Loan Apps',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: [path.join(__dirname, './src/routers/*.js')],
};

const specs = swaggerJsDoc(options);

export {swaggerUi, specs}