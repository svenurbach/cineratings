// Bekommt von der View die ausgewählten Provider und gibt diese als Instanz zurück.

import TmdbProvider from "../providers/TmdbProvider";

export default class ProviderFactory {
  static getProvider(providerName: string) {
    const providers: { [key: string]: TmdbProvider } = {
      tmdb: new TmdbProvider()
    };

    return providers[providerName] || null;
  }
}