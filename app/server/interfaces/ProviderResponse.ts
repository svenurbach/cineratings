export interface ProviderResponse {
  readonly providerId: string;  // "tmdb"
  readonly providerName: string; // "The Movie Database"
  readonly providerUrl: string;
  readonly providerLogo?: string;
  readonly primaryRating?: string;
  readonly userRating?: string;
  readonly userVotes?: string;
}
