<template>
	<v-app>
		<!-- <v-navigation-drawer app hide-overlay ></v-navigation-drawer> -->
		<nav-bar />
		<v-content>
			<v-container>
				<v-slide-x-transition mode="out-in">
					<keep-alive>
						<router-view />
					</keep-alive>
				</v-slide-x-transition>
			</v-container>
		</v-content>
		<v-footer></v-footer>
	</v-app>
</template>

<script>
import NavBar from './NavBar.vue';

export default {
	components: {
		'nav-bar': NavBar
	}
};
</script>

<style>
</style>
