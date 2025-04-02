<script setup lang="ts">
defineProps<{
	label?: string;
	detail: string | number;
}>()
</script>

<template>
	<div><span v-if="label">{{ label }}: </span><span class="font-bold text-md">{{ detail }}</span></div>
</template>
