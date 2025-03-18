import type { MovieMetadata } from "./MovieMetadata";

export interface MovieRatingData {
  // TODO: Redundant (siehe MovieRatingProvider)
  readonly id: string; // "tmdb"
  readonly name: string; // "The Movie Database"
  readonly homepageUrl: string;
  readonly logoUrl?: string;

  readonly primaryRating?: string;
  readonly userRating?: string;
  readonly userVotes?: string;
  readonly movieMetadata: MovieMetadata;
}
