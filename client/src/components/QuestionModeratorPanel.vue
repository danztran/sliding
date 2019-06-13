<template>
	<v-layout row wrap>
		<!-- HEADER -->
		<v-layout class="px-3 py-2" align-center justify-space-between row fill-height>
			<!-- TITLE -->
			<div class="pt-1 body-1 grey--text"  v-t="'moderator-view-title'"></div>
			<!-- ACTIONS -->
			<div class="d-flex">
				<v-switch
					class="ma-0 pt-2"
					color="primary"
					:label="$t('moderator-view-stt')"
					hide-details
					v-model="onModerator">
				</v-switch>
				<v-menu bottom nudge-bottom offset-y left>
					<template v-slot:activator="{ on }">
						<v-btn
							v-on="on"
							class="ma-0"
							icon>
							<v-icon
								:size="icon.xs"
								v-html="'$vuetify.icons.options_dot'">
							</v-icon>
						</v-btn>
					</template>

					<v-list class="py-0" dense subheader>
						<v-subheader v-t="'opt-sort-by-title'"></v-subheader>
						<v-list-tile>
							<v-list-tile-action>
								<v-icon/>
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title v-t="'btn-oldest'"></v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>

						<v-list-tile>
							<v-list-tile-action>
								<v-icon/>
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title v-t="'btn-recent'"></v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</v-menu>
			</div>
		</v-layout>

		<v-card class="w-100 card-parent list-scroll scrollbar-primary elevation-2">
			<v-layout row wrap>
				<v-flex xs12>
					<!-- CARD MESSAGE PASSING HERE -->
					<slot></slot>
				</v-flex>
			</v-layout>
		</v-card>

	</v-layout>

</template>

<script>
export default {
	name: 'QuestionModeratorPanel',
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
