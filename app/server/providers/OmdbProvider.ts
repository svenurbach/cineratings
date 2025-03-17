// Hier sollen die Daten eines bestimmten Films beim Provider OMDB abgefragt und zurückgegeben werden.
import type { CoreProvider } from '../interfaces/CoreProvider';
import type { Movie } from '../interfaces/Movie';

export default class OmdbProvider implements CoreProvider {
    readonly baseProvider = true; // TODO: Testing: Es darf nur einen base provider geben. #2 check typeOf und remove property!
    readonly providerId = 'omdb';
    readonly providerName = 'Open Media Database API';
    readonly providerUrl = "https://www.omdbapi.com/";

    // Filmsuche an search api. Zurück kommt eine Liste an Filmen
    async searchMovie(query: string): Promise<Movie[]> {
        try {
            const response = await $fetch(`api/providers/omdb-search`, {
                query: { query }
            });

            // TODO: Assertion nicht typ sicher. Nochmal prüfen
            const data = response as { Search: { Title: string; Year: string, imdbID: string; Poster: string }[] };
            const movies = data.Search.map((movie) => ({
                title: movie.Title,
                releaseDate: movie.Year,
                imdbId: movie.imdbID,
                posterUrl: movie.Poster !== 'N/A' ? movie.Poster : undefined,
                providers: []
            }));

            console.log('OMDB Provider: searchMovie->movies:', movies);
            return movies;

        } catch (error) {
            console.error('Fehler:', error);
            throw error;
        }
    }

    async fetchMovie(query: string) {
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

            const providerResponse: Movie = {
                title: movieData.Title,
                releaseDate: movieData.Year,
                imdbId: movieData.imdbID,
                posterUrl: movieData.Poster !== 'N/A' ? movieData.Poster : undefined,
                provider: {
                    providerId: this.providerId,
                    providerName: this.providerName,
                    providerUrl: this.providerUrl,
                    primaryRating: movieData.Metascore,
                },
                providers: []
            };

            // TODO: Values mit N/A ersetzen durch null

            return providerResponse;

        } catch (error) {
            console.error('Fehler:', error);
            throw error;
        }
    }

}
