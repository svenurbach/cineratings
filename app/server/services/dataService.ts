// Bekommt von der ProviderFactory die ausgewählten Provider
// Bekommt von der View den Film
// Prüft ob es Filmdaten im Cache gibt
// Wenn ja, dann gebe die Filmdaten zurück
// Wenn nein, dann hole die Filmdaten vom Provider
// Speichere die Filmdaten im Cache
// Gebe die Filmdaten zurück

import ProviderFactory from '../factories/ProviderFactory';
import type { IMovie } from '../interfaces/IMovie';

export default class DataService {
  providerList: string[] = ['tmdb', 'omdb'];
  // movieName: string = 'Inception';
  aggregatedMovieRating: number = 0.0;
  static baseProvider: string = 'omdb'; // TODO: Muss dynamisch ermittelt werden

  // MovieObject

  // getMovieNameFromView
  // setMovieName
  // getBaseProvider(FromProviderFactory)?

  // +++getMovieListFromBaseProvider

  // Let User pick movie
  // setMovieImdbId
  // searchMovieByImdbId??????
  // +++getMovieDataFromProviders
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

  // ################################################################ EINSTIEG ################################################################
  static async getMovieDataFromProviders(imdbId: string) {
    const movieTitle = imdbId;
    const providers = this.getSelectedProvidersFromFactory();
    const movieData: IMovie =
    {
      title: '',
      releaseDate: '',
      imdbId: '',
      posterUrl: '',
      providers: []
    }; // ADD2DOKU (as IMovie)

    const providerResponses = await Promise.all(
      Object.keys(providers).map(async key => {
        try {
          // CHECK if imdbId is correct
          // CHECK if year is correct +-1?
          return await providers[key].fetchMovie(movieTitle);
        } catch (error) {
          console.error(`Fehler bei der Filmsuche mit Provider ${key}:`, error);
          return null;
        }
      })
    );
    console.log("getMovieDataFromProviders->providerResponses", providerResponses);

    // müssen vom baseprovider kommen
    if (providerResponses[0]) {
      movieData.title = providerResponses[0].title;
      movieData.releaseDate = providerResponses[0].releaseDate;
      movieData.imdbId = providerResponses[0].imdbId;
      movieData.posterUrl = providerResponses[0].posterUrl;
    }
    providerResponses.forEach(provider => {
      if (provider) {
        movieData.providers.push(provider.providers[0]);
      }
    });

    console.log("getMovieDataFromProviders->movieData", movieData);
    return movieData;
  }

  

  static async getMovieRatingsFromCache(movieName: string) {
    return null;
  }

  static async getMovieRatingsFromProvider(movieName: string, providerName: string) {
    return null;
  }



}