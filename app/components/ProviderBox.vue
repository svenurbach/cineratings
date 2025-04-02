<script setup lang="ts">
import type { MovieRatingData } from '~/interfaces/MovieRatingData';

defineProps<{
	data: MovieRatingData;
}>()
</script>

<template>
	<div class="flex flex-row p-2">
		<div class="basis-1/5 flex items-center">
			<!-- TODO: Link zur externen Moviepage -->
			<img class="w-14" :src="data.logoUrl" >
		</div>
		<div>
			<h4>{{ data.name }}</h4>
			<SingleMovieDetail v-if="data.primaryRating" :label="'Bewertung'" :detail="data.primaryRating" />
			<SingleMovieDetail v-if="data.userRating" :label="'Nutzerbewertung'" :detail="data.userRating" />
			<SingleMovieDetail v-if="data.userVotes" :label="'Nutzerstimmen'" :detail="data.userVotes" />
		</div>
	</div>
	<USeparator />
</template>
