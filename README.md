# create-fastify-api

Create type-safe Fastify applications with a single command. This package sets up a modern, production-ready Fastify project with TypeScript, TypeBox, and Swagger integration.

## Quick Start

```bash
npx create-fastify-api my-api
cd my-api
npm run dev
```

Visit `http://localhost:3000/docs` to see your API documentation.

## Features

✨ What you get out of the box:

- ⚡️ [Fastify](https://www.fastify.io/) - High-performance web framework
- 🔷 [TypeScript](https://www.typescriptlang.org/) - Type safety
- 📘 [TypeBox](https://github.com/sinclairzx81/typebox) - Runtime type validation
- 📚 [Swagger UI](https://swagger.io/tools/swagger-ui/) - API documentation
- ✅ Request/Response validation
- 🧪 Built-in testing setup
- 📝 OpenAPI generation

## Usage

### Create a New Project

```bash
# npm
npx create-fastify-api my-api

# yarn
yarn create fastify-api my-api

# pnpm
pnpm create fastify-api my-api
```

### Options

```bash
npx create-fastify-api [project-name] [options]

Options:
  --package-manager   Choose package manager (npm, yarn, pnpm)
  --git              Initialize git repository (default: true)
  --install          Install dependencies (default: true)
  -h, --help         Show help
  -v, --version      Show version
```

### Project Structure

The generated project follows a clean, maintainable structure:

```
my-api/
├── api/
│   ├── routes.ts          # API route handlers
│   ├── server.ts          # Fastify server configuration
│   ├── server-start.ts    # Server startup script
│   └── generateOpenApi.ts # OpenAPI documentation generator
├── types/
│   ├── ExampleRequest.ts  # Request type definitions
│   ├── ExampleResponse.ts # Response type definitions
│   └── ErrorResponse.ts   # Error response schemas
├── package.json
└── tsconfig.json
```

### Available Scripts

```bash
# Start development server
npm run dev

# Run tests
npm test

# Generate OpenAPI documentation
npm run generate-openapi

# Start production server
npm start
```

## Template

This package uses [fastify-template](https://github.com/kocgo/fastify-template) as the base template. Check out the template repository for more details about the implementation.

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

MIT

## Author

Gokhan KOC