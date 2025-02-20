// Durchsicht den Ordner Providers nach Provider-Dateien und gibt sie aus.

import fs from 'fs';
// import { ProviderInterface } from '../interfaces/ProviderInterface';

export default class ProviderRegistry {

    static getRegisteredProviders() {

        const appConfig = useAppConfig();
        const providerDirectory = appConfig.providerDirectory;
        const providers: Record<string, { providerClassName: string }> = {};

        fs.readdirSync(providerDirectory).forEach((file) => {
            if (file.endsWith('Provider.ts')) {
                const providerName = file.replace('Provider.ts', '');
                const providerClassName = file.replace('.ts', '');
                // TODO Lesbaren Namen der Provider auslesen und mit geben

                providers[providerName] = {
                    providerClassName: providerClassName,
                };
            }
        });

        return providers;
    }
}