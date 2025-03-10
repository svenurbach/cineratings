<script setup lang="ts">
defineProps<{
	label: string;
	detail: string;
}>()
</script>
	
<template>
	<div><span class="font-bold">{{ label }}: </span>{{ detail }}</div>
</template>