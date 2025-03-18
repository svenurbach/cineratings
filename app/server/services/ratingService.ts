// Bekommt Datan vom dataService
// Hier möchte ich die zurückgegebenen Daten der Provider, welcher der User, ausgewählt hat verarbeiten.
import type { MovieRatingData } from '../interfaces/MovieRatingData';

export default class RatingService {

    static calculateAggregatedMovieRating(ratingDataRecords: MovieRatingData[]): string {
        // Hier muss ein orderntlicher Algorithmus rein welcher prüft,
        // welche ratings vorhanden sind, sie gewichtet und dann auswertet
        let sum = 0;
        let count = 0;
        ratingDataRecords.forEach(provider => {
            if (provider.primaryRating) {
                sum += parseFloat(provider.primaryRating);
                count++;
            }
        });
        const result = sum / count;
        const custom = '6.5';
        return custom;
    }

}
