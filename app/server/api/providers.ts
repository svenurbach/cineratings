// Schnittstelle welcher sich von ProviderRegistry die verfügbaren Provider holt

import ProviderRegistry from '../providers/ProviderRegistry';

export default defineEventHandler((event) => {
    return ProviderRegistry.getRegisteredProviders();
 });