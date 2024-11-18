import fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

export async function buildServer() {
  const server = fastify({
    logger: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  await server.register(swagger, {
    openapi: {
      info: {
        title: "Fastify Template API",
        description: "API documentation using Swagger",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
  });

  await server.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
  });

  // Register routes
  await server.register(import("./routes"));

  return server;
}

export type FastifyServer = Awaited<ReturnType<typeof buildServer>>;
