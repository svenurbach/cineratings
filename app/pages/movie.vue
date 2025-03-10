<script setup lang="ts">
const route = useRoute();
const { movie, getMovie } = useFetchMovie();
const param = ref(route.query.movieId as string);

onMounted(() => {
  getMovie(param.value);
});
</script>

<template>
  <!-- Filmergebnisse anzeigen -->
  <section v-if="movie" class="mt-4">
    <button @click="$router.back()">Zurück</button>
    <div class="my-2 p-2 border border-solid border-black">
      <h3>Filmdaten</h3>
      <div class="flex flex-col p-2">
        <SingleMovieDetail :label="'Titel'" :detail="movie.title" />
        <SingleMovieDetail :label="'Jahr der Veröffentlichung'" :detail="movie.releaseDate" />
        <SingleMovieDetail :label="'IMDb-ID'" :detail="movie.imdbId" />
      </div>
    </div>

    <div class="my-2 p-2 border border-solid border-black">
      <h3 class="text-lg font-bold">Anbieter</h3>
      <ProviderBox
        v-for="provider in movie.providers" 
        :key="provider.providerId" 
        :data="provider"
        class="p-2 border-b" />
    </div>

    <div class="my-2 p-2 border border-solid border-black">
      <h3 class="text-lg font-bold">Alle Daten / Debug</h3>
      <div class="p-2 border-b overflow-hidden">
        {{ movie }}
      </div>
    </div>

  </section>
</template>