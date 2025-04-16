// Hier sollen die Daten eines bestimmten Films beim Provider IMDB abgefragt und zurückgegeben werden.
import type { MovieMetadata } from '../interfaces/MovieMetadata';
import type { MovieRatingProvider } from '../interfaces/MovieRatingProvider';
import type { MovieRatingData } from '../interfaces/MovieRatingData';

export default class TraktDataProvider implements MovieRatingProvider {
    readonly id = "trakt";
    readonly name = "Trakt";
    readonly homepageUrl = "https://trakt.docs.apiary.io/";
    readonly logoUrl = "https://avatars.githubusercontent.com/u/5060045?s=48&v=4";

    searchMovie(_query: string): Promise<MovieMetadata[]> {
        throw new Error(`Provider ${this.id} did not support searching for movies.`);
    }

    async getMovie(imdbId: string): Promise<MovieRatingData> {
        try {
            // Interne Server Route aufrufen. Token ist dort hinterlegt.
            const response = await $fetch(`/api/providers/trakt-ratings`, {
                query: { imdbId }
            });

            const movieData = response as {
                rating?: number,
                votes?: number,
            };

            if (!movieData) throw new Error('No movie found');

            const providerResponse: MovieRatingData = {
                id: this.id,
                name: this.name,
                homepageUrl: this.homepageUrl,
                logoUrl: this.logoUrl,
                userRating: movieData.rating,
                userVotes: movieData.votes,
                movieMetadata: {
                    title: "no title",
                    year: "no year",
                    imdbId: imdbId,
                }
            };

            return providerResponse;

        } catch (error) {
            console.error('Fehler:', error);
            throw error;
        }
    }

}
