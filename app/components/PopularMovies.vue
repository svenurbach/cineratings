<script setup lang="ts">
const items = ref([])
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
    <img :src="item" width="264" height="264" class="rounded-(--ui-radius)">
  </UCarousel>
</template>
