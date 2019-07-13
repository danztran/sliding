<template>
	<v-app>
		<notify />
		<loading-overlay />
		<router-view />
	</v-app>
</template>
<script>
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import Notify from '@/components/Notify.vue';
export default {
	components: {
		'loading-overlay': LoadingOverlay,
		notify: Notify,
	},
};
</script>
