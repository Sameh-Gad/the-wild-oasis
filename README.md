# The Wild Oasis

A hotel management dashboard for keeping daily operations in one place. Staff can manage cabins and bookings, review guest stays, handle check-ins and check-outs, and monitor hotel activity from a dashboard.

## Features

- Dashboard with booking and sales metrics, recent stays, stay-duration chart, and today's arrivals and departures
- Cabin and booking management, including booking details
- Guest check-in and check-out workflows
- Settings and account management
- Protected routes and Supabase authentication
- Data fetching and caching with TanStack Query

## Built with

- React and Vite
- React Router
- Supabase
- TanStack Query
- Tailwind CSS
- Recharts

## Getting started

### Requirements

- Node.js (LTS recommended)
- npm
- A Supabase project configured with the database and authentication used by this application

### Install and run

```bash
npm install
npm run dev
```

Create a `.env` file in the project root and provide your Supabase project URL and public client key:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-supabase-publishable-or-anon-key
```

Use only a Supabase publishable/anon key in this browser application. Never put a `service_role` key in a `VITE_` variable or commit credentials.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |
| `npm run format` | Format source and project configuration files |
| `npm run format:check` | Check formatting |

## Deploying to Vercel

Import the repository into Vercel and add `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY` to the project's environment variables. Vercel detects Vite's build settings; the included `vercel.json` rewrite serves the SPA entry point for direct visits and refreshes on application routes.

## Project structure

```text
src/
  features/       Feature-specific UI and React Query hooks
  pages/          Route-level pages
  services/       Supabase API functions and client
  ui/             Shared layout and UI components
  utils/          Shared utilities
```
