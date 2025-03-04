// Bekommt von der ProviderFactory die ausgewählten Provider
// Bekommt von der View den Film
// Prüft ob es Filmdaten im Cache gibt
// Wenn ja, dann gebe die Filmdaten zurück
// Wenn nein, dann hole die Filmdaten vom Provider
// Speichere die Filmdaten im Cache
// Gebe die Filmdaten zurück

import ProviderFactory from '../factories/ProviderFactory';
import { IMovie } from '../interfaces/IMovie';

export default class DataService {
  providerList: string[] = ['tmdb', 'omdb'];
  // movieName: string = 'Inception';
  aggregatedMovieRating: number = 0.0;
  static baseProvider: string = 'omdb'; // TODO: Muss dynamisch ermittelt werden

  // MovieObject

  // getMovieNameFromView
  // setMovieName
  // getProviderListFromView
  // getBaseProvider(FromProviderFactory)?
  // getListFromMovieSearchFromBaseProvider
  // Let User pick movie
  // setMovieImdbId
  // searchMovieByImdbId
  // getMovieObjectFromProviders
  // getAggregatedMovieRating from RatingService
  // setAggregatedMovieRating


  static async getMovieListFromBaseProvider(movieName: string) {
    const provider = ProviderFactory.getProvider(this.baseProvider);

    if (!provider) {
      console.error(`Kein gültiger Provider gefunden für: ${this.baseProvider}`);
      return null;
    }

    try {
      const response = await provider.searchMovie(movieName);
      return response;
    } catch (error) {
      console.error('Fehler bei der Filmsuche:', error);
      throw error;
    }
  }


  static async getMovieRatings(movieName: string, providerName: string = 'omdb') {
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

  static async getMovieRatingsFromCache(movieName: string) {
    return null;
  }

  static async getMovieRatingsFromProvider(movieName: string, providerName: string) {
    return null;
  }



}