# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # TypeScript check + Vite production build
npm run lint      # ESLint across all TS/TSX files
npm run preview   # Serve the production build locally
```

No test runner is configured.

## Environment

Requires a `.env` file with:
- `VITE_URL_SERVER` — base URL for the backend API

## Architecture

**React 19 SPA** built with Vite + SWC, TypeScript throughout.

### Routing

`src/routes/AppRouter.tsx` uses React Router v7 with hash-based routing. Two top-level branches:
- `/auth` — public (login, register)
- `/panel` — private, wrapped in `PrivateRoute`

Root redirects to `/auth/login`.

### State Management

- **Server state**: TanStack Query v5 (`src/lib/queryClient.ts`) — 5-minute stale time, no refetch on mount/window focus. All API calls go through custom hooks that use `useQuery` / `useMutation`.
- **Client state**: plain React hooks (no global store like Zustand/Redux).
- **Auth**: `better-auth` with cookie-based sessions.

### API Layer

`src/lib/api.ts` — Axios instance with interceptors that:
- Deserialize ISO UTC strings → JS `Date` objects on responses
- Serialize `Date` objects → ISO UTC strings on requests

Always import the configured `api` instance, never raw `axios`.

### Feature Modules

Code is organized by feature under `src/modules/`:

| Module | Responsibility |
|---|---|
| `auth` | Login / register pages and hooks |
| `goals` | Goal CRUD, the main panel dashboard |
| `goal-progress` | Progress entries on goals |
| `units` | Measurement units management |
| `stats` | Charts and analytics |

Each module follows the same internal structure: `pages/`, `components/`, `hooks/`, `actions/` (query/mutation functions), `schemas/` (React Hook Form + validation).

### Shared Infrastructure

- `src/components/ui/` — Radix UI-based component library styled with Tailwind + CVA
- `src/components/charts/` — Recharts wrappers
- `src/hooks/` — `useDateRange`, `useMediaQuery`
- `src/lib/invalidateQueries.ts` — helpers to invalidate related TanStack Query caches after mutations
- `src/types/pagination.ts` — generic pagination type used across modules

### Styling

Tailwind CSS v4 via `@tailwindcss/vite`. Use `cn()` (`clsx` + `tailwind-merge`) from `src/lib/utils.ts` for conditional class merging. Path alias `@/` maps to `src/`.
