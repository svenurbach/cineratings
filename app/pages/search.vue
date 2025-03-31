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
        <div class="mb-10">
            <SearchInput />
        </div>
        <!-- Suchergebnisse anzeigen -->
        <section v-if="movies" class="mt-4">
            <h2>Suchergebnisse für: "{{ param }}"</h2>
            <p>Bitte einen Film auswählen!</p>
            <ul class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                <!-- TODO: Fix text h position -->
                <li v-for="movie in movies" :key="movie.imdbId" class="grid cursor-pointer overflow-hidden bg-zinc-200 rounded-lg hover:sepia" @click="redirectToMovieDetails(movie.imdbId)">
                    <div>
                        <!-- TODO: IMG durch SVG ersetzen -->
                        <img
                            :src="movie.posterUrl || 'images/poster-placeholder.jpg'"
                            :alt="`${movie.title}-Poster`"
                            :title="movie.title"
                            class="w-full aspect-[2/3] object-cover rounded-t-lg">
                    </div>
                    <div class="p-2">
                        <span class="font-bold text-sm line-clamp-2 leading-4">{{ movie.title }}</span>
                        <span class="text-xs leading-5">{{ movie.year }}</span>
                    </div>
                </li>
            </ul>
        </section>
        <section v-else class="mt-4">
            <p>Keine Ergebnisse gefunden</p>
        </section>
    </div>
</template>
