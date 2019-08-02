<template>
	<v-dialog
		v-model="dialog"
		width="600px"
		mandatory
		:transition="false"
		:fullscreen="isXS">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-card id="dialog-handle-poll">
			<v-container px-0 pb-0 pt-2>
				<v-card-title class="py-0">
					<!-- *tab edit poll -->
					<v-tabs v-model="tabActive" slider-color="primary">
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

				<v-tabs-items
					v-model="tabActive"
					mandatory>
					<bouncy-loader v-if="loadingLinear" />

					<template v-show="poll && pollOptions.length > 0">
						<v-tab-item
							:transition="false"
							:reverse-transition="false">
							<tab--edit-poll
								:poll="poll"
								:poll-options="pollOptions"
								@start-loading="startLoading"
								@stop-loading="stopLoading"
								@close-dialog="dialog=false" />
						</v-tab-item>

						<v-tab-item
							:transition="false"
							:reverse-transition="false">
							<tab--result-poll
								@start-loading="startLoading"
								@stop-loading="stopLoading"
								@close-dialog="dialog=false" />
						</v-tab-item>
					</template>
				</v-tabs-items>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import EditPollTab from './pieces/EditPollTab.vue';
import ResultPollTab from './pieces/ResultPollTab.vue';

export default {
	name: 'DialogHandlePoll',
	components: {
		'tab--edit-poll': EditPollTab,
		'tab--result-poll': ResultPollTab,
	},
	data: () => ({
		dialog: false,
		loadingLinear: false,
		tabActive: 0,
		editPoll: false,
		resultPoll: false,
		handlePollID: null,
		poll: null,
		pollOptions: null,
	}),
	computed: {
		...mapGetters({
			getPoll: 'admin/polls/getPoll',
			getPollEditInfo: 'admin/polls/getPollEditInfo',
			getPollOptions: 'admin/pollOptions/getPollOptions',
		}),
	},
	watch: {
		dialog(val) {
			if (!val) {
				this.resetDialog();
			}
		},
		getPollEditInfo(info) {
			if (info) {
				this.emitEditPoll(info);
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
			if (dialog.type === 'edit') {
				this.handlePollID = dialog.id;
				if (dialog.emitGetPOpts) {
					this.emitGetPollOptions(dialog.id);
				}
				this.dialog = true;
				this.editPoll = true;
				this.tabActive = 0;
			}
			else {
				this.handlePollID = dialog.id;
				if (dialog.emitGetPOpts) {
					this.emitGetPollOptions(dialog.id);
				}
				this.dialog = true;
				this.resultPoll = true;
				this.tabActive = 1;
			}
		});
	},
	methods: {
		...mapMutations({
			setPollOptions: 'admin/pollOptions/SET_POLL_OPTIONS',
			mergePoll: 'admin/polls/MERGE_POLL',
		}),
		startLoading() {
			this.loading = true;
		},
		stopLoading() {
			this.loading = false;
		},
		resetDialog() {
			this.loading = false;
			this.editPoll = false;
			this.resultPoll = false;
			this.tabActive = 0;
		},
		emitGetPollOptions(pId) {
			const emiter = 'get-poll-options';
			this.loadingLinear = true;
			this.$socket.emit(emiter, { poll_id: pId }, (result) => {
				this.loadingLinear = false;
				if (!result.poll_options) {
					if (result.errmsg) {
						// ...
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
	},
};
</script>

<style lang="scss">
#dialog-handle-poll {
	.content {
		overflow-x: scroll;
		height: 40vh;
	}
	@media only screen and (max-width: 600px) {
		.content {
			overflow-x: scroll;
			height: 85vh;
		}
	}
}
</style>
