// Bekommt Datan vom dataService
// Hier möchte ich die zurückgegebenen Daten der Provider, welcher der User, ausgewählt hat verarbeiten.
import type { Movie } from '../interfaces/Movie';
import type { ProviderResponse } from '../interfaces/ProviderResponse';

export default class RatingService {

    static calculateAggregatedMovieRating(movie: Movie) {
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

    static buildCustomProviderRating(movie: Movie): ProviderResponse {
        // TODO: Daten müssen aus der AppConfig kommen
        const provider: ProviderResponse = {
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
