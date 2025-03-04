import type { IProviderResponse } from '~/server/interfaces/IProviderResponse';
import DataService from '../server/services/DataService';

export function useFetchMovie() {
    const movie = ref<IProviderResponse | null>(null);

    async function getMovie(imdbId: string) {
        // if (!query.value) return;

        try {
            const response = await DataService.getMovieRatings(imdbId);
            movie.value = response;
            console.log('useFetchMovie->getMovie->imdbId:', imdbId);
        } catch (error) {
            console.error('Fehler beim Abrufen der Filme:', error);
        }
    };

    return {
        movie,
        getMovie
    };
}