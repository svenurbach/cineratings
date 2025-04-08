export default defineEventHandler(async (_event) => {
    const config = useRuntimeConfig();
    const tmdbBearerToken = config.tmdbBearerToken;

    const url = `https://api.themoviedb.org/3/movie/popular?language=de-DE&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${tmdbBearerToken}`
      }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

        const data = await response.json();
        const movies = data.results.map((movie: { poster_path: string, title: string, release_date: string, id: number  }) => ({
            img: `https://image.tmdb.org/t/p/w342/${movie.poster_path}`,
            title: movie.title,
            year: movie.release_date.split('-')[0],
            id: movie.id
        }));

        return movies;

    } catch (error) {
        console.error(`[TMDB-Popular] Fetch error:`, error);
    }

    // const exampleResponse = {
      // {
      //   "page": 1,
      //   "results": [
      //       {
      //           "adult": false,
      //           "backdrop_path": "/gsQJOfeW45KLiQeEIsom94QPQwb.jpg",
      //           "genre_ids": [
      //               28,
      //               53
      //           ],
      //           "id": 1125899,
      //           "original_language": "en",
      //           "original_title": "Cleaner",
      //           "overview": "When a group of radical activists take over an energy company's annual gala, seizing 300 hostages, an ex-soldier turned window cleaner suspended 50 storeys up on the outside of the building must save those trapped inside, including her younger brother.",
      //           "popularity": 417.3003,
      //           "poster_path": "/76Xvdqiv8ufGkerQunOpcy98oT7.jpg",
      //           "release_date": "2025-02-19",
      //           "title": "Cleaner",
      //           "video": false,
      //           "vote_average": 6.75,
      //           "vote_count": 142
      //       },

    // Antwort im Cache ablegen (TTL: 5 Minuten)
    // setCache(cacheKey, data, 5 * 60 * 1000);

    // return exampleResponse;

  });
