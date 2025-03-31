<script setup lang="ts">
const appConfig = useAppConfig()
const appTitle = appConfig.title

</script>

<template>
    <div class="flex justify-between items-center mb-10 h-12">
        <AppLogo />
        <h1 class="text-xl"><a href="/">{{ appTitle }}</a></h1>
        <AppMenu />
    </div>
</template>
