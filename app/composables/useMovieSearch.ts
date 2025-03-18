import type { MovieMetadata } from '~/server/interfaces/MovieMetadata';

export function useMovieSearch() {
    const { $dataService } = useNuxtApp();
    const movies = ref<MovieMetadata[] | null>(null);

    async function searchMovie(movieName: string) {
        if (!movieName) throw new Error('Query cannot be empty');

        try {
            const response = await $dataService.getMovieListFromMainProvider(movieName);
            movies.value = response;
            console.log('useMovieSearch->searchMovie->movieName:', movieName);
        } catch (error) {
            console.error('Fehler beim Abrufen der Filme:', error);
        }
    };
    return { movies, searchMovie };
};
