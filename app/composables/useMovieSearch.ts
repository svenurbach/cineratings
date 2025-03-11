import type { IMovie } from '~/server/interfaces/IMovie';

export function useMovieSearch() {
    const { $dataService } = useNuxtApp();
    const movies = ref<IMovie[] | null>(null);

    async function searchMovie(movieName: string) {
        if (!movieName) throw new Error('Query cannot be empty');

        try {
            const response = await $dataService.getMovieListFromBaseProvider(movieName);
            movies.value = response;
            console.log('useMovieSearch->searchMovie->movieName:', movieName);
        } catch (error) {
            console.error('Fehler beim Abrufen der Filme:', error);
        }
    };
    return { movies, searchMovie };
};