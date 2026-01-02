import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path: string) {
  const isGithubActions = process.env.GITHUB_ACTIONS === "true" || process.env.NEXT_PUBLIC_GITHUB_ACTIONS === "true";
  const basePath = isGithubActions ? "/atharv_portfolio" : "";

  if (path.startsWith("/")) {
    return `${basePath}${path}`;
  }
  return path;
}
