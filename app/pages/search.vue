<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { movies, searchMovie } = useMovieSearch();
const param = ref(route.query.movieName as string);

onMounted(() => {
    console.log('onMounted', param.value);
    searchMovie(param.value);
});

watch(() => route.query.movieName, (newMovieName) => {
    param.value = newMovieName as string;
    searchMovie(param.value);
    console.log('newMovieName', newMovieName);
});

const redirectToMovieDetails = (movieId: string) => {
    router.push({ path: '/movie', query: { movieId: movieId } });
};
</script>

<template>
    <!-- Suchergebnisse anzeigen -->
    <section v-if="movies" class="mt-4">
        <h2 class="text-lg font-bold">Suchergebnisse für: "{{ param }}"</h2>
        <p>Welcher ist der richtige Filme? Bitte auswählen!</p>
        <ul class="flex flex-col gap-4">
            <li v-for="movie in movies" :key="movie.imdbId" class="border flex" @click="redirectToMovieDetails(movie.imdbId)">
                <div>
                    <img :src="movie.posterUrl || 'images/poster-placeholder.jpg'" :alt="movie.title" class="w-20">
                </div>
                <div class="flex flex-col p-2">
                    <span class="font-bold">{{ movie.title }}</span>
                    <span>Jahr: {{ movie.releaseDate }}</span>
                    <span class="italic">Imdb-Id: {{ movie.imdbId }}</span>
                </div>
            </li>
        </ul>
    </section>
</template>