<script setup lang="ts">
import AppMobileNavbar from '~/components/AppMobileNavbar.vue';

</script>

<template>
    <!-- <div class="flex justify-center md:bg-slate-300 min-h-screen">
    <div class="w-full max-w-md p-4 bg-white md:rounded-xl md:shadow-md"> -->
    <div class="flex flex-col items-center w-full h-screen sm:h-auto bg-white dark:bg-gray-900">
        <div class="w-full max-w-sm sm:max-w-lg p-4 h-full bg-gray-200 dark:bg-gray-800">
            <AppHeader />
            <slot />
            <AppFooter />
            <AppMobileNavbar />
        </div>
    </div>
</template>
