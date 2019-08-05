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
			<v-container px-0 pb-0 pt-2>
				<v-card-title class="py-0">
					<!-- *create -->
					<v-tabs v-if="tabs.create" ref="tabs" lazy slider-color="primary">
						<v-tab
							class="font-weight-regular"
							active-class="primary--text font-weight-bold">
							<span v-t="'dialog-create-poll'" class="first-letter-uppercase" />
						</v-tab>
					</v-tabs>

					<!-- *edit/result -->
					<v-tabs v-else v-model="tabActive" lazy slider-color="primary">
						<v-tab
							class="font-weight-regular"
							active-class="primary--text font-weight-bold">
							<span v-t="'poll-edit'" class="first-letter-uppercase" />
						</v-tab>

						<v-tab
							class="font-weight-regular"
							active-class="primary--text font-weight-bold">
							<span v-t="'poll-results'" class="first-letter-uppercase" />
						</v-tab>
					</v-tabs>

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
				<v-divider />

				<!-- *create poll tab -->
				<v-tabs-items v-if="tabs.create">
					<v-tab-item
						:transition="false"
						:reverse-transition="false">
						<tab--create-poll
							@emit-create-poll-opt="emitCreatePollOpt"
							@close-dialog="dialog=false" />
					</v-tab-item>
				</v-tabs-items>

				<!-- *edit/result tab -->
				<v-tabs-items v-else v-model="tabActive">
					<!-- edit/result -->
					<v-tab-item
						:transition="false"
						:reverse-transition="false">
						<tab--edit-poll
							v-show="Boolean(showManageTab)"
							:poll="poll"
							:poll-options="pollOptions"
							@emit-edit-poll="emitEditPoll"
							@emit-create-poll-opt="emitCreatePollOpt"
							@emit-edit-poll-opt="emitEditPollOpt"
							@emit-del-poll-opt="emitDelPollOpt"
							@start-loading="startLoading"
							@stop-loading="stopLoading"
							@close-dialog="dialog=false" />
					</v-tab-item>

					<v-tab-item
						:transition="false"
						:reverse-transition="false">
						<tab--result-poll
							v-show="Boolean(showManageTab)"
							@start-loading="startLoading"
							@stop-loading="stopLoading"
							@close-dialog="dialog=false" />
					</v-tab-item>
					<div v-if="loadingLinear" class="content">
						<bouncy-loader />
					</div>
				</v-tabs-items>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import CreatePollTab from './pieces/CreatePollTab.vue';
import EditPollTab from './pieces/EditPollTab.vue';
import ResultPollTab from './pieces/ResultPollTab.vue';

export default {
	name: 'DialogHandlePoll',
	components: {
		'tab--create-poll': CreatePollTab,
		'tab--edit-poll': EditPollTab,
		'tab--result-poll': ResultPollTab,
	},
	data: () => ({
		dialog: false,
		loadingLinear: false,
		tabActive: 0,
		tabs: {
			create: false,
			edit: false,
			result: false,
		},
		handlePollID: null,
		poll: null,
		pollOptions: null,
	}),
	computed: {
		...mapGetters({
			getPoll: 'admin/polls/getPoll',
			getPollOptions: 'admin/pollOptions/getPollOptions',
		}),
		showManageTab() {
			return !this.tabs.create && this.poll && this.pollOptions.length > 0;
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
	},
	mounted() {
		this.$root.$on('dialog-handle-poll', (dialog) => {
			if (dialog.type === 'create') {
				this.dialog = true;
				this.tabs.create = true;
			}
			else if (dialog.type === 'edit') {
				this.handlePollID = dialog.id;
				if (dialog.emitGetPOpts) {
					this.emitGetPollOptions(this.handlePollID);
				}
				this.dialog = true;
				this.tabs.edit = true;
				this.tabActive = 0;
			}
			else {
				this.handlePollID = dialog.id;
				if (dialog.emitGetPOpts) {
					this.emitGetPollOptions(this.handlePollID);
				}
				this.dialog = true;
				this.tabs.result = true;
				this.tabActive = 1;
			}
		});
		this.$root.$on('update-poll-options', () => {
			this.pollOptions = this.getPollOptions(this.handlePollID);
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
		startLoading() {
			this.loading = true;
		},
		stopLoading() {
			this.loading = false;
		},
		resetDialog() {
			this.loading = false;
			this.tabActive = 0;
			this.tabs.edit = false;
			this.tabs.create = false;
			this.tabs.result = false;
		},
		emitCreatePollOpt(opt) {
			/* @params: opt
			*  .poll_id: id of poll
			*  .content: contetn poll option want created
			*/
			const emiter = 'add-poll-option';
			this.$socket.emit(emiter, opt, (result) => {
				if (!result.poll_option) {
					if (result.errmsg) {
						this.showNotify(result.errmsg, 'danger');
					}
					return;
				}
				this.addPollOption({
					poll_id: opt.poll_id,
					option: result.poll_option,
				});
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
		emitGetPollOptions(pId) {
			const emiter = 'get-poll-options';
			this.loadingLinear = true;
			this.$socket.emit(emiter, { poll_id: pId }, (result) => {
				this.loadingLinear = false;
				if (!result.poll_options) {
					if (result.errmsg) {
						this.showNotify(result.errmsg, 'danger');
					}
					return;
				}
				this.setPollOptions({
					poll_id: pId,
					options: result.poll_options,
				});
				this.pollOptions = result.poll_options;
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
