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

    public getAggregatedMovieRating(ratingDataRecords: MovieRatingData[]): number {
        let totalPrimaryRating = 0;
        let totalPrimaryRatingCount = 0;
        let totalUserRating = 0;
        let totalUserVotes = 0;

        for (const record of ratingDataRecords) {
            // Berechnung mit dem arithmetische Mittel
            if (record.primaryRating) {
                totalPrimaryRating += record.primaryRating;
                totalPrimaryRatingCount += 1;
            }
            // Berechnung mit dem gewichteten arithmetischen Mittel (absolute Häufigkeit)
            if (record.userRating && record.userVotes) {
                // TODO: Der Wert maxwert muss vom provider kommen
                totalUserRating += this.normalizeRating(record.userRating, 10)
                    * record.userVotes;
                totalUserVotes += record.userVotes;
            }
        }

        const finalPrimaryRating = totalPrimaryRating / totalPrimaryRatingCount;
        const finalUserRating = totalUserRating / totalUserVotes;

        if (!finalPrimaryRating) {
            return finalUserRating;
        }

        if (!finalUserRating) {
            return finalPrimaryRating;
        }

        // Wenn es nur einen Wert gibt, darf er nicht gewichtet werden
        const finalWeightedMetaScore = (finalPrimaryRating * this.primaryRatingWeight)
        + (finalUserRating * this.userRatingWeight);

        return finalWeightedMetaScore;
    }

    // Normalize 5.9 to 59
    public normalizeRating(rating: number, maxRating: number): number {
        const normalizedRating = (rating / maxRating) * this.ownMaxRating
        return normalizedRating;
    }

}
