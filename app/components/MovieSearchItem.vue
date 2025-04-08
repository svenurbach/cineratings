<script setup lang="ts">
defineProps<{
	title: string;
    year: string;
    posterUrl?: string;
}>()
</script>

<template>
    <div class="relative aspect-2/3 cursor-pointer group">
        <!-- TODO: Fallback IMG durch SVG ersetzen -->
        <img
        :src="posterUrl || 'images/poster-placeholder.jpg'"
        :alt="`${title}-Poster`"
        :title="title"
        loading="lazy"
        class="w-full h-full object-top object-cover rounded-(--ui-radius)">
        <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[calc(100%-1rem)] flex flex-col justify-between text-(--ui-bg) bg-(--ui-secondary) group-hover:bg-(--ui-primary) opacity-98 p-2 rounded-(--ui-radius)">
            <span class="font-bold text-sm line-clamp-1 ">{{ title }}</span>
            <span class="text-xs">{{ year }}</span>
        </div>
    </div>
</template>
