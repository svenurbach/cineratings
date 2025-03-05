import DataService from '../server/services/DataService';
import type { IProviderResponse } from '~/server/interfaces/IProviderResponse';

export function useFetchMovie() {
    const movie = ref<IProviderResponse | null>(null);

    async function getMovie(imdbId: string) {
        if (!imdbId) throw new Error('Query cannot be empty');

        try {
            const response = await DataService.getMovieRatings(imdbId);
            movie.value = response;
            console.log('useFetchMovie->getMovie->imdbId:', imdbId);
        } catch (error) {
            console.error('Fehler beim Abrufen des Films:', error);
        }
    };

    return { movie, getMovie};
}