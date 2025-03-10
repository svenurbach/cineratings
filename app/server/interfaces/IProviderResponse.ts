export interface IProviderResponse {
  providerId: string;  // "tmdb"
  providerName: string; // "The Movie Database"
  providerUrl: string;
  providerLogo: string | null;
  primaryRating: string | null;
  userRating: string | null;
  userVotes: string | null;
}