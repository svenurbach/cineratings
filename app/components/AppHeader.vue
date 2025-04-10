<script setup lang="ts">
const appConfig = useAppConfig()
const appTitle = appConfig.title
const $route = useRoute()

</script>

<template>
    <div class="grid grid-cols-3 items-center mb-3 h-10">
        <AppLogo class="h-10"/>
        <div class="justify-self-center text-2xl"><a href="/" class="h-full">{{ appTitle }}</a></div>
    </div>
    <MovieSearchInput v-if="$route.path === '/' || $route.path === '/search'" class="mt-3" />
</template>
