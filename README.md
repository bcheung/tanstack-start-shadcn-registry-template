## Shadcn Registry on TanStack Start

This project is a working TanStack Start application that embeds the official shadcn registry template. It lets you run `shadcn` locally, showcase your custom components, and publish registry items as JSON files under `public/r`.

## Getting Started

1. Create a `.env` file and set the deployment origin used by the registry:

   ```bash
   VITE_BASE_URL=https://your-domain.com
   ```

2. Install dependencies and start the dev server:

   ```bash
   bun install
   bun run dev
   ```

The root route (`src/routes/index.tsx`) renders the sample registry blocks so you can verify your components before publishing.

## Building the Registry

The `registry.json` file at the project root defines every item that can be consumed by the shadcn CLI. Whenever you edit registry source files under `src/registry`, rebuild the distributable JSON with:

```bash
bun run registry:build
```

This runs `shadcn build` and emits files such as `public/r/hello-world.json`, which the CLI consumes through `https://<your-domain>/r/<name>.json`.

## Environment Variables

The “Open in v0” button and registry URLs need the fully qualified origin of your deployment. Set `VITE_BASE_URL=https://your-domain.com` (or any other origin) in `.env` **before** running `bun run dev`, `bun run build`, or `bun run deploy`. The app now throws during startup if the variable is missing, so you’ll notice misconfiguration immediately. In CI/CD, export the same variable prior to running builds or `wrangler deploy`.

## Scripts

| Script | Description |
| --- | --- |
| `bun run dev` | Start the TanStack Start dev server |
| `bun run build` | Build the SSR bundle |
| `bun run registry:build` | Rebuild `public/r/*.json` using `shadcn` |
| `bun run test` | Run Vitest |
| `bun run lint` / `format` / `check` | Biome tooling |
| `bun run deploy` | Deploy via `wrangler` |

## Project Layout

- `src/routes/__root.tsx` – HTML shell + global Tailwind v4 styles (`globals.css`)
- `src/routes/index.tsx` – Registry showcase grid
- `src/components/open-in-v0-button.tsx` – Handles the v0 deep link
- `src/registry` – Source files shipped through the registry
- `public/r` – Generated registry JSON served to consumers

## References

- TanStack’s migration notes for moving from Next.js to TanStack Start highlight how routing, server functions, and public assets map to this setup. See the [official guide](https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js) for deeper context.
