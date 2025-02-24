// Hier sollen die Daten eines bestimmten Films beim Provider IMDB abgefragt und zurückgegeben werden.
import type { IProvider } from '../interfaces/IProvider';
import type { IProviderResponse } from '../interfaces/IProviderResponse';

export class MetacriticProvider implements IProvider {

    fetchMovie(query: string): Promise<IProviderResponse> {
        throw new Error('Method not implemented.');
    }

}