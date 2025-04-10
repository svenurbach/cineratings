<script setup lang="ts">
const { clear, movieHistory } = useMovieHistory()
const groupedItemsByDate = ref<{ [key: string]: MovieHistoryItem[] }>({})

onMounted(() => {
    // Einträge nach Datum gruppieren
    movieHistory.value.forEach((item) => {
        const date = new Date(item.timestamp).toLocaleDateString()
        if (!groupedItemsByDate.value[date]) {
            groupedItemsByDate.value[date] = []
        }
        groupedItemsByDate.value[date].push(item)
    })
})

</script>

<template>
    <div>
        <PageHeader title="Verlauf" >
            <UButton
                class="rounded-full opacity-98 cursor-pointer w-min"
                icon="i-heroicons-trash"
                size="xl"
                variant="outline"
                color="neutral"
                title="Verlauf leeren"
                @click="clear"
            />
        </PageHeader>
        <section v-for="(records, date) in groupedItemsByDate" :key="date" class="mt-3">
            <h2>{{ date }}</h2>
            <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <li v-for="record in records" :key="record.timestamp">
                    <ULink :to="{ name: 'movie', query: { id: record.imdbId } }" :title="`Zur Detailseite von ${record.title} wechseln`">
                        <MovieItem
                            :title="record.title"
                            :year="record.year"
                            :poster-url="record.posterUrl"
                        />
                        <!-- <p>Rating: {{ record.rating?.toFixed(0) }}</p> -->
                    </ULink>
                </li>
            </ul>
        </section>
    </div>
</template>
