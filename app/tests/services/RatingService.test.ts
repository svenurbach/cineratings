import { beforeEach, describe, it, test, expect } from 'vitest';
import RatingService from '../../services/RatingService';
import type { MovieRatingData } from '~/interfaces/MovieRatingData';

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

describe('RatingService.getMaxUserVoting', () => {
    let ratingService: RatingService;

    beforeEach(() => {
        ratingService = new RatingService();
    });

    const ratingData = [{
        id: "tmdb",
        name: "The Movie Database (TMDB)",
        homepageUrl: "https://www.themoviedb.org/",
        logoUrl: undefined,
        primaryRating: "72",
        userRating: "6.8",
        userVotes: "5000",
        movieMetadata: {
            title: "test",
            year: "2016",
            imdbId: "tt4992060",
            posterUrl: undefined
        }
    },
    {
        id: "omdb",
        name: "The Movie Database (TMDB)",
        homepageUrl: "https://www.themoviedb.org/",
        logoUrl: undefined,
        primaryRating: "68",
        userRating: "8.6",
        userVotes: "500",
        movieMetadata: {
            title: "test",
            year: "2016",
            imdbId: "tt4992060",
            posterUrl: undefined
        }
    }]

    it('should return the max user voting', () => {
        const result = ratingService.getMaxUserVoting(ratingData);
        expect(result).toBe(5000);
    });
});

describe('RatingService.getAggregatedMovieRating', () => {
    let ratingService: RatingService;

    beforeEach(() => {
        ratingService = new RatingService();
    });

    test.each([
        [{
            id: "tmdb",
            name: "The Movie Database (TMDB)",
            homepageUrl: "https://www.themoviedb.org/",
            logoUrl: undefined,
            primaryRating: "72",
            userRating: "6.8",
            userVotes: "5000",
            movieMetadata: {
                title: "The Dark Knight",
                year: "2008",
                imdbId: "tt0468569",
                posterUrl: undefined
            }
        },
        {
            id: "omdb",
            name: "The Movie Database (OMDB)",
            homepageUrl: "https://www.omdbapi.com/",
            logoUrl: undefined,
            primaryRating: "85",
            userRating: "9.0",
            userVotes: "10000",
            movieMetadata: {
                title: "Inception",
                year: "2010",
                imdbId: "tt1375666",
                posterUrl: undefined
            }
        },
        {
            id: "rottentomatoes",
            name: "Rotten Tomatoes",
            homepageUrl: "https://www.rottentomatoes.com/",
            logoUrl: undefined,
            primaryRating: "92",
            userRating: "8.4",
            userVotes: "3500",
            movieMetadata: {
                title: "Interstellar",
                year: "2014",
                imdbId: "tt0816692",
                posterUrl: undefined
            }
        },
        {
            id: "metacritic",
            name: "Metacritic",
            homepageUrl: "https://www.metacritic.com/",
            logoUrl: undefined,
            primaryRating: "77",
            userRating: "7.5",
            userVotes: "2800",
            movieMetadata: {
                title: "The Matrix",
                year: "1999",
                imdbId: "tt0133093",
                posterUrl: undefined
            }
        },
        {
            id: "filmratings",
            name: "FilmRatings",
            homepageUrl: "https://www.filmratings.com/",
            logoUrl: undefined,
            primaryRating: "79",
            userRating: "7.8",
            userVotes: "4000",
            movieMetadata: {
                title: "The Shawshank Redemption",
                year: "1994",
                imdbId: "tt0111161",
                posterUrl: undefined
            }
        }],
    ])('should return the aggregated movie rating',
        (ratingData) => {
            const result = ratingService.getAggregatedMovieRating([ratingData]);
            expect(result).toBe("70");
        });
});
