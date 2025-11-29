const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SmartCity Lab API',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'https://smart-city-api-hro6.onrender.com',
                description: 'Server Render',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
module.exports = swaggerDocs;