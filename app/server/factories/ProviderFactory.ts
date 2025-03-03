// Bekommt von der View die ausgewählten Provider und gibt diese als Instanz zurück.

import TmdbProvider from "../providers/TmdbProvider";
import OmdbProvider from "../providers/OmdbProvider";

export default class ProviderFactory {
  static getProvider(providerName: string) {
    const providers: { [key: string]: TmdbProvider } = {
      tmdb: new TmdbProvider(),
      omdb: new OmdbProvider()
    };

    return providers[providerName] || null;
  }
}