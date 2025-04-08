<script setup lang="ts">
const route = useRoute();
const param = ref(route.query.movieName as string);
const { movies, searchMovie } = useMovieSearch();

// TODO: Loading state
const isLoading = ref(false);

onMounted(() => {
    searchMovie(param.value);
});

watch(() => route.query.movieName, (newMovieName) => {
    param.value = newMovieName as string;
    searchMovie(param.value);
});

</script>

<template>
    <div>
        <!-- Suchergebnisse anzeigen -->
        <section v-if="movies" class="">
            <h2>Suchergebnisse für: "{{ param }}"</h2>
            <p>Bitte einen Film auswählen!</p>
            <ul class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 rounded-(--ui-radius)">
                <li v-for="movie in movies" :key="movie.imdbId">
                    <ULink :to="{ name: 'movie', query: { movieId: movie.imdbId } }" :title="`Zur Detailseite von ${movie.title} wechseln`">
                        <MovieSearchItem
                            :title="movie.title"
                            :year="movie.year"
                            :poster-url="movie.posterUrl"
                        />
                    </ULink>
                </li>
            </ul>
        </section>
        <section v-else class="mt-4">
            <p>Keine Ergebnisse gefunden</p>
        </section>
    </div>
</template>
