<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const param = ref(route.query.movieName as string);
const { movies, searchMovie } = useMovieSearch();

onMounted(() => {
    searchMovie(param.value);
});

watch(() => route.query.movieName, (newMovieName) => {
    param.value = newMovieName as string;
    searchMovie(param.value);
});

const redirectToMovieDetails = (movieId: string) => {
    router.push({ path: '/movie', query: { movieId: movieId } });
};
</script>

<template>
    <div>
        <!-- <SearchInput /> -->
        <!-- Suchergebnisse anzeigen -->
        <section v-if="movies" class="">
            <h2>Suchergebnisse für: "{{ param }}"</h2>
            <p>Bitte einen Film auswählen!</p>
            <ul class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 rounded-(--ui-radius)">
                <!-- TODO: Fix text h position -->
                <li v-for="movie in movies" :key="movie.imdbId" @click="redirectToMovieDetails(movie.imdbId)">
                    <MovieSearchItem
                        :title="movie.title"
                        :year="movie.year"
                        :poster-url="movie.posterUrl"
                    />
                </li>
            </ul>
        </section>
        <section v-else class="mt-4">
            <p>Keine Ergebnisse gefunden</p>
        </section>
    </div>
</template>
