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
	sockets: {
		new_invited_to_event(newInviteRes) {
			console.warn('invite request: ', newInviteRes);
		},
		new_removed_from_event(response) {
			console.warn('remove moderator: ', response);
		},
	},
};
</script>
