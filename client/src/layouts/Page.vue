<template>
	<v-app>
		<notify />
		<loading-overlay />
		<router-view />
	</v-app>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import Notify from '@/components/Notify.vue';

export default {
	components: {
		'loading-overlay': LoadingOverlay,
		notify: Notify,
	},
	computed: {
		...mapGetters({
			user: 'auth/user',
		}),
	},
	created() {
		if (!this.user) {
			this.checkAuth();
		}
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
		new_error_message(error) {
			if (error) {
				if (error.errmsg === 440) {
					this.$router.push({ name: 'login' });
				}
			}
		},
	},
	methods: {
		...mapMutations({
			addInvite: 'dashboard/ADD_INVITE',
			deleteInvite: 'dashboard/DELETE_INVITE',
		}),
		checkAuth() {
			this.$axios
				.get(this.$api.auth.info)
				.then((res) => {
					if (res.data.user) {
						this.$store.dispatch('auth/setAuth', res.data.user);
					}
				})
				.catch(() => {});
		},
	},
};
</script>
