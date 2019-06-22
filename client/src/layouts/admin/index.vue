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
import { mapMutations } from 'vuex';
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
		'event-setting-dialog': EventSettingDialog
	},
	data: () => ({
		ready: false
	}),
	beforeCreate() {
		this.$root.$emit('show-loading-overlay');
		this.$socket.connect();
		this.$socket.emit('join-event', this.$route.params.code);
	},
	beforeRouteLeave(to, from, next) {
		this.$socket.emit('leave-event');
		this.resetEvent();
		this.resetQuestions();
		next();
	},
	sockets: {
		connect() {
			// ..
		},
		get_event(data) {
			this.setCurrentEvent(data);
			this.ready = true;
		}
	},
	methods: {
		...mapMutations({
			setCurrentEvent: 'admin/event/SET_CURRENT_EVENT',
			resetEvent: 'admin/event/RESET',
			resetQuestions: 'admin/questions/RESET'
		})
	}
};
</script>

<style lang="scss">
#admin-layout {

}
</style>
