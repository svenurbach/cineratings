// Durchsicht den Ordner Providers nach Provider-Dateien und gibt sie aus.

import fs from 'fs';

export default class ProviderRegistry {

    static async getAllAvailableProviders() {

        const appConfig = useAppConfig();
        const providerDirectory = appConfig.providerDirectory;
        const providers: Record<string, { providerName:string, providerClassName: string }> = {};

        fs.readdirSync(providerDirectory).forEach((file) => {
            if (file.endsWith('Provider.ts')) {
                const providerName = file.replace('Provider.ts', '');
                const providerClassName = file.replace('.ts', '');
                // TODO: Lesbaren Namen der Provider auslesen und mit geben
                // console.log('Provider Directory:', providerDirectory);
                // console.log('File:', file);
                // console.log('Full Path:', `~${providerDirectory}/${file}`);

                // const providerModule = import(`~${providerDirectory}/${file}`);
                // providerModule.then((module) => {
                //     console.log(module.default.providerName);
                // });
                providers[providerName] = {
                    providerName: providerName,
                    providerClassName: providerClassName
                };
            }
        });

        return providers;
    }
}