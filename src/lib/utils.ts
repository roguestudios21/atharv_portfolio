import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path: string) {
  if (typeof window === "undefined") {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    return path.startsWith("/") ? `${basePath}${path}` : path;
  }

  // Client-side: Try environment variable first
  let basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // If environment variable is missing or empty, detect from current location
  // This is a fallback for GitHub Pages subpath deployments
  if (!basePath && window.location.pathname.startsWith("/atharv_portfolio")) {
    basePath = "/atharv_portfolio";
  }

  if (path.startsWith("/")) {
    return `${basePath}${path}`;
  }
  return path;
}
