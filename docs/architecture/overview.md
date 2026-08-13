# Architecture Overview — Note Board

## Scope

Note Board is one fullstack, read-only product: browser renders one notes page, Go API reads notes from PostgreSQL, database stores existing notes. No add, edit, delete, search, filter, or authentication scope exists.

## Tech stack

- Frontend: Next.js 15 App Router, TypeScript, Tailwind CSS v3, ESLint.
- Backend: Go 1.22 HTTP server.
- Database: PostgreSQL 16.
- Runtime: `docker compose up` from repository root boots DB, backend, and frontend.
- CI: `.github/workflows/ci.yml` runs backend build/vet/test, frontend lint/build/test, and compose config validation.

## Repository layout

```text
code/
  backend/
    cmd/api/main.go              # API entry point, migration runner, health check
    migrations/                  # timestamped SQL migrations, embedded in backend binary
    .env.example                 # backend env keys
    go.mod                       # Go module
  frontend/
    app/                         # Next.js App Router composition root and global styles
    .env.example                 # browser-facing env keys
    package.json                 # frontend scripts and pinned dependencies
    next.config.js               # standalone output required by Dockerfile

docs/architecture/overview.md    # this document
```

## Runtime boundaries and data flow

1. Browser loads Next.js app from frontend service.
2. Story component later calls backend API via `NEXT_PUBLIC_API_URL`.
3. Backend reads `DATABASE_URL`, applies pending SQL migrations from `code/backend/migrations/`, opens HTTP server, and exposes `/healthz`.
4. `/healthz` returns 200 only after migrations have succeeded and `SELECT 1` against database succeeds.
5. Future notes endpoint reads PostgreSQL rows and returns JSON. No write endpoints should be added for current scope.

## Environment variables

Root `.env.example` is shared by Docker Compose. Service examples document keys read by that service.

Backend keys:

- `DATABASE_URL` — PostgreSQL connection string injected by runtime or Compose.
- `PORT` — HTTP listen port. Falls back to `APP_PORT`, then `8080`.
- `APP_PORT` — legacy fallback only when `PORT` is absent.

Frontend keys:

- `NEXT_PUBLIC_API_URL` — public API base URL used by browser code.

Compose keys:

- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` — local database bootstrap values.
- `BACKEND_PORT`, `FRONTEND_PORT` — host port mappings.
- `NEXT_PUBLIC_API_URL` — browser API base URL for local build.
- `IMAGE_REPO`, `IMAGE_TAG` — optional image labels.

## Naming conventions

- Go packages use lowercase names. Entry point stays `cmd/api` so existing Dockerfile builds one binary.
- SQL migrations use `YYYYMMDDHHMMSS_name.up.sql` and matching `.down.sql`.
- Database tables use snake_case plural names.
- React component files export with `export default function ComponentName()`.
- `app/page.tsx` stays Server Component composition root only; client components must start with literal first line `"use client"` when they use hooks, event handlers, refs, or browser APIs.
- Product UI must not show design-preview controls labelled Loading, Empty, or Error.

## Security and failure handling

- API reads database URL from environment; no credentials are hardcoded.
- Database access must use parameterized queries.
- Health check verifies database connectivity so broken migrations do not report healthy.
- Error responses must avoid database internals; log internal error details server-side when feature code adds logging.
- No authentication or per-user authorization exists because SRS says every visitor may read same notes.

## Observability

- Backend logs startup, migration, and server failures to standard error via Go standard logger.
- Container health checks use `/healthz` for backend and `/` for frontend.
- CI blocks build, vet, lint, and compose config errors before feature review.

## Key decisions and rejected alternatives

### Fullstack scaffold

Decision: keep frontend, backend, and PostgreSQL because SRS depends on saved notes already stored in database.

Rejected alternative: static mock page. Tradeoff: less code, but cannot display database-backed notes or meaningful API failure state.

### Go backend with self-migrations

Decision: Go API applies embedded SQL migrations on boot before health passes.

Rejected alternative: separate migration command/manual setup. Tradeoff: cleaner separation, but runtime creates empty database and no other actor applies schema.

### Minimal SQL migration tracker

Decision: use `schema_migrations` table and apply `.up.sql` files in filename order.

Rejected alternative: add migration framework dependency. Tradeoff: richer tooling, but current scaffold needs only deterministic boot-time migrations.

### Next.js App Router shell only

Decision: `app/page.tsx` remains thin composition root with no product feature implementation.

Rejected alternative: build note list in scaffold. Tradeoff: earlier visual proof, but it would implement story scope and force later rewrites.

### Docker files left unchanged

Decision: keep committed Dockerfiles, `docker-compose.yml`, `container.yml`, and `publish.yml` unchanged.

Rejected alternative: rewrite container setup per scaffold. Tradeoff: local customization, but high risk of breaking fixed orchestrator build assumptions.

## How to run

```bash
cp .env.example .env
cp code/backend/.env.example code/backend/.env
cp code/frontend/.env.example code/frontend/.env.local
docker compose --profile local up --build
```

Frontend: `http://localhost:3000`.
Backend health: `http://localhost:8080/healthz`.

Local checks:

```bash
cd code/backend && go build ./... && go vet ./... && go test ./...
cd code/frontend && npm ci && npm run lint && npm run build && npm test --if-present
docker compose config -q
```

## Unknowns and rollout notes

- ERD and service contract are intentionally deferred to dedicated architecture tasks.
- Initial migration creates infrastructure only; notes table belongs in ERD task.
- If note visibility becomes user-specific, auth and authorization require new PM scope and new architecture review.
