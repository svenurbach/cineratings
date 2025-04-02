/**
 * Factory für die Erstellung von MovieRatingProvider-Instanzen.
 */
import type { MovieRatingProvider } from "../interfaces/MovieRatingProvider";
import OmdbProvider from "../providers/OmdbProvider";
import TmdbProvider from "../providers/TmdbProvider";
import ImdbProvider from "../providers/ImdbProvider";
import MetacriticProvider from "../providers/MetacriticProvider";
import RottenTomatoesProvider from "../providers/RottentomatoesProvider";
import TrakrProvider from "../providers/TraktProvider";

const providerMap: Record<string, new () => MovieRatingProvider> = {
  tmdb: TmdbProvider,
  omdb: OmdbProvider,
  imdb: ImdbProvider,
  metacritic: MetacriticProvider,
  rottentomatoes: RottenTomatoesProvider,
  trakt: TrakrProvider
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
