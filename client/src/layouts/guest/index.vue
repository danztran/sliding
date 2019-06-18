<template>
	<v-app>
		<!-- <v-navigation-drawer app hide-overlay ></v-navigation-drawer> -->
		<nav-bar />
		<profile-dialog />
		<v-content id="my-guest-content" class="mt-2">
			<v-slide-y-transition mode="out-in">
				<keep-alive>
					<router-view />
				</keep-alive>
			</v-slide-y-transition>
		</v-content>
	</v-app>
</template>

<script>
import NavBar from './NavBar.vue';
import ProfileDialog from '@/components/guest/ProfileDialog.vue';

export default {
	components: {
		'nav-bar': NavBar,
		'profile-dialog': ProfileDialog
	}
};
</script>

<style lang="css">
#my-guest-content {
	padding: 0 25% !important;
}
</style>
