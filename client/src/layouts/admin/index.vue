<template>
	<v-app>
		<navbar />
		<drawer />
		<v-content>
			<v-container fluid>
				<v-slide-x-transition mode="out-in">
					<router-view />
				</v-slide-x-transition>
			</v-container>
		</v-content>
		<event-dialog />
	</v-app>
</template>

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
