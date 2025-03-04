import type { IMovie } from "./IMovie";
import type { IProviderResponse } from "./IProviderResponse";

export interface IProvider {
  providerId: string;
  providerName: string;

  searchMovie(query: string): Promise<IMovie[]>;
  fetchMovie(query: string): Promise<IProviderResponse>

}