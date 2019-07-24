<template>
	<div id="dashboard-layout" class="v-toobar-override">
		<v-app>
			<navbar />
			<drawer />
			<v-content class="my-3">
				<v-slide-y-transition mode="out-in">
					<keep-alive>
						<router-view />
					</keep-alive>
				</v-slide-y-transition>
			</v-content>
			<dialog--create-event />
			<dialog--invite-request />
			<dialog--user-update-profile />
			<dialog--qrcode />
		</v-app>
	</div>
</template>

<script>
import NavBar from './NavBar.vue';
import Drawer from './Drawer.vue';

import DialogQRCode from '@/components/pieces/DialogQRCode.vue';
import DashboardEventDialog from '@/components/dashboard/DashboardEventDialog.vue';
import DialogInviteRequest from '@/components/user/DialogInviteRequest.vue';
import DialogUserUpdateProfile from '@/components/user/DialogUserUpdateProfile.vue';


export	default {
	components: {
		navbar: NavBar,
		drawer: Drawer,
		'dialog--qrcode': DialogQRCode,
		'dialog--create-event': DashboardEventDialog,
		'dialog--invite-request': DialogInviteRequest,
		'dialog--user-update-profile': DialogUserUpdateProfile,
	},
};
</script>

<style lang="scss">
#dashboard-layout {

}
</style>
