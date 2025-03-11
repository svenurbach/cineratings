// Bekommt Datan vom dataService
// Hier möchte ich die zurückgegebenen Daten der Provider, welcher der User, ausgewählt hat verarbeiten.
import type { IMovie } from '../interfaces/IMovie';
import type { IProviderResponse } from '../interfaces/IProviderResponse';

export default class RatingService {

    static calculateAggregatedMovieRating(movie: IMovie) {
        // Hier muss ein orderntlicher Algorithmus rein welcher prüft, 
        // welche ratings vorhanden sind, sie gewichtet und dann auswertet
        let sum = 0;
        let count = 0;
        movie.providers.forEach(provider => {
            if (provider.primaryRating) {
                sum += parseFloat(provider.primaryRating);
                count++;
            }
        });
        const result = sum / count;
        return 6.5;
    }

    static buildCustomProviderRating(movie: IMovie): IProviderResponse {
        // TODO: Daten müssen aus der AppConfig kommen
        const provider: IProviderResponse = {
            providerId: 'cr',
            providerName: 'CineRatings',
            providerUrl: 'https://www.cineratings.de',
            providerLogo: '',
            primaryRating: RatingService.calculateAggregatedMovieRating(movie).toString(),
            userRating: null,
            userVotes: null
        };
        console.log('buildCustomProviderRating', provider);
        return provider;
    }

}