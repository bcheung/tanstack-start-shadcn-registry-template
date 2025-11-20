## Shadcn Registry on TanStack Start

You can use the shadcn CLI to run your own component registry. Running your own component registry allows you to distribute your custom components, hooks, pages, and other files to any React project.

This repository is a starter template for creating a custom registry using TanStack Start (instead of Next.js) that deploys to Cloudflare.

## How It Works

- The template uses a `registry.json` file to define components and their files.
- The `shadcn build` command is used to build the registry.
- The registry items are served as static files under `public/r/[name].json`.
- Every registry item is compatible with the shadcn CLI.
- We have also added v0 integration using the Open in v0 API.

## Getting Started

1. Create a `.env` file with the values Alchemy expects:

   ```bash
   ALCHEMY_PASSWORD=change-me           # encrypts secrets set via Alchemy
   VITE_BASE_URL=https://your-domain.com
   ```

2. Authenticate with Alchemy/Cloudflare so deployments work. Follow the [Alchemy “Getting Started” guide](https://alchemy.run/getting-started/) and run:

   ```bash
   bun alchemy login
   # optional, if you manage multiple profiles:
   bun alchemy configure
   ```

3. Install dependencies and start the dev server:

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

The “Open in v0” button and registry URLs need the fully qualified origin of your deployment. Set `VITE_BASE_URL=https://your-domain.com` (or any other origin) in `.env` **before** running `bun run dev`, `bun run build`, or `bun run deploy`. The app throws during startup if the variable is missing, so you’ll notice misconfiguration immediately. For CI/CD, export the same variable before invoking `bun run build` or `bun run deploy`.

## Scripts

| Script | Description |
| --- | --- |
| `bun run dev` | Start Alchemy’s TanStack Start dev environment |
| `bun run build` | Build the SSR bundle (Alchemy-configured Vite) |
| `bun run registry:build` | Rebuild `public/r/*.json` using `shadcn` |
| `bun run test` | Run Vitest |
| `bun run lint` / `format` / `check` | Biome tooling |
| `bun run deploy` | Deploy via `alchemy deploy` |

## Deploying to Cloudflare

1. Ensure `VITE_BASE_URL` points at the Cloudflare Workers domain you’ll deploy to (for example, `https://registry-example.workers.dev`).  
2. Run `bun run registry:build` so the latest registry items land in `public/r`.  
3. Deploy with `bun run deploy --stage production` (or just `bun run deploy` if you want to deploy the default stage).

### Custom domains

This template already wires in Alchemy’s Cloudflare provider via [`alchemy.run.ts`](./alchemy.run.ts). To serve the registry from a custom hostname, edit that file and uncomment the `domains` array inside `TanStackStart(...)`, e.g.

```ts
export const worker = await TanStackStart("app", {
  domains: ["registry.yourcompany.com"],
});
```

Deploying with `bunx alchemy deploy --stage production` will then bind the Worker to your domain. For more advanced setups (multiple domains, adopting an existing DNS record, environment-specific bindings), follow the official [Alchemy Cloudflare custom domain guide](https://alchemy.run/providers/cloudflare/custom-domain/).

> **Note:** After switching to a custom domain, update `VITE_BASE_URL` (locally and in your deployment secrets) so the app’s `Open in v0` links and registry JSON URLs point to the new host.

## Using the registry with the shadcn CLI

Once deployed, you can reference the registry via a namespace in your `components.json` just like the official docs describe ([shadcn namespaces guide](https://ui.shadcn.com/docs/registry/namespace)):

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "registries": {
    "@acme": "https://registry-example.workers.dev/r/{name}.json"
  }
}
```

With that config, installing your Example Form is as simple as:

```bash
npx shadcn@latest add @acme/example-form
```

The CLI replaces `{name}` with `example-form`, fetches `https://registry-example.workers.dev/r/example-form.json`, resolves any `registryDependencies`, and installs the files into the caller’s project.

## Project Layout

- `src/routes/__root.tsx` – HTML shell + global Tailwind v4 styles (`globals.css`)
- `src/routes/index.tsx` – Registry showcase grid
- `src/components/open-in-v0-button.tsx` – Handles the v0 deep link
- `src/registry` – Source files shipped through the registry
- `public/r` – Generated registry JSON served to consumers

## Documentation

Visit the [shadcn registry documentation](https://ui.shadcn.com/docs/registry) to view the full documentation.

## References

- This template is based on the official [shadcn registry template](https://github.com/shadcn-ui/registry-template) and adapts it to TanStack Start + Cloudflare deployment.
- TanStack's migration notes for moving from Next.js to TanStack Start highlight how routing, server functions, and public assets map to this setup. See the [official guide](https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js) for deeper context.
- Alchemy's Cloudflare deployment guide covers the `alchemy dev` / `alchemy deploy` workflow used here. See [https://alchemy.run/guides/cloudflare-tanstack-start/](https://alchemy.run/guides/cloudflare-tanstack-start/).
