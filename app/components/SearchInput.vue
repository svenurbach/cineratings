<script setup lang="ts">

const { query, movie, searchMovie } = useMovieSearch();

</script>

<template>
  <div class="flex rounded-full border border-gray-300 overflow-hidden">
    
    <input
    v-model="query"
    type="text"
    placeholder="Suchen ..."
    class="w-full px-4 py-2 text-gray-700 focus:outline-none"
    @keyup.enter="searchMovie"
    >
    
    <button class="flex px-4 py-2 bg-gray-300 text-white hover:bg-green-600" @click="searchMovie">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </button>

  </div>

  <slot />

  <!-- Filmergebnisse anzeigen -->
  <div v-if="movie" class="mt-4">
    <h2 class="text-lg font-bold">Suchergebnisse</h2>

    <h3 class="text-lg font-bold">Filmdaten</h3>

    <div class="border border-solid border-black">

      <h3 class="text-lg font-bold">Anbieter</h3>
      <div class="p-2 border-b">
        <a :href="movie.providerUrl"><img class="w-20" :src="movie.providerLogo"></a>
        {{ movie.providerName }}
      </div>
      <h3 class="text-lg font-bold">Alle Daten</h3>
      <div class="p-2 border-b">
        {{ movie }}
      </div>
    </div>
  </div>
</template>