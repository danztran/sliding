<template>
	<div id="dashboard-layout">
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
<style lang="scss">
#dashboard-layout {
	.v-content {
		margin: 5px 0 !important;
	}
	.v-content,
	.v-toolbar__content,
	.v-toolbar__extension  {
		padding: 0 20% !important;
	}
	@media only screen and (max-width: 1280px) {
		.v-content,
		.v-toolbar__content,
		.v-toolbar__extension  {
			padding: 0 10% !important;
		}
	}
	@media only screen and (max-width: 960px) {
		.v-content,
		.v-toolbar__content,
		.v-toolbar__extension  {
			padding: 0 10px !important;
		}
	}
}
</style>
<script>
import NavBar from './NavBar.vue';
import Drawer from './Drawer.vue';
import EventDialog from '@/components/dials/EventDialog.vue';

export 	default {
	components: {
		navbar: NavBar,
		drawer: Drawer,
		'event-dialog': EventDialog
	}
};
</script>
