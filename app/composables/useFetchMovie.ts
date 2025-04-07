import type { MovieRatingData } from '~/interfaces/MovieRatingData';

export function useFetchMovie() {
    const { $dataService } = useNuxtApp();
    const ratingDataRecords = ref<MovieRatingData[] | null>(null);

    async function getMovie(imdbId: string) {
        if (!imdbId) throw new Error('Query cannot be empty');

        // TMDB liefert in der Suche keine IMDB ID zurück, sondern eine TMDB ID
        // Daher muss mit der TMDB ID zunächst die IMDB ID abgefragt werden
        if (!imdbId.includes('tt')) {
            const tmdbId = imdbId;
            try {
                const response = await $fetch(`api/providers/tmdb-get-imdb-id`, { query: { tmdbId } });
                const data = response as { imdb_id: string };
                imdbId = data.imdb_id;
            } catch (error) {
                console.error('Fehler beim Abrufen des Films:', error);
            }
        }

        try {
            console.log('useFetchMovie > getMovie > imdbId', imdbId);

            const response: MovieRatingData[] = await $dataService.getMovieData(imdbId);
            ratingDataRecords.value = response;
        } catch (error) {
            console.error('Fehler beim Abrufen des Films:', error);
        }
    };
    return { ratingDataRecords, getMovie };
}
