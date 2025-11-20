import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const REGISTRY_BASE_URL = import.meta.env.VITE_BASE_URL;

if (!REGISTRY_BASE_URL) {
  throw new Error(
    "VITE_BASE_URL is not defined. Please set it in your .env file or environment variables.",
  );
}

export function getRegistryBaseUrl() {
  return REGISTRY_BASE_URL;
}

export function getRegistryItemUrl(name: string, base?: string) {
  if (!name) {
    throw new Error("Registry item name is required");
  }
  const origin = base ?? REGISTRY_BASE_URL;
  return new URL(`/r/${name}.json`, origin).toString();
}
