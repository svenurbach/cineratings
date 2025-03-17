// Bekommt von der ProviderFactory die ausgewählten Provider
// Bekommt von der View den Film
// Prüft ob es Filmdaten im Cache gibt
// Wenn ja, dann gebe die Filmdaten zurück
// Wenn nein, dann hole die Filmdaten vom Provider
// Speichere die Filmdaten im Cache
// Gebe die Filmdaten zurück

import ProviderFactory from '../factories/ProviderFactory';
import type { CoreProvider } from '../interfaces/CoreProvider';
import type { Movie } from '../interfaces/Movie';
import type { Provider } from '../interfaces/Provider';
import RatingService from './RatingService';

export default class DataService {
  ProviderFactory: ProviderFactory;
  providerList: string[];
  baseProvider: string;
  // movieName: string = 'Inception';
  aggregatedMovieRating: number = 0.0;

  public constructor() {
    this.ProviderFactory = new ProviderFactory();
    this.providerList = this.getProviderListFromView(); // Die Liste muss von der Factory kommen und dann mit der View abgeglichen werden
    this.baseProvider = 'omdb'; // TODO: Muss dynamisch ermittelt werden
  }
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


  private async getMovieListFromBaseProvider(movieName: string): Promise<Movie[] | null> {
    const providers: CoreProvider[] = ProviderFactory.createProviders([this.baseProvider]);
    console.log("getMovieListFromBaseProvider", providers);

    if (!providers) {
      console.error(`Kein gültiger Provider gefunden für: ${this.baseProvider}`);
      return null;
    }

    const baseProvider = providers[0];

    try {
      const response = await baseProvider.searchMovie(movieName);
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
  private async getMovieData(imdbId: string): Promise<Movie> {
    const providers = this.getSelectedProvidersFromFactory();
    const providerResponses = await this.getMovieRatingsFromProviders(imdbId, providers);
    console.log("getMovieDataFromProviders->movieData", providerResponses);

    const movieData = this.buildMovieObject(providerResponses);
    console.log("buildMovieObject->movieData", movieData);

    movieData.providers.push(this.getAggregatedMovieRating(movieData));
    console.log("getAggregatedMovieRating->movieData", movieData);

    return movieData;
  }

  private buildMovieObject(providerResponses: Movie[]): Movie {
    let movie: Movie =
    {
      title: '',
      releaseDate: '',
      imdbId: '',
      posterUrl: '',
      providers: []
    }; // ADD2DOKU (as Movie)

    const updatedMovie = this.setMovieDetailsFromMainProvider(this.baseProvider, movie, providerResponses);
    if (updatedMovie) {
      movie = updatedMovie;
    }
    movie = this.addProviderRatingsToMovie(movie, providerResponses);

    return movie;
  }

  private setMovieDetailsFromMainProvider(mainProviderName: string, movie: Movie, providerResponses: Movie[]): Movie | null {
    // finde in den providerrepsonsees den baseprovider anhand des keys
    const baseProviderData = providerResponses.find(movie => movie.provider && movie.provider.providerId === mainProviderName);

    if (!baseProviderData) {
      console.warn(`BaseProvider nicht gefunden: ${mainProviderName}`);
      return null;
    }

    movie.title = baseProviderData.title;
    movie.releaseDate = baseProviderData.releaseDate;
    movie.imdbId = baseProviderData.imdbId;
    movie.posterUrl = baseProviderData.posterUrl;
    return movie;
  }

  private addProviderRatingsToMovie(movie: Movie, providerResponses: Movie[]) {
    providerResponses.forEach(provider => {
      if (provider) {
        movie.providers.push(provider.provider);
      }
    });
    return movie;
  }

  private async getMovieRatingsFromProviders(imdbId: string, providers: Provider[] ): Promise<(Movie | null)[]> {
    const providerResponses = await Promise.all(
      providers.map(async provider => {
        try {
          // CHECK if imdbId is correct
          // CHECK if year is correct +-1?
          return provider.fetchMovie(imdbId);
        } catch (error) {
          console.error(`Fehler bei der Filmsuche mit Provider ${provider}:`, error);
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

  private getAggregatedMovieRating(movieData: Movie) {
    return RatingService.buildCustomProviderRating(movieData);
  }

}
