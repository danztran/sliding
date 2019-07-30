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
						<span v-t="'poll-multiple'" class="body-2 text-capitalize" />

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

					<v-list-tile-action>
						<v-list-tile>
							<template v-if="hover">
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
							</template>
							<v-menu
								bottom
								nudge-bottom="5"
								offset-y
								left>
								<template v-slot:activator="{ on }">
									<v-btn
										class="ml-1"
										icon
										small
										v-on="on">
										<v-icon
											small
											v-text="'$vuetify.icons.more_vert'" />
									</v-btn>
								</template>

								<v-list class="py-0 custom-list" dense>
									<!-- *options: edit -->
									<v-list-tile @click="editPoll">
										<v-list-tile-action>
											<v-icon v-text="'$vuetify.icons.edit'" />
										</v-list-tile-action>
										<v-list-tile-content>
											<v-list-tile-title v-t="'btn-edit'" />
										</v-list-tile-content>
									</v-list-tile>

									<!-- *options: delete -->
									<v-list-tile @click="deletePoll">
										<v-list-tile-action>
											<v-icon v-text="'$vuetify.icons.delete'" />
										</v-list-tile-action>
										<v-list-tile-content>
											<v-list-tile-title v-t="'btn-delete'" />
										</v-list-tile-content>
									</v-list-tile>
								</v-list>
							</v-menu>
						</v-list-tile>
					</v-list-tile-action>
				</v-list-tile>
			</v-list>

			<!-- @desc: poll name -->
			<v-card-title class="pt-0 pb-2 px-4">
				<p class="body-1 mb-0 pl-1" v-text="poll.content" />
			</v-card-title>
		</v-card>
	</v-hover>
</template>

<script>
export default {
	name: 'PollCard',
	props: {
		poll: {
			type: Object,
			default: () => ({
				content: '...',
				id: null,
			}),
		},
	},
	data: () => ({
		allow_voting: false,
		allow_show_voting_result: false,
		activate_poll: false,
	}),
	methods: {
		editPoll() {
			// ...
		},
		deletePoll() {
			this.$emit('delete-poll');
		},
	},
};
</script>

<style lang="css" scoped>
.deleting {
	opacity: .4;
	cursor: not-allowed;
}
</style>
