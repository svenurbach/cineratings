// Route welche sich von ProviderRegistry die verfügbaren Provider holt
import ProviderService from '../../services/ProviderService';

export default defineEventHandler((_event) => {
    const providers = ProviderService.getAllProvidersFromFactory();
    return providers;
 });
