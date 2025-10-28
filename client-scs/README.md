<!-- Improved README for client-scs (Claims Support frontend) -->

# Client SCS (client-scs)

A lightweight Angular frontend for the SCS (Support / Claims) application. This repository provides the single-page application used by support staff to view dashboards, manage documents, contact users, and handle transactions.

Key facts
- Angular 19 (CLI v19.x generated)
- TypeScript
- TailwindCSS + Angular Material (project-specific)

Table of contents
- Quick start
- Development scripts
- Configuration
- Project layout (high level)
- Testing
- Troubleshooting
- Contributing
- Optional follow-ups

## Quick start

Prerequisites
- Node.js 18.x or later recommended
- npm (9.x or later), or pnpm/yarn
- (Optional) Angular CLI: `npm i -g @angular/cli`

Install dependencies:

```bash
npm install
```

Start development server (default config):

```bash
npm start
# or use the local configuration if present
npm run local
```

Open http://localhost:4200 in your browser. The application will hot-reload on code changes.

## Development scripts

All scripts live in `package.json`. Common commands:

- `npm start` — serve the app (development)
- `npm run local` — serve using the `local` configuration (if available)
- `npm run build` — build production artifacts (output: `dist/`)
- `npm run watch` — continuous build for development
- `npm test` — run unit tests (Karma + Jasmine)

You can also use the Angular CLI directly (`ng serve`, `ng build`, etc.).

## Configuration

- Environment files: `src/environments` contains `environment.ts`, `environment.development.ts`, and `environment.local.ts`. Update these to point to the appropriate backend API endpoints or toggle features/mock backends.
- Proxy: If you need to proxy requests to a backend during development, use `proxy.conf.json` and start the dev server with `--proxy-config proxy.conf.json`.

Secrets & credentials
- Never commit secrets to the repository. Use environment variables or a local secrets file that is gitignored.

## Project layout (high level)

Key folders in `src/app`:

- `core` — domain entity definitions, repositories and use-cases (framework-agnostic application logic)
  - `domain/entities` — DTOs and domain classes (e.g., `user.entity.ts`, `transaction.entity.ts`)
  - `repositories` — repository interfaces
  - `use-cases` — application-specific business rules

- `infrastructure` — Angular-specific implementations
  - `api` — HTTP clients for backend endpoints
  - `guards` / `interceptors` — route guards and HTTP interceptors
  - `mock-backend` — local mock controllers and data for offline development
  - `services` — shared Angular services (auth, storage, popup, toast, etc.)

- `presentation` — UI, routes and feature modules
  - `features` — feature areas (auth, dashboard, documents, contact-us, profile, transaction)
  - `layouts` — app shells and layout components

- `environments` — runtime configuration per environment
- `assets` / `public` — static files (images, logos, svg)

## Testing

- Unit tests: `npm test` (Karma + Jasmine). Tests live next to implementation files as `*.spec.ts`.
- E2E: Not included by default. Consider adding Playwright or Cypress if you need end-to-end coverage.

## Troubleshooting

- Port already in use: run `ng serve --port 4300` or stop the process using the port.
- Stale or broken node_modules: delete `node_modules` and `package-lock.json`, then run `npm install` again:

```bash
rm -rf node_modules package-lock.json
npm install
```

- TypeScript/Angular mismatches: ensure `typescript` and `@angular/*` versions in `package.json` are compatible with your Node.js version.

## Contributing

Guidelines for contributors:

1. Create a branch named `feature/short-description` or `fix/short-description` from `main`.
2. Make focused commits and include tests for new behavior where possible.
3. Run unit tests and linting before opening a pull request.

If you're adding a feature that requires backend changes, please coordinate with the backend team and provide the environment config values needed to run locally.
