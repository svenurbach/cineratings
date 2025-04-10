<script setup lang="ts">
import type { MovieRatingData } from '~/interfaces/MovieRatingData';

const appTitle = useAppConfig().title;

defineProps<{
	data: MovieRatingData[];
}>()
</script>

<template>
	<div class="grid grid-cols-3 gap-4">
		<template v-for="record in data" :key="record.id">
			<template v-if="(record.primaryRating || record.userRating) && record.name !== appTitle" >
				<ProviderBoxItem :data="record" />
			</template>
		</template>
	</div>
	<!-- <p class="text-sm mt-4">Alle Angaben ohne Gewähr</p> -->
</template>
