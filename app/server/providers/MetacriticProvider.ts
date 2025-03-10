// Hier sollen die Daten eines bestimmten Films beim Provider IMDB abgefragt und zurückgegeben werden.
import type { IMovie } from '../interfaces/IMovie';
import type { IProvider } from '../interfaces/IProvider';
import type { IProviderResponse } from '../interfaces/IProviderResponse';

export default class MetacriticProvider implements IProvider {

    providerId = "metacritic";
    providerName = "Metacritic";

    searchMovie(_query: string): Promise<IMovie[]> {
        throw new Error('Method not implemented.');
    }

    fetchMovie(_query: string): Promise<IProviderResponse> {
        throw new Error('Method not implemented.');
    }

}