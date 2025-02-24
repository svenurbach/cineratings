<script lang="ts">
export default {
    setup() {
        const { data, status, error, refresh } = useFetch('/api/providers');
        const selectedProviders = ref<Set<string>>(new Set());

        const toggleProvider = (provider: string) => {
            console.log('toggleProvider', selectedProviders);
            if (selectedProviders.value.has(provider)) {
                selectedProviders.value.delete(provider);
            } else {
                selectedProviders.value.add(provider);
            }
        };



        
        return {
            data,
            status,
            error,
            selectedProviders,
            toggleProvider
        };
    },

    mounted() {
        console.log('Component mounted')
    },

    unmounted() {
        console.log('Component unmounted')
    },
}
</script>

<template>
    <div id="provider-list" class="border border-solid border-black">
        <h3 class="text-lg font-bold">Anbieterliste</h3>
        <div class="p-2">
            <div v-if="status === 'pending'">Loading...</div>
            <div v-else-if="error">Error loading providers</div>
            <div v-else>
                <ul>
                    <!-- TODO: Hier soll der lesbare Name aus der Klasse erscheinen als Text -->
                    <li v-for="(value, providerId) in data" :key="providerId">
                        <label>
                            <input type="checkbox" :value="providerId" @change="toggleProvider(providerId)">
                            {{ providerId }}
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>