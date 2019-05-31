<template>
	<v-app>
		<navbar />
		<drawer />
		<v-content>
			<v-container fluid>
				<router-view></router-view>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import NavBar from './NavBar.vue';
import Drawer from './Drawer.vue';

export 	default {
	components: {
		navbar: NavBar,
		drawer: Drawer
	}
};
</script>
