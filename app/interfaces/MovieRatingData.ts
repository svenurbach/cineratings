import type { MovieRatingProviderInfo } from "./MovieRatingProviderInfo";
import type { MovieMetadata } from "./MovieMetadata";

export interface MovieRatingData extends MovieRatingProviderInfo{
  readonly primaryRating?: number;
  readonly userRating?: number;
  readonly userVotes?: number;
  readonly movieMetadata: MovieMetadata;
}
