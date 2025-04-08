<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <div class="grid grid-cols-3 mt-3 mb-6">
        <UButton
            class="rounded-full opacity-98 cursor-pointer w-min"
            icon="i-heroicons-arrow-left"
            type="button"
            variant="outline"
            color="neutral"
            size="xl"
            title="Zur vorherigen Seite wechseln"
            @click="$router.back()"
        />
        <h1 class="justify-self-center">{{ title }}</h1>
        <div class="justify-self-end">
            <slot />
        </div>
    </div>


</template>
