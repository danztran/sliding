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
			<event-dialog />
		</v-app>
	</div>
</template>

<script>
import NavBar from './NavBar.vue';
import Drawer from './Drawer.vue';
import DashboardEventDialog from '@/components/dashboard/DashboardEventDialog.vue';

export 	default {
	components: {
		navbar: NavBar,
		drawer: Drawer,
		'event-dialog': DashboardEventDialog
	}
};
</script>

<style lang="scss">
#dashboard-layout {

}
</style>
