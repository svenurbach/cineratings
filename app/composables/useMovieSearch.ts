import ProviderFactory from '~/factories/ProviderFactory';
import DataService from '~/services/DataService';
import RatingService from '~/services/RatingService';
import type { MovieMetadata } from '../interfaces/MovieMetadata';

export function useMovieSearch() {
    const $dataService = new DataService(new ProviderFactory(), new RatingService());
    const movies = ref<MovieMetadata[] | null>(null);

    async function getMovieList(movieName: string) {
        if (!movieName) throw new Error('MovieName cannot be empty');

        try {
            // TODO singleton läßt die ide buggen. sie erkennt ihn nicht
            const response = await $dataService.getMovieListFromMainProvider(movieName);
            movies.value = response;
        } catch (error) {
            console.error('Error fetching movies from mainProvider:', error);
        }
    };
    return { movies, searchMovie: getMovieList };
};
