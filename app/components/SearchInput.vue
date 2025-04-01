<script setup lang="ts">
const router = useRouter();
const movieName = ref('');
const targetPage = "/search";

const performMovieSearch = () => {
  // TODO: dont route if already on search page
  // if (router.currentRoute.value.path !== targetPage) {
  // }
    // searchMovie(movieName.value);
  router.push({ path: targetPage, query: { movieName: movieName.value } });
};

const clearInput = () => {
  movieName.value = '';
  // Focus input field
  const input = document.querySelector('input');
  input?.focus();
};

</script>

<template>
  <!-- <div class="flex rounded-full border border-gray-300 overflow-hidden">
    <input
      v-model="movieName" type="text" placeholder="Suchen ..."
      class="w-full px-4 py-2 text-gray-700 focus:outline-none"
      @keyup.enter="performMovieSearch">
    <button v-if="movieName" class="flex px-4 py-2 bg-gray-300 text-white hover:bg-red-600" @click="clearInput">
      <svg
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-6">
        <path
          stroke-linecap="round" stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <button class="flex px-4 py-2 bg-gray-300 text-white hover:bg-green-600" @click="performMovieSearch">
      <svg
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-6">
        <path
          stroke-linecap="round" stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </button>
  </div> -->
  <!-- <UContainer class="mb-10"> -->
  <UButtonGroup
    class="py-2 w-full mb-6"
  >
    <UInput
      v-model="movieName"
      variant="outline"
      icon="i-lucide-search"
      type="search"
      color="neutral"
      :autofocus=true
      placeholder="Film suchen ..."
      :ui="{ trailing: 'pe-1' }"
      size="xl"
      class="w-full"
      @keyup.enter="performMovieSearch"
    >
    <template v-if="movieName?.length" #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="xl"
        icon="i-lucide-circle-x"
        aria-label="Eingabefeld leeren"
        @click="clearInput"
      />
    </template>
    </UInput>
      <UButton
        color="neutral"
        variant="outline"
        size="xl"
        icon="i-lucide-chevron-right"
        aria-label="Suchen"
        @click="performMovieSearch"
      />
  </UButtonGroup>
<!-- </UContainer> -->
</template>
