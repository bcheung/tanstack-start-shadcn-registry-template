import type { worker } from '../alchemy.run.ts'

export type CloudflareEnv = typeof worker.Env

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Env extends CloudflareEnv {}
}

declare module 'cloudflare:workers' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Env extends CloudflareEnv {}
}

