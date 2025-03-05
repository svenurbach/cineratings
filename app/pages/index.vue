<template>
  <div>
    <!-- <ProviderList /> -->
    <template v-if="$route.path === '/'">
      <WelcomeText />
    </template>
  </div>
</template>
