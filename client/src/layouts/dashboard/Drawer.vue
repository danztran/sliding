<template>
	<v-navigation-drawer
		v-model="drawer"
		absolute
		temporary
		app>
		<v-layout
			class="fill-height"
			column>

			<v-list>
				<v-list-tile avatar>
					<v-list-tile-content>
						<v-list-tile-title>
							<v-icon  size="20" v-html="'$vuetify.icons.user'" />
							deptrai@gmail.com
						</v-list-tile-title>
						<v-list-tile-sub-title>Administrator</v-list-tile-sub-title>
					</v-list-tile-content>

					<v-list-tile-action>
						<v-tooltip top>
							<template v-slot:activator="{ on }">
								<v-btn icon v-on="on">
									<v-icon v-html="'$vuetify.icons.setting'"/>
								</v-btn>
							</template>
							<span v-t="'accountSetting'" />
						</v-tooltip>
					</v-list-tile-action>
				</v-list-tile>
			</v-list>

			<v-divider/>

			<v-list-tile
				v-for="(link, i) in links"
				:key="i"
				:to="link.to"
				active-class="grey"
				avatar
				class="v-list-item">
				<v-list-tile-action>
					<v-icon>{{ link.icon }}</v-icon>
				</v-list-tile-action>

				<v-list-tile-title v-text="link.text"/>
			</v-list-tile>
		</v-layout>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: 'Drawer',
	data: () => ({
		drawer: false,
		links: [
			{
				to: '/dashboard',
				icon: 'dashboard',
				text: 'Dashboard'
			},
			{
				to: '/event',
				icon: 'event',
				text: 'Event'
			}
		]
	}),
	mounted() {
		this.$root.$on('toggle-drawer', () => {
			this.drawer = !this.drawer;
		});
	}
};
</script>

<style>
</style>
