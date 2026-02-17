# Code Scholar Portfolio

A full-stack portfolio website built with React, Express, TypeScript, and PostgreSQL.

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: Radix UI, shadcn/ui
- **Other**: React Query, Framer Motion, Wouter (routing)

## Prerequisites

Before running this project, make sure you have:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **PostgreSQL** database - You can use:
   - Local PostgreSQL installation
   - Cloud services like [Supabase](https://supabase.com), [Neon](https://neon.tech), or [Railway](https://railway.app)
   - Docker PostgreSQL container

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_db
PORT=5000
```

**For local PostgreSQL:**
```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/portfolio_db
```

**For cloud databases (example with Supabase):**
```env
DATABASE_URL=postgresql://postgres.xxxxx:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### 3. Set Up Database

Create your PostgreSQL database (if using local PostgreSQL):

```sql
CREATE DATABASE portfolio_db;
```

Then run the database migrations:

```bash
npm run db:push
```

This will create the necessary tables (projects, skills, messages) in your database.

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at:
- **Frontend & API**: http://localhost:5000

The dev server runs both the frontend (with Vite HMR) and backend API on the same port.

## Available Scripts

- `npm run dev` - Start development server (frontend + backend)
- `npm run build` - Build for production
- `npm run start` - Start production server (requires build first)
- `npm run check` - Type check TypeScript files
- `npm run db:push` - Push database schema changes to PostgreSQL

## Project Structure

```
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and config
├── server/          # Express backend
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API routes
│   └── db.ts        # Database connection
├── shared/          # Shared types and schemas
│   ├── schema.ts    # Database schema (Drizzle)
│   └── routes.ts    # Shared route definitions
└── migrations/      # Database migrations (generated)
```

## Database Schema

The project uses three main tables:

- **projects**: Portfolio projects with title, description, technologies, images, and links
- **skills**: Skills organized by category (Backend, ML, Tools, etc.)
- **messages**: Contact form submissions

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Verify your `DATABASE_URL` is correct
- Check that the database exists
- Ensure your database user has proper permissions

### Port Already in Use

If port 5000 is already in use, set a different port in your `.env`:
```env
PORT=3000
```

### Windows-Specific Issues

The project now uses `cross-env` for cross-platform compatibility. If you encounter issues, make sure all dependencies are installed:
```bash
npm install
```

## Production Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Set environment variables in your production environment

3. Run migrations:
   ```bash
   npm run db:push
   ```

4. Start the server:
   ```bash
   npm start
   ```

## License

MIT
