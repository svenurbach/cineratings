<script setup lang="ts">
import type { IProviderResponse } from '~/server/interfaces/IProviderResponse';

defineProps<{
	data: IProviderResponse;
}>()
</script>

<template>
	<div>
		<div v-if="data.providerLogo">
			{{ data.providerName }}
			<a :href="data.providerUrl"><img class="w-20" :src="data.providerLogo"></a>
		</div>
		<div v-else>
			<a :href="data.providerUrl">{{ data.providerName }}</a>
		</div>
		<SingleMovieDetail v-if="data.primaryRating" :label="'Primary-Rating'" :detail="data.primaryRating" />
		<SingleMovieDetail v-if="data.userRating" :label="'User-Rating'" :detail="data.userRating" />
		<SingleMovieDetail v-if="data.userVotes" :label="'User-Votes'" :detail="data.userVotes" />
	</div>
</template>
