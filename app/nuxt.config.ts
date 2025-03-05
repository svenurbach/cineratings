// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  debug: true,
  // sourcemap: true,
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],
  tailwindcss: {
    cssPath: 'assets/css/tailwind.css',
    exposeConfig: true,
    viewer: true,
    editorSupport: true,
    // and more...
  },
  eslint: {
    // options here
    config: {
      stylistic: false
    }
  },
  // ---------------------- KEYS ----------------------
  runtimeConfig: {
    // can be overridden by NUXT_API_SECRET environment variable
    tmdbApiKey: process.env.TMDB_API_KEY,
    tmdbBearerToken: process.env.TMDB_BEARER_TOKEN,
    omdbApiKey: process.env.OMDB_API_KEY,
    public: {
      // can be overridden by NUXT_PUBLIC_API_BASE environment variable
      apiBase: '',
    }
  },
})