// Bekommt von der ProviderFactory die ausgewählten Provider
// Bekommt von der View den Film
// Prüft ob es Filmdaten im Cache gibt
// Wenn ja, dann gebe die Filmdaten zurück
// Wenn nein, dann hole die Filmdaten vom Provider
// Speichere die Filmdaten im Cache
// Gebe die Filmdaten zurück

import ProviderFactory from '../factories/ProviderFactory';
import type { IMovie } from '../interfaces/IMovie';
import type { IProvider } from '../interfaces/IProvider';

export default class DataService {
  providerList: string[] = ['tmdb', 'omdb'];
  // movieName: string = 'Inception';
  aggregatedMovieRating: number = 0.0;
  baseProvider: string = 'omdb'; // TODO: Muss dynamisch ermittelt werden

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


  async getMovieListFromBaseProvider(movieName: string): Promise<IMovie[] | null> {
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

  private getProviderListFromView() {
    // TODO: Get Provider List from LocalStorage
    return ['omdb', 'tmdb'];
  }

  private getSelectedProvidersFromFactory() {
    const selectedProviders = this.getProviderListFromView();
    const providers = ProviderFactory.createProviders(selectedProviders);
    return providers;
  }

  // ####################### EINSTIEG #######################
  private async getMovieData(imdbId: string) {
    const providers = this.getSelectedProvidersFromFactory();
    const providerResponses = await this.getMovieRatingsFromProviders(imdbId, providers);

    const movieData = this.buildMovieObject(providerResponses);

    console.log("getMovieDataFromProviders->movieData", movieData);
    return movieData;
  }

  private buildMovieObject(providerResponses: IMovie[]): IMovie {
    let movie: IMovie =
    {
      title: '',
      releaseDate: '',
      imdbId: '',
      posterUrl: '',
      provider: null,
      providers: []
    }; // ADD2DOKU (as IMovie)

    const updatedMovie = this.setMovieDetailsFromBaseProvider(this.baseProvider, movie, providerResponses);
    if (updatedMovie) {
      movie = updatedMovie;
    }
    movie = this.addProviderRatingsToMovie(movie, providerResponses);

    return movie;
  }

  private setMovieDetailsFromBaseProvider(baseProviderName: string, movie: IMovie, providerResponses: IMovie[]): IMovie | null {
    // finde in den providerrepsonsees den baseprovider anhand des keys
    const baseProviderData = providerResponses.find(movie => movie.provider && movie.provider.providerId === baseProviderName);

    if (!baseProviderData) {
      console.warn(`BaseProvider nicht gefunden: ${baseProviderName}`);
      return null;
    }

    movie.title = baseProviderData.title;
    movie.releaseDate = baseProviderData.releaseDate;
    movie.imdbId = baseProviderData.imdbId;
    movie.posterUrl = baseProviderData.posterUrl;
    return movie;
  }

  private addProviderRatingsToMovie(movie: IMovie, providerResponses: IMovie[]) {
    providerResponses.forEach(provider => {
      if (provider) {
        movie.providers.push(provider.provider);
      }
    });
    return movie;
  }

  private async getMovieRatingsFromProviders(imdbId: string, providers: { [key: string]: IProvider }): Promise<(IMovie | null)[]> {
    const providerResponses = await Promise.all(
      Object.keys(providers).map(async key => {
        try {
          // CHECK if imdbId is correct
          // CHECK if year is correct +-1?
          return providers[key].fetchMovie(imdbId);
        } catch (error) {
          console.error(`Fehler bei der Filmsuche mit Provider ${key}:`, error);
          return null;
        }
      })
    );
    console.log("getMovieRatingsFromProviders->providerResponses", providerResponses);
    // Filtern von null Werten
    const validResponses = providerResponses.filter(response => response !== null);
    return validResponses;
  }

  // TODO: Cache implementieren
  private async getMovieRatingsFromCache(movieName: string) {
    return null;
  }

}