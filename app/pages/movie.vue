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
  <section v-if="customRecordMetadata" class="mt-4">
    <div class="flex flex-col">
      <div id="movie-poster" class="relative p-2 flex flex-col">
        <!-- Image starts -->
        <img
          :src="customRecordMetadata.posterUrl || 'images/poster-placeholder.jpg'" :alt="customRecordMetadata.title"
          class="w-full shadow-lg shadow-gray-500/80 rounded-2xl">
        <!-- Image ends -->
        <!-- Buttons start -->
        <button
          id="back-button" class="absolute top-6 left-6 bg-gray-800 text-white p-2 rounded-full opacity-95"
          @click="$router.back()">
          <svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          id="like-button" class="absolute top-6 right-6 bg-gray-800 text-white p-2 rounded-full opacity-95"
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

        <div class="flex flex-col justify-between absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-3rem)] text-white">

          <!-- Modal starts -->
          <div v-if="isOpen" id="movie-ratings" class="p-3 mb-3 bg-gray-800 bg-opacity-95 rounded-lg">
            <div class="">
              <h3>Anbieter</h3>
              <template v-for="record in ratingDataRecords" :key="record.id">
                <ProviderBox v-if="(record.primaryRating || record.userRating) && record.name !== appTitle" :data="record" class="p-2 border-b" />
              </template>
            </div>
          </div>
          <!-- Modal ends -->

          <!-- Movie Meta starts -->
          <div
          id="movie-meta" :data-imdb=customRecordMetadata.imdbId
          class="flex flex-row justify-between bg-gray-800 bg-opacity-95 rounded-lg p-3">
            <div class="basis-3/4">
              <SingleMovieDetail :detail="customRecordMetadata.title" class="text-lg/6 font-bold" />
              <SingleMovieDetail :detail="customRecordMetadata.year" />
            </div>
            <!-- <div v-if="customRecord && customRecord.primaryRating" id="custom-rating" class="grid grid-flow-col content-center items-center gap-1 cursor-pointer" @click="togglePopover"> -->
            <div v-if="customRecord && customRecord.primaryRating" id="custom-rating" class="grid grid-flow-col content-center items-center gap-1 cursor-pointer" @click="togglePopover">
              <!-- <div>
                <svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6 stroke-yellow-400 fill-yellow-400">
                  <path
                  stroke-linecap="round" stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
               </svg>
              </div> -->
                <div
                :class="{
                  'bg-green-600': Number(customRecord.primaryRating) >= 60,
                  'bg-yellow-600': Number(customRecord.primaryRating) >= 40 && Number(customRecord.primaryRating) < 60,
                  'bg-red-600': Number(customRecord.primaryRating) < 40
                }"
                class="text-xl font-bold p-3 rounded-lg"
                >
                <SingleMovieDetail :detail="customRecord.primaryRating" />
                </div>
            </div>
          </div>
          <!-- Movie Meta ends -->

        </div>

      </div>
    </div>
  </section>
</template>
