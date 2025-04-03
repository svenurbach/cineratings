<script setup lang="ts">
const appConfig = useAppConfig()
const appTitle = appConfig.title
const $route = useRoute()

</script>

<template>
    <div class="flex justify-between items-center mb-3 h-10">
        <AppLogo />
        <h1 class="text-2xl"><a href="/">{{ appTitle }}</a></h1>
        <AppMenu />
    </div>
    <SearchInput v-if="$route.path === '/' || $route.path === '/search'" class="mt-3" />
</template>
