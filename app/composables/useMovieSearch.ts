import DataService from '../server/services/DataService';
import type { IMovie } from '~/server/interfaces/IMovie';

export function useMovieSearch() {
    const query = ref('');
    const movies = ref<IMovie[] | null>(null);

    async function searchMovie() {
        if (!query.value) return;

        try {
            const response = await DataService.getMovieListFromBaseProvider(query.value);
            movies.value = response;
            console.log('useMovieSearch->searchMovie->query:', query.value);
        } catch (error) {
            console.error('Fehler beim Abrufen der Filme:', error);
        }
    };

    return {
        query,
        movies,
        searchMovie
    };
}