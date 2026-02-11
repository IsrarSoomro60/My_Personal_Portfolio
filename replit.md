# Replit Configuration - Israr Ahmed Portfolio

## Overview

This is a personal portfolio website for Israr Ahmed, a Software Engineering student specializing in Python, Machine Learning, Django, and backend development. The application is a full-stack web app that showcases projects, skills, and provides a contact form. It follows a monorepo structure with a React frontend, Express backend, and PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure
The project uses a three-directory monorepo pattern:
- `client/` — React frontend (SPA)
- `server/` — Express backend (API server)
- `shared/` — Shared types, schemas, and route definitions used by both client and server

### Frontend (`client/`)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State/Data Fetching**: TanStack React Query for server state management
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives, stored in `client/src/components/ui/`
- **Animations**: Framer Motion for scroll-triggered animations
- **Forms**: React Hook Form with Zod resolver for validation
- **Smooth Scrolling**: react-scroll for in-page navigation
- **Build Tool**: Vite with React plugin
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

The frontend is a single-page portfolio with sections: Hero/About, Skills, Projects, Learning, and Contact. The main page is `client/src/pages/Home.tsx`.

### Backend (`server/`)
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript, run with `tsx` in development
- **API Pattern**: RESTful JSON API under `/api/` prefix
- **Endpoints**:
  - `GET /api/projects` — Returns all projects
  - `GET /api/skills` — Returns all skills
  - `POST /api/contact` — Submits a contact form message
- **Route Definitions**: Shared between client and server via `shared/routes.ts` using Zod schemas for type-safe API contracts
- **Database Seeding**: The server seeds initial project and skill data on startup if the database is empty (done in `server/routes.ts`)
- **Static Serving**: In production, serves the built Vite output from `dist/public/`
- **Dev Server**: Uses Vite middleware for HMR in development (`server/vite.ts`)

### Database
- **Database**: PostgreSQL (required, uses `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-Zod integration
- **Schema Location**: `shared/schema.ts`
- **Tables**:
  - `projects` — id, title, description, technologies (text array), imageUrl, projectUrl, repoUrl, category
  - `skills` — id, name, category, icon
  - `messages` — id, name, email, message, createdAt (auto-timestamp)
- **Migrations**: Drizzle Kit with `drizzle-kit push` command (`npm run db:push`)
- **Connection**: node-postgres `Pool` in `server/db.ts`

### Storage Layer
- `server/storage.ts` defines an `IStorage` interface and `DatabaseStorage` implementation
- This abstraction layer sits between routes and the database, making it possible to swap storage implementations

### Build Pipeline
- **Development**: `npm run dev` runs the Express server with Vite middleware for HMR
- **Production Build**: `npm run build` runs a custom build script (`script/build.ts`) that:
  1. Builds the React client with Vite (output to `dist/public/`)
  2. Bundles the server with esbuild (output to `dist/index.cjs`)
  3. Selectively bundles certain dependencies to reduce cold start times
- **Production Start**: `npm start` runs the bundled server from `dist/index.cjs`

### Shared Contract Pattern
The `shared/` directory acts as a contract layer:
- `shared/schema.ts` — Database table definitions, insert schemas (Zod), and TypeScript types
- `shared/routes.ts` — API route definitions with paths, methods, input/output Zod schemas
- Both client hooks (`client/src/hooks/use-portfolio.ts`) and server routes import from shared, ensuring type safety across the stack

## External Dependencies

### Required Services
- **PostgreSQL Database**: Required. Must set `DATABASE_URL` environment variable. Used via `node-postgres` pool and Drizzle ORM.

### Key npm Packages
- **Frontend**: React, Wouter, TanStack React Query, Framer Motion, react-hook-form, react-scroll, shadcn/ui (Radix UI + Tailwind)
- **Backend**: Express 5, drizzle-orm, drizzle-zod, connect-pg-simple, zod
- **Build**: Vite, esbuild, tsx, TypeScript
- **Replit-specific**: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` (dev only)

### Fonts
- Google Fonts loaded via CDN: Inter, Roboto, DM Sans, Fira Code, Geist Mono, Architects Daughter