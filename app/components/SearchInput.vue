<script setup lang="ts">

const { query, movies, searchMovie } = useMovieSearch();
const { movie, getMovie } = useFetchMovie();

</script>

<template>
  <div class="flex rounded-full border border-gray-300 overflow-hidden">

    <input 
      v-model="query" type="text" placeholder="Suchen ..."
      class="w-full px-4 py-2 text-gray-700 focus:outline-none" 
      @keyup.enter="searchMovie">

    <button class="flex px-4 py-2 bg-gray-300 text-white hover:bg-green-600" @click="searchMovie">
      <svg 
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="size-6">
        <path 
          stroke-linecap="round" stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </button>

  </div>

  <slot />

  <!-- Filmergebnisse anzeigen -->
  <section v-if="movie" class="mt-4">

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

  <section v-if="movies" class="mt-4">
    <h2 class="text-lg font-bold">Suchergebnisse</h2>
    <p>Welcher ist der richtige Filme? Bitte auswählen!</p>
    <ul class="flex flex-col gap-4">
      <li v-for="movie in movies" :key="movie.imdbId" class="border flex" @click="getMovie(movie.imdbId)">
        <div>
          <img :src="movie.posterUrl || 'images/poster-placeholder.jpg'" :alt="movie.title" class="w-20">
        </div>
        <div class="flex flex-col p-2">
          <span class="font-bold">{{ movie.title }}</span>
          <span>Jahr: {{ movie.releaseDate }}</span>
          <span class="italic">Imdb-Id: {{ movie.imdbId }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>