import type { MovieMetadata } from "./MovieMetadata";
import type { MovieRatingData } from "./MovieRatingData";

export interface MovieRatingProvider {
  readonly id: string; // "tmdb"
  readonly name: string; // "The Movie Database"
  readonly homepageUrl: string;
  readonly logoUrl?: string;

  searchMovie(query: string): Promise<MovieMetadata[]>
  fetchMovie(query: string): Promise<MovieRatingData>
}
