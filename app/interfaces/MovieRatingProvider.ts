import type { MovieRatingProviderInfo } from "./MovieRatingProviderInfo";
import type { MovieMetadata } from "./MovieMetadata";
import type { MovieRatingData } from "./MovieRatingData";

export interface MovieRatingProvider extends MovieRatingProviderInfo {
  searchMovie(query: string): Promise<MovieMetadata[]>
  fetchMovie(query: string): Promise<MovieRatingData>
}
