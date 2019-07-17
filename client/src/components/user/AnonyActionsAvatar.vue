<template>
	<v-menu
		transition="slide-y-transition"
		bottom
		left
		offset-y
		:nudge-width="250"
		class="pr-0"
		content-class="dropdown-menu">
		<!-- *icon dropdown -->
		<template v-slot:activator="{ on }">
			<v-btn flat icon color="grey lighten-2" v-on="on">
				<v-icon size="20" v-text="'$vuetify.icons.person'" />
			</v-btn>
		</template>

		<v-layout
			class="fill-height"
			column>
			<v-card>
				<v-list class="pa-0">
					<!-- *Admin login -->
					<v-list-tile to="/login">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="red"
								size="20"
								v-text="'$vuetify.icons.person'" />
						</v-list-tile-action>

						<v-list-tile-title v-t="'btn-admin-login'" />
					</v-list-tile>

					<!-- *Quick signup -->
					<v-list-tile @click="toggleQickSignUpDialog">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="success"
								size="20"
								v-text="'$vuetify.icons.signup'" />
						</v-list-tile-action>

						<v-list-tile-title v-t="'btn-quick-signup'" />
					</v-list-tile>
				</v-list>
			</v-card>
		</v-layout>
	</v-menu>
</template>

<script>
export default {
	name: 'AnonyActionsAvatar',
	methods: {
		toggleQickSignUpDialog() {
			// ...
		},
	},
};
</script>
