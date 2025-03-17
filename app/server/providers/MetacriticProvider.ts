// Hier sollen die Daten eines bestimmten Films beim Provider IMDB abgefragt und zurückgegeben werden.
import type { Movie } from '../interfaces/Movie';
import type { Provider } from '../interfaces/Provider';
import type { ProviderResponse } from '../interfaces/ProviderResponse';

export default class MetacriticProvider implements Provider {

    providerId = "metacritic";
    providerName = "Metacritic";

    searchMovie(_query: string): Promise<Movie[]> {
        throw new Error('Method not implemented.');
    }

    fetchMovie(_query: string): Promise<ProviderResponse> {
        throw new Error('Method not implemented.');
    }

}
