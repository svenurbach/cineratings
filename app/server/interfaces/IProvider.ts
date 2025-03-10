import type { IMovie } from "./IMovie";

export interface IProvider {
  providerId: string;
  providerName: string;

  searchMovie(query: string): Promise<IMovie[]>;
  fetchMovie(query: string): Promise<IMovie>

}