<template>
	<v-dialog
		v-model="dialog"
		width="600px"
		no-click-animation
		:fullscreen="isXS">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-card id="dialog-handle-poll">
			<v-container class="px-0 pb-2">
				<v-card-title class="py-0 px-4 headline font-weight-light" primary-title>
					<!-- *create -->
					<div
						v-if="create"
						v-t="'dialog-create-poll'"
						class="first-letter-uppercase" />

					<!-- *edit -->
					<div
						v-else
						v-t="'poll-edit'"
						class="first-letter-uppercase" />

					<!-- *close dialog -->
					<v-spacer />
					<v-btn
						icon
						@click="dialog=false">
						<v-icon
							size="20"
							v-text="'$vuetify.icons.close'" />
					</v-btn>
				</v-card-title>

				<poll--create
					v-if="create"
					@emit-create-poll-opt="emitCreatePollOpt"
					@close-dialog="dialog=false" />

				<poll--edit
					v-else
					v-show="Boolean(showManageTab)"
					:poll="poll"
					:poll-options="pollOptions"
					@emit-edit-poll="emitEditPoll"
					@emit-create-poll-opt="emitCreatePollOpt"
					@emit-edit-poll-opt="emitEditPollOpt"
					@emit-del-poll-opt="emitDelPollOpt"
					@close-dialog="dialog=false" />

				<div v-if="loadingLinear" class="content">
					<bouncy-loader />
				</div>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import CreatePollTab from './pieces/CreatePollTab.vue';
import EditPollTab from './pieces/EditPollTab.vue';

export default {
	name: 'DialogHandlePoll',
	components: {
		'poll--create': CreatePollTab,
		'poll--edit': EditPollTab,
	},
	data: () => ({
		dialog: false,
		loadingLinear: false,
		create: false,
		edit: false,
		handlePollID: null,
		poll: null,
		pollOptions: [],
	}),
	computed: {
		...mapGetters({
			getPoll: 'admin/polls/getPoll',
			getEditPollInfo: 'admin/polls/getEditPollInfo',
			getPollOptions: 'admin/pollOptions/getPollOptions',
		}),
		showManageTab() {
			return !this.create && this.poll && this.pollOptions.length > 0;
		},
	},
	watch: {
		dialog(val) {
			if (!val) {
				this.resetDialog();
			}
		},
		handlePollID(id) {
			if (id) {
				this.poll = this.getPoll(id);
				this.pollOptions = this.getPollOptions(id);
			}
		},
		getEditPollInfo(val) {
			if (val) {
				this.emitEditPoll(val);
			}
		},
	},
	mounted() {
		this.$root.$on('dialog-handle-poll', (dialog) => {
			if (dialog.type === 'create') {
				this.dialog = true;
				this.create = true;
			}
			else {
				this.handlePollID = dialog.id;
				this.pollOptions = this.getPollOptions(this.handlePollID);
				this.dialog = true;
				this.edit = true;
			}
		});
	},
	methods: {
		...mapMutations({
			mergePoll: 'admin/polls/MERGE_POLL',
			setPollOptions: 'admin/pollOptions/SET_POLL_OPTIONS',
			addPollOption: 'admin/pollOptions/ADD_POLL_OPTION',
			mergePollOption: 'admin/pollOptions/MERGE_POLL_OPTION',
			delPollOption: 'admin/pollOptions/DELETE_POLL_OPTION',
		}),
		resetDialog() {
			this.loading = false;
			this.create = false;
			this.edit = false;
		},
		emitCreatePollOpt(opt) {
			/* @params: opt
			*  .poll_id: id of poll
			*  .content: contetn poll option want created
			*/
			const emiter = 'add-poll-option';
			this.$socket.emit(emiter, opt, ({ errmsg, poll_option }) => {
				if (!poll_option) {
					if (errmsg) {
						this.showNotify(errmsg, 'danger');
					}
					return;
				}
				this.addPollOption(poll_option);
			});
		},
		emitEditPoll(info) {
			const emiter = 'edit-poll';
			this.loading = true;
			this.$socket.emit(emiter, info, ({ errmsg, poll }) => {
				this.loading = false;
				if (!poll) {
					if (errmsg) {
						this.showNotify(errmsg, 'danger');
					}
					return;
				}
				this.mergePoll(poll);
				this.dialog = false;
			});
		},
		emitEditPollOpt(opt) {
			const emiter = 'edit-poll-option';
			this.$socket.emit(emiter, opt, (result) => {
				if (!result.poll_option) {
					if (result.errmsg) {
						this.showNotify(result.errmsg, 'danger');
					}
					return;
				}
				this.mergePollOption(result.poll_option);
			});
		},
		emitDelPollOpt(opt) {
			const emiter = 'delete-poll-option';
			this.$socket.emit(emiter, { id: opt.id }, (result) => {
				if (!result.poll_option) {
					if (result.errmsg) {
						this.showNotify(result.errmsg, 'danger');
					}
					return;
				}
				this.delPollOption(Object.assign(result.poll_option, { poll_id: opt.poll_id }));
			});
		},
	},
};
</script>

<style lang="scss">
#dialog-handle-poll {
	.v-input__slot {
		min-height: 36px;
		textarea, input {
			min-height: unset;
			line-height: unset;
			margin-top: 0;
		}
	}
	.custom-checkbox .v-input--checkbox {
		.v-input__slot {
			margin-bottom: .2em !important;
		}
		.v-messages {
			display: none;
		}
	}
	.content {
		overflow-x: scroll;
		height: 50vh;
	}
	@media only screen and (max-width: 600px) {
		.content {
			overflow-x: scroll;
			height: 85vh;
		}
	}
}
</style>
