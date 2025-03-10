// Hier sollen die Daten eines bestimmten Films beim Provider TMDB abgefragt und zurückgegeben werden.
import type { IMovie } from '../interfaces/IMovie';
import type { IProvider } from '../interfaces/IProvider';
import type { IProviderResponse } from '../interfaces/IProviderResponse';

export default class TmdbProvider implements IProvider {
    readonly providerId = 'tmdb';
    readonly providerName = 'The Movie Database (TMDB)';
    readonly providerLogo = 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg';
    readonly providerUrl = "https://www.themoviedb.org/";

    searchMovie(query: string): Promise<IMovie[]> {
        throw new Error('Method not implemented.');
    }

    async fetchMovie(query: string): Promise<IProviderResponse> {
        try {
            // Interne Server Route aufrufen. Token ist dort hinterlegt.
            const response = await $fetch(`api/providers/omdb-movie`, {
                query: { query }
            });

            // Check if more than one result was returned
            // If so, return a list of movies to the view and let the user choose one
            // Make a id search with the users choice

            // Assertion eingesetzt, damit TypeScript weiß, dass es sich um ein Objekt mit bestimmten Eigenschaften handelt
            const movieData = response as { Metascore: string, imdbID: string, Title: string, Year: string, Poster: string };

            if (!movieData) throw new Error('No movie found');

            if (import.meta.server) {
                console.log("Dieser Code läuft auf dem Server.");
            }

            if (import.meta.client) {
                console.log("Dieser Code läuft im Client.");
            }

            const providerResponse: IProviderResponse = {
                providerId: this.providerId,
                providerName: this.providerName,
                providerLogo: this.providerLogo,
                providerUrl: this.providerUrl,
                primaryRating: movieData.Metascore,
                userRating: null,
                movie: {
                    imdbId: movieData.imdbID,
                    title: movieData.Title,
                    releaseDate: movieData.Year,
                    posterUrl: movieData.Poster
                }
            };

            return providerResponse;

        } catch (error) {
            console.error('Fehler:', error);
            throw error;
        }
    }
}