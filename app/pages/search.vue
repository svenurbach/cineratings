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
        <p>Bitte einen Film auswählen!</p>
        <ul class="grid grid-cols-3 gap-4 mt-4">
            <!-- TODO: Make gallery more responsive -->
            <li v-for="movie in movies" :key="movie.imdbId" class="grid grid-rows-4 cursor-pointer bg-zinc-200 rounded-lg" @click="redirectToMovieDetails(movie.imdbId)">
                <div class="row-span-3">
                    <img 
                        :src="movie.posterUrl || 'images/poster-placeholder.jpg'" 
                        :alt="`${movie.title}-Poster`" 
                        :title="movie.title"
                        class="max-w-full h-full object-cover rounded-t-lg">
                </div>
                <div class="flex flex-col p-2 row-span-1">
                    <span class="font-bold text-sm line-clamp-2 leading-4">{{ movie.title }}</span>
                    <span class="text-xs leading-5">{{ movie.releaseDate }}</span>
                </div>

            </li>
        </ul>
    </section>
</template>