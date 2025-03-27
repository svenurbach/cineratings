// Gibt eine liste aller gecacheden Filme zurück. mit allen dazugehörigen Informationen.
import { getFullCache } from "../../server/utils/cache";

export default defineEventHandler(() => {
  return {
    cache: getFullCache(),
    timestamp: new Date().toISOString(),
  };
});
