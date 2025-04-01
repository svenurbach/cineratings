<script setup lang="ts">
const appConfig = useAppConfig();
const data = ref<{ id: string; name: string }[]>();
data.value = appConfig.providers;
const selectedProviders = ref<string[]>([])
const isLoading = ref(true);

onMounted(() => {
    // Lädt die ausgewählten Provider aus dem LocalStorage
    const storedProviders = localStorage.getItem('selectedProviders')
    selectedProviders.value = storedProviders ? JSON.parse(storedProviders) : data.value?.map(p => p.id) || []
    isLoading.value = false
})

watch(selectedProviders, (newVal) => {
    // Speichert die ausgewählten Provider im LocalStorage
    localStorage.setItem('selectedProviders', JSON.stringify(newVal));
});
</script>

<template>
    <section id="provider-list" class="border border-solid border-black">
        <h3>Anbieter</h3>
        <p>Wähle die Anbieter aus, welche für den Metascore einbeziehen möchtest. </p>
        <div class="p-2">
            <div v-if="isLoading">Wird geladen ...</div>
            <ul v-else>
                <li v-for="{ id, name } in data" :key="id">
                    <label>
                        <input
                        v-model="selectedProviders"
                        type="checkbox"
                        :value="id">
                        {{ name }}
                    </label>
                </li>
            </ul>
        </div>
    </section>
</template>
