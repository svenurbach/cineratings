<script setup lang="ts">
const items = ref<{ img: string; title: string, id: number }[]>([])
const { data } = await useFetch('/api/providers/tmdb-popular')
items.value = data.value || []
</script>

<template>
  <h2>Angesagte Filme</h2>
  <UCarousel
    v-slot="{ item }"
    class-names
    arrows
    loop
    wheel-gestures
    :prev="{ size: 'xl' }"
    :next="{ size: 'xl' }"
    :items="items"
    :ui="{
      item: 'basis-[40%] transition-opacity [&:not(.is-snapped)]:opacity-10',
      viewport: 'rounded-(--ui-radius)',
      prev: '-start-0',
      next: '-end-0'
    }"
    class="mx-auto w-full"
  >
  <ULink :to="{ name: 'movie', query: { movieId: item.id } }" :title="`Zur Detailseite von ${item.title} wechseln`"><img :src="item.img" width="264" height="264" loading="lazy" class="rounded-(--ui-radius)"></ULink>
  </UCarousel>
</template>
