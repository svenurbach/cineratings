import DataService from '../server/services/DataService';
import type { IProviderResponse } from '../server/interfaces/IProviderResponse';

export function useMovieSearch() {
    const query = ref('');
    const movie = ref<IProviderResponse | null>(null);

    async function searchMovie() {
        if (!query.value) return;

        try {
            const response = await DataService.getMovieRatings(query.value);
            movie.value = response;
        } catch (error) {
            console.error('Fehler beim Abrufen der Filme:', error);
        }
    };

    return {
        query,
        movie,
        searchMovie
    };
}