// Bekommt von der ProviderFactory die ausgewählten Provider
// Bekommt von der View den Film
// Prüft ob es Filmdaten im Cache gibt
// Wenn ja, dann gebe die Filmdaten zurück
// Wenn nein, dann hole die Filmdaten vom Provider
// Speichere die Filmdaten im Cache
// Gebe die Filmdaten zurück
import ProviderFactory from '../factories/ProviderFactory';
import type { MovieRatingProvider } from '../interfaces/MovieRatingProvider';
import type { MovieRatingData } from '../interfaces/MovieRatingData';
import type { MovieMetadata } from '../interfaces/MovieMetadata';
import RatingService from './RatingService';

export default class DataService {
  appConfig;
  appTitle: string;
  ProviderFactory: ProviderFactory;
  providerList: string[];
  mainProvider: string;
  // movieName: string = 'Inception';
  aggregatedMovieRating: number = 0.0;

  public constructor() {
    this.appConfig = useAppConfig();
    this.appTitle = this.appConfig.title;
    this.ProviderFactory = new ProviderFactory();
    this.providerList = this.getProviderListFromView(); // Die Liste muss von der Factory kommen und dann mit der View abgeglichen werden
    this.mainProvider = this.appConfig.mainProvider;
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


  private async getMovieListFromMainProvider(movieName: string): Promise<MovieMetadata[] | null> {
    const providers = ProviderFactory.createProviders([this.mainProvider]);

    if (!providers) {
      console.error(`Kein gültiger Provider gefunden für: ${this.mainProvider}`);
      return null;
    }

    const mainProvider = providers[0];

    try {
      const response = await mainProvider.searchMovie(movieName);
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
  private async getMovieData(imdbId: string): Promise<MovieRatingData[]> {
    const providers = this.getSelectedProvidersFromFactory();
    const movieRatingRecords = await this.getMovieRatingsFromProviders(imdbId, providers);
    const aggregatedMovieRating = (RatingService.calculateAggregatedMovieRating(movieRatingRecords));
    const customRatingRecord = this.buildCustomRatingRecord(aggregatedMovieRating, movieRatingRecords);
    movieRatingRecords.push(customRatingRecord);
    console.log("movieRatingRecords->customRatingRecord", movieRatingRecords);

    return movieRatingRecords;
  }

  private buildCustomRatingRecord(aggregatedMovieRating: string, movieRatingRecords: MovieRatingData[]): MovieRatingData {
    const { movieMetadata: { title, year, imdbId, posterUrl } } = this.getMovieDetailsFromCoreProvider(this.mainProvider, movieRatingRecords);

    const customMovieRatingRecord: MovieRatingData = {
      id: 'cr',
      name: this.appTitle,
      homepageUrl: 'https://www.cineratings.de',
      primaryRating: aggregatedMovieRating,
      movieMetadata: {
        title: title,
        year: year,
        imdbId: imdbId,
        posterUrl: posterUrl
      }
    };

    return customMovieRatingRecord;
  }

  private getMovieDetailsFromCoreProvider(mainProviderName: string, providerResponses: MovieRatingData[]): MovieRatingData {
    // finde in den providerrepsonsees den baseprovider anhand des keys
    const mainProviderData = providerResponses.find(p => p.id === mainProviderName);

    if (!mainProviderData) {
      throw new Error(`MainProvider nicht gefunden: ${mainProviderName}`);
    }

    return mainProviderData;
  }

  private async getMovieRatingsFromProviders(imdbId: string, providers: MovieRatingProvider[]): Promise<(MovieRatingData)[]> {
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

}
