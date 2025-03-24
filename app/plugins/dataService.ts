import { defineNuxtPlugin } from '#app';
import DataService from '~/services/DataService';

export default defineNuxtPlugin((nuxtApp) => {
    // TODO: Abhängigkeiten übergeben. Z.B. ProviderFactory
    // DataService als Singleton
    const dataService = new DataService();
    nuxtApp.provide('dataService', dataService);
});
