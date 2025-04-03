// Hier sollen die Daten eines bestimmten Films beim Provider IMDB abgefragt und zurückgegeben werden.
import type { MovieRatingProvider } from '../interfaces/MovieRatingProvider';
import type { MovieMetadata } from '../interfaces/MovieMetadata';
import type { MovieRatingData } from '../interfaces/MovieRatingData';

export default class MetacriticProvider implements MovieRatingProvider {
    readonly id = "metacritic";
    readonly name = "Metacritic";
    readonly homepageUrl = "https://www.metacritic.com/";
    readonly logoUrl = "https://upload.wikimedia.org/wikipedia/commons/f/f2/Metacritic_M.png";

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

            // "Ratings": [
            //     {
            //         "Source": "Internet Movie Database",
            //         "Value": "7.5/10"
            //     },
            //     {
            //         "Source": "Rotten Tomatoes",
            //         "Value": "96%"
            //     },
            //     {
            //         "Source": "Metacritic",
            //         "Value": "80/100"
            //     }
            // ],

            if (!movieData) throw new Error('No movie found');

            const metacriticRating = movieData.Ratings.find((rating) => rating.Source === 'Metacritic')?.Value;
            const primaryRating = metacriticRating && metacriticRating !== 'N/A'
                ? metacriticRating.split('/')[0]
                : undefined;

            const providerResponse: MovieRatingData = {
                id: this.id,
                name: this.name,
                homepageUrl: this.homepageUrl,
                logoUrl: this.logoUrl,
                primaryRating: Number(primaryRating),
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
