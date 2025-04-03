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
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/test-utils/module'
  ],
  css: ['~/assets/css/main.css'],
  eslint: {
    // options here
    config: {
      stylistic: false
    }
  },
  app: {
    head: {
      title: 'CineRatings',
      htmlAttrs: {
        lang: 'de',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      meta: [
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      ]
    }
  },
  nitro: {
    routeRules: {
      '/api/providers/**': {
        cache: {
          maxAge: 6000,
          swr: false
        }
      }
    }
  },
  // ---------------------- KEYS ----------------------
  runtimeConfig: {
    // can be overridden by NUXT_API_SECRET environment variable
    tmdbApiKey: process.env.TMDB_API_KEY,
    tmdbBearerToken: process.env.TMDB_BEARER_TOKEN,
    omdbApiKey: process.env.OMDB_API_KEY,
    traktClientId: process.env.TRAKT_API_CLIENT_ID,
    public: {
      // can be overridden by NUXT_PUBLIC_API_BASE environment variable
      apiBase: '',
    }
  },
})
