<script setup lang="ts">
import type { MovieRatingData } from '~/interfaces/MovieRatingData';

defineProps<{
	data: MovieRatingData;
}>()
</script>

<template>
	<div class="flex flex-row p-2">
		<div class="basis-1/5 shrink-0 flex items-center">
			<!-- TODO: Link zur externen Moviepage -->
			<img class="w-8 sm:w-14" :src="data.logoUrl" loading="lazy" :title="`Logo von ${data.name}`" alt="Logo" >
		</div>
		<div>
			<h3 class="line-clamp-1">{{ data.name }}</h3>
			<MovieDetail v-if="data.primaryRating" :label="'Bewertung'" :detail="data.primaryRating" />
			<MovieDetail
				v-if="data.userRating"
				:label="'Nutzerbewertung'"
				:detail="data.userRating.toFixed(1)"
			/>
			<MovieDetail v-if="data.userVotes" :label="'Nutzerstimmen'" :detail="data.userVotes" />
		</div>
	</div>
</template>
