<template>
	<v-hover>
		<v-card
			slot-scope="{ hover }"
			class="no-shadow card-hover hover-pointer"
			:class="{ deleting }">
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

					<v-list-tile-content @click="handleGetPollResult">
						<!-- *poll type title -->
						<span
							v-t="'poll-multiple'"
							class="body-2 first-letter-uppercase font-weight-medium grey--text" />

						<!-- *poll count -->
						<span class="body-1 font-weight-light d-flex">
							<span v-t="'poll-count'" />
							&nbsp;
							{{ countUsersChoice }}
							&nbsp;
							<v-icon
								v-if="poll.is_locked"
								color="grey"
								size="15"
								v-text="'$vuetify.icons.lock'" />
						</span>
					</v-list-tile-content>

					<v-list-tile-action>
						<v-list-tile>
							<template v-if="hover || isSMnXS">
								<!-- *ops: allow voting -->
								<v-tooltip bottom>
									<template v-slot:activator="{ on }">
										<v-btn flat icon small class="mr-1" v-on="on" @click="handleLockVote">
											<v-icon
												size="20"
												v-text="poll.is_locked
													? '$vuetify.icons.lock'
													: '$vuetify.icons.unlock'" />
										</v-btn>
									</template>
									<span v-t="poll.is_locked
										? 'poll-allow-voting'
										: 'poll-disable-voting'" />
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
									<!-- *edit -->
									<v-list-tile @click="dialogEditPoll">
										<v-list-tile-action>
											<v-icon v-text="'$vuetify.icons.edit'" />
										</v-list-tile-action>
										<v-list-tile-content>
											<v-list-tile-title v-t="'btn-edit'" />
										</v-list-tile-content>
									</v-list-tile>

									<!-- *delete -->
									<v-list-tile @click="emitDeletePoll">
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
			<v-card-title class="pt-0 pb-2 px-4" @click="handleGetPollResult">
				<p class="body-1 mb-0 pl-1" v-text="poll.content" />
			</v-card-title>
		</v-card>
	</v-hover>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
	name: 'PollCard',
	props: {
		poll: {
			type: Object,
			default: () => ({
				content: '...',
				id: null,
				is_locked: false,
				created_at: null,
			}),
		},
	},
	data: () => ({
		deleting: false,
		allow_voting: false,
	}),
	computed: {
		...mapGetters({
			getPollOpts: 'admin/pollOptions/getPollOptions',
			getPollResult: 'admin/pollOptions/getPollResult',
		}),
		pollOptions() {
			return this.getPollOpts(this.poll.id);
		},
		countUsersChoice() {
			const users = new Set();
			for (const opt of this.pollOptions) {
				if (opt.choices) {
					for (const choice of opt.choices) {
						users.add(choice.user_id);
					}
				}
			}
			return users.size;
		},
	},
	methods: {
		...mapMutations({
			setEditPollInfo: 'admin/polls/SET_EDIT_POLL_INFO',
			delPoll: 'admin/polls/DELETE_POLL',
			delPollOptions: 'admin/pollOptions/DELETE_POLL',
			setPollResult: 'admin/pollOptions/SET_POLL_RESULT',
		}),
		handleLockVote() {
			this.setEditPollInfo({
				id: this.poll.id,
				is_locked: !this.poll.is_locked,
			});
		},
		dialogEditPoll() {
			this.$root.$emit('dialog-handle-poll', {
				type: 'edit',
				id: this.poll.id,
			});
		},
		handleGetPollResult() {
			const pollResult = {};
			// if small device show dialog result
			if (this.isSMnXS) {
				this.$root.$emit('dialog-poll-result');
			}
			if (this._cm.notEmpty(this.getPollResult)
				&& this.getPollResult.poll.id == this.poll.id) {
				return;
			}
			Object.assign(pollResult, { poll: this.poll }, { pollOptions: this.pollOptions });
			this.setPollResult(pollResult);
		},
		emitDeletePoll() {
			const emiter = 'delete-poll';
			this.deleting = true;
			this.$socket.emit(emiter, { id: this.poll.id }, ({ errmsg, poll }) => {
				this.deleting = false;
				if (!poll) {
					if (errmsg) {
						this.showNotify(errmsg, 'danger');
					}
					return;
				}
				this.delPoll(poll);
				if (!this.hadGetPOpts) {
					this.delPollOptions(this.poll.id);
				}
			});
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
