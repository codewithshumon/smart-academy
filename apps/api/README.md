# Smart Academy API Backend

Fastify-based REST API backend for Smart Academy.

## Features

- **Fastify 5.x** - High-performance web framework
- **TypeScript** - Type-safe development
- **Prisma 6.x** - Modern ORM for database management
- **JWT Authentication** - Secure token-based authentication
- **Swagger/OpenAPI** - Interactive API documentation
- **Rate Limiting** - Protect against abuse
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Pino Logging** - Structured logging
- **Redis** - Caching support
- **Zod** - Schema validation

## Installation

```bash
# Install dependencies
pnpm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
HOST=0.0.0.0
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/smart_academy?schema=public"

# Redis Configuration
REDIS_URL=redis://localhost:6379

# CORS Configuration
CORS_ORIGIN=*

# Logging
LOG_LEVEL=info
```

## Development

```bash
# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build TypeScript to JavaScript
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm format` - Format code with Prettier
- `pnpm prisma:generate` - Generate Prisma Client
- `pnpm prisma:migrate` - Run database migrations
- `pnpm prisma:studio` - Open Prisma Studio
- `pnpm prisma:seed` - Seed database

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:3000/docs
- **Health Check**: http://localhost:3000/health

## Project Structure

```
apps/api/
├── src/
│   ├── index.ts           # Entry point
│   ├── app.ts            # Fastify app configuration
│   └── routes/           # API routes
│       ├── index.ts       # Route loader
│       ├── auth/         # Authentication routes
│       ├── users/        # User management routes
│       ├── students/     # Student management routes
│       ├── teachers/     # Teacher management routes
│       ├── academic/     # Academic routes
│       └── admissions/   # Admissions routes
├── prisma/              # Database schema and migrations
├── dist/                # Compiled JavaScript (generated)
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## API Endpoints

### Health Check
- `GET /health` - Server health check

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh access token

### Users
- `GET /api/users` - List users (placeholder)

### Students
- `GET /api/students` - List students (placeholder)

### Teachers
- `GET /api/teachers` - List teachers (placeholder)

### Academic
- `GET /api/academic` - Academic data (placeholder)

### Admissions
- `GET /api/admissions` - Admissions data (placeholder)

## Technology Stack

- **Runtime**: Node.js 20+
- **Framework**: Fastify 5.x
- **Language**: TypeScript 5.x
- **ORM**: Prisma 6.x
- **Authentication**: JWT + bcrypt
- **Validation**: Zod
- **Logging**: Pino
- **Caching**: Redis (ioredis)
- **Testing**: Vitest
- **Package Manager**: pnpm

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

MIT
