const fastify = require('fastify')();
const cors = require('@fastify/cors');
require('./connection/config.js')
const swaggerObject = require("./swagger.js")

fastify.register(require('fastify-cookie'))
fastify.register(cors, {
  origin: "http://localhost:3000",
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 3600
})

fastify.register(require("@fastify/swagger"));
fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  uiConfig: {
      docExpansion: 'full',
      deepLinking: false
  },
  uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
})

fastify.register(require('./routes/user.js'))

fastify.listen(5000, (err) => {
  if (err) throw err
  fastify.swaggerObject;
  console.log(`server listening on ${fastify.server.address().port}`)
})