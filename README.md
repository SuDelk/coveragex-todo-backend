# CoverageX Todo Backend

A robust and scalable backend API for a Todo application built with NestJS, PostgreSQL, and Prisma ORM. This application provides a RESTful API for managing tasks with full CRUD operations.

## Project Description

This is a backend service for a task management (Todo) application. It provides endpoints for creating, reading, updating, and deleting tasks. The application is built using modern TypeScript technologies with a focus on type safety, scalability, and maintainability.

## Features

- ✅ Create new tasks with title and optional description
- ✅ Retrieve all tasks or recent pending tasks
- ✅ Mark tasks as completed or pending
- ✅ Delete tasks
- ✅ Input validation using class-validator
- ✅ CORS enabled for cross-origin requests
- ✅ Type-safe database operations with Prisma
- ✅ Comprehensive test coverage
- ✅ Docker support for containerized deployment

## Tech Stack

### Core Technologies
- **Node.js** (v20+) - JavaScript runtime
- **NestJS** (v11) - Progressive Node.js framework
- **TypeScript** (v5.9) - Type-safe JavaScript
- **PostgreSQL** - Relational database
- **Prisma** (v6.19) - Next-generation ORM

### Development Tools
- **Jest** (v29) - Testing framework
- **Supertest** (v7) - HTTP assertion library
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development auto-reload
- **class-validator** - DTO validation
- **class-transformer** - Object transformation

## Installation & Setup

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- PostgreSQL database

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coveragex-todo-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory (see Environment Variables section below)

4. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

6. **Start the development server**
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
DIRECT_URL="postgresql://username:password@localhost:5432/database_name"
```

**Required Variables:**
- `DATABASE_URL` - PostgreSQL connection string for Prisma (uses connection pooling)
- `DIRECT_URL` - Direct PostgreSQL connection string (for migrations)

**Example for local development:**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo_db"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/todo_db"
```

## API Endpoints

Base URL: `http://localhost:3000`

### Task Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/tasks` | Create a new task | `{ "title": string, "description"?: string }` |
| `GET` | `/tasks` | Get recent pending tasks (last 5) | - |
| `GET` | `/tasks/all` | Get all tasks | - |
| `PATCH` | `/tasks/:id/markdone` | Mark a task as completed | - |
| `PATCH` | `/tasks/:id/markpending` | Mark a task as pending | - |
| `DELETE` | `/tasks/:id` | Delete a task | - |

### Request/Response Examples

**Create Task**
```bash
POST /tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "completed": false,
  "created_at": "2025-11-19T16:00:00.000Z"
}
```

**Get Recent Tasks**
```bash
GET /tasks
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "completed": false,
    "created_at": "2025-11-19T16:00:00.000Z"
  }
]
```

## Database/ORM Details

### Prisma ORM

This project uses **Prisma** as the ORM, which provides:
- Type-safe database queries
- Auto-generated TypeScript types
- Database migration management
- Intuitive schema definition

### Database Schema

```prisma
model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String? 
  completed   Boolean  @default(false)
  created_at  DateTime @default(now())
}
```

### Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (development only)
npx prisma migrate reset
```

## Running Tests

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run end-to-end tests
npm run test:e2e

# Run tests in debug mode
npm run test:debug
```

## Folder Structure

```
coveragex-todo-backend/
├── prisma/
│   └── schema.prisma          # Database schema definition
├── src/
│   ├── tasks/
│   │   ├── dto/
│   │   │   └── create-task.dto.ts  # Data transfer objects
│   │   ├── tasks.controller.ts     # Request handlers
│   │   ├── tasks.service.ts        # Business logic
│   │   ├── tasks.service.spec.ts   # Service tests
│   │   └── tasks.module.ts         # Task module definition
│   ├── app.controller.ts      # Root controller
│   ├── app.module.ts          # Root module
│   └── main.ts                # Application entry point
├── test/
│   └── jest-e2e.json          # E2E test configuration
├── .env                       # Environment variables (not in repo)
├── .gitignore                 # Git ignore rules
├── Dockerfile                 # Docker configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## Deployment

### Docker Deployment

The project includes a Dockerfile for containerized deployment.

**Build Docker Image:**
```bash
docker build -t todo-backend .
```

**Run Docker Container:**
```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="your_database_url" \
  -e DIRECT_URL="your_direct_url" \
  todo-backend
```

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Deployment Platforms

This application can be deployed to various platforms:

- **Heroku**: Deploy using Git push with Heroku PostgreSQL addon
- **AWS**: Deploy on EC2, ECS, or using AWS RDS for PostgreSQL
- **DigitalOcean**: Use App Platform or Droplets with managed PostgreSQL
- **Railway**: Deploy with automatic PostgreSQL provisioning
- **Vercel**: Deploy with serverless functions and external PostgreSQL
- **Render**: Deploy with managed PostgreSQL database

**Environment Configuration:**
Ensure all environment variables are properly configured on your deployment platform, especially `DATABASE_URL` and `DIRECT_URL`.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
4. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request**

### Code Standards

- Follow the existing code style
- Write tests for new features
- Run linting before committing: `npm run lint`
- Format code with Prettier: `npm run format`
- Ensure all tests pass: `npm run test`

## License

This project is licensed under the **UNLICENSED** license - see the package.json file for details.

---

**Built with ❤️ using NestJS and Prisma**
