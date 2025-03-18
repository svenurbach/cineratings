import type { MovieRatingData } from '~/server/interfaces/MovieRatingData';

export function useFetchMovie() {
    const { $dataService } = useNuxtApp();
    const ratingDataRecords = ref<MovieRatingData[] | null>(null);

    async function getMovie(imdbId: string) {
        if (!imdbId) throw new Error('Query cannot be empty');

        try {
            const response: MovieRatingData[] = await $dataService.getMovieData(imdbId);
            ratingDataRecords.value = response;
            console.log('useFetchMovie->getMovie->imdbId:', imdbId);
        } catch (error) {
            console.error('Fehler beim Abrufen des Films:', error);
        }
    };
    return { ratingDataRecords, getMovie };
}
