import ProviderFactory from '~/factories/ProviderFactory';
import DataService from '~/services/DataService';
import RatingService from '~/services/RatingService';
import type { MovieRatingData } from '~/interfaces/MovieRatingData';

export function useMovieDetails() {
    const dataService = new DataService(new ProviderFactory(), new RatingService());
    const ratingDataRecords = ref<MovieRatingData[] | null>(null);

    async function getMovie(imdbId: string) {
        if (!imdbId) throw new Error('Query darf nicht leer sein');

        // TMDB liefert in der Suche keine IMDB ID zurück, sondern eine TMDB ID
        // Daher muss mit der TMDB ID zunächst die IMDB ID abgefragt werden
        if (!imdbId.includes('tt')) {
            const tmdbId = imdbId;
            try {
                const response = await $fetch(`api/providers/tmdb-get-imdb-id`, { query: { tmdbId } });
                const data = response as { imdb_id: string };
                if (!data || !data.imdb_id) {
                    throw new Error('IMDB ID nicht gefunden');
                }
                imdbId = data.imdb_id;
            } catch (error) {
                console.error('Fehler beim abrufen der IMDB-ID:', error);
                return;
            }
        }

        try {
            console.log('useFetchMovie > getMovie > imdbId', imdbId);

            const response: MovieRatingData[] = await dataService.getMovieData(imdbId);
            ratingDataRecords.value = response;
        } catch (error) {
            console.error('Fehler beim abrufen des Films:', error);
        }
    };

    return { ratingDataRecords, getMovie };
}
