import type { Movie } from '~/server/interfaces/Movie';

export function useFetchMovie() {
    const { $dataService } = useNuxtApp();
    const movie = ref<Movie | null>(null);

    async function getMovie(imdbId: string) {
        if (!imdbId) throw new Error('Query cannot be empty');

        try {
            const response = await $dataService.getMovieData(imdbId);
            movie.value = response;
            console.log('useFetchMovie->getMovie->imdbId:', imdbId);
        } catch (error) {
            console.error('Fehler beim Abrufen des Films:', error);
        }
    };
    return { movie, getMovie};
}
