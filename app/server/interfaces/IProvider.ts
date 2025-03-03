import type { IProviderResponse } from "./IProviderResponse";

export interface IProvider {
  providerId: string;
  providerName: string;

  fetchMovie(query: string): Promise<IProviderResponse>

}