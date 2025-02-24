import type { IProviderResponse } from "./IProviderResponse";

export interface IProvider {
  // providerName: string;

  fetchMovie(query: string): Promise<IProviderResponse>

}