<template>
	<div id="admin-layout" class="v-toobar-override">
		<v-app>
			<navbar />
			<drawer />
			<v-content v-if="ready" class="my-3">
				<v-slide-y-transition mode="out-in">
					<keep-alive>
						<router-view />
					</keep-alive>
				</v-slide-y-transition>
			</v-content>
			<event-dialog />
			<event-setting-dialog />
		</v-app>
	</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import handleSockets from '@/mixins/handleSockets';
import NavBar from './NavBar.vue';
import Drawer from './Drawer.vue';
import DashboardEventDialog from '@/components/dashboard/DashboardEventDialog.vue';
import EventSettingDialog from '@/components/setting/EventSettingDialog.vue';

export default {
	name: 'AdminLayout',
	components: {
		navbar: NavBar,
		drawer: Drawer,
		'event-dialog': DashboardEventDialog,
		'event-setting-dialog': EventSettingDialog,
	},
	mixins: [handleSockets],
	data: () => ({
		ready: false,
	}),
	computed: {
		...mapGetters({
			user: 'auth/user',
			eventInfo: 'admin/event/getEventInfo',
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
		if (to.name !== 'guest-event') {
			this.$socket.emit('leave-event');
		}
		this.resetEvent();
		this.resetQuestions();
		next();
	},
	sockets: {
		get_event(data) {
			if (data.role.name === 'guest') {
				this.setGuestCurrentEvent(data);
				this.$router.push({ name: 'guest-event', params: this.$route.params });
			}
			else {
				this.setAdminCurrentEvent(data);
				this.ready = true;
			}
		},
		new_edited_event(newSettings) {
			this.mergeAdminCurrentEvent(newSettings);
		},
	},
	methods: {
		...mapMutations({
			setAdminCurrentEvent: 'admin/event/SET_CURRENT_EVENT',
			setGuestCurrentEvent: 'guest/event/SET_CURRENT_EVENT',
			mergeAdminCurrentEvent: 'admin/event/MERGE_CURRENT_EVENT',
			resetEvent: 'admin/event/RESET',
			resetQuestions: 'admin/questions/RESET',
		}),
	},
};
</script>

<style lang="scss">
#admin-layout {

}
</style>
