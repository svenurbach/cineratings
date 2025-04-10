<script setup lang="ts">
import type { MovieMetadata } from '~/interfaces/MovieMetadata';
import type { MovieRatingData } from '~/interfaces/MovieRatingData';

const route = useRoute();
const param = ref(route.query.id);
const { ratingDataRecords, getMovie } = useMovieDetails();
const { add } = useMovieHistory();
const customRecordMetadata = ref<MovieMetadata>();
const appConfig = useAppConfig()
const appTitle = appConfig.title;
const customRecord = ref<MovieRatingData | null>();
const isOpen = ref(false);

const togglePopover = () => {
  isOpen.value = !isOpen.value;
};

onMounted(() => {
  getMovie(param.value).then(() => {
    if (customRecordMetadata.value && customRecord.value) {
      add({
        title: customRecordMetadata.value.title,
        year: customRecordMetadata.value.year,
        imdbId: customRecordMetadata.value.imdbId,
        posterUrl: customRecordMetadata.value.posterUrl,
        rating: customRecord.value.primaryRating,
        timestamp: new Date().toISOString(),
      });
    }
  });

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
        <UButton
          class="absolute top-5 left-5 bg-(--ui-secondary) rounded-full opacity-98 cursor-pointer"
          icon="i-heroicons-arrow-left"
          type="button"
          size="xl"
          @click="$router.back()"
        />
        <!-- Buttons end -->

        <!-- Overlay starts -->
        <div class="flex flex-col justify-between absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)]">

          <!-- Modal starts -->
          <div v-if="isOpen" id="movie-ratings" class="p-3 mb-3 text-(--ui-bg) bg-(--ui-secondary) opacity-98 rounded-lg">
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
          class="flex flex-row justify-between text-(--ui-bg) bg-(--ui-secondary) opacity-98 rounded-lg p-3">
            <div class="basis-3/4">
              <MovieDetail :detail="customRecordMetadata.title" class="text-lg/6 font-bold" />
              <MovieDetail :detail="customRecordMetadata.year" />
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
                <MovieDetail :detail="customRecord.primaryRating.toFixed(0)" />
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
