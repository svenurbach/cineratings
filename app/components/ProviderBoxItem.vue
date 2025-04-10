<script setup lang="ts">
import type { MovieRatingData } from '~/interfaces/MovieRatingData';

defineProps<{
	data: MovieRatingData;
}>()
</script>

<template>
 <UCard
 	variant="outline"
	 :ui="{
        header: 'p-3 sm:px-3',
        footer: 'p-3 sm:px-3'
      }"
	class="flex flex-col items-center">
    <template #header>
		<ULink
			:to="data.homepageUrl"
			:title="`Zur Webseite von ${data.name}`"
			target="_blank"
		>
			<img class="size-8 sm:size-14" :src="data.logoUrl" loading="lazy" :alt="`Logo von ${data.name}`" >
		</ULink>
	</template>
    <template #footer>
		<div class="flex flex-col items-center text-(--ui-text)">
			<div v-if="data.primaryRating" class="font-bold text-lg">
				{{ data.primaryRating }}
			</div>
			<div v-if="data.userRating" class="font-bold text-lg">
				{{ data.userRating.toFixed(1) }}
			</div>
			<div v-if="data.userVotes" class="text-sm">
				{{ data.userVotes }} Votes
			</div>
		</div>
    </template>
  </UCard>
</template>
