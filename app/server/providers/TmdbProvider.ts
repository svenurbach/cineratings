// Hier sollen die Daten eines bestimmten Films beim Provider TMDB abgefragt und zurückgegeben werden.
import type { Movie } from '../interfaces/Movie';
import type { Provider } from '../interfaces/Provider';

export default class TmdbProvider implements Provider {
    readonly providerId = 'tmdb';
    readonly providerName = 'The Movie Database (TMDB)';
    readonly providerLogo = 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg';
    readonly providerUrl = "https://www.themoviedb.org/";

    async fetchMovie(query: string) {
        try {
            // Interne Server Route aufrufen. Token ist dort hinterlegt.
            const response = await $fetch(`api/providers/tmdb`, {
                query: { query }
            });
            console.log('TMDB Provider: fetchMovie->response:', response);

            // Check if more than one result was returned
            // If so, return a list of movies to the view and let the user choose one
            // Make a id search with the users choice

            // Assertion eingesetzt, damit TypeScript weiß, dass es sich um ein Objekt mit bestimmten Eigenschaften handelt
            const movieData = response as { vote_average: number, imdbID: string, title: string, release_date: string, poster_path: string, vote_count: number };
            // PATTERN MUSS ZUM CUSTOM RESPONSE PASSEN! Auch die Typen!

            if (!movieData) throw new Error('No movie found');

            if (import.meta.server) {
                console.log("Dieser Code läuft auf dem Server.");
            }

            if (import.meta.client) {
                console.log("Dieser Code läuft im Client.");
            }

            const providerResponse: Movie = {
                title: movieData.title,
                releaseDate: movieData.release_date,
                imdbId: query,
                posterUrl: movieData.poster_path,
                provider: {
                    providerId: this.providerId,
                    providerName: this.providerName,
                    providerLogo: this.providerLogo,
                    providerUrl: this.providerUrl,
                    userRating: movieData.vote_average.toString(),
                    userVotes: movieData.vote_count.toString()
                },
                providers: []
            };

            return providerResponse;

        } catch (error) {
            console.error('Fehler:', error);
            throw error;
        }
    }
}
