export default defineAppConfig({
  title: 'CineRatings',
  theme: {
    dark: true,
    colors: {
      primary: '#ff0000'
    }
  },
  mainProvider: 'tmdb',
  customRatingId: 'cr',
  providers: [
    { id: 'omdb', name: 'Open Media Database API' },
    { id: 'tmdb', name: 'The Movie Database (TMDB)' },
    { id: 'imdb', name: 'The Internet Movie Database (IMDb)' },
    { id: 'rottentomatoes', name: 'Rotten Tomatoes'},
    { id: 'metacritic', name: 'Metacritic'}
  ]

});
