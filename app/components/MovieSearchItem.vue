<script setup lang="ts">
defineProps<{
	title: string;
    year: string;
    posterUrl?: string;
}>()
</script>

<template>
    <div class="relative">
        <!-- TODO: IMG durch SVG ersetzen -->
        <img
        :src="posterUrl || 'images/poster-placeholder.jpg'"
        :alt="`${title}-Poster`"
        :title="title"
        class="w-full aspect-[2/3] object-cover rounded-t-lg">
        <div class="flex flex-col justify-between absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[calc(100%-1rem)] bg-(--ui-primary) opacity-95 p-2 rounded-lg">
            <span class="font-bold text-sm line-clamp-1 leading-4 ">{{ title }}</span>
            <span class="text-xs leading-5">{{ year }}</span>
        </div>
    </div>
</template>
