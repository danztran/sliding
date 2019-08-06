<template>
	<div>
		<v-card-text class="scrollbar-primary text-xs-center content">
			<v-form ref="form">
				<v-layout row wrap :px-3="!isXS">
					<!-- *Poll ask -->
					<v-flex xs12>
						<text-field :field="form.ask" />
					</v-flex>

					<template v-for="(row, idx) in optionRows">
						<div :key="idx" class="d-flex w-100 v-textarea-override">
							<v-flex class="w-100" xs9>
								<text-area :field="row" />
							</v-flex>
							<div>
								<template v-if="row.editOpt">
									<template v-if="row.editOn">
										<!-- *edit opt content -->
										<v-btn small class="mt-1" icon @click="emitSaveEditOpt(idx, row.id)">
											<v-icon small color="success" v-text="'$vuetify.icons.save'" />
										</v-btn>

										<!-- *cancel edit -->
										<v-btn small class="mt-1" icon @click="cancelEditOpt(idx)">
											<v-icon small color="grey" v-text="'$vuetify.icons.cancel'" />
										</v-btn>
									</template>

									<!-- *active edit opt -->
									<v-btn v-else small class="mt-1" icon @click="enableEditOpt(idx, row.id)">
										<v-icon small color="primary" v-text="'$vuetify.icons.edit'" />
									</v-btn>
								</template>
								<!-- *emit delete opt -->
								<v-btn v-if="row.newRow" small class="mt-1" icon @click="emitAddOpt(idx)">
									<v-icon small color="success" v-text="'$vuetify.icons.add'" />
								</v-btn>
								<!-- *delete recent row -->
								<v-btn v-if="!row.editOn" small class="mt-1" icon @click="emitDelOpt(idx, row.id)">
									<v-icon small color="error" v-text="'$vuetify.icons.delete'" />
								</v-btn>
							</div>
						</div>
					</template>

					<!-- *add new row -->
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
					</v-flex>

					<!-- *limit of multi choice -->
					<v-flex xs5>
						<text-field
							v-if="selectMultiple"
							color="primary"
							:field="form.limit" />
					</v-flex>
				</v-layout>
			</v-form>
		</v-card-text>

		<v-divider />
		<v-card-actions class="px-3">
			<span class="red--text" v-text="dialogErrMsg" />
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
				:disabled="sending"
				@click="handleEdit">
				<span v-t="'btn-save'" class="first-letter-uppercase" />
			</v-btn>
		</v-card-actions>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
const initForm = () => ({
	ask: {
		value: '',
		label: 'lb-poll-ask',
		type: 'text',
		autofocus: false,
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
	name: 'EditPollTab',
	props: {
		poll: {
			type: Object,
			default: () => ({
				content: '...',
				id: null,
			}),
		},
		pollOptions: {
			type: Array,
			default: () => ({
				content: '',
				id: null,
			}),
		},
	},
	data: () => ({
		form: initForm(),
		optionRows: [],
		selectMultiple: true,
		sending: false,
		dialogErrMsg: '',
	}),
	watch: {
		poll(val) {
			if (val) {
				this.form.ask.value = val.content;
				if (val.max_choices > 1) {
					this.selectMultiple = true;
					this.form.limit.value = val.max_choices;
				}
				else {
					this.form.limit.value = 2;
				}
			}
		},
		pollOptions: {
			deep: true,
			handler(opts) {
				this.fillOpts(opts);
			},
		},
	},
	methods: {
		...mapMutations({
			setEditPollInfo: 'admin/polls/SET_EDIT_POLL_INFO',
		}),
		closeDialog() {
			this.this.dialogErrMsg = '';
			this.$emit('close-dialog');
		},
		fillOpts(opts) {
			this.optionRows = Array.from({ length: opts.length }, () => ({
				value: '',
				errmsg: '',
				id: null,
				placeholder: 'lb-add-option',
				type: 'text',
				rows: 1,
				solo: true,
				flat: true,
				outline: true,
				disabled: true,
				readonly: true,
				autogrow: true,
				editOpt: true,
				editOn: false,
			}));
			this.optionRows.forEach((el, idx) => {
				if (opts[idx] !== undefined) {
					el.id = opts[idx].id;
					el.value = opts[idx].content;
				}
			});
		},
		addOptionRow() {
			this.optionRows.push({
				value: '',
				errmsg: '',
				placeholder: 'lb-add-option',
				type: 'text',
				rows: 1,
				solo: true,
				flat: true,
				outline: true,
				autogrow: true,
				autofocus: true,
				newRow: true,
			});
		},
		enableEditOpt(idx, optId) {
			if (optId) {
				this.optionRows[idx].editOn = true;
				this.optionRows[idx].disabled = false;
				this.optionRows[idx].readonly = false;
			}
		},
		cancelEditOpt(idx) {
			this.optionRows[idx].value = this.pollOptions[idx].content;
			this.optionRows[idx].editOn = false;
			this.optionRows[idx].disabled = true;
			this.optionRows[idx].true = true;
		},
		emitSaveEditOpt(idx, optId) {
			if (this.optionRows[idx].value === '') {
				this.optionRows[idx].errmsg = this.$t('poll-option-empty');
				return;
			}
			if (this.optionRows[idx].value === this.pollOptions[idx].content) {
				this.cancelEditOpt(idx);
				return;
			}
			this.$emit('emit-edit-poll-opt', {
				id: optId,
				content: this.optionRows[idx].value,
			});
			this.pollOptions[idx].content = this.optionRows[idx].value;
			this.optionRows[idx].editOn = false;
			this.optionRows[idx].disabled = true;
			this.optionRows[idx].true = true;
		},
		emitDelOpt(idx, optId) {
			if (optId) {
				if (this.optionRows.length > 1) {
					this.$emit('emit-del-poll-opt', {
						id: optId,
						poll_id: this.poll.id,
					});
				}
				else {
					this.dialogErrMsg = this.$t('poll-limit-option');
					return;
				}
			}
			this.optionRows.splice(idx, 1);
		},
		emitAddOpt(idx) {
			if (this.optionRows[idx].value === '') {
				this.optionRows[idx].errmsg = this.$t('poll-option-empty');
				return;
			}
			this.$emit('emit-create-poll-opt', {
				poll_id: this.poll.id,
				content: this.optionRows[idx].value,
			});
		},
		handleEditPoll() {
			if (this.form.ask.value === '') {
				this.form.ask.errmsg = this.$t('requireField');
				return;
			}
			if (this.selectMultiple && this.form.limit.value < 2) {
				this.form.limit.errmsg = this.$t('poll-limit-count');
				return;
			}
			if (this.form.ask.value === this.poll.content) {
				if (this.form.limit.value === this.poll.max_choices) {
					return;
				}
			}
			this.setEditPollInfo({
				id: this.poll.id,
				content: this.form.ask.value,
				max_choices: this.form.limit.value,
			});
		},
		handleEdit() {
			// this.sending = true;
			this.handleEditPoll();
		},
	},
};
</script>

<style lang="css" scoped>
</style>
