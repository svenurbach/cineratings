import { getCache, setCache } from "../../utils/cache";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const apiKey = config.omdbApiKey;

	const query = getQuery(event);
	const imdbId = query.imdbId as string;

	if (!imdbId) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Query parameter is required'
		});
	}

	// Prüfen ob die Response zum Film im Cache vorliegt
	const cacheKey = `omdb-${imdbId}`;
	const cachedData = getCache(cacheKey);
	if (cachedData) {
		return cachedData;
	}

	const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${encodeURIComponent(imdbId)}`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json'
		}
	};

	const response = await fetch(url, options);

	if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

	const data = await response.json();

	// const exampleResponse =
	// {
	// 	"Title": "Inception",
	// 	"Year": "2010",
	// 	"Rated": "PG-13",
	// 	"Released": "16 Jul 2010",
	// 	"Runtime": "148 min",
	// 	"Genre": "Action, Adventure, Sci-Fi",
	// 	"Director": "Christopher Nolan",
	// 	"Writer": "Christopher Nolan",
	// 	"Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
	// 	"Plot": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
	// 	"Language": "English, Japanese, French",
	// 	"Country": "United States, United Kingdom",
	// 	"Awards": "Won 4 Oscars. 159 wins & 220 nominations total",
	// 	"Poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
	// 	"Ratings": [
	// 		{
	// 			"Source": "Internet Movie Database",
	// 			"Value": "8.8/10"
	// 		},
	// 		{
	// 			"Source": "Rotten Tomatoes",
	// 			"Value": "87%"
	// 		},
	// 		{
	// 			"Source": "Metacritic",
	// 			"Value": "74/100"
	// 		}
	// 	],
	// 	"Metascore": "74",
	// 	"imdbRating": "8.8",
	// 	"imdbVotes": "2,645,456",
	// 	"imdbID": "tt1375666",
	// 	"Type": "movie",
	// 	"DVD": "N/A",
	// 	"BoxOffice": "$292,587,330",
	// 	"Production": "N/A",
	// 	"Website": "N/A",
	// 	"Response": "True"
	// };

	// Antwort im Cache ablegen (TTL: 5 Minuten)
	setCache(cacheKey, data, 5 * 60 * 1000);

	return data;

	// return exampleResponse;

});
