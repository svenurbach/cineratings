import type { Movie } from "./Movie";

export interface Provider {
  readonly providerId: string;
  readonly providerName: string;

  fetchMovie(query: string): Promise<Movie>
}
