<template>
  <div>
    <!-- <ProviderList /> -->
    <template v-if="$route.path === '/'">
      <div class="mb-10">
        <SearchInput />
      </div>
      <WelcomeText />
      <ProviderList />
    </template>
  </div>
</template>
