# NEXORA CRM — Full Stack

Frontend (React + Vite + TypeScript) + Backend (Express + Prisma + PostgreSQL).

The frontend works **standalone offline** (localStorage). When the backend is running on port **5000**, the UI automatically uses the REST API. If the API is down or returns HTML, the app **never throws** `Unexpected token '<' ... is not valid JSON` — it switches to offline mode.

## Structure

```
crm-fullstack/
  frontend/     # React app (port 5173)
  backend/      # Express API (port 5000)
```

## Quick Start

### Frontend only (no database required)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

### Backend

```bash
cd backend
cp example.env .env
# Edit DATABASE_URL if needed
npm install
npm run prisma:generate
# Optional: npm run prisma:migrate && npm run prisma:seed
npm run dev
```

API: http://localhost:5000/api  
Swagger: http://localhost:5000/api-docs  
Health: http://localhost:5000/api/health

### Both together

1. Start backend on **5000**
2. Start frontend on **5173** (Vite proxies `/api` → `http://localhost:5000`)

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

## Environment

**frontend** `.env` (optional):
```
VITE_API_BASE_URL=/api
```

**backend** `.env` (from `example.env`):
```
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/crm_db?schema=public
JWT_SECRET=super_secret_crm_jwt_key_2026_production_ready
CORS_ORIGIN=*
```

## JSON / HTML safety

- All HTTP calls go through `frontend/src/services/api.ts`
- Responses starting with `<` or `<!DOCTYPE` are treated as backend offline
- Hybrid services in `frontend/src/services/remote/crmApi.ts` fall back to local repositories
- You should **not** see raw `Unexpected token '<' is not valid JSON` in the UI

## Docker (backend + Postgres)

```bash
cd backend
docker compose up -d
```

See `backend/docker-compose.yml`.

## License

Proprietary — UNLICENSED

## Build & Start (executable entry points)

```bash
make install   # install deps
make frontend  # Vite dev server
make backend   # Express API
make build     # production builds
make start     # start backend production
make docker    # docker compose up
```

Root `package.json` scripts: `npm run build`, `npm start`, `npm run dev`.
Root `Dockerfile` and `docker-compose.yml` included.

## Demo Login Credentials

| Role | Email | Password | Dashboard |
|------|-------|----------|-----------|
| **Admin** | `admin@nexora.demo` | `Admin@123` (or use one-click) | Executive org-wide |
| **Manager** | `manager@nexora.demo` | `Manager@123` (or use one-click) | Team performance |
| **Sales Rep** | `sales@nexora.demo` | `Sales@123` (or use one-click) | Personal sales |

On the login page, use **One-Click Demo Roles** buttons for instant access.
Default form password in UI is also accepted for demo accounts.
"# team-crm-project" 
"# team-repository-project-1" 
"# team-repository-project-1" 
