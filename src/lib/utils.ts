import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path: string) {
  // Use prefix from environment or default to empty
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  if (path.startsWith("/")) {
    // Return prefixed path, avoiding double-prefixing if already present
    return `${basePath}${path}`;
  }
  return path;
}
