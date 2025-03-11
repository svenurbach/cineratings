<template>
  <div>
    <!-- <ProviderList /> -->
    <template v-if="$route.path === '/'">
      <WelcomeText />
      <ProviderList />
    </template>
  </div>
</template>
