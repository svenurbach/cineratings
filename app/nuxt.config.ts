// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    editorSupport: true,
    // and more...
  },
  runtimeConfig: {
     // can be overridden by NUXT_API_SECRET environment variable
    tmdbApiKey: process.env.TMDB_API_KEY,
    tmdbBearerToken: process.env.TMDB_BEARER_TOKEN,
    public: {
       // can be overridden by NUXT_PUBLIC_API_BASE environment variable
      apiBase: '',
    }
  },
})
