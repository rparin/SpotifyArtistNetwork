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

export const checkClientToken = async (cToken: ClientToken | undefined) => {
  let curDate = new Date().getTime();
  if (!cToken || curDate - cToken?.obtained_at >= 2400000) {
    try {
      const res = await fetch("http://localhost:8080/api/spotify/cAuthToken");
      const data = await res.json();
      return {
        access_token: data.access_token,
        obtained_at: new Date().getTime(),
      };
    } catch (error) {
      console.error("Error fetching client token:", error);
      return undefined;
    }
  }

  return cToken;
};
