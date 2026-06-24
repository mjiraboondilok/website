# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project context

This is **Mag's personal site / portfolio**, built with [Astro](https://astro.build).
It is currently close to the default Astro "basics" starter — most pages and
components are still placeholders waiting to be replaced with real content.

When adding features, bias toward a fast, content-focused personal website:
static pages, minimal JavaScript, good performance defaults.

## Hard rules

- **Always use pnpm.** Never `npm` or `yarn`. The repo has a committed
  `pnpm-lock.yaml`; commands and lockfile updates must go through pnpm.
- **Do not add dependencies without asking first.** Keep the dependency
  footprint small. If a task seems to need a new package, propose it and wait
  for confirmation before installing. (Sanctioned dev deps already approved:
  `@astrojs/check` + `typescript` for type-checking, and the Prettier/ESLint
  toolchain for formatting and linting.)
- **Keep it vanilla Astro.** Do not add UI framework integrations (React, Vue,
  Svelte, Solid, etc.) unless explicitly requested. Prefer `.astro` components.
- **Ask before large changes.** Confirm before big refactors, restructuring the
  `src/` layout, or changing build/config in ways that affect the whole site.

## Commands

All commands run from the repo root.

| Command             | Action                                          |
| :------------------ | :---------------------------------------------- |
| `pnpm install`      | Install dependencies                            |
| `pnpm dev`          | Start the dev server at `http://localhost:4321` |
| `pnpm build`        | Build the production site to `./dist/`          |
| `pnpm preview`      | Preview the production build locally            |
| `pnpm astro ...`    | Run Astro CLI commands (e.g. `astro add`)       |
| `pnpm lint`         | Lint with ESLint                                |
| `pnpm lint:fix`     | Lint and auto-fix                               |
| `pnpm format`       | Format all files with Prettier (writes)         |
| `pnpm format:check` | Check formatting without writing                |

Requires Node `>=22.12.0` (see `package.json`).

## Project structure

```text
/
├── public/            # Static assets served as-is (favicon, etc.)
├── src/
│   ├── assets/        # Images/SVGs imported & processed by Astro
│   ├── components/    # Reusable .astro components
│   ├── layouts/       # Page shells (e.g. Layout.astro)
│   └── pages/         # File-based routes — each file = a route
├── astro.config.mjs   # Astro configuration
├── eslint.config.js   # ESLint flat config
├── .prettierrc.json   # Prettier config
└── tsconfig.json      # Extends astro/tsconfigs/strict
```

Where to add things:

- **New page/route** → `src/pages/` (e.g. `src/pages/about.astro` → `/about`).
- **Reusable UI** → `src/components/`.
- **Page wrappers / shared `<head>`** → `src/layouts/`.
- **Optimized images** → `src/assets/` (import them); **unprocessed files** → `public/`.

## Code conventions

- **TypeScript is strict** — the project extends `astro/tsconfigs/strict`. Keep
  code type-clean; avoid `any` and `// @ts-ignore`.
- Write components as `.astro` files; use the frontmatter (`---`) fence for
  component logic and scoped `<style>` blocks for styling.
- Component files are `PascalCase.astro`; page files are lowercase routes.
- Keep client-side JS minimal; only opt into hydration directives when needed.
- **Formatting is handled by Prettier** (`.prettierrc.json`) — don't hand-format;
  run `pnpm format`. **Linting is ESLint** (flat config in `eslint.config.js`).

## Verification

**A production build is _not_ required to check your work.** `pnpm astro check`
already type-checks frontmatter and templates, validates props, and surfaces the
same errors a build would — without the cost of a full build. Don't run
`pnpm build` just to verify a change.

Before considering any change complete, all must pass:

1. **`pnpm astro check`** — type-checks `.astro` frontmatter and `.ts` files and
   catches template/prop errors (enforces `strict`).
2. **`pnpm lint`** — ESLint must report no errors.
3. **`pnpm format:check`** — formatting must be clean (run `pnpm format` to fix).

Only run **`pnpm build`** when a change specifically affects the build/output
itself (e.g. `astro.config.mjs`, asset pipeline) and you need to confirm the
production build succeeds.

For UI changes, also sanity-check in the browser via `pnpm dev`
(`http://localhost:4321`).
