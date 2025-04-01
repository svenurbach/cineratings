export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const tmdbBearerToken = config.tmdbBearerToken;

    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=de-DE&page=1&sort_by=popularity.desc`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${tmdbBearerToken}`
      }
    };

    // TODO: try catch
let response;
    try {
        response = await fetch(url, options);
    } catch (error) {
        console.error(`[TMDB-Popular] Fetch error:`, error);
        throw new Error('Fehler beim Abrufen der Daten');
    }
    console.log(`[TMDB-Popular] response:`, response);


    if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

    const data = await response.json();
    const movies = data.results.map((movie: { poster_path: string }) => `https://image.tmdb.org/t/p/original${movie.poster_path}`)

    // const exampleResponse = {
    //   "movie_results": [
    //     {
    //       "backdrop_path": "/vTRrHtV6rgHDLtxtLJYRPkAk5iV.jpg",
    //       "id": 18422,
    //       "title": "Sad Movie",
    //       "original_title": "새드무비",
    //       "overview": "These intertwining stories about romance and separation follow a firefighter who can't find the right time to propose, a shy theme park worker who falls for an artist, an estranged mother and son, and a man seeking to regain his lost love.",
    //       "poster_path": "/XeYSx0Bi2GzPgku4Hix7yRxVal.jpg",
    //       "media_type": "movie",
    //       "adult": false,
    //       "original_language": "ko",
    //       "genre_ids": [
    //         35,
    //         18,
    //         10749
    //       ],
    //       "popularity": 2.295,
    //       "release_date": "2005-10-20",
    //       "video": false,
    //       "vote_average": 6.6,
    //       "vote_count": 65
    //     }
    //   ],
    //   "person_results": [],
    //   "tv_results": [],
    //   "tv_episode_results": [],
    //   "tv_season_results": []
    // }

    // Antwort im Cache ablegen (TTL: 5 Minuten)
    // setCache(cacheKey, data, 5 * 60 * 1000);

    return movies;

    // return exampleResponse;

  });
