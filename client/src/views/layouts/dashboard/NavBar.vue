<template>
	<v-toolbar
		app
		dark
		centered
		fixed
		:clipped-left="$vuetify.breakpoint.mdAndUp"
		color="primary">
		<v-toolbar-side-icon class="hidden-md-and-up" @click="toggleDrawer"></v-toolbar-side-icon>
		<v-toolbar-title class="white--text">
			<v-list-tile-content>
				<span class="body-2">
					<v-icon  size="20" v-html="'$vuetify.icons.user'"></v-icon>
					deptrai@gmail.com
				</span>
				<span class="caption">Admin</span>
			</v-list-tile-content>
		</v-toolbar-title>

		<v-spacer />

		<v-toolbar-items>
			<v-flex align-center layout>
				<v-text-field
					flat
					solo-inverted
					prepend-icon="search"
					label="Search"
					class="hidden-sm-and-down mt-2 pr-3">
				</v-text-field>

				<v-menu
					transition="slide-y-transition"
					bottom
					left
					offset-y
					content-class="dropdown-menu"
					class="hidden-md-and-down">
					<template v-slot:activator="{ on }">
						<v-avatar :size="35" class="hover" v-on="on">
							<img
								src="https://cdn.vuetifyjs.com/images/john.jpg"
								alt="John">
						</v-avatar>
					</template>
					<v-card>
						<v-list dense>
							<v-list-tile
								v-for="notification in notifications"
								:key="notification">
								<v-list-tile-title v-text="notification" color="primary"/>
							</v-list-tile>
						</v-list>
					</v-card>
				</v-menu>

				<!-- <v-menu class="hidden-md-and-up">
					<v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
					<v-list>
						<v-list-tile v-for="notification in notifications" :key="notification">
							<v-list-tile-content>
								<v-list-tile-title>{{ notification }}</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</v-menu> -->

			</v-flex>
		</v-toolbar-items>
	</v-toolbar>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			notifications: [
				'You have 5 new tasks',
				'You\'re now a friend with Andrew',
				'Another Notification',
				'Another One'
			]
		};
	},
	methods: {
		toggleDrawer() {}
	}
};
</script>

<style lang="css">
.my-toolbar {
	width: 80%;
	left:  10%;
}
.hover {
	cursor: pointer;
	opacity: .8;
}
</style>
