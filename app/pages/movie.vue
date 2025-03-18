<script setup lang="ts">
import type { MovieMetadata } from '~/server/interfaces/MovieMetadata';
// import type { MovieRatingData } from '~/server/interfaces/MovieRatingData';

const route = useRoute();
const { ratingDataRecords, getMovie } = useFetchMovie();
const param = ref(route.query.movieId as string);
const customRecordMetadata = ref<MovieMetadata>();

onMounted(() => {
  getMovie(param.value);

  watch(ratingDataRecords, (newValue) => {
    if (newValue) {
      customRecordMetadata.value = newValue.find((record) => record.id === 'cr')?.movieMetadata;
      console.log(customRecordMetadata.value);
    }
  });
});

</script>

<template>
  <!-- Filmergebnisse anzeigen -->
  <section v-if="customRecordMetadata" class="mt-4">
    <button @click="$router.back()">Zurück</button>
    <div class="my-2 p-2 border border-solid border-black">
      <h3>Filmdaten</h3>
      <div class="flex">
        <div>
            <img :src="customRecordMetadata.posterUrl || 'images/poster-placeholder.jpg'" :alt="customRecordMetadata.title" class="w-20">
        </div>
        <div class="p-2">
          <SingleMovieDetail :label="'Titel'" :detail="customRecordMetadata.title" />
          <SingleMovieDetail :label="'Jahr der Veröffentlichung'" :detail="customRecordMetadata.year" />
          <SingleMovieDetail :label="'IMDb-ID'" :detail="customRecordMetadata.imdbId" />
        </div>
      </div>
    </div>

    <div class="my-2 p-2 border border-solid border-black">
      <h3>Anbieter</h3>
      <ProviderBox
        v-for="record in ratingDataRecords"
        :key="record.id"
        :data="record"
        class="p-2 border-b" />
    </div>

  </section>
</template>
