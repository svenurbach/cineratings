<script setup lang="ts">
    const data = ref<{ id: string; name: string }[]>();
    const appConfig = useAppConfig();
    data.value = appConfig.providers;
    const selectedProviders = ref<Set<string>>(new Set());
    const isLoading = ref(true);

    // Lädt die ausgewählten Provider aus dem LocalStorage
    onMounted(() => {
        const storedProviders = localStorage.getItem('selectedProviders');
        if (storedProviders) {
            const parsedProviders = JSON.parse(storedProviders);
            selectedProviders.value = new Set(parsedProviders);
        } else {
            selectedProviders.value = new Set(
                (data.value ?? []).map((provider) => provider.id)
            );
        }
        isLoading.value = false;
    });

    // Speichert die ausgewählten Provider im LocalStorage
    watch(selectedProviders, (newVal) => {
        localStorage.setItem('selectedProviders', JSON.stringify(Array.from(newVal)));
    });
</script>

<template>
    <section id="provider-list" class="border border-solid border-black">
        <h3>Anbieter</h3>
        <p>Wähle die Anbieter aus, welche für den Metascore einbeziehen möchtest. </p>
        <div class="p-2">
            <div v-if="isLoading">Loading...</div>
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
