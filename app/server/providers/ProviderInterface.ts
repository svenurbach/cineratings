import { IProviderResponse } from "../interfaces/IProviderResponse";

export interface ProviderInterface {

  fetchMovie(query: string): Promise<IProviderResponse>

}