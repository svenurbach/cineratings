// Durchsicht den Ordner Providers nach Provider-Dateien und gibt sie aus.

import fs from 'fs';
import IProvider from '../interfaces/IProvider';


export default class ProviderRegistry {

    static getAllAvailableProviders() {

        const appConfig = useAppConfig();
        const providerDirectory = appConfig.providerDirectory;
        const providers: Record<string, { providerName:string, providerClassName: string }> = {};

        fs.readdirSync(providerDirectory).forEach((file) => {
            if (file.endsWith('Provider.ts')) {
                const providerName = file.replace('Provider.ts', '');
                const providerClassName = file.replace('.ts', '');
                // TODO: Lesbaren Namen der Provider auslesen und mit geben

                providers[providerName] = {
                    providerName: providerName,
                    providerClassName: providerClassName
                };
            }
        });

        return providers;
    }
}