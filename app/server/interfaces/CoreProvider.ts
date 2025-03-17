import type { Provider } from "./Provider";
import type { Movie } from "./Movie";

/**
 * BaseProvider is a Provider that can be used to search for movies.
 * The app need minimum one BaseProvider to work!
 */
export interface CoreProvider extends Provider {
  searchMovie(query: string): Promise<Movie[]>;
}
