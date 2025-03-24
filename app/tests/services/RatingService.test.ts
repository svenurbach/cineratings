import { describe, it, expect } from 'vitest';
import RatingService from '../../services/RatingService';

describe('RatingService.normalizeRating', () => {
    const values = [
        { rating: 0, max: 10, expected: 0 },
        { rating: 2.5, max: 5, expected: 50 },
        { rating: 5, max: 5, expected: 100 },
        { rating: 2.5, max: 10, expected: 25 },
        { rating: 5, max: 10, expected: 50 },
        { rating: 25, max: 100, expected: 25 },
        { rating: 50, max: 100, expected: 50 },
    ]

    for (const { rating, max, expected } of values) {
        it(`should normalize a rating of ${rating} with max rating of ${max} to ${expected}`, () => {
            const result = RatingService.normalizeRating(rating, max);
            expect(result).equals(expected);
        });
    }

});
