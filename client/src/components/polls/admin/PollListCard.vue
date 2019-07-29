<template>
	<v-hover>
		<v-card
			slot-scope="{ hover }"
			class="no-shadow card-hover">
			<v-list subheader class="py-1">
				<v-list-tile>
					<!-- *avatar -->
					<v-list-tile-avatar
						class="pl-1"
						small>
						<v-icon
							medium
							color="primary"
							v-text="'$vuetify.icons.multiple_choice'" />
					</v-list-tile-avatar>

					<v-list-tile-content>
						<!-- *poll type title -->
						<span class="body-2 text-capitalize grey--text text--lighten-2">
							<span v-text="'Poll'" />
						</span>

						<!-- *poll count -->
						<span class="body-1 font-weight-light d-flex">
							<span v-t="'poll-count'" />
							&nbsp;X&nbsp;
							<v-icon
								v-if="!allow_voting"
								color="grey"
								size="15"
								v-text="'$vuetify.icons.lock'" />
							<v-icon
								v-if="!allow_show_voting_result"
								color="primary"
								size="15"
								v-text="'$vuetify.icons.polls'" />
						</span>
					</v-list-tile-content>

					<v-list-tile-action v-if="hover">
						<v-list-tile>
							<!-- *ops: allow voting -->
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn flat icon small class="mr-1" v-on="on">
										<v-icon
											size="20"
											v-text="allow_voting
												? '$vuetify.icons.lock'
												: '$vuetify.icons.unlock'" />
									</v-btn>
								</template>
								<span v-t="allow_voting
									? 'poll-disable-voting'
									: 'poll-allow-voting'" />
							</v-tooltip>

							<!-- *opts: allow show poll result -->
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn flat icon small class="mr-1" v-on="on">
										<v-icon
											size="20"
											v-text="allow_show_voting_result
												? '$vuetify.icons.result_off'
												: '$vuetify.icons.polls'" />
									</v-btn>
								</template>
								<span v-t="allow_show_voting_result
									? 'poll-disable-show-result'
									: 'poll-allow-show-result'" />
							</v-tooltip>

							<!-- *opts: start/stop polling -->
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn flat icon small v-on="on">
										<v-icon
											size="20"
											v-text="activate_poll
												? '$vuetify.icons.pause_fill'
												: '$vuetify.icons.start_outline'" />
									</v-btn>
								</template>
								<span v-t="activate_poll
									? 'poll-disactivate'
									: 'poll-activate'" />
							</v-tooltip>
						</v-list-tile>
					</v-list-tile-action>
				</v-list-tile>
			</v-list>

			<!-- @desc: poll name -->
			<v-card-title class="pt-0 pb-2 px-4">
				<p class="body-1 mb-0 pl-1">
					Poll name
				</p>
			</v-card-title>
		</v-card>
	</v-hover>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'PollListCard',
	data: () => ({
		allow_voting: false,
		allow_show_voting_result: false,
		activate_poll: false,
	}),
	computed: {
		...mapGetters({
			// map settings polls
		}),
	},
};
</script>

<style lang="scss">
</style>
