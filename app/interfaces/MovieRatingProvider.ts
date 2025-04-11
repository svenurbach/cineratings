import type { MovieRatingProviderInfo } from "./MovieRatingProviderInfo";
import type { MovieMetadata } from "./MovieMetadata";
import type { MovieRatingData } from "./MovieRatingData";

export interface MovieRatingProvider extends MovieRatingProviderInfo {
  /**
   * Sucht nach Filmen basierend auf einer Suchanfrage.
   * @param query Die Suchanfrage (Titel des Films).
   * @returns Eine Liste von Metadaten der gefundenen Filme.
   */
  searchMovie(query: string): Promise<MovieMetadata[]>

  /**
   * Ruft die Daten eines Films basierend auf einer Anfrage ab.
   * @param query IMDb-ID des Films.
   * @returns Die Daten des Films.
   */
  getMovie(query: string): Promise<MovieRatingData>
}
