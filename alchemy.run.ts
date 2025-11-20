import alchemy from "alchemy";
import { TanStackStart } from "alchemy/cloudflare";

const app = await alchemy("shadcn-registry");

export const worker = await TanStackStart("app");

console.log({
  url: worker.url,
});

await app.finalize();
