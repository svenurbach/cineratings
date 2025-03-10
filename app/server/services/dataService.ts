// Bekommt von der ProviderFactory die ausgewählten Provider
// Bekommt von der View den Film
// Prüft ob es Filmdaten im Cache gibt
// Wenn ja, dann gebe die Filmdaten zurück
// Wenn nein, dann hole die Filmdaten vom Provider
// Speichere die Filmdaten im Cache
// Gebe die Filmdaten zurück

import ProviderFactory from '../factories/ProviderFactory';
import { IMovie } from '../interfaces/IMovie';
import { IProvider } from '../interfaces/IProvider';

export default class DataService {
  providerList: string[] = ['tmdb', 'omdb'];
  // movieName: string = 'Inception';
  aggregatedMovieRating: number = 0.0;
  static baseProvider: string = 'omdb'; // TODO: Muss dynamisch ermittelt werden

  // MovieObject

  // getMovieNameFromView
  // setMovieName
  // 
  // getBaseProvider(FromProviderFactory)?
  // getListFromMovieSearchFromBaseProvider
  // Let User pick movie
  // setMovieImdbId
  // searchMovieByImdbId
  // getMovieObjectFromProviders
  // getAggregatedMovieRating from RatingService
  // setAggregatedMovieRating


  static async getMovieListFromBaseProvider(movieName: string) {
    const provider = ProviderFactory.createProviders([this.baseProvider]);
    const firstKey = Object.keys(provider)[0];
    console.log("getMovieListFromBaseProvider", provider);
    if (!provider) {
      console.error(`Kein gültiger Provider gefunden für: ${this.baseProvider}`);
      return null;
    }
    try {
      const response = await provider[firstKey].searchMovie(movieName);
      return response;
    } catch (error) {
      console.error('Fehler bei der Filmsuche:', error);
      throw error;
    }
  }

  static getProviderListFromView() {
    // TODO: Get Provider List from LocalStorage
    return ['omdb', 'tmdb'];
  }

  static getSelectedProvidersFromFactory() {
    const selectedProviders = this.getProviderListFromView();
    const providers = ProviderFactory.createProviders(selectedProviders);
    return providers;
  }

  static async getMovieDataFromProviders(title: string) {
    const movieTitle = title;
    const providers = this.getSelectedProvidersFromFactory();
    console.log("getMovieDataFromProviders", providers);

    // Object.keys(provider).forEach(async key => {
    //   const response = await provider[key].searchMovie(movieName);
    // });



    // const results = [];

    // for (const provider of providers) {
    //   provider = ProviderFactory.getProviders(providers);

    //   if (!provider) {
    //     console.error(`Kein gültiger Provider gefunden für: ${providers}`);
    //     continue;
    //   }

    //   try {
    //     const response = await provider.fetchMovie(movieName);
    //     results.push(response);
    //   } catch (error) {
    //     console.error(`Fehler bei der Filmsuche mit Provider ${providers}:`, error);
    //   }
    // }

    return null;
  }

  static async getMovieRatingsFromCache(movieName: string) {
    return null;
  }

  static async getMovieRatingsFromProvider(movieName: string, providerName: string) {
    return null;
  }



}