// Hier sollen die Daten eines bestimmten Films beim Provider OMDB abgefragt und zurückgegeben werden.
import type { IMovie } from '../interfaces/IMovie';
import type { IProvider } from '../interfaces/IProvider';
import type { IProviderResponse } from '../interfaces/IProviderResponse';

export default class OmdbProvider implements IProvider {
    readonly providerId = 'omdb';
    readonly providerName = 'Open Media Database';
    readonly providerLogo = null;
    readonly providerUrl = "https://www.omdbapi.com/";

    async fetchMovie(query: string): Promise<IProviderResponse> {
        try {
            // Interne Server Route aufrufen. Token ist dort hinterlegt.
            const response = await fetch(`api/providers/omdb-movie`);

            if (!response.ok) throw new Error('Error fetching data');
            const data = await response.json(); // Antwort nach JSON umwandeln
            
            // Check if more than one result was returned
            // If so, return a list of movies to the view and let the user choose one
            // Make a id search with the users choice
            
            const movieData = data; // Film aus der Antwort holen

            if (!movieData) throw new Error('No movie found');

            const providerResponse: IProviderResponse = {
                providerId: this.providerId,
                providerName: this.providerName,
                providerLogo: this.providerLogo,
                providerUrl: this.providerUrl,
                primaryRating: movieData.Metascore,
                userRating: movieData.imdbRating,
                movie: {
                    imdbId: movieData.imdbID,
                    title: movieData.Title,
                    releaseDate: movieData.Year
                }
            };

            return providerResponse;

        } catch (error) {
            console.error('Fehler:', error);
            throw error;
        }
    }
}