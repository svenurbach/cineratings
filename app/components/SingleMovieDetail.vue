<script setup lang="ts">
defineProps<{
	label?: string;
	detail: string;
}>()
</script>

<template>
	<div><span v-if="label" class="font-bold">{{ label }}: </span>{{ detail }}</div>
</template>
