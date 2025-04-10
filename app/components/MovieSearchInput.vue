<script setup lang="ts">
const router = useRouter();
const movieName = ref('');
const targetPage = "/search";

const performMovieSearch = () => {
  // TODO: dont route if already on search page
  // if (router.currentRoute.value.path !== targetPage) {
  // }
    // searchMovie(movieName.value);
  router.push({ path: targetPage, query: { title: movieName.value } });
};

const clearInput = () => {
  movieName.value = '';
  // Focus input field
  const input = document.querySelector('input');
  input?.focus();
};

</script>

<template>
  <UButtonGroup
    class="w-full mb-4"
  >
    <UInput
      v-model="movieName"
      variant="outline"
      icon="i-heroicons-magnifying-glass"
      type="search"
      color="neutral"
      :highlight=false
      :autofocus=true
      placeholder="Film suchen ..."
      :ui="{
        trailing: 'pe-1',
        base: 'focus-visible:ring'
      }"
      size="xl"
      class="w-full"
      @keyup.enter="performMovieSearch"
    >
    <template v-if="movieName?.length" #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="xl"
        icon="i-heroicons-x-mark"
        aria-label="Eingabefeld leeren"
        @click="clearInput"
      />
    </template>
    </UInput>
      <UButton
        color="neutral"
        variant="outline"
        size="xl"
        :disabled="!movieName"
        icon="i-heroicons-chevron-right"
        aria-label="Suchen"
        @click="performMovieSearch"
      />
  </UButtonGroup>
<!-- </UContainer> -->
</template>
