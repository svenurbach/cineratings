// Hier sollen die Daten eines bestimmten Films beim Provider TMDB abgefragt und zurückgegeben werden.
import type { MovieRatingProvider } from '../interfaces/MovieRatingProvider';
import type { MovieMetadata } from '../interfaces/MovieMetadata';
import type { MovieRatingData } from '../interfaces/MovieRatingData';

export default class TmdbDataProvider implements MovieRatingProvider {
    readonly id = 'tmdb';
    readonly name = 'TMDB';
    readonly homepageUrl = "https://www.themoviedb.org/";
    readonly logoUrl = 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg';
    readonly posterBaseURlSmall = 'https://image.tmdb.org/t/p/w342/';
    readonly posterBaseURlMedium = 'https://image.tmdb.org/t/p/w500/';

    async searchMovie(query: string): Promise<MovieMetadata[]> {
        try {
            const response = await $fetch(`api/providers/tmdb-search`, {
                query: { query }
            });

            const data = response as {
                results: {
                    title: string;
                    release_date: string,
                    id: string;
                    poster_path: string
                }[]
            };

            const movies: MovieMetadata[] = data.results
                .filter((movie) => movie.release_date && movie.poster_path)
                .map((movie) => ({
                    title: movie.title,
                    year: movie.release_date.substring(0, 4), // "2005-10-20"
                    imdbId: movie.id,
                    posterUrl: movie.poster_path ? this.posterBaseURlSmall.concat(movie.poster_path) : undefined,
                }));

            return movies;

        } catch (error) {
            console.error('Fehler:', error);
            throw error;
        }
    }

    async getMovie(query: string): Promise<MovieRatingData> {
        try {
            // Interne Server Route aufrufen. Token ist dort hinterlegt.
            const response = await $fetch(`api/providers/tmdb-movie`, {
                query: { query }
            });

            // Assertion eingesetzt, damit TypeScript weiß, dass es sich um ein Objekt mit bestimmten Eigenschaften handelt
            const movieData = (response as {
                movie_results: {
                    title: string;
                    poster_path: string;
                    release_date: string;
                    vote_average?: number;
                    vote_count?: number;
                    overview?: string;
                }[];
            }).movie_results[0];
            // PATTERN MUSS ZUM CUSTOM RESPONSE PASSEN! Auch die Typen!

            if (!movieData) throw new Error('No movie found');

            const providerResponse: MovieRatingData = {
                id: this.id,
                name: this.name,
                homepageUrl: this.homepageUrl,
                logoUrl: this.logoUrl,
                userRating: movieData.vote_average,
                userVotes: movieData.vote_count,
                movieMetadata: {
                    title: movieData.title,
                    year: movieData.release_date.substring(0, 4) ?? "Unknown", // "2005-10-20"
                    imdbId: query,
                    posterUrl: movieData.poster_path ? this.posterBaseURlMedium.concat(movieData.poster_path) : undefined,
                    plot: movieData.overview ?? "No plot available"
                }
            };

            return providerResponse;

        } catch (error) {
            console.error('Fehler:', error);
            throw error;
        }
    }
}
