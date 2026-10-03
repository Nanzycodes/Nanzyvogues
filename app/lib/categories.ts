// src/lib/categories.ts
export const CATEGORIES = [
  "slides",
  "sneakers",
  "clothes",
  "trousers",
  "general",
] as const;

export type Category = (typeof CATEGORIES)[number];

export function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}