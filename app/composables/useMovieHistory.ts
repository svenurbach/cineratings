export default function () {
    interface MovieHistoryItem {
        title: string
        year: string
        imdbId: string
        posterUrl?: string
        rating?: number
        timestamp: string
    }

    const movieHistoryKey = 'movie-history'
    const movieHistory = ref<MovieHistoryItem[]>([])

    if (import.meta.client) {
        const storedHistory = localStorage.getItem(movieHistoryKey)
        movieHistory.value = storedHistory ? JSON.parse(storedHistory) : []
    }

    function add(movieItem: MovieHistoryItem) {
        movieHistory.value.push(movieItem)
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
