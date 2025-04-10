// Bekommt von der ProviderFactory die ausgewählten Provider
// Bekommt von der View den Film
// Prüft ob es Filmdaten im Cache gibt
// Wenn ja, dann gebe die Filmdaten zurück
// Wenn nein, dann hole die Filmdaten vom Provider
// Speichere die Filmdaten im Cache
// Gebe die Filmdaten zurück
import type ProviderFactory from '../factories/ProviderFactory';
import type RatingService from './RatingService';
import type { MovieRatingProvider } from '../interfaces/MovieRatingProvider';
import type { MovieRatingData } from '../interfaces/MovieRatingData';
import type { MovieMetadata } from '../interfaces/MovieMetadata';
// import { getCache, setCache } from "../server/utils/cache";

export default class DataService {
  appConfig;
  appTitle: string;
  mainProvider: string;
  customRatingId: string;
  providerFactory: ProviderFactory;
  ratingService: RatingService;

  public constructor(providerFactory: ProviderFactory, ratingService: RatingService) {
    this.appConfig = useAppConfig();
    this.appTitle = this.appConfig.title;
    this.mainProvider = this.appConfig.mainProvider;
    this.customRatingId = this.appConfig.customRatingId;
    this.providerFactory = providerFactory;
    this.ratingService = ratingService;
  }

  public async getMovieListFromMainProvider(movieName: string): Promise<MovieMetadata[] | null> {
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

  // ####################### EINSTIEG #######################
  public async getMovieData(imdbId: string): Promise<MovieRatingData[]> {
    let mainProviderNotCheckedFromUser = false;
    const selectedProviders = this.getProviderListFromLocalStorage();

    // Wenn der Nutzer den MainProvider nicht aktiviert hat, brauchen wir
    // dennoch die Daten um den CustomRatingRecord zu erstellen
    if (!selectedProviders.includes(this.mainProvider)) {
      mainProviderNotCheckedFromUser = true;
      selectedProviders.push(this.mainProvider);
    }

    const providers = this.getInstancesFromProviderFactory(selectedProviders);

    // TODO: checkCache
    let movieRatingRecords = await this.getMovieRatingsFromProviders(imdbId, providers);
    // SaveCache
    const movieDetails = this.getMovieMetadataFromMainProvider(this.mainProvider, movieRatingRecords);

    // MainProviderdaten sind im Record vorhanden. Dürfen aber nicht mit
    // aggregiert werden, wenn der Nutzer ihn nicht aktiviert hat
    if (mainProviderNotCheckedFromUser) {
      movieRatingRecords = movieRatingRecords.filter(record => record.id !== this.mainProvider);
    }

    const aggregatedMovieRating = this.ratingService.getAggregatedMovieRating(movieRatingRecords);
    const customRatingRecord = this.buildCustomRatingRecord(movieDetails, aggregatedMovieRating, movieRatingRecords);
    movieRatingRecords.push(customRatingRecord);

    console.log("movieRatingRecords(+customRatingRecord)", movieRatingRecords);

    return movieRatingRecords;
  }

  private getProviderListFromLocalStorage(): string[] {
    const providers = this.appConfig.providers;
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
    };

    return allProviders;
  }

  private getInstancesFromProviderFactory(providerList: string[]): MovieRatingProvider[] {
    const providers = this.providerFactory.createProviders(providerList);
    return providers;
  }

  private async getMovieRatingsFromProviders(imdbId: string, providers: MovieRatingProvider[]): Promise<(MovieRatingData)[]> {
    const providerResponses = await Promise.all(
      providers.map(async provider => {
        try {
          return provider.fetchMovie(imdbId);
        } catch (error) {
          console.error(`Fehler bei der Filmsuche mit Provider ${provider}:`, error);
          return null;
        }
      })
    );
    // Filtern von null Werten
    const validResponses = providerResponses.filter(response => response != null);

    return validResponses;
  }

  private buildCustomRatingRecord(movieDetails: MovieMetadata, aggregatedMovieRating: number): MovieRatingData {
    const customMovieRatingRecord: MovieRatingData = {
      id: this.customRatingId,
      name: this.appTitle,
      homepageUrl: 'https://www.cineratings.de',
      primaryRating: aggregatedMovieRating,
      movieMetadata: {
        title: movieDetails.title,
        year: movieDetails.year,
        imdbId: movieDetails.imdbId,
        posterUrl: movieDetails.posterUrl,
        runtime: movieDetails.runtime,
        plot: movieDetails.plot
      }
    };

    return customMovieRatingRecord;
  }

  private getMovieMetadataFromMainProvider(mainProviderId: string, providerResponses: MovieRatingData[]): MovieMetadata {
    const mainProviderData = providerResponses.find(p => p.id === mainProviderId);
    if (!mainProviderData) {
      throw new Error(`MainProvider nicht gefunden: ${mainProviderId}`);
    }

    const movieMetadata: MovieMetadata = {
      title: mainProviderData.movieMetadata.title,
      year: mainProviderData.movieMetadata.year,
      imdbId: mainProviderData.movieMetadata.imdbId,
      posterUrl: mainProviderData.movieMetadata.posterUrl,
      runtime: mainProviderData.movieMetadata.runtime,
      plot: mainProviderData.movieMetadata.plot
    };

    return movieMetadata;
  }

  // TODO: Cache implementieren
  // private getMovieRatingsFromCache(providerId: string, imdbId: string): MovieRatingData | null {
  //   const cacheKey = providerId + '-' + imdbId;
  //   const cachedData = getCache(cacheKey);
  //   if (cachedData) {
  //     return cachedData;
  //   }
  //   return null;
  // }

  // private setMovieRatingsToCache(providerId: string, imdbId: string, data: MovieRatingData) {
  //   const cacheKey = providerId + '-' + imdbId;
  //   setCache(cacheKey, data, 5 * 60 * 1000);
  // }

}
