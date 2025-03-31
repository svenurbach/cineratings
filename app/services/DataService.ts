// Bekommt von der ProviderFactory die ausgewählten Provider
// Bekommt von der View den Film
// Prüft ob es Filmdaten im Cache gibt
// Wenn ja, dann gebe die Filmdaten zurück
// Wenn nein, dann hole die Filmdaten vom Provider
// Speichere die Filmdaten im Cache
// Gebe die Filmdaten zurück
import ProviderFactory from '../factories/ProviderFactory';
import RatingService from './RatingService';
import type { MovieRatingProvider } from '../interfaces/MovieRatingProvider';
import type { MovieRatingData } from '../interfaces/MovieRatingData';
import type { MovieMetadata } from '../interfaces/MovieMetadata';
import { getCache, setCache } from "../server/utils/cache";

export default class DataService {
  appConfig;
  appTitle: string;
  customRatingId: string;
  providerFactory: ProviderFactory;
  ratingService: RatingService;
  providerList: string[];
  mainProvider: string;
  // movieName: string = 'Inception';
  aggregatedMovieRating: number = 0.0;

  public constructor() {
    this.appConfig = useAppConfig();
    this.appTitle = this.appConfig.title;
    this.customRatingId = this.appConfig.customRatingId;
    this.providerFactory = new ProviderFactory();
    this.ratingService = new RatingService();
    this.providerList = this.getProviderListFromLocalStorage(); // Die Liste muss von der Factory kommen und dann mit der View abgeglichen werden
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
    const providers = this.providerFactory.createProviders([this.mainProvider]);

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

  private getProviderListFromLocalStorage() {
    // TODO: Get Provider List from LocalStorage
    const appConfig = useAppConfig();
    const providers = appConfig.providers;
    const allProviders = Object.values(providers).map(provider => provider.id);

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedProviders = localStorage.getItem('selectedProviders');
      if (storedProviders) {
          const parsedProviders = JSON.parse(storedProviders);
          console.log("getProviderListFromLocalStorage->parsedProviders", parsedProviders);
          return parsedProviders;
      } else {
          console.log("getProviderListFromLocalStorage->allProviders", allProviders);
          return allProviders;
      }
    }
    return allProviders;
  }

  private getSelectedProvidersFromFactory() {
    const selectedProviders = this.getProviderListFromLocalStorage();
    const providers = this.providerFactory.createProviders(selectedProviders);
    return providers;
  }

  // ####################### EINSTIEG #######################
  private async getMovieData(imdbId: string): Promise<MovieRatingData[]> {
    const providers = this.getSelectedProvidersFromFactory();
    // TODO: checkCache
    const movieRatingRecords = await this.getMovieRatingsFromProviders(imdbId, providers);
    // SaveCache
    const aggregatedMovieRating = this.ratingService.getAggregatedMovieRating(movieRatingRecords);
    const customRatingRecord = this.buildCustomRatingRecord(aggregatedMovieRating, movieRatingRecords);
    movieRatingRecords.push(customRatingRecord);
    console.log("movieRatingRecords->customRatingRecord", movieRatingRecords);

    return movieRatingRecords;
  }

  private buildCustomRatingRecord(aggregatedMovieRating: string, movieRatingRecords: MovieRatingData[]): MovieRatingData {
    const { movieMetadata: { title, year, imdbId, posterUrl, runtime, plot } } = this.getMovieDetailsFromCoreProvider(this.mainProvider, movieRatingRecords);

    const customMovieRatingRecord: MovieRatingData = {
      id: this.customRatingId,
      name: this.appTitle,
      homepageUrl: 'https://www.cineratings.de',
      primaryRating: aggregatedMovieRating,
      movieMetadata: {
        title: title,
        year: year,
        imdbId: imdbId,
        posterUrl: posterUrl,
        runtime: runtime,
        plot: plot
      }
    };

    return customMovieRatingRecord;
  }

  private getMovieDetailsFromCoreProvider(mainProviderName: string, providerResponses: MovieRatingData[]): MovieRatingData {
    // finde in den providerrepsonses den baseprovider anhand des keys
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
          // const cachedData = this.getMovieRatingsFromCache(provider.id, imdbId);
          // if (cachedData) {
          //   return cachedData;
          // }
          return provider.fetchMovie(imdbId);
        } catch (error) {
          console.error(`Fehler bei der Filmsuche mit Provider ${provider}:`, error);
          return null;
        }
      })
    );
    // CHECK if imdbId is correct
    // CHECK if year is correct +-1?

    // Filtern von null Werten
    const validResponses = providerResponses.filter(response => response !== null);
    // for (const ratingData of validResponses) {
    //   console.log("getMovieRatingsFromProviders->ratingData", ratingData);

    //   this.setMovieRatingsToCache(ratingData.id, imdbId, ratingData);
    // }
    return validResponses;
  }

  // TODO: Cache implementieren
  private getMovieRatingsFromCache(providerId: string, imdbId: string): MovieRatingData | null {
    const cacheKey = providerId + '-' + imdbId;
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      console.log(`[CACHE HIT - CLIENT] cachedData:`, cachedData);
      return cachedData;
    }
    return null;
  }

  private setMovieRatingsToCache(providerId: string, imdbId: string, data: MovieRatingData) {
    const cacheKey = providerId + '-' + imdbId;
    setCache(cacheKey, data, 5 * 60 * 1000);
  }
}
