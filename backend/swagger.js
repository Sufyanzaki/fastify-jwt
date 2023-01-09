const swaggerObject = {
    exposeRoute: true,
    routesPrefix: "/docs",
    swagger: {
        info: {
            title: "jwt-fastify-auth",
            description: "API development",
            version: "1.0.0"
        },
        externalDocs: {
            url: "https://swagger.io",
            description: "Find more info here"
        },
        host: "localhost",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
    }
};

module.exports = swaggerObject;

