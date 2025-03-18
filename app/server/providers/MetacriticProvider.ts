// Hier sollen die Daten eines bestimmten Films beim Provider IMDB abgefragt und zurückgegeben werden.
import type { MovieRatingProvider } from '../interfaces/MovieRatingProvider';
import type { MovieMetadata } from '../interfaces/MovieMetadata';
import type { MovieRatingData } from '../interfaces/MovieRatingData';

export default class MetacriticProvider implements MovieRatingProvider {
    id = "metacritic";
    name = "Metacritic";

    searchMovie(_query: string): Promise<MovieMetadata[]> {
        throw new Error('Method not implemented.');
    }

    fetchMovie(_query: string): Promise<MovieRatingData> {
        throw new Error('Method not implemented.');
    }

}
