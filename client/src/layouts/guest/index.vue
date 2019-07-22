<template>
	<v-app>
		<!-- <v-navigation-drawer app hide-overlay ></v-navigation-drawer> -->
		<nav-bar />
		<anony-dialog--update-signup />
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
import { mapMutations, mapGetters } from 'vuex';
import NavBar from './NavBar.vue';
import handleSockets from '@/mixins/handleSockets';
import DialogAnonyUpdateSignup from '@/components/user/DialogAnonyUpdateSignup.vue';

export default {
	components: {
		'nav-bar': NavBar,
		'anony-dialog--update-signup': DialogAnonyUpdateSignup,
	},
	mixins: [handleSockets],
	data: () => ({
		ready: false,
	}),
	computed: {
		...mapGetters({
			user: 'auth/user',
			eventInfo: 'guest/event/getEventInfo',
		}),
	},
	watch: {
		ready(val) {
			if (val) {
				this.$root.$emit('hide-loading-overlay');
			}
		},
	},
	beforeCreate() {
		this.$root.$emit('show-loading-overlay');
	},
	created() {
		if (!this.user) {
			this.$router.push({ name: 'search-event', query: this.$route.params });
		}
		else {
			this.$socket_updateHeaders();
			if (this.eventInfo) {
				this.ready = true;
			}
			else {
				this.$socket.emit('join-event', this.$route.params.code);
			}
		}
	},
	beforeRouteLeave(to, from, next) {
		if (!['admin-event', 'admin-questions'].includes(to.name)) {
			this.$socket.emit('leave-event');
		}
		this.resetEvent();
		this.resetQuestions();
		next();
	},
	sockets: {
		get_event(data) {
			if (data.role.name !== 'guest') {
				this.setAdminCurrentEvent(data);
				this.$router.push({ name: 'admin-event', params: this.$route.params });
			}
			else {
				this.setGuestCurrentEvent(data);
				this.ready = true;
			}
		},
		new_edited_event(newSettings) {
			this.mergeGuestCurrentEvent(newSettings);
		},
	},
	methods: {
		...mapMutations({
			setAdminCurrentEvent: 'admin/event/SET_CURRENT_EVENT',
			setGuestCurrentEvent: 'guest/event/SET_CURRENT_EVENT',
			mergeGuestCurrentEvent: 'guest/event/MERGE_CURRENT_EVENT',
			resetEvent: 'guest/event/RESET',
			resetQuestions: 'guest/questions/RESET',
		}),
	},
};
</script>

<style lang="scss">
#my-guest-content {
	margin-top: 60px !important;
	.v-content__wrap {
		padding: 0 25% !important;
	}
	@media only screen and (max-width: 960px) {
		margin-top: 10px !important;
		.v-content__wrap {
			padding: 0 !important;
		}
	}
}
</style>
