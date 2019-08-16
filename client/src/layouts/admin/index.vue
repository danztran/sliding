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
			<dialog--create-event />
			<dialog--qrcode />
			<dialog--event-settings />
			<dialog--invite-request />
			<dialog--user-update-profile />
		</v-app>
	</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import handleSockets from '@/mixins/handleSockets';
import NavBar from './NavBar.vue';
import Drawer from './Drawer.vue';
import DashboardEventDialog from '@/components/dashboard/my-events/DashboardEventDialog.vue';
import EventSettingDialog from '@/components/setting/EventSettingDialog.vue';
import DialogQRCode from '@/components/pieces/DialogQRCode.vue';
import DialogInviteRequest from '@/components/user/DialogInviteRequest.vue';
import DialogUserUpdateProfile from '@/components/user/DialogUserUpdateProfile.vue';


export default {
	name: 'AdminLayout',
	components: {
		navbar: NavBar,
		drawer: Drawer,
		'dialog--create-event': DashboardEventDialog,
		'dialog--qrcode': DialogQRCode,
		'dialog--event-settings': EventSettingDialog,
		'dialog--invite-request': DialogInviteRequest,
		'dialog--user-update-profile': DialogUserUpdateProfile,
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
			this.$cookies.set('redirected', true);
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
		this.resetPolls();
		this.resetPollOptions();
		next();
	},
	sockets: {
		get_event(data) {
			console.warn(data);
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
		new_edited_role(inviteRes) {
			this.mergeResponseInvite(inviteRes);
		},
		new_removed_admin(response) {
			console.warn('remove moderator: ', response);
		},
		new_updated_online_users(onlineUsers) {
			this.updateOnlineUsers(onlineUsers);
		},
	},
	methods: {
		...mapMutations({
			setAdminCurrentEvent: 'admin/event/SET_CURRENT_EVENT',
			setGuestCurrentEvent: 'guest/event/SET_CURRENT_EVENT',
			mergeAdminCurrentEvent: 'admin/event/MERGE_CURRENT_EVENT',
			mergeResponseInvite: 'admin/event/MERGE_RESPONSE_INVITE',
			resetEvent: 'admin/event/RESET',
			updateOnlineUsers: 'admin/event/UPDATE_ONLINE_USERS',
			resetQuestions: 'admin/questions/RESET',
			resetPolls: 'admin/polls/RESET',
			resetPollOptions: 'admin/pollOptions/RESET',
		}),
	},
};
</script>

<style lang="scss">
#admin-layout {

}
</style>
