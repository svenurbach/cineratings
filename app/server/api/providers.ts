// Schnittstelle welcher sich von ProviderRegistry die verfügbaren Provider holt
import ProviderService from '../services/ProviderService';

export default defineEventHandler((event) => {
    return ProviderService.getRegisteredProviders();
 });