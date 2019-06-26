<template>
	<v-app>
		<!-- <v-navigation-drawer app hide-overlay ></v-navigation-drawer> -->
		<nav-bar />
		<profile-dialog />
		<v-content v-if="ready" id="my-guest-content" class="mt-2">
			<v-slide-y-transition mode="out-in">
				<keep-alive>
					<router-view />
				</keep-alive>
			</v-slide-y-transition>
		</v-content>
	</v-app>
</template>

<script>
import { mapMutations } from 'vuex';
import NavBar from './NavBar.vue';
import handleSockets from '@/mixins/handleSockets';
import ProfileDialog from '@/components/guest/ProfileDialog.vue';

export default {
	components: {
		'nav-bar': NavBar,
		'profile-dialog': ProfileDialog
	},
	mixins: [handleSockets],
	data: () => ({
		ready: false
	}),
	watch: {
		ready(val) {
			if (val) {
				this.$root.$emit('hide-loading-overlay');
			}
		}
	},
	beforeCreate() {
		this.$root.$emit('show-loading-overlay');
	},
	created() {
		this.$socket_updateHeaders();
		if (this.$socket.disconnected) {
			this.$socket.connect();
		}
		else {
			this.ready = true;
		}
	},
	beforeRouteLeave(to, from, next) {
		if (to.name !== 'admin-event') {
			this.$socket.emit('leave-event');
		}
		this.resetEvent();
		next();
	},
	sockets: {
		connect() {
			this.$socket.emit('join-event', this.$route.params.code);
			// ..
		},
		get_event(data) {
			if (data.role.name !== 'guest') {
				this.setAdminCurrentEvent(data);
				this.$router.push({ name: 'admin-event', params: this.$route.params });
			}
			else {
				this.setGuestCurrentEvent(data);
				this.ready = true;
			}
		}
	},
	methods: {
		...mapMutations({
			setAdminCurrentEvent: 'admin/event/SET_CURRENT_EVENT',
			setGuestCurrentEvent: 'guest/event/SET_CURRENT_EVENT',
			resetEvent: 'guest/event/RESET'
		})
	}
};
</script>

<style lang="css">
#my-guest-content {
	padding: 0 25% !important;
}
</style>
