<script setup lang="ts">
const { data, status, error, refresh } = useFetch('/api/providers');
const selectedProviders = ref<Set<string>>(new Set());


// TODO: Hier soll die Liste der ausgewählten Provider in den LocalStorage gespeichert werden
watch(selectedProviders, (newVal) => {
    localStorage.setItem('selectedProviders', JSON.stringify(Array.from(newVal)));
}, { deep: true });
// TODO: Hier soll die Liste der ausgewählten Provider aus dem LocalStorage geladen werden. (Dabei muss sichergestellt werden das die Einträge passen, falls ein Provider entfernt oder hinzugefügt wurde!)
// Dies soll im composable useStoredProviders erfolgen

onMounted(() => {
    console.log('Component mounted');
});

onUnmounted(() => {
    console.log('Component unmounted');
});

</script>

<template>
    <section id="provider-list" class="border border-solid border-black">
        <h3>Anbieterliste</h3>
        <div class="p-2">
            <div v-if="status === 'pending'">Loading...</div>
            <div v-else-if="error">Error loading providers</div>
            <div v-else>
                <ul>
                    <li v-for="{ id, name } in data" :key="id">
                        <label>
                            <input v-model="selectedProviders" type="checkbox" :value="id">
                            {{ name }}
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
