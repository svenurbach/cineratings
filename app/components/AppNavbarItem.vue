<script setup lang="ts">

defineProps<{
	target: string;
	label: string;
	tooltip: string;
}>()
</script>

<template>
	<UTooltip
	:delay-duration="100"
	:content="{
		side: 'top',
		sideOffset: 0
    }"
	arrow
	:text="`Zu ${label} wechseln`">

		<ULink
		:to="target" type="button" :title="`Zu ${label} wechseln`"
		class="inline-flex flex-col items-center justify-center px-4 group hover:text-(--ui-primary)">
			<svg
			xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
			class="w-7">
				<slot />
			</svg>
			<span class="sr-only">{{ label }}</span>
		</ULink>

	</UTooltip>
</template>
