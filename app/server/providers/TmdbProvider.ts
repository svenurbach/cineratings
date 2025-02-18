// Hier sollen die Daten eines bestimmten Films beim Provider TMDB abgefragt und zurückgegeben werden.
import { ProviderInterface } from './ProviderInterface';
import { IProviderResponse } from '../interfaces/IProviderResponse';

export class TmdbProvider implements ProviderInterface {
    private readonly providerId = 'tmdb';
    private readonly providerName = 'The Movie Database';
    private readonly providerLogo: any;
    private readonly providerUrl = "https://www.themoviedb.org/";
    
    private config;
    private options;

    constructor() {
        this.config = useRuntimeConfig();
        this.options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${this.config.tmdbBearerToken}`
            }
        };
    }

    async fetchMovie(query: string): Promise<IProviderResponse>{
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
                this.options
            );

            if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

            const data = await response.json();
            const movie = data.results[0];

            if (!movie) throw new Error('Kein Film gefunden');

            const providerResponse: IProviderResponse = {
                providerId: movie.id,
                providerName: movie.title,
                providerLogo: movie.release_date,
                providerUrl: movie.vote_average
            };

            return providerResponse;

        } catch (error) {
            console.error('Fehler:', error);
            throw error;
        }
    }
}