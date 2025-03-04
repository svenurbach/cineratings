import type { IMovie } from "./IMovie";

export interface IProviderResponse {
  providerId: string;  // "tmdb"
  providerName: string; // "The Movie Database"
  providerLogo: string | null;
  providerUrl: string;
  primaryRating: string;
  userRating: string | null;
  movie: IMovie;
}