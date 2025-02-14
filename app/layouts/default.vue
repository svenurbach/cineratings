<template>
<div class="flex items-center justify-center bg-slate-300 h-screen">
    <div class="w-full max-w-md p-4 bg-white md:rounded-xl md:shadow-md">
        <AppHeader />
        <slot />
        <AppFooter />
    </div>
    </div>
</template>