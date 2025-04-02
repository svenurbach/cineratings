// Hier sollen die Daten eines bestimmten Films beim Provider IMDB abgefragt und zurückgegeben werden.
import type { MovieRatingProvider } from '../interfaces/MovieRatingProvider';
import type { MovieMetadata } from '../interfaces/MovieMetadata';
import type { MovieRatingData } from '../interfaces/MovieRatingData';

export default class RottentomatoesProvider implements MovieRatingProvider {
    readonly id = "rottentomatoes";
    readonly name = "Rotten Tomatoes";
    readonly homepageUrl = "https://www.rottentomatoes.com/";
    readonly logoUrl = "https://upload.wikimedia.org/wikipedia/commons/6/6f/Rotten_Tomatoes_logo.svg";

    searchMovie(_query: string): Promise<MovieMetadata[]> {
        throw new Error(`Provider ${this.id} did not support searching for movies.`);
    }

    async fetchMovie(imdbId: string): Promise<MovieRatingData> {
        try {
            // Interne Server Route aufrufen. Token ist dort hinterlegt.
            const response = await $fetch(`api/providers/omdb-movie`, {
                query: { imdbId }
            });

            const movieData = response as {
                imdbID: string,
                Title: string,
                Year: string,
                Ratings: {
                    Source: string,
                    Value: string,
                }[],
            };

            if (!movieData) throw new Error('No movie found');

            const rtRating = movieData.Ratings.find((rating) => rating.Source === 'Rotten Tomatoes')?.Value;
            const primaryRating = rtRating && rtRating !== 'N/A'
                ? rtRating.split('%')[0]
                : undefined;

            const providerResponse: MovieRatingData = {
                id: this.id,
                name: this.name,
                homepageUrl: this.homepageUrl,
                logoUrl: this.logoUrl,
                primaryRating: primaryRating,
                movieMetadata: {
                    title: movieData.Title,
                    year: movieData.Year,
                    imdbId: movieData.imdbID,
                }
            };

            return providerResponse;

        } catch (error) {
            console.error('Fehler:', error);
            throw error;
        }
    }
}
