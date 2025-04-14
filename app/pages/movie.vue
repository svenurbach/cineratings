<script setup lang="ts">
import type { MovieMetadata } from '~/interfaces/MovieMetadata';
import type { MovieRatingData } from '~/interfaces/MovieRatingData';

const route = useRoute();
const param = route.query.id as string;
const { ratingDataRecords, getMovieDetails } = useMovieDetails();
const { add } = useMovieHistory();
const customRecordMetadata = ref<MovieMetadata>();
const appConfig = useAppConfig()
const appTitle = appConfig.title;
const customRecord = ref<MovieRatingData | null>();
const isOpen = ref(false);
const isLoading = ref(true);

const togglePopover = () => {
  isOpen.value = !isOpen.value;
};

onMounted(() => {
  getMovieDetails(param).then(() => {
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
    isLoading.value = false;
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
  <section v-if="!isLoading">
    <!-- Filmergebnisse anzeigen -->
    <template v-if="customRecordMetadata">
        <div id="movie-poster" class="relative">
          <!-- Image starts -->
          <img
            :src="customRecordMetadata.posterUrl || 'images/poster-placeholder.jpg'" :alt="customRecordMetadata.title"
            class="w-full shadow-lg object-top object-cover aspect-2/3 rounded-[calc(var(--ui-radius)*2)]">
          <!-- Image ends -->
          <!-- Buttons start -->
          <UButton
            class="absolute top-5 left-5 bg-(--ui-bg) text-(--ui-text) rounded-full opacity-98 cursor-pointer"
            icon="i-heroicons-arrow-left"
            type="button"
            size="xl"
            @click="$router.back()"
          />
          <!-- Buttons end -->

          <!-- Overlay starts -->
          <div class="flex flex-col justify-between absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)]">

            <!-- Modal starts -->
            <div v-if="isOpen && ratingDataRecords" id="movie-ratings" class="mb-3 text-(--ui-bg) rounded-(--ui-radius)">
                <ProviderBox :data="ratingDataRecords" />
            </div>
            <!-- Modal ends -->

            <!-- Movie Meta starts -->
            <div
              id="movie-meta"
              :data-imdb=customRecordMetadata.imdbId
              class="flex flex-row justify-between bg-(--ui-bg) opacity-98 rounded-(--ui-radius) p-3">
              <div class="flex flex-col basis-3/4">
                <span class="text-xl font-bold"> {{ customRecordMetadata.title }} </span>
                <span> {{ customRecordMetadata.year }} </span>
              </div>

              <div v-if="customRecord && customRecord.primaryRating" id="custom-rating" class="grid grid-flow-col content-center items-center gap-1 cursor-pointer" @click="togglePopover">
                  <div
                  :class="{
                    'bg-green-600': customRecord.primaryRating >= 60,
                    'bg-yellow-600': customRecord.primaryRating >= 40 && customRecord.primaryRating < 60,
                    'bg-red-600': customRecord.primaryRating < 40
                  }"
                  class="text-xl font-bold p-3 rounded-(--ui-radius) text-(--ui-bg)"
                  >
                  {{ customRecord.primaryRating.toFixed(0) }}
                  </div>
              </div>

            </div>
            <!-- Movie Meta ends -->
          </div>
          <!-- Overlay ends -->
        </div>
        <div v-if="customRecordMetadata.plot">
          <h2>Handlung</h2>
          {{ customRecordMetadata.plot}}
        </div>
        <div v-if="customRecordMetadata.runtime">
          <h2>Laufzeit</h2>
          {{ customRecordMetadata.runtime}}
        </div>
    </template>
    <p v-else>Filmdaten konnten nicht geladen werden</p>
  </section>

  <section v-else class="flex flex-col gap-2">
    <USkeleton class="h-[min(100vw,620px)] bg-(--ui-bg)" />
    <USkeleton class="h-[min(30vw,100px)] bg-(--ui-bg)" />
    <div class="sr-only">Film wird geladen ...</div>
  </section>

</template>
