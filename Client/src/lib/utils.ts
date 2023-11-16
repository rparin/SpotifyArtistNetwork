import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { StaticImageData } from "next/image";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Img = {
  img: StaticImageData;
  alt: string;
  invert?: boolean;
};

export interface Dictionary<T> {
  [Key: string]: T;
}

export interface Node {
  id: string;
  spotify_id: string;
  img: string;
  size: number;
}

export interface ClientToken {
  access_token: string;
  obtained_at: number;
}
