// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Property API',
            version: '1.0.0',
            description: 'API for managing property requests',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/route/propertyRoutes.js','./src/route/userRoutes.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
