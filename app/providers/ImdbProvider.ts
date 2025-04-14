// Hier sollen die Daten eines bestimmten Films beim Provider IMDB abgefragt und zurückgegeben werden.
import type { MovieMetadata } from '../interfaces/MovieMetadata';
import type { MovieRatingProvider } from '../interfaces/MovieRatingProvider';
import type { MovieRatingData } from '../interfaces/MovieRatingData';

export default class ImdbProvider implements MovieRatingProvider {
    readonly id = "imdb";
    readonly name = "IMDb";
    readonly homepageUrl = "https://www.imdb.com/";
    readonly logoUrl = "https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg";

    searchMovie(_query: string): Promise<MovieMetadata[]> {
        throw new Error(`Provider ${this.id} did not support searching for movies.`);
    }

    async getMovie(imdbId: string): Promise<MovieRatingData> {
        try {
            // Interne Server Route aufrufen. Token ist dort hinterlegt.
            const response = await $fetch(`api/providers/omdb-movie`, {
                query: { imdbId }
            });

            const movieData = response as {
                imdbID: string,
                Title: string,
                Year: string,
                imdbRating: string,
                imdbVotes: string,
            };

            if (!movieData) throw new Error('No movie found');

            const providerResponse: MovieRatingData = {
                id: this.id,
                name: this.name,
                homepageUrl: this.homepageUrl,
                logoUrl: this.logoUrl,
                userRating: movieData.imdbRating !== 'N/A' && movieData.imdbRating ? Number(movieData.imdbRating) : undefined,
                userVotes: movieData.imdbVotes !== 'N/A' && movieData.imdbVotes ? Number(movieData.imdbVotes.replaceAll(',', '')) : undefined,
                movieMetadata: {
                    title: movieData.Title,
                    year: movieData.Year,
                    imdbId: movieData.imdbID,
                }
            };

            return providerResponse;

        } catch (error) {
            console.error('Fehler beim fetchen der Daten:', error);
            throw error;
        }
    }

}
