<template>
	<v-tab-item
		:transition="false"
		:reverse-transition="false">
		<v-card-text class="scrollbar-primary text-xs-center poll-content">
			<v-form ref="form">
				<v-layout row wrap :px-3="!isXS">
					<!-- *Poll ask -->
					<v-flex xs12>
						<text-field :field="form.ask" />
					</v-flex>

					<!-- <text-area :field="form.option" /> -->
					<v-flex xs8>
						<template v-for="(row, idx) in optionRows">
							<text-area :key="idx" :field="row" />
						</template>
					</v-flex>
					<v-flex xs12>
						<v-checkbox
							v-model="markCorrect"
							color="primary"
							class="mt-0"
							:label="$t('poll-mark-correct')" />
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
				@click="closeDialog">
				<span v-t="'btn-cancel'" class="first-letter-uppercase" />
			</v-btn>
			<v-btn
				flat
				medium
				color="success"
				@click="handleCreatePoll">
				<span v-t="'btn-create'" class="first-letter-uppercase" />
			</v-btn>
		</v-card-actions>
	</v-tab-item>
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
	name: 'CreatePollTab',
	data: () => ({
		form: initForm(),
		optionRows: [
			{
				value: '',
				placeholder: 'lb-add-option',
				type: 'text',
				rows: 2,
				solo: true,
				flat: true,
				outline: true,
				autogrow: true,
			},
		],
		markCorrect: false,
		selectMultiple: false,
		limitMultiple: false,
	}),
	methods: {
		...mapMutations({
			addPoll: 'admin/polls/ADD_POLL',
			addPollOption: 'admin/pollOptions/ADD_POLL_OPTION',
		}),
		closeDialog() {
			this.$emit('close-dialog');
		},
		addOptionRow() {
			this.optionRows.push({
				value: '',
				placeholder: 'lb-add-option',
				type: 'text',
				rows: 2,
				solo: true,
				flat: true,
				outline: true,
				autogrow: true,
				autofocus: true,
			});
		},
		handleCreatePoll() {
			if (this.form.ask.value === '') {
				this.form.ask.errmsg = this.$t('requireField');
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
			this.$emit('start-loading');
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
					// eslint-disable-next-line
					this.$socket.emit(emiter, otp, ({ errmsg, poll_option }) => {
						// eslint-disable-next-line
						if (!poll_option) {
							if (errmsg) {
								this.showNotify(errmsg, 'danger');
							}
							return;
						}
						this.addPollOption({ poll_id: pollID, option: poll_option });
					});
				}
			}
			this.closeDialog();
		},
	},
};
</script>

<style lang="scss">
</style>
