<script setup lang="ts">
const userRatingWeight = ref()
const primaryRatingWeight = computed(() => parseFloat((1 - userRatingWeight.value).toFixed(1)));

onMounted(() => {
    // Werte aus dem Localstorage laden
    const storedWeights = localStorage.getItem('ratingWeights');
    if (storedWeights) {
        const { userRatingWeight: storedUserRatingWeight } = JSON.parse(storedWeights);
        userRatingWeight.value = parseFloat(storedUserRatingWeight);
    } else {
        // Standardwert setzen, wenn keine Werte im Localstorage vorhanden sind
        userRatingWeight.value = 0.5;
    }
});

watch(userRatingWeight, (newValue) => {
    // Werte im Localstorage speichern
    localStorage.setItem('ratingWeights', JSON.stringify({
        userRatingWeight: newValue,
        primaryRatingWeight: primaryRatingWeight.value
    }));

});
</script>

<template>
    <div>
        <h2>Gewichtung der Bewertungen</h2>
        <p>Hier kannst du das Verhältnis von Nutzerbewertungen zu anderen Bewertungen wie Metascores oder Critiscores einstellen.</p>
        <USlider
        v-model="userRatingWeight"
        size="xl"
        :min="0"
        :max="1"
        :step="0.1"
        :ui="{
            range: 'bg-inherit'
        }"
        class="py-4"/>
        <div class="grid grid-cols-2 text-sm">
            <div>Kritikerwertungen <br>sind mir wichtiger</div>
            <div class="text-end">Nutzerbewertungen <br>sind mir wichtiger</div>
        </div>

    </div>
</template>
