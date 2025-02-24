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

    exampleResponse = {
        "adult": false,
        "backdrop_path": "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
        "belongs_to_collection": null,
        "budget": 160000000,
        "genres": [
            {
                "id": 28,
                "name": "Action"
            },
            {
                "id": 878,
                "name": "Science Fiction"
            },
            {
                "id": 12,
                "name": "Adventure"
            }
        ],
        "homepage": "https://www.warnerbros.com/movies/inception",
        "id": 27205,
        "imdb_id": "tt1375666",
        "origin_country": [
            "US",
            "GB"
        ],
        "original_language": "en",
        "original_title": "Inception",
        "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
        "popularity": 23.572,
        "poster_path": "/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
        "production_companies": [
            {
                "id": 923,
                "logo_path": "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png",
                "name": "Legendary Pictures",
                "origin_country": "US"
            },
            {
                "id": 9996,
                "logo_path": "/3tvBqYsBhxWeHlu62SIJ1el93O7.png",
                "name": "Syncopy",
                "origin_country": "GB"
            },
            {
                "id": 174,
                "logo_path": "/zhD3hhtKB5qyv7ZeL4uLpNxgMVU.png",
                "name": "Warner Bros. Pictures",
                "origin_country": "US"
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "GB",
                "name": "United Kingdom"
            },
            {
                "iso_3166_1": "US",
                "name": "United States of America"
            }
        ],
        "release_date": "2010-07-15",
        "revenue": 839030630,
        "runtime": 148,
        "spoken_languages": [
            {
                "english_name": "English",
                "iso_639_1": "en",
                "name": "English"
            },
            {
                "english_name": "French",
                "iso_639_1": "fr",
                "name": "Français"
            },
            {
                "english_name": "Japanese",
                "iso_639_1": "ja",
                "name": "日本語"
            },
            {
                "english_name": "Swahili",
                "iso_639_1": "sw",
                "name": "Kiswahili"
            }
        ],
        "status": "Released",
        "tagline": "Your mind is the scene of the crime.",
        "title": "Inception",
        "video": false,
        "vote_average": 8.369,
        "vote_count": 37080
    }

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