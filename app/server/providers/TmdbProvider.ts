// Hier sollen die Daten eines bestimmten Films beim Provider TMDB abgefragt und zurückgegeben werden.
import type { IProvider } from '../interfaces/IProvider';
import type { IProviderResponse } from '../interfaces/IProviderResponse';

export default class TmdbProvider implements IProvider {
    static readonly providerId = 'tmdb';
    static readonly providerName = 'The Movie Database';
    readonly providerLogo = 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg';
    readonly providerUrl = "https://www.themoviedb.org/";
    
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
        //     const response = await fetch(
        //         `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
        //         this.options
        //     );

        //     if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

        //     const data = await response.json();
        //     const movie = data.results[0];

        //     if (!movie) throw new Error('Kein Film gefunden');

        //     const providerResponse: IProviderResponse = {
        //         providerId: movie.id,
        //         providerName: movie.title,
        //         providerLogo: movie.release_date,
        //         providerUrl: movie.vote_average
        //     };

        if (import.meta.server) {
        console.log("Dieser Code läuft auf dem Server.");
        }
        
        if (import.meta.client) {
        console.log("Dieser Code läuft im Client.");
        }
          
            const providerResponse: IProviderResponse = {
                providerId: TmdbProvider.providerId,
                providerName: TmdbProvider.providerName,
                providerLogo: this.providerLogo,
                providerUrl: this.providerUrl,
                primaryRating: 8.1,
                userRating: 9.3
            };

            return providerResponse;

        } catch (error) {
            console.error('Fehler:', error);
            throw error;
        }
    }
}