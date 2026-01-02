import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path: string) {
  const basePath = "/atharv_portfolio";
  if (process.env.NODE_ENV === "production" && path.startsWith("/")) {
    return `${basePath}${path}`;
  }
  return path;
}
