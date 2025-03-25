// Bekommt Datan vom dataService
// Hier möchte ich die zurückgegebenen Daten der Provider, welcher der User, ausgewählt hat verarbeiten.
import type { MovieRatingData } from '../interfaces/MovieRatingData';

export default class RatingService {
    ownMaxRating: number;
    primaryRatingWeight: number;
    userRatingWeight: number;

    public constructor() {
        this.ownMaxRating = 100;
        this.primaryRatingWeight = 0.5;
        this.userRatingWeight = 0.5;
    }

    public getAggregatedMovieRating(ratingDataRecords: MovieRatingData[]): string {
        let totalPrimaryRating = 0;
        let totalPrimaryRatingCount = 0;
        let totalUserRating = 0;
        let totalUserVotes = 0;

        for (const record of ratingDataRecords) {
            // Berechnung mit dem arithmetische Mittel
            if (record.primaryRating != null) {
                totalPrimaryRating += Number(record.primaryRating);
                totalPrimaryRatingCount += 1;
            }
            // Berechnung mit dem gewichteten arithmetischen Mittel (absolute Häufigkeit)
            if (record.userRating != null && record.userVotes != null) {
                totalUserRating += this.normalizeRating(Number(record.userRating), 10)
                * Number(record.userVotes);
                totalUserVotes += Number(record.userVotes);
            }
        }

        const finalPrimaryRating = totalPrimaryRating / totalPrimaryRatingCount;
        const finalUserRating = totalUserRating / totalUserVotes;

        if (!finalPrimaryRating) {
            return finalUserRating.toString();
        }

        if (!finalUserRating) {
            return finalPrimaryRating.toString();
        }

        // const finalMetaScore = (finalPrimaryRating + finalUserRating) / 2;
        const finalWeightedMetaScore = (finalPrimaryRating *  this.primaryRatingWeight)
        + (finalUserRating * this.userRatingWeight);

        return finalWeightedMetaScore.toFixed(0).toString();
    }

    // Normalize 5.9 to 59
    public normalizeRating(rating: number, maxRating: number): number {
        const normalizedRating = (rating / maxRating) * this.ownMaxRating
        return normalizedRating;
    }

    // Wird nicht mehr gebraucht
    public getMaxUserVoting(ratingDataRecords: MovieRatingData[]): number {
        let maxUserVoting = 0;
        ratingDataRecords.forEach(provider => {
            if (provider.userVotes && Number(provider.userVotes) > maxUserVoting) {
                maxUserVoting = Number(provider.userVotes);
            }
        });
        return maxUserVoting;
    }
}
