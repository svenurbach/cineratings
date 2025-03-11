export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const apiKey = config.omdbApiKey;

	const query = getQuery(event);
	const movieName = query.query as string;

	if (!movieName) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Query parameter is required'
		});
	}

	const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieName)}&type=movie`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json'
		}
	};

	const response = await fetch(url, options);

	if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

	const data = await response.json();

	return data;

	const exampleResponse =
	{
		"Search": [
			{
				"Title": "Gladiator",
				"Year": "2000",
				"imdbID": "tt0172495",
				"Type": "movie",
				"Poster": "https://m.media-amazon.com/images/M/MV5BYWQ4YmNjYjEtOWE1Zi00Y2U4LWI4NTAtMTU0MjkxNWQ1ZmJiXkEyXkFqcGc@._V1_SX300.jpg"
			},
			{
				"Title": "Gladiator II",
				"Year": "2024",
				"imdbID": "tt9218128",
				"Type": "movie",
				"Poster": "https://m.media-amazon.com/images/M/MV5BMWYzZTM5ZGQtOGE5My00NmM2LWFlMDEtMGNjYjdmOWM1MzA1XkEyXkFqcGc@._V1_SX300.jpg"
			},
			{
				"Title": "Gladiator",
				"Year": "1992",
				"imdbID": "tt0104346",
				"Type": "movie",
				"Poster": "https://m.media-amazon.com/images/M/MV5BMDQwYjgzYTgtMDBhNi00ZmZiLTg4NTQtMGRiZDA2ODE5NjBlXkEyXkFqcGc@._V1_SX300.jpg"
			},
			{
				"Title": "The Gladiator",
				"Year": "1986",
				"imdbID": "tt0091121",
				"Type": "movie",
				"Poster": "https://m.media-amazon.com/images/M/MV5BZGE4M2MzYzgtNzhkMy00NmRjLWFkMWUtMTRjMzlhNjMxNDZkXkEyXkFqcGdeQXVyNjU0NTI0Nw@@._V1_SX300.jpg"
			},
			{
				"Title": "Gladiator Cop",
				"Year": "1995",
				"imdbID": "tt0109905",
				"Type": "movie",
				"Poster": "https://m.media-amazon.com/images/M/MV5BN2M3MmZlYTYtZDQ4Yy00NWU1LTg3ZmMtNGUyMDEwMGJhMmM0XkEyXkFqcGdeQXVyNDUxNjc5NjY@._V1_SX300.jpg"
			},
			{
				"Title": "Gladiator Eroticvs: The Lesbian Warriors",
				"Year": "2001",
				"imdbID": "tt0256056",
				"Type": "movie",
				"Poster": "https://m.media-amazon.com/images/M/MV5BMTQwMDA5MDY1MV5BMl5BanBnXkFtZTcwMDI2NDIyMQ@@._V1_SX300.jpg"
			},
			{
				"Title": "Gladiator Days: Anatomy of a Prison Murder",
				"Year": "2002",
				"imdbID": "tt0359332",
				"Type": "movie",
				"Poster": "https://m.media-amazon.com/images/M/MV5BMjE5MjUzMTQ1OF5BMl5BanBnXkFtZTYwNTk5Mzg5._V1_SX300.jpg"
			},
			{
				"Title": "Sign of the Gladiator",
				"Year": "1959",
				"imdbID": "tt0051985",
				"Type": "movie",
				"Poster": "https://m.media-amazon.com/images/M/MV5BMDAzYjA5NzAtZDg4Yi00YjdlLWFkYTItMjBkY2FhNTgwMTBkXkEyXkFqcGc@._V1_SX300.jpg"
			},
			{
				"Title": "See Ya Later Gladiator",
				"Year": "1968",
				"imdbID": "tt0063577",
				"Type": "movie",
				"Poster": "https://m.media-amazon.com/images/M/MV5BNDBhYzUwN2ItMjkzZi00MGMxLThhMmYtNGM1ZDUyYzViODUyXkEyXkFqcGdeQXVyNTA4NzExMDg@._V1_SX300.jpg"
			},
			{
				"Title": "Gladiator of Rome",
				"Year": "1962",
				"imdbID": "tt0056026",
				"Type": "movie",
				"Poster": "https://m.media-amazon.com/images/M/MV5BOTkxMjc1YTAtNGY4Ny00ZDIwLThkMzItOWU4ODAxNDFhYWNjXkEyXkFqcGc@._V1_SX300.jpg"
			}
		],
		"totalResults": "80",
		"Response": "True"
	};

	return exampleResponse;

});