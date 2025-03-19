import type { MovieRatingProviderInfo } from "./MovieRatingProviderInfo";
import type { MovieMetadata } from "./MovieMetadata";

export interface MovieRatingData extends MovieRatingProviderInfo{
  readonly primaryRating?: string;
  readonly userRating?: string;
  readonly userVotes?: string;
  readonly movieMetadata: MovieMetadata;
}
