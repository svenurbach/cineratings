<script setup lang="ts">
const { clear, movieHistory } = useMovieHistory()

</script>


<template>
    <div>
        <h1>History</h1>
        <button @click="clear">
            Löschen
        </button>
        <ul>
            <li v-for="record in movieHistory" :key="record.imdbId">
                <h2>{{ record.title }}</h2>
                <p>{{ record.year }}</p>
                <img :src="record.posterUrl" alt="Movie Poster" class="w-20" >
                <p>Rating: {{ record.rating?.toFixed(0) }}</p>
            </li>
        </ul>
    </div>
</template>
