// Hier sollen die Daten eines bestimmten Films beim Provider OMDB abgefragt und zurückgegeben werden.
import type { MovieRatingProvider } from '../interfaces/MovieRatingProvider';
import type { MovieMetadata } from '../interfaces/MovieMetadata';
import type { MovieRatingData } from '../interfaces/MovieRatingData';

export default class OmdbProvider implements MovieRatingProvider {
    readonly mainProvider = true; // TODO: Wird aktuell nicht genutzt
    readonly id = 'omdb';
    readonly name = 'Open Media Database API';
    readonly homepageUrl = "https://www.omdbapi.com/";
    readonly logoUrl = "/images/provider/omdb-logo.png";

    // Filmsuche an search api. Zurück kommt eine Liste an Filmen
    async searchMovie(query: string): Promise<MovieMetadata[]> {
        try {
            const response = await $fetch(`api/providers/omdb-search`, {
                query: { query }
            });

            const data = response as {
                Search: {
                    Title: string;
                    Year: string,
                    imdbID: string;
                    Poster: string
                }[]
            };
            const movies: MovieMetadata[] = data.Search.map((movie) => ({
                title: movie.Title,
                year: movie.Year,
                imdbId: movie.imdbID,
                posterUrl: movie.Poster !== 'N/A' ? movie.Poster : undefined,
            }));

            return movies;

        } catch (error) {
            console.error('Fehler:', error);
            throw error;
        }
    }

    async fetchMovie(imdbId: string): Promise<MovieRatingData> {
        try {
            // Interne Server Route aufrufen. Token ist dort hinterlegt.
            const response = await $fetch(`api/providers/omdb-movie`, {
                query: { imdbId }
            });

            const movieData = response as {
                Metascore: string,
                imdbID: string,
                Title: string,
                Year: string,
                Poster: string,
                Runtime: string,
                Plot: string,
            };

            if (!movieData) throw new Error('No movie found');

            const providerResponse: MovieRatingData = {
                id: this.id,
                name: this.name,
                homepageUrl: this.homepageUrl,
                logoUrl: this.logoUrl,
                primaryRating: movieData.Metascore !== 'N/A' ? parseInt(movieData.Metascore, 10) : undefined,
                movieMetadata: {
                    title: movieData.Title,
                    year: movieData.Year,
                    imdbId: movieData.imdbID,
                    posterUrl: movieData.Poster !== 'N/A' ? movieData.Poster : undefined,
                    runtime: movieData.Runtime !== 'N/A' ? movieData.Runtime : undefined,
                    plot: movieData.Plot !== 'N/A' ? movieData.Plot : undefined,
                }
            };

            return providerResponse;

        } catch (error) {
            console.error('Fehler:', error);
            throw error;
        }
    }

}
