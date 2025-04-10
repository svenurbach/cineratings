<script setup lang="ts">
const route = useRoute();
const { movies, searchMovie } = useMovieSearch();
const isLoading = ref(true);
const param = ref();

watch(
  () => route.query.title, (newTitle) => {
    if (newTitle) {
      searchMovie(newTitle).finally(() => {
        param.value = newTitle;
        isLoading.value = false;
      });
    }
  }, { immediate: true }
);
</script>

<template>
    <div>
        <!-- Suchergebnisse anzeigen -->
        <section v-if="movies" class="">
            <h2>Suchergebnisse für: "{{ param }}"</h2>
            <p>Bitte einen Film auswählen!</p>
            <ul class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 rounded-(--ui-radius)">
                <li v-for="movie in movies" :key="movie.imdbId">
                    <ULink :to="{ name: 'movie', query: { id: movie.imdbId } }" :title="`Zur Detailseite von ${movie.title} wechseln`">
                        <MovieItem
                            :title="movie.title"
                            :year="movie.year"
                            :poster-url="movie.posterUrl"
                        />
                    </ULink>
                </li>
            </ul>
        </section>
        <section v-else class="mt-4">
            <div v-if="isLoading" class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 rounded-(--ui-radius)">
                <div v-for="i in 9" :key="i"  class="flex flex-col gap-1 aspect-2/3 w-full h-50">
                    <USkeleton class="h-[70%] bg-gray-300" />
                    <USkeleton class="h-[30%] bg-gray-300" />
                </div>
            </div>
            <p v-else>Keine Ergebnisse gefunden</p>
        </section>
    </div>
</template>
