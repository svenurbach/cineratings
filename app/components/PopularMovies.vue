<script setup lang="ts">
const items = ref([])
const { data } = await useFetch('/api/providers/tmdb-popular')
items.value = data.value || []

</script>

<template>
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
      item: 'basis-[60%] transition-opacity [&:not(.is-snapped)]:opacity-10',
      viewport: 'rounded-lg',
    }"
    class="mx-auto max-w-sm my-4 w-[80%]"
  >
    <img :src="item" width="264" height="264" class="rounded-lg">
  </UCarousel>
</template>
