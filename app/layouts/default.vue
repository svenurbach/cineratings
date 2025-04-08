<template>
    <div class="h-dvh bg-(--ui-background) dark:bg-(--ui-background) sm:p-5">
        <div class="h-full flex flex-col overflow-hidden m-auto sm:max-w-lg px-4 pt-3 bg-(--ui-app) dark:bg-(--ui-app) sm:rounded-[calc(var(--ui-radius)*2)]">
            <AppHeader />
            <div class="flex-1 overflow-y-auto rounded-(--ui-radius)">
                <slot />
            </div>
            <AppMobileNavbar />
        </div>
    </div>
</template>
