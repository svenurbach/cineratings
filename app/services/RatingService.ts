import type { MovieRatingData } from '../interfaces/MovieRatingData';

export default class RatingService {
    ownMaxRating: number;

    public constructor() {
        this.ownMaxRating = 100;
    }

    /**
     * Berechnet die aggregierte Bewertung eines Films basierend auf den bereitgestellten Bewertungsdaten.
     * @param ratingDataRecords Eine Liste von Bewertungsdaten für den Film.
     * @returns Die aggregierte Bewertung des Films als Zahl.
     */
    public getAggregatedMovieRating(ratingDataRecords: MovieRatingData[], primaryRatingWeight: number, userRatingWeight: number): number {
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

        if (!finalPrimaryRating && !finalUserRating) {
            return 0;
        }

        if (!finalPrimaryRating) {
            return finalUserRating;
        }

        if (!finalUserRating) {
            return finalPrimaryRating;
        }

        const finalWeightedMetaScore = (finalPrimaryRating * primaryRatingWeight)
        + (finalUserRating * userRatingWeight);

        return finalWeightedMetaScore;
    }

    /**
     * Normalisiert eine Bewertung auf eine Skala von 0 bis `ownMaxRating`.
     * @param rating Die ursprüngliche Bewertung.
     * @param maxRating Der maximale Wert der ursprünglichen Bewertungsskala.
     * @returns Die normalisierte Bewertung.
     */
    public normalizeRating(rating: number, maxRating: number): number {
        const normalizedRating = (rating / maxRating) * this.ownMaxRating
        return normalizedRating;
    }

}
