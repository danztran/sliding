<template>
	<div>
		<v-card-text class="scrollbar-primary text-xs-center content">
			<v-form ref="form">
				<v-layout row wrap :px-2="!isXS">
					<!-- *Poll ask -->
					<v-flex xs12 mb-2>
						<text-field :field="form.ask" />
					</v-flex>

					<template v-for="(opt, idx) in optRows">
						<div :key="idx" class="d-flex w-100 v-textarea-override">
							<v-flex class="w-100" xs9>
								<text-area
									:field="opt"
									@change="opt.oldOpt
										? checkEditOldOpt(opt.id)
										: checkAddNewOpt(idx)" />
							</v-flex>
							<div>
								<!-- *delete opt row -->
								<v-btn
									v-if="!opt.editOn"
									small
									icon
									class="mt-1"
									@click="checkDelOldOpt(idx, opt.id, opt.oldOpt)">
									<v-icon small color="grey" v-text="'$vuetify.icons.delete'" />
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

		<v-card-actions>
			<span class="red--text" v-text="dialogErrMsg" />
			<v-spacer />
			<v-btn
				flat
				medium
				@click="closeDialog">
				<span v-t="'btn-cancel'" class="first-letter-uppercase" />
			</v-btn>
			<v-btn
				medium
				color="primary"
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
		optRows: [],
		optAddNew: [],
		optEditID: [],
		optDelID: [],
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
			this.dialogErrMsg = '';
			this.$emit('close-dialog');
		},
		fillOpts(opts) {
			this.optRows = Array.from({ length: opts.length }, () => ({
				value: '',
				errmsg: '',
				id: null,
				placeholder: 'lb-add-option',
				type: 'text',
				rows: 1,
				solo: true,
				flat: true,
				outline: true,
				autogrow: true,
				oldOpt: true,
			}));
			this.optRows.forEach((el, idx) => {
				if (opts[idx] !== undefined) {
					el.id = opts[idx].id;
					el.value = opts[idx].content;
				}
			});
		},
		addOptionRow() {
			this.optRows.push({
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
			});
		},
		// add id option edited
		checkEditOldOpt(id) {
			if (this.optEditID.indexOf(id) === -1) {
				this.optEditID.push(id);
			}
		},
		// if new option add index of optionRows
		checkAddNewOpt(idx) {
			if (this.optAddNew.indexOf(idx) === -1) {
				this.optAddNew.push(idx);
			}
		},
		// if del old option add optionID
		checkDelOldOpt(idx, optID, oldOpt) {
			if (oldOpt) {
				this.optDelID.push(optID);
				if (this.optEditID.indexOf(optID) !== -1) {
					this.optEditID = this.optEditID.filter(id => id != optID);
				}
			}
			else if (this.optAddNew.indexOf(idx) !== -1) {
				this.optAddNew = this.optAddNew.filter(rowIdx => rowIdx != idx);
			}
			this.optRows.splice(idx, 1);
		},
		checkValidPoll() {
			if (this.form.ask.value === '') {
				this.form.ask.errmsg = this.$t('requireField');
				return false;
			}
			if (this.selectMultiple && this.form.limit.value < 2) {
				this.form.limit.errmsg = this.$t('poll-limit-count');
				return false;
			}
			if (this.optRows.length < 1) {
				return false;
			}
			return true;
		},
		handleEdit() {
			this.dialogErrMsg = '';
			this.sending = true;
			if (this.checkValidPoll()) {
				const { form } = this;
				// check change info
				if (form.ask.value !== this.poll.content
					|| form.limit.value !== this.poll.max_choices) {
					this.setEditPollInfo({
						id: this.poll.id,
						content: form.ask.value,
						max_choices: form.limit.value,
					});
				}
			}
			else {
				this.sending = false;
				this.dialogErrMsg = this.$t('err-some-field');
				return;
			}

			// check old option edit
			if (this.optEditID.length !== 0) {
				for (const optID of this.optEditID) {
					this.$emit('emit-edit-poll-opt', {
						id: optID,
						content: this.optRows.find(e => e.id == optID).value,
					});
				}
				this.optEditID = [];
			}

			// check del old option
			if (this.optDelID.length !== 0) {
				for (const optID of this.optDelID) {
					this.$emit('emit-del-poll-opt', {
						id: optID,
						poll_id: this.poll.id,
					});
				}
				this.optDelID = [];
			}

			if (this.optAddNew.length !== 0) {
				for (const idxRow of this.optAddNew) {
					this.$emit('emit-create-poll-opt', {
						poll_id: this.poll.id,
						content: this.optRows[idxRow].value,
					});
				}
				this.optAddNew = [];
			}
			this.sending = false;
			this.$emit('close-dialog');
		},
	},
};
</script>

<style lang="css" scoped>
</style>
