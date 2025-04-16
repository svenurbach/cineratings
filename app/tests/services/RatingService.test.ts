import { beforeEach, describe, it, test, expect } from 'vitest';
import RatingService from '../../services/RatingService';
import type { MovieRatingProviderInfo } from '~/interfaces/MovieRatingProviderInfo';
import type { MovieMetadata } from '~/interfaces/MovieMetadata';

describe('RatingService.normalizeRating', () => {
    let ratingService: RatingService;

    beforeEach(() => {
        ratingService = new RatingService();
    });

    test.each([
        { rating: 0, max: 10, expected: 0 },
        { rating: 1, max: 10, expected: 10 },
        { rating: 2.5, max: 5, expected: 50 },
        { rating: 5, max: 5, expected: 100 },
        { rating: 2.5, max: 10, expected: 25 },
        { rating: 5, max: 10, expected: 50 },
        { rating: 25, max: 100, expected: 25 },
        { rating: 50, max: 100, expected: 50 },
    ])('should normalize a rating of $rating and max rating of $max to $expected',
        ({ rating, max, expected }) => {
            const result = ratingService.normalizeRating(rating, max);
            expect(result).toBe(expected);
        });
});

describe('RatingService.getAggregatedMovieRating', () => {
    let ratingService: RatingService;
    const providerTemplate: MovieRatingProviderInfo = {
        id: "test-id",
        name: "test-name",
        homepageUrl: "test-url"
    };
    const metadataTemplate: MovieMetadata = {
        title: "test-title",
        year: "test-year",
        imdbId: "test-imdb-id"
    };

    beforeEach(() => {
        ratingService = new RatingService();
    });

    const values = [
        {
            ratingData: [
                { ...providerTemplate, movieMetadata: { ...metadataTemplate } },
            ],
            expected: 0
        },
        {
            ratingData: [
                { ...providerTemplate, primaryRating: 80, movieMetadata: { ...metadataTemplate } }
            ],
            expected: 80
        },
        {
            ratingData: [
                { ...providerTemplate, userRating: 6, userVotes: 100, movieMetadata: { ...metadataTemplate } }
            ],
            expected: 60
        },
        {
            ratingData: [
                { ...providerTemplate, primaryRating: 80, movieMetadata: { ...metadataTemplate } },
                { ...providerTemplate, primaryRating: 50, movieMetadata: { ...metadataTemplate } }
            ],
            expected: 65
        },
        {
            ratingData: [
                { ...providerTemplate, userRating: 6, userVotes: 100, movieMetadata: { ...metadataTemplate } },
                { ...providerTemplate, userRating: 8, userVotes: 100, movieMetadata: { ...metadataTemplate } }
            ],
            expected: 70
        },
        {
            ratingData: [
                { ...providerTemplate, primaryRating: 50, movieMetadata: { ...metadataTemplate } },
                { ...providerTemplate, userRating: 6, userVotes: 5000, movieMetadata: { ...metadataTemplate } },
            ],
            expected: 55
        },
        {
            ratingData: [
                { ...providerTemplate, userRating: 6, movieMetadata: { ...metadataTemplate } },
            ],
            expected: 0
        },
        {
            ratingData: [
                { ...providerTemplate, userVotes: 5000, movieMetadata: { ...metadataTemplate } },
            ],
            expected: 0
        },
    ]

    for (const { ratingData, expected } of values) {
        const extractedRatingData = ratingData.map(item => {
            const ratings: string[] = [];
            if ('primaryRating' in item) {
                ratings.push(`PR:${item.primaryRating}`);
            }
            if ('userRating' in item) {
                ratings.push(`UR:${item.userRating}`);
            }
            if ('userVotes' in item) {
                ratings.push(`UV:${item.userVotes}`);
            }
            return ratings;
        });

        it(`should return aggregated rating for ${JSON.stringify(extractedRatingData)} to be ${expected}`, () => {
            const result = ratingService.getAggregatedMovieRating(ratingData, 0.5, 0.5);
            expect(result).toBe(expected);
        });
    }
});
