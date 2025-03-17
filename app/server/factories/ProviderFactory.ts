// Bekommt von der View/LocalStorage die ausgewählten Provider und gibt diese als Instanz zurück.
// TODO: Vielleicht sollte die ProviderFactory die Providerklassen in einem property als lsite speichern und das objekt könnte dann immer abgerufen werden. damit man nicht x mal die klasse instanzieren muss.

import type { Provider } from "../interfaces/Provider";
// TODO: Alle verfügbaren provider dynamisch importieren lassen
import OmdbProvider from "../providers/OmdbProvider";
import TmdbProvider from "../providers/TmdbProvider";
import ImdbProvider from "../providers/ImdbProvider";
import MetacriticProvider from "../providers/MetacriticProvider";
import RottenTomatoesProvider from "../providers/RottentomatoesProvider";

const providerMap: Record<string, new () => Provider> = {
  tmdb: TmdbProvider,
  omdb: OmdbProvider,
  imdb: ImdbProvider,
  metacritic: MetacriticProvider,
  rottentomatoes: RottenTomatoesProvider
};

export default class ProviderFactory {
  // static getProvider(providerName: string) {
  //   const providers: { [key: string]: Provider } = {
  //     tmdb: new TmdbProvider(),
  //     omdb: new OmdbProvider()
  //   };

  //   return providers[providerName] || null;
  // }

  static createProviders(providerNames: string[]): Provider[] {
    const providers: Provider[] = [];

    providerNames.forEach(provider => {
      const ProviderClass = providerMap[provider];
      if (!ProviderClass) {
        throw new Error(`Unbekannter Provider-Typ: ${provider}`);
      }
      providers.push(new ProviderClass());
    });
    console.log("createProviders", providers);

    return providers;
  }

  // getBaseProvider() {
  //   const providers = this.createAllProvidersFromList();
  //   const baseProvider = providers.find(provider => typeof(provider) === 'baseProvider');
  //   return providerMap['omdb'];
  // }

  createAllProvidersFromList(): Provider[] {
    const providers = Object.values(providerMap).map(ProviderClass => new ProviderClass());
    console.log("createAllProviders", providers);
    return providers;
  }

}
