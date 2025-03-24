// Bekommt Datan vom dataService
// Hier möchte ich die zurückgegebenen Daten der Provider, welcher der User, ausgewählt hat verarbeiten.
import type { MovieRatingData } from '../interfaces/MovieRatingData';

export default class RatingService {

    static calculateAggregatedMovieRating(ratingDataRecords: MovieRatingData[]): string {
        // Hier muss ein orderntlicher Algorithmus rein welcher prüft,
        // welche ratings vorhanden sind, sie gewichtet und dann auswertet
        let sum = 0;
        let count = 0;

        // TODO: Testing!
        // 1. Wenn nur PR dann in format XX umgewandelt werden
        // 2. WEnn nur UR dann in format XX umgewandelt werden
        // 3. Wenn UR und UV hat müssen diese gewichtet werden und anschießend auf XX umgewandelt werden




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
