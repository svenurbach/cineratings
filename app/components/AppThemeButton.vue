<script setup>
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <section class="pb-6">
    <h2>Erscheinungsbild</h2>
    <p>Wechsel zwischem hellem und dunklem Erscheinungsbild</p>
    <ClientOnly v-if="!colorMode?.forced">
      <UButton
        :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
        color="neutral"
        variant="outline"
        size="xl"
        class="w-min"
        @click="isDark = !isDark"
      >
        {{ isDark ? 'Hell' : 'Dunkel' }}
      </UButton>
      <template #fallback>
        <div class="size-8" />
      </template>
    </ClientOnly>
  </section>
</template>
