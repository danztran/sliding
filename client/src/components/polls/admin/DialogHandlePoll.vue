<template>
	<v-dialog
		id="my-create-poll"
		v-model="dialog"
		width="600px"
		:transition="false"
		:fullscreen="isXS"
		lazy>
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-card>
			<loading-linear :loading="loading" />
			<v-container px-0 pb-0 pt-2>
				<v-card-title class="py-0">
					<!-- *tab create poll -->
					<v-tabs v-if="createPoll" slider-color="primary">
						<v-tab
							class="font-weight-regular"
							active-class="primary--text font-weight-bold">
							<span v-t="'dialog-create-poll'" class="first-letter-uppercase" />
						</v-tab>
					</v-tabs>
					<!-- *tab edit poll -->
					<v-tabs v-if="editPoll || resultPoll" v-model="tabActive" slider-color="primary">
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

				<v-tabs-items>
					<tab--create-poll
						v-if="createPoll"
						@start-loading="startLoading"
						@stop-loading="stopLoading"
						@close-dialog="dialog=false" />

					<template v-if="editPoll || resultPoll">
						<v-tabs-items v-model="tabActive">
							<tab--edit-poll
								:id="handlePollID"
								@start-loading="startLoading"
								@stop-loading="stopLoading"
								@close-dialog="dialog=false" />

							<tab--result-poll
								:id="handlePollID"
								@start-loading="startLoading"
								@stop-loading="stopLoading"
								@close-dialog="dialog=false" />
						</v-tabs-items>
					</template>
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
		loading: false,
		createPoll: false,
		editPoll: false,
		resultPoll: false,
		tabActive: null,
		handlePollID: null,
	}),
	computed: {
		...mapGetters({
			getPollEditInfo: 'admin/polls/getPollEditInfo',
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
	},
	mounted() {
		this.$root.$on('dialog-handle-poll', (dialog) => {
			if (dialog.type === 'create') {
				this.dialog = true;
				this.createPoll = true;
			}
			else if (dialog.type === 'edit') {
				this.handlePollID = dialog.id;
				this.dialog = true;
				this.editPoll = true;
			}
			else {
				this.handlePollID = dialog.id;
				this.dialog = true;
				this.resultPoll = true;
				this.tabActive = 1;
			}
		});
	},
	methods: {
		...mapMutations({
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
			this.createPoll = false;
			this.editPoll = false;
			this.resultPoll = false;
			this.tabActive = null;
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

<style lang="css">
.poll-content {
	overflow-x: scroll;
	height: 40vh;
}
@media only screen and (max-width: 600px) {
	.poll-content {
		overflow-x: scroll;
		height: 85vh;
	}
}
</style>
