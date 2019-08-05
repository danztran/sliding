<template>
	<div>
		<v-card-text class="scrollbar-primary text-xs-center content">
			<v-form ref="form">
				<v-layout row wrap :px-3="!isXS">
					<!-- *Poll ask -->
					<v-flex xs12 mb-2>
						<text-field :field="form.ask" />
					</v-flex>

					<template v-for="(row, idx) in optionRows">
						<div :key="idx" class="d-flex w-100 v-textarea-override">
							<v-flex class="w-100" xs9>
								<text-area :field="row" />
							</v-flex>
							<div>
								<!-- *delete row -->
								<v-btn small class="mt-1" icon @click="delOptRow(idx)">
									<v-icon size="20" color="grey lighten-1" v-text="'$vuetify.icons.delete'" />
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
					<v-flex xs12 class="custom-checkbox">
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
							v-if="selectMultiple && limitMultiple"
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
				:disabled="loadingState !== ''"
				@click="closeDialog">
				<span v-t="'btn-cancel'" class="first-letter-uppercase" />
			</v-btn>
			<v-btn
				flat
				medium
				color="success"
				:disabled="loadingState !== ''"
				:loading="loadingState !== ''"
				@click="createPoll">
				<span v-t="'btn-create'" class="first-letter-uppercase" />
				<template v-slot:loader>
					<loading--icon-circle :state.sync="loadingState" />
				</template>
			</v-btn>
		</v-card-actions>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
import LoadingIconCircle from '@/components/pieces/LoadingIconCircle.vue';
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
	components: {
		'loading--icon-circle': LoadingIconCircle,
	},
	data: () => ({
		form: initForm(),
		loadingState: '',
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
		selectMultiple: true,
		limitMultiple: true,
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
			this.loadingState = 'loading';
			this.$socket.emit(emiter, pollContent, ({ errmsg, poll }) => {
				if (!poll) {
					if (errmsg) {
						// ...
					}
					return;
				}
				this.emitCreatePollOpt(poll.id);
				this.addPoll(Object.assign(poll, { newAdd: true }));
				this.$refs.form.reset();
			});
		},
		emitCreatePollOpt(pollID) {
			let opt = {};
			for (const row of this.optionRows) {
				if (Object.prototype.hasOwnProperty.call(row, 'value')) {
					opt = {
						poll_id: pollID,
						content: row.value,
					};
					this.$emit('emit-create-poll-opt', opt);
				}
			}
			this.loadingState = 'success';
			this.closeDialog();
		},
	},
};
</script>
