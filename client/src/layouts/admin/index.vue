<template>
	<v-app>
		<navbar />
		<drawer />
		<v-content>
			<v-slide-x-transition mode="out-in">
				<router-view />
			</v-slide-x-transition>
		</v-content>
		<create-event-dialog />
	</v-app>
</template>

<script>
import NavBar from './NavBar.vue';
import Drawer from './Drawer.vue';
import CreateEventDialog from '@/components/dials/Event.vue';

export 	default {
	components: {
		navbar: NavBar,
		drawer: Drawer,
		'create-event-dialog': CreateEventDialog
	}
};
</script>
