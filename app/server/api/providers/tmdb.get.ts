export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const tmdbBearerToken = config.TMDB_BEARER_TOKEN;

  const query = getQuery(event);
  const searchQuery = query.query;

  // const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&include_adult=false&language=en-US&page=1`;
  // const options = {
  //     method: 'GET',
  //     headers: {
  //         accept: 'application/json',
  //         Authorization: `Bearer ${tmdbBearerToken}`
  //     }
  // };

  // const { data: film, pending, error } = useFetch(
  //     `https://api.themoviedb.org/3/movie/${filmId}?api_key=${apiKey}&language=de-DE`,
  //     {
  //       key: `film-${filmId}`,
  //     }

  // if (!searchQuery) {
  //     throw createError({
  //         statusCode: 400,
  //         statusMessage: 'Query parameter is required'
  //     });
  // }

  // const response = await fetch(url, options);

  // if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

  // const data = await response.json();

  // return data;

  const exampleResponse = {
    "adult": false,
    "backdrop_path": "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    "belongs_to_collection": null,
    "budget": 160000000,
    "genres": [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 12,
        "name": "Adventure"
      }
    ],
    "homepage": "https://www.warnerbros.com/movies/inception",
    "id": 27205,
    "imdb_id": "tt1375666",
    "origin_country": [
      "US",
      "GB"
    ],
    "original_language": "en",
    "original_title": "Inception",
    "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    "popularity": 23.572,
    "poster_path": "/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
    "production_companies": [
      {
        "id": 923,
        "logo_path": "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png",
        "name": "Legendary Pictures",
        "origin_country": "US"
      },
      {
        "id": 9996,
        "logo_path": "/3tvBqYsBhxWeHlu62SIJ1el93O7.png",
        "name": "Syncopy",
        "origin_country": "GB"
      },
      {
        "id": 174,
        "logo_path": "/zhD3hhtKB5qyv7ZeL4uLpNxgMVU.png",
        "name": "Warner Bros. Pictures",
        "origin_country": "US"
      }
    ],
    "production_countries": [
      {
        "iso_3166_1": "GB",
        "name": "United Kingdom"
      },
      {
        "iso_3166_1": "US",
        "name": "United States of America"
      }
    ],
    "release_date": "2010-07-15",
    "revenue": 839030630,
    "runtime": 148,
    "spoken_languages": [
      {
        "english_name": "English",
        "iso_639_1": "en",
        "name": "English"
      },
      {
        "english_name": "French",
        "iso_639_1": "fr",
        "name": "Français"
      },
      {
        "english_name": "Japanese",
        "iso_639_1": "ja",
        "name": "日本語"
      },
      {
        "english_name": "Swahili",
        "iso_639_1": "sw",
        "name": "Kiswahili"
      }
    ],
    "status": "Released",
    "tagline": "Your mind is the scene of the crime.",
    "title": "Inception",
    "video": false,
    "vote_average": 8.369,
    "vote_count": 37080
  };

  return exampleResponse;

});