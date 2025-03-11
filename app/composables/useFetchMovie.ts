import DataService from '../server/services/DataService';
import type { IMovie } from '~/server/interfaces/IMovie';

export function useFetchMovie() {
    const movie = ref<IMovie | null>(null);

    async function getMovie(imdbId: string) {
        if (!imdbId) throw new Error('Query cannot be empty');

        try {
            const response = await DataService.getMovieData(imdbId);
            movie.value = response;
            console.log('useFetchMovie->getMovie->imdbId:', imdbId);
        } catch (error) {
            console.error('Fehler beim Abrufen des Films:', error);
        }
    };
    return { movie, getMovie};
}