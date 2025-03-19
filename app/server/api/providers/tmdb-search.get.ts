export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
  const tmdbBearerToken = config.tmdbBearerToken;

	const query = getQuery(event);
	const movieName = query.query as string;

	if (!movieName) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Query parameter is required'
		});
	}

	const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&include_adult=false&language=de-DE'`;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
      Authorization: `Bearer ${tmdbBearerToken}`
		}
	};

	const response = await fetch(url, options);

	if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');

	const data = await response.json();

	return data;

	const exampleResponse =
	{
    "page": 1,
    "results": [
      {
        "adult": false,
        "backdrop_path": "/bL1etbhvRGhHhpjbwzHZbXNwM5R.jpg",
        "genre_ids": [
          18,
          80
        ],
        "id": 80560,
        "original_language": "en",
        "original_title": "Wanda",
        "overview": "Nachdem ihr entnervter Mann sich von ihr scheiden lassen hat, weil sie von früh bis spät depressiv und faul auf dem Sofa lag, anstatt sich um den Haushalt und die Kinder zu kümmern, leiht sich Wanda (Barbara Loden) etwas Geld von ihrem Vater und macht sich ohne festes Ziel auf den Weg. Sie verbringt die Tage in Bars, übernachtet in Kinos oder verbringt die Nächte mit verschiedenen Männern, von denen sie aufgegabelt wird. Dann trifft Wanda auf den Verbrecher Mr. Dennis (Michael Higgins), der einen großen Bankraub plant. Sie läßt sich mit dem wortkargen Mann ein, obwohl er sie alles andere als nett behandelt...",
        "popularity": 3.53,
        "poster_path": "/izuJ7cUhcihFnTpfsdSnkMCHsRQ.jpg",
        "release_date": "1970-09-01",
        "title": "Wanda",
        "video": false,
        "vote_average": 6.8,
        "vote_count": 140
      },
      {
        "adult": false,
        "backdrop_path": "/nNLOEK9HGhhZIOgdVUO9F7ndTIw.jpg",
        "genre_ids": [
          35,
          80
        ],
        "id": 623,
        "original_language": "en",
        "original_title": "A Fish Called Wanda",
        "overview": "Dem schmierigen Ganoven George gelingt der ganz große Coup. Zusammen mit seinem Bruder, dem stotternden Tierschutzaktivisten Ken seiner Geliebten Wanda und deren Bruder Otto, einem pseudointellektuellen Ex-CIA-Killer, gelingt es ihm, Juwelen im Wert von 13 Millionen Pfund zu rauben. Anschließend wird die Beute in einem abgelegenen Versteck gut verwahrt, danach will man weitersehen. Doch George kehrt noch einmal zurück und nimmt die kostbaren Klunker an sich, denn er traut Otto nicht über den Weg. Völlig berechtigt, wie sich herausstellt, da dieser mitnichten mit Wanda verwandt ist und mit ihr zusammen die ganze Zeit über ein doppeltes Spiel gespielt hat.",
        "popularity": 4.105,
        "poster_path": "/aGecKl9WbzVMwKcpmlCIFH9gfxM.jpg",
        "release_date": "1988-07-15",
        "title": "Ein Fisch namens Wanda",
        "video": false,
        "vote_average": 7.202,
        "vote_count": 2220
      },
    ],
    "total_pages": 4,
    "total_results": 68
  }

	return exampleResponse;

});
