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

export function formatNumber(num: number) {
  const precision = 2;
  const map = [
    { suffix: "T", threshold: 1e12 },
    { suffix: "B", threshold: 1e9 },
    { suffix: "M", threshold: 1e6 },
    { suffix: "K", threshold: 1e3 },
    { suffix: "", threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted.replace(".00", "");
  }

  return num;
}

export function delay(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}
