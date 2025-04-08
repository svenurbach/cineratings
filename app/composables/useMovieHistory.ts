export interface MovieHistoryItem {
    title: string
    year: string
    imdbId: string
    posterUrl?: string
    rating?: number
    timestamp: string
}

export default function () {

    const movieHistoryKey = 'movie-history'
    const movieHistory = ref<MovieHistoryItem[]>([])

    if (import.meta.client) {
        const storedHistory = localStorage.getItem(movieHistoryKey)
        movieHistory.value = storedHistory ? JSON.parse(storedHistory) : []
    }

    function add(movieItem: MovieHistoryItem) {
        const today = new Date().toISOString().split('T')[0]
        const alreadyExists = movieHistory.value.some(
            item => item.imdbId === movieItem.imdbId && item.timestamp.startsWith(today)
        )
        if (!alreadyExists) {
            movieHistory.value.unshift(movieItem)
        }
    }

    function saveToLocalStorage() {
        if (import.meta.client) {
            localStorage.setItem(movieHistoryKey, JSON.stringify(movieHistory.value))
        }
    }

    function clear() {
        movieHistory.value = []
    }

    watchEffect(() => {
        saveToLocalStorage()
    })

    return { add, clear, movieHistory }
}
