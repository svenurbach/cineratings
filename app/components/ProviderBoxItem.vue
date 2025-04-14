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
			<div class="text-(--ui-text) text-sm">{{ data.name }}</div>
		</ULink>
	</template>
	<img class="size-6 sm:size-12" :src="data.logoUrl" loading="lazy" :alt="`Logo von ${data.name}`" >
    <template #footer>
		<div class="flex flex-col text-center text-(--ui-text)">
			<div v-if="data.primaryRating" class="font-bold text-lg"  title="Bewertung">
				{{ data.primaryRating }}
			</div>
			<div v-if="data.userRating" class="font-bold text-lg" title="Nutzerbewertung">
				{{ data.userRating.toFixed(1) }}
			</div>
			<div v-if="data.userVotes" class="text-sm" title="Anzahl an Nutzerbewertungen">
				{{ data.userVotes }}
			</div>
		</div>
    </template>
  </UCard>
</template>
