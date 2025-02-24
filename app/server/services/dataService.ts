// Bekommt von der ProviderFactory die ausgewählten Provider
// Bekommt von der View den Film
// Prüft ob es Filmdaten im Cache gibt
// Wenn ja, dann gebe die Filmdaten zurück
// Wenn nein, dann hole die Filmdaten vom Provider
// Speichere die Filmdaten im Cache
// Gebe die Filmdaten zurück

import ProviderFactory from '../factories/ProviderFactory';

export default class DataService {
  static async getMovieRatings(movieName: string, providerName: string = 'tmdb') {
    const provider = ProviderFactory.getProvider(providerName);

    if (!provider) {
      console.error(`Kein gültiger Provider gefunden für: ${providerName}`);
      return null;
    }

    try {
      const response = await provider.fetchMovie(movieName);
      return response;
    } catch (error) {
      console.error('Fehler bei der Filmsuche:', error);
      throw error;
    }
  }
}