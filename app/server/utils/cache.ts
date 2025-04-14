import type { MovieRatingData } from "../../interfaces/MovieRatingData";

const cache = new Map<string, { data: MovieRatingData; expires: number }>();

export function getCache(key: string): MovieRatingData | null {
    const entry = cache.get(key);
    if (!entry) return null;

    // Check ob der cache abgelaufen ist
    if (Date.now() > entry.expires) {
        cache.delete(key);
        return null;
    }
    console.log(`---- [CACHE GET] key: ${key} ----`);

    return entry.data;
}

export function setCache(key: string, data: MovieRatingData, ttl: number = 60 * 1000): void {
    console.log(`---- [CACHE SET] key: ${key}, ttl: ${ttl} ----`);
    cache.set(key, { data, expires: Date.now() + ttl });
}

export function getFullCache() {
    return Array.from(cache.entries()).map(([key, value]) => ({
      key,
      data: value.data,
      expires: new Date(value.expires),
    }));
  }
