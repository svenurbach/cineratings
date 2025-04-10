export default defineAppConfig({
  title: 'CineRatings',
  ui: {
    colors: {
      primary: 'red',
      secondary: 'neutral',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'slate',
      app: 'gray',
    }
  },
  mainProvider: 'tmdb',
  customRatingId: 'cr',
  providers: [
    { id: 'omdb', name: 'Open Media Database API' },
    { id: 'tmdb', name: 'The Movie Database (TMDB)' },
    { id: 'imdb', name: 'The Internet Movie Database (IMDb)' },
    { id: 'rottentomatoes', name: 'Rotten Tomatoes'},
    { id: 'metacritic', name: 'Metacritic'},
    { id: 'trakt', name: 'Trakt API'}
  ]
});
