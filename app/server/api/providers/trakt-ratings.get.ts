import { getCache, setCache } from "../../utils/cache";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const apiKey = config.traktApiClientId;

    const query = getQuery(event);
    const imdbId = query.imdbId as string;

    if (!imdbId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Query parameter is required'
        });
    }

    // Prüfen ob die Response zum Film im Cache vorliegt
    const cacheKey = `trakt-${imdbId}`;
    const cachedData = getCache(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    const url = `https://api.trakt.tv/movies/${encodeURIComponent(imdbId)}/ratings`;
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'User-Agent': 'CineRatings/1.0.0',
            'trakt-api-key': apiKey,
            'trakt-api-version': '2'
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw createError({
                statusCode: response.status,
                statusMessage: `Fehler beim Abrufen der Daten: ${response.statusText}`
            });
        }

        const data = await response.json();

        // Antwort im Cache ablegen (TTL: 5 Minuten)
        setCache(cacheKey, data, 5 * 60 * 1000);

        return data;

    } catch (error) {
        // Fehlerbehandlung
        console.error('Fehler beim Abrufen der Trakt-Daten:', error);
    }

    // {
    //     "rating": 7.47316,
    //     "votes": 3893,
    //     "distribution": {
    //         "1": 44,
    //         "2": 37,
    //         "3": 26,
    //         "4": 70,
    //         "5": 136,
    //         "6": 500,
    //         "7": 1037,
    //         "8": 1166,
    //         "9": 410,
    //         "10": 464
    //     }
    // }

});
