<template>
	<v-app>
		<notify />
		<loading-overlay />
		<router-view />
	</v-app>
</template>
<script>
import { mapMutations } from 'vuex';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import Notify from '@/components/Notify.vue';

export default {
	components: {
		'loading-overlay': LoadingOverlay,
		notify: Notify,
	},
	sockets: {
		new_invited_to_event(newInvite) {
			this.addInvite(newInvite);
		},
		new_removed_from_event(delInvite) {
			this.deleteInvite(delInvite);
			const inAdmin = /admin/i;
			const route = this.$route;
			if (inAdmin.test(route.name)) {
				if (delInvite.code === route.params.code) {
					this.$router.push({ name: 'guest-event', params: { code: route.params.code } });
				}
			}
		},
	},
	methods: {
		...mapMutations({
			addInvite: 'dashboard/ADD_INVITE',
			deleteInvite: 'dashboard/DELETE_INVITE',
		}),
	},
};
</script>
