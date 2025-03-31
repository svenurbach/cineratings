<script setup lang="ts">
import type { MovieRatingData } from '~/interfaces/MovieRatingData';

defineProps<{
	data: MovieRatingData;
}>()
</script>

<template>
	<div>
		<div v-if="!data.logoUrl">
			{{ data.name }}
			<a :href="data.homepageUrl"><img class="w-20" :src="data.logoUrl"></a>
		</div>
		<div v-else>
			<a :href="data.homepageUrl">{{ data.name }}</a>
		</div>
		<SingleMovieDetail v-if="data.primaryRating" :label="'Primary-Rating'" :detail="data.primaryRating" />
		<SingleMovieDetail v-if="data.userRating" :label="'User-Rating'" :detail="data.userRating" />
		<SingleMovieDetail v-if="data.userVotes" :label="'User-Votes'" :detail="data.userVotes" />
	</div>
</template>
