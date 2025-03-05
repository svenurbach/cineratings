import DataService from '../server/services/DataService';
import type { IMovie } from '~/server/interfaces/IMovie';

export function useMovieSearch() {
    const movies = ref<IMovie[] | null>(null);

    async function searchMovie(movieName: string) {
        if (!movieName) throw new Error('Query cannot be empty');

        try {
            const response = await DataService.getMovieListFromBaseProvider(movieName);
            movies.value = response;
            console.log('useMovieSearch->searchMovie->query:', movieName);
        } catch (error) {
            console.error('Fehler beim Abrufen der Filme:', error);
        }
    };
    return { movies, searchMovie };
};