<script setup lang="ts">
import type { MovieMetadata } from '~/interfaces/MovieMetadata';
import type { MovieRatingData } from '~/interfaces/MovieRatingData';

const route = useRoute();
const { ratingDataRecords, getMovie } = useFetchMovie();
const param = ref(route.query.movieId as string);
const customRecordMetadata = ref<MovieMetadata>();
const appConfig = useAppConfig()
const appTitle = appConfig.title;
const customRecord = ref<MovieRatingData | null>();
const isOpen = ref(false);

const togglePopover = () => {
  isOpen.value = !isOpen.value;
};

onMounted(() => {
  getMovie(param.value);

});

watch(ratingDataRecords, (newValue) => {
  if (newValue) {
    customRecord.value = newValue.find(record => record.name === appTitle);
    customRecordMetadata.value = customRecord.value?.movieMetadata;
  }
});
</script>

<template>
  <!-- Filmergebnisse anzeigen -->
  <section v-if="customRecordMetadata">
    <div class="flex flex-col">
      <div id="movie-poster" class="relative flex flex-col">
        <!-- Image starts -->
        <img
          :src="customRecordMetadata.posterUrl || 'images/poster-placeholder.jpg'" :alt="customRecordMetadata.title"
          class="w-full shadow-lg rounded-[calc(var(--ui-radius)*2)]">
        <!-- Image ends -->
        <!-- Buttons start -->
        <button
          id="back-button" class="absolute top-5 left-5 bg-gray-800 p-2 rounded-full opacity-95"
          @click="$router.back()">
          <svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          id="like-button" class="absolute top-5 right-5 bg-gray-800 p-2 rounded-full opacity-95"
          @click="$router.back()">
          <svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path
              stroke-linecap="round" stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
        <!-- Buttons end -->

        <!-- Overlay starts -->
        <div class="flex flex-col justify-between absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)]">

          <!-- Modal starts -->
          <div v-if="isOpen" id="movie-ratings" class="p-3 mb-3 bg-gray-400 dark:bg-gray-800 bg-opacity-95 rounded-lg">
              <h3>Anbieter</h3>
              <template v-for="record in ratingDataRecords" :key="record.id">
                <ProviderBox v-if="(record.primaryRating || record.userRating) && record.name !== appTitle" :data="record" />
              </template>
              <p class="text-sm mt-4">Alle Angaben ohne Gewähr</p>
          </div>
          <!-- Modal ends -->

          <!-- Movie Meta starts -->
          <div
          id="movie-meta" :data-imdb=customRecordMetadata.imdbId
          class="flex flex-row justify-between bg-(--ui-neutral) bg-opacity-95 rounded-lg p-3">
            <div class="basis-3/4">
              <SingleMovieDetail :detail="customRecordMetadata.title" class="text-lg/6 font-bold" />
              <SingleMovieDetail :detail="customRecordMetadata.year" />
            </div>
            <div v-if="customRecord && customRecord.primaryRating" id="custom-rating" class="grid grid-flow-col content-center items-center gap-1 cursor-pointer" @click="togglePopover">
                <div
                :class="{
                  'bg-green-600': customRecord.primaryRating >= 60,
                  'bg-yellow-600': customRecord.primaryRating >= 40 && customRecord.primaryRating < 60,
                  'bg-red-600': customRecord.primaryRating < 40
                }"
                class="text-xl font-bold p-3 rounded-lg"
                >
                <SingleMovieDetail :detail="customRecord.primaryRating.toFixed(0)" />
                </div>
            </div>
          </div>
          <!-- Movie Meta ends -->

        </div>
        <!-- Overlay ends -->
      </div>
    </div>
  </section>
</template>
