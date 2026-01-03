import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path: string) {
  // Primary: Environment variable from build/config
  const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

  // Secondary: Detect from GitHub Actions env if available on client
  const isGithubActions = typeof window !== "undefined"
    ? (window as any).__NEXT_DATA__?.props?.pageProps?.isGithubActions
    : (process.env.GITHUB_ACTIONS === "true" || process.env.NEXT_PUBLIC_GITHUB_ACTIONS === "true");

  const basePath = envBasePath ?? (isGithubActions ? "/atharv_portfolio" : "");

  if (path.startsWith("/")) {
    return `${basePath}${path}`;
  }
  return path;
}
