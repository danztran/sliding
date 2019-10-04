<template>
	<v-app>
		<notify />
		<loading-overlay />
		<router-view />
	</v-app>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import LoadingOverlay from '@/components/pieces/LoadingOverlay.vue';
import Notify from '@/components/pieces/Notify.vue';

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
	data: () => ({
		disconnected: false,
	}),
	created() {
		if (!this.user) {
			this.checkAuth();
		}
		this.$socket.connect();
	},
	sockets: {
		disconnect() {
			this.disconnected = true;
			this.showNotify(this.$t('disconnected-warn'), 'danger');
			setTimeout(() => {
				if (this.disconnected) {
					this.showNotify(this.$t('reconnect-warn'), 'warning', 5000000);
				}
			}, 5000);
		},
		connect() {
			if (this.disconnected) {
				this.showNotify(this.$t('reconnected-info'), 'info');
				const { path } = this.$route;
				if (path.indexOf('/admin/event/') != -1
					|| path.indexOf('/guest/event/') != -1) {
					this.$root.$emit('show-loading-overlay');
					location.reload();
				}
			}
		},
		new_invited_to_event(newInvite) {
			this.addInvite(newInvite);
			this.showNotify(this.$t('invite-new'), 'success');
		},
		new_removed_from_event(delInvite) {
			this.deleteInvite(delInvite);
			const inEvent = /admin/i;
			const route = this.$route;
			if (inEvent.test(route.name)) {
				if (delInvite.code === route.params.code) {
					this.$router.push({ name: 'guest-event', params: { code: route.params.code } });
					this.showNotify(this.$t('invite-revoke'), 'danger');
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
