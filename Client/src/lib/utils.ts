// import { type ClassValue, clsx } from "clsx";
// import { twMerge } from "tailwind-merge";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

export interface Dictionary<T> {
  [Key: string]: T;
}

export interface Node {
  id: string;
  spotify_id: string;
  img: string;
  size: number;
}
