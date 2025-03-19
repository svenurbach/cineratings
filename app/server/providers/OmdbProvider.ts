// Hier sollen die Daten eines bestimmten Films beim Provider OMDB abgefragt und zurückgegeben werden.
import type { MovieRatingProvider } from '../interfaces/MovieRatingProvider';
import type { MovieMetadata } from '../interfaces/MovieMetadata';
import type { MovieRatingData } from '../interfaces/MovieRatingData';

export default class OmdbProvider implements MovieRatingProvider {
    readonly mainProvider = true; // TODO: Testing: Es darf nur einen base provider geben. #2 check typeOf und remove property!
    readonly id = 'omdb';
    readonly name = 'Open Media Database API';
    readonly homepageUrl = "https://www.omdbapi.com/";

    // Filmsuche an search api. Zurück kommt eine Liste an Filmen
    async searchMovie(query: string): Promise<MovieMetadata[]> {
        try {
            const response = await $fetch(`api/providers/omdb-search`, {
                query: { query }
            });

            // TODO: Assertion nicht typ sicher. Nochmal prüfen
            const data = response as { Search: { Title: string; Year: string, imdbID: string; Poster: string }[] };
            const movies: MovieMetadata[] = data.Search.map((movie) => ({
                title: movie.Title,
                year: movie.Year,
                imdbId: movie.imdbID,
                posterUrl: movie.Poster !== 'N/A' ? movie.Poster : undefined,
            }));

            console.log('OMDB Provider: searchMovie->movies:', movies);
            return movies;

        } catch (error) {
            console.error('Fehler:', error);
            throw error;
        }
    }

    async fetchMovie(imdbId: string): Promise<MovieRatingData> {
        try {
            // Interne Server Route aufrufen. Token ist dort hinterlegt.
            // TODO: Was wird mitgegeben?
            const response = await $fetch(`api/providers/omdb-movie`, {
                query: { imdbId }
            });

            // Check if more than one result was returned
            // If so, return a list of movies to the view and let the user choose one
            // Make a id search with the users choice

            console.log('OMDB Provider: fetchMovie->response:', response);

            // Assertion eingesetzt, damit TypeScript weiß, dass es sich um ein Objekt mit bestimmten Eigenschaften handelt
            const movieData = response as { Metascore: string, imdbID: string, Title: string, Year: string, Poster: string };

            if (!movieData) throw new Error('No movie found');

            const providerResponse: MovieRatingData = {
                id: this.id,
                name: this.name,
                homepageUrl: this.homepageUrl,
                primaryRating: movieData.Metascore !== 'N/A' ? movieData.Metascore : undefined,
                movieMetadata: {
                    title: movieData.Title,
                    year: movieData.Year,
                    imdbId: movieData.imdbID,
                    posterUrl: movieData.Poster !== 'N/A' ? movieData.Poster : undefined,
                }
            };

            // TODO: Values mit N/A ersetzen durch null

            return providerResponse;

        } catch (error) {
            console.error('Fehler:', error);
            throw error;
        }
    }

}
