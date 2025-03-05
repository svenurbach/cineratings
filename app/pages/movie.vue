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
    <button @click="$router.back()">
    Zurück
    </button>
    <div class="my-2 p-2 border border-solid border-black">
      <h3>Filmdaten</h3>
      <div class="flex flex-col p-2">
        <span>{{ movie.movie.title }}</span>
        <span>{{ movie.movie.releaseDate }}</span>
        <span>{{ movie.movie.imdbId }}</span>
      </div>
    </div>

    <div class="my-2 p-2 border border-solid border-black">
      <h3 class="text-lg font-bold">Anbieter</h3>
      <div class="p-2 border-b">
        <div v-if="movie.providerLogo">
          <a :href="movie.providerUrl"><img class="w-20" :src="movie.providerLogo"></a>
          {{ movie.providerName }}
        </div>
        <div v-else>
          <a :href="movie.providerUrl">{{ movie.providerName }}</a>
          <div>Rating: {{ movie.primaryRating }}</div>
          <div>User-Rating: {{ movie.userRating }}</div>
        </div>
      </div>
    </div>

    <div class="my-2 p-2 border border-solid border-black">
      <h3 class="text-lg font-bold">Alle Daten / Debug</h3>
      <div class="p-2 border-b">
        {{ movie }}
      </div>
    </div>

  </section>
</template>