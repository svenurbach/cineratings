export default defineAppConfig({
    title: 'CineRatings',
    theme: {
      dark: true,
      colors: {
        primary: '#ff0000'
      }
    },
    providerDirectory: 'server/providers',
    mainProvider: 'tmdb',
  })
