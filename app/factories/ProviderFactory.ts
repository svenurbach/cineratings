/**
 * Factory für die Erstellung von MovieRatingProvider-Instanzen.
 */
import type { MovieRatingProvider } from "../interfaces/MovieRatingProvider";
import OmdbDataProvider from "../providers/OmdbDataProvider";
import TmdbDataProvider from "../providers/TmdbDataProvider";
import ImdbDataProvider from "../providers/ImdbDataProvider";
import MetacriticDataProvider from "../providers/MetacriticDataProvider";
import RottenTomatoesProvider from "../providers/RottentomatoesDataProvider";
import TraktDataProvider from "../providers/TraktDataProvider";

const providerMap: Record<string, new () => MovieRatingProvider> = {
  tmdb: TmdbDataProvider,
  omdb: OmdbDataProvider,
  imdb: ImdbDataProvider,
  metacritic: MetacriticDataProvider,
  rottentomatoes: RottenTomatoesProvider,
  trakt: TraktDataProvider
};

export default class ProviderFactory {

  /**
   * Erstellt MovieRatingProvider-Instanzen anhand der übergebenen Provider-Namen.
   * @param providerNames
   * @returns MovieRatingProviders
   */
  public createProviders(providerNames: string[]): MovieRatingProvider[] {
    const providers: MovieRatingProvider[] = [];

    providerNames.forEach(provider => {
      const ProviderClass = providerMap[provider];
      if (!ProviderClass) {
        throw new Error(`Unbekannter Provider: ${provider}`);
      }
      providers.push(new ProviderClass());
    });

    console.log("ProviderFactory > createProviders:", providers);

    return providers;
  }

}
