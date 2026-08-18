# Koh Khun Shop — Project Structure (สรุป)

## Tech Stack
- Vite (dev/build)
- TypeScript
- React 19
- @tanstack/react-router (file-based routes)
- @tanstack/react-query (data fetching)
- Supabase (auth, DB, storage)
- TailwindCSS (+ shadcn UI primitives)
- @tanstack/react-form + zod (forms & validation)
- zustand (local stores)

## Important root files
- package.json — dependencies & scripts
- vite.config.ts — Vite plugins (tanstack router, tailwind)
- tsconfig.json — TypeScript config
- index.html

## Entry points
- `src/main.tsx` — app bootstrap, import global CSS
- `src/App.tsx` — create router (`routeTree`) and wrap `QueryClientProvider`

## Routing
- `src/routes/` — folder-based routes
- `src/routeTree.gen.ts` — auto-generated route tree (do NOT edit)

## Infra / clients
- `src/lib/supabase.ts` — Supabase client (uses `VITE_SUPABASE_*`)
- `src/lib/query-client.ts` — react-query `QueryClient`

## Components
- `src/components/` — `AuthProvider`, `CustomNavbar`, `CustomSidebar`, `layout/PageLayout.tsx`, and UI primitives in `components/ui/*`

## Features (domain folders)
- `src/features/auth` — services (`services/user-api.ts`), hooks (`hooks/userUser.ts`) → Supabase auth
- `src/features/shop` — hooks (`hooks/useShop.ts`), service (`service/shop-api.ts`) → shop CRUD + Supabase storage
- `src/features/product`, `cart`, `bill` — similar structure (hooks + service + types)
- `src/features/translations` — `hooks/useTranSlation.ts`, `stores/language-store.ts`, languages in `languages/th.ts` and `languages/lo.ts`

## Data flow (high level)
- `src/main.tsx` → `src/App.tsx` → router (`routeTree.gen.ts`) → route components in `src/routes/*`
- Protected routes call `queryClient.ensureQueryData` to load current user via `GetMe` (auth service) → `supabase` (src/lib/supabase.ts)
- Feature pages use hooks in `src/features/*/hooks` which call `src/features/*/service/*` → these service files use `supabase` or other APIs
- Translations loaded from `src/features/translations/languages/*.ts` via `useTranSlation`

## UI / UX helpers
- TailwindCSS + `shadcn`, `lucide-react`, `clsx`, `class-variance-authority` for styling and components
- SweetAlert2 for alerts

## Common commands
```
npm install
npm run dev
npm run build
```

## Notes for AI prompt
- Use this file as a concise map of where code lives and how data flows.
- Key integration points: `supabase` (auth/storage/DB), `queryClient` (react-query), `routeTree.gen.ts` (routes)

---
File generated: PROJECT_STRUCTURE.md
