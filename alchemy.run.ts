import alchemy from "alchemy";
import { TanStackStart } from "alchemy/cloudflare";

const app = await alchemy("shadcn-registry");

export const worker = await TanStackStart("app", {
  // Optional: Specify a custom domain for the worker
  // See: https://alchemy.run/providers/cloudflare/custom-domain/
  // domains: ["registry.acme.com"]
});

console.log({
  url: worker.url,
});

await app.finalize();
