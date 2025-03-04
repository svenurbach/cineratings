// Bekommt von der View die ausgewählten Provider und gibt diese als Instanz zurück.

import TmdbProvider from "../providers/TmdbProvider";
import OmdbProvider from "../providers/OmdbProvider";
import type { IProvider } from "../interfaces/IProvider";

export default class ProviderFactory {
  static getProvider(providerName: string) {
    const providers: { [key: string]: IProvider } = {
      tmdb: new TmdbProvider(),
      omdb: new OmdbProvider()
    };

    return providers[providerName] || null;
  }
}