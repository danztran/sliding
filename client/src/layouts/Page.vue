<template>
	<v-app>
		<loading-overlay />
		<router-view />
	</v-app>
</template>
<script>
import LoadingOverlay from '@/components/LoadingOverlay.vue';
export default {
	components: {
		'loading-overlay': LoadingOverlay
	}
};
</script>
