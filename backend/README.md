# CRM & Business Management Backend API

Production-grade, modular, testable, and secure Node.js/TypeScript REST API backend for CRM application providing lead management, customer tracking, deal pipelines, activity logs, tasks, and real database reports.

## Tech Stack
- **Runtime**: Node.js (v22 LTS) + TypeScript 5+
- **Framework**: Express.js
- **Database & ORM**: PostgreSQL + Prisma ORM
- **Validation**: Zod
- **Authentication**: JWT + bcryptjs
- **Documentation**: OpenAPI 3.0 (Swagger UI at `/api-docs`)
- **Testing**: Vitest + Supertest

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Database Setup & Migrations
Generate Prisma Client:
```bash
npm run prisma:generate
```

Run seed data script:
```bash
npm run prisma:seed
```

### 4. Running the Application
Development server with hot reloading:
```bash
npm run dev
```

Build production bundle:
```bash
npm run build
npm start
```

### 5. Running Tests
Execute Vitest test suite:
```bash
npm test
```

## API Documentation
Once the server is running, navigate to `http://localhost:5000/api-docs` to explore and test the interactive OpenAPI Swagger UI documentation.
