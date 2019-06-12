<template>
	<v-card class="no-shadow">
		<v-list subheader class="py-1">
			<v-list-tile>
				<!-- AVATAR -->
				<v-list-tile-avatar class="pl-2" :size="icon.lg" color="grey lighten-2">
					<v-icon color="white" v-html="'$vuetify.icons.person'"></v-icon>
				</v-list-tile-avatar>

				<!-- INFO USER -->
				<v-list-tile-content>
					<span class="body-2">
						Username
					</span>
					<span class="body-1 grey--text font-weight-light">
						Date time
					</span>
				</v-list-tile-content>

				<!-- MANAGER MESSAGE -->
				<v-list-tile-action>
					<v-list-tile>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn icon v-on="on">
									<v-icon
										color="grey lighten-1"
										:size="icon.xs"
										v-html="'$vuetify.icons.star_border'">
									</v-icon>
								</v-btn>
							</template>
							<span v-t="'btn-not-star-question'"></span>
						</v-tooltip>

						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									class="mx-1"
									flat
									icon v-on="on"
									color="success">
									<v-icon
										color="success"
										:size="icon.sm"
										v-html="'$vuetify.icons.approve'">
									</v-icon>
								</v-btn>
							</template>
							<span v-t="'btn-approve-question'"></span>
						</v-tooltip>

						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									flat
									icon v-on="on"
									color="red">
									<v-icon
										color="red"
										:size="icon.sm"
										v-html="'$vuetify.icons.dismiss'">
									</v-icon>
								</v-btn>
							</template>
							<span v-t="'btn-dismiss-question'"></span>
						</v-tooltip>

					</v-list-tile>
				</v-list-tile-action>
			</v-list-tile>
		</v-list>

		<!-- MESSAGE CONTENT -->
		<v-card-title class="py-0 px-4">
			<p class="body-1">
				Lorem ipsum dolor sit amet
				consectetur adipisicing elit
				Odio dignissimos nulla nemo ab qui sit.
			</p>
		</v-card-title>
	</v-card>
</template>

<script>
export default {
	name: 'QuestionModeratorCard',
	data: () => ({
		onModerator: false,
		icon: {
			xs: 20,
			sm: 30,
			lg: 35
		}
	})
};
</script>

<style lang="scss" scoped>
</style>
