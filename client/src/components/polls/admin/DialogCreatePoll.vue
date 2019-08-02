<template>
	<v-dialog
		v-model="dialog"
		width="600px"
		:transition="false"
		:fullscreen="isXS"
		lazy>
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-card id="dialog-create-poll">
			<loading-linear :loading="loading" />
			<v-container px-0 pb-0 pt-2>
				<v-card-title class="py-0">
					<!-- *tab create poll -->
					<v-tabs slider-color="primary">
						<v-tab
							class="font-weight-regular"
							active-class="primary--text font-weight-bold">
							<span v-t="'dialog-create-poll'" class="first-letter-uppercase" />
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
					<v-tab-item
						:transition="false"
						:reverse-transition="false">
						<v-card-text class="scrollbar-primary text-xs-center content">
							<v-form ref="form">
								<v-layout row wrap :px-3="!isXS">
									<!-- *Poll ask -->
									<v-flex xs12 mb-2>
										<text-field :field="form.ask" />
									</v-flex>

									<template v-for="(row, idx) in optionRows">
										<div :key="idx" class="d-flex w-100 area-field">
											<v-flex class="w-100" xs9>
												<text-area :field="row" />
											</v-flex>
											<div>
												<!-- *delete row -->
												<v-btn class="mt-1" icon @click="delOptRow(idx)">
													<v-icon medium color="grey" v-text="'$vuetify.icons.delete'" />
												</v-btn>
											</div>
										</div>
									</template>

									<!-- *Add row -->
									<v-flex xs12>
										<v-btn
											class="left ml-0"
											medium
											flat
											outline
											color="primary"
											@click="addOptionRow">
											<v-icon left medium v-text="'$vuetify.icons.add'" />
											<span v-t="'lb-add-option'" class="first-letter-uppercase" />
										</v-btn>
									</v-flex>

									<!-- *allow multi choice -->
									<v-flex xs12>
										<v-checkbox
											v-model="selectMultiple"
											color="primary"
											class="mt-0"
											:label="$t('poll-select-multiple')" />
										<v-checkbox
											v-if="selectMultiple"
											v-model="limitMultiple"
											color="primary"
											class="mt-0"
											:label="$t('poll-limit-select')" />
									</v-flex>

									<!-- *limit of multi choice -->
									<v-flex xs5>
										<text-field
											v-if="limitMultiple"
											color="primary"
											:field="form.limit" />
									</v-flex>
								</v-layout>
							</v-form>
						</v-card-text>

						<v-divider />
						<v-card-actions class="px-3">
							<v-spacer />
							<v-btn
								flat
								medium
								@click="dialog=false">
								<span v-t="'btn-cancel'" class="first-letter-uppercase" />
							</v-btn>
							<v-btn
								flat
								medium
								color="success"
								@click="createPoll">
								<span v-t="'btn-create'" class="first-letter-uppercase" />
							</v-btn>
						</v-card-actions>
					</v-tab-item>
				</v-tabs-items>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapMutations } from 'vuex';
const initForm = () => ({
	ask: {
		value: '',
		label: 'lb-poll-ask',
		type: 'text',
		autofocus: true,
		required: true,
		errmsg: '',
	},
	limit: {
		value: 2,
		type: 'number',
		solo: true,
		flat: true,
		outline: true,
		errmsg: '',
	},
});

export default {
	name: 'DialogCreatePoll',
	data: () => ({
		dialog: false,
		loading: false,
		form: initForm(),
		optionRows: [
			{
				value: '',
				placeholder: 'lb-add-option',
				type: 'text',
				errmsg: '',
				rows: 1,
				solo: true,
				flat: true,
				outline: true,
				autogrow: true,
			},
		],
		selectMultiple: false,
		limitMultiple: false,
	}),
	mounted() {
		this.$root.$on('dialog-create-poll', () => {
			this.dialog = true;
		});
	},
	methods: {
		...mapMutations({
			addPoll: 'admin/polls/ADD_POLL',
			addPollOption: 'admin/pollOptions/ADD_POLL_OPTION',
		}),
		addOptionRow() {
			this.optionRows.push({
				value: '',
				placeholder: 'lb-add-option',
				type: 'text',
				rows: 1,
				solo: true,
				flat: true,
				outline: true,
				autogrow: true,
				autofocus: true,
			});
		},
		delOptRow(index) {
			if (this.optionRows.length > 1) {
				this.optionRows.splice(index, 1);
			}
		},
		createPoll() {
			if (this.form.ask.value === '') {
				this.form.ask.errmsg = this.$t('requireField');
				return;
			}
			if (this.optionRows[0].value === '') {
				this.optionRows[0].errmsg = this.$t('poll-limit-option');
				return;
			}
			if (this.limitMultiple && this.form.limit.value < 2) {
				this.form.limit.errmsg = this.$t('poll-limit-count');
				return;
			}
			this.emitCreatePoll();
		},
		emitCreatePoll() {
			const emiter = 'add-poll';
			const pollContent = {
				max_choices: this.form.limit.value,
				content: this.form.ask.value,
			};
			this.loading = true;
			this.$socket.emit(emiter, pollContent, ({ errmsg, poll }) => {
				if (!poll) {
					if (errmsg) {
						// ...
					}
					return;
				}
				this.emitCreateOtpPoll({ pollID: poll.id });
				this.addPoll(Object.assign(poll, { newAdd: true }));
				this.$refs.form.reset();
			});
		},
		emitCreateOtpPoll({ pollID }) {
			const emiter = 'add-poll-option';
			let otp = {};
			for (const row of this.optionRows) {
				if (Object.prototype.hasOwnProperty.call(row, 'value')) {
					otp = {
						content: row.value,
						poll_id: pollID,
					};
					this.$socket.emit(emiter, otp, (result) => {
						if (!result.poll_option) {
							if (result.errmsg) {
								this.showNotify(result.errmsg, 'danger');
							}
							return;
						}
						this.addPollOption({ poll_id: pollID, option: result.poll_option });
					});
				}
			}
			this.loading = false;
			this.dialog = false;
		},
	},
};
</script>

<style lang="scss">
#dialog-create-poll {
	.area-field {
		.v-input__slot {
			min-height: 50px;
		}
		textarea {
			margin-top: 0;
		}
	}
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
