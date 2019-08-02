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
				@click="closeDialog">
				<span v-t="'btn-cancel'" class="first-letter-uppercase" />
			</v-btn>
			<v-btn
				flat
				medium
				color="success"
				:disabled="sending"
				@click="handleEPContent">
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
		selectMultiple: false,
		limitMultiple: false,
		sending: false,
	}),
	watch: {
		poll(val) {
			if (val) {
				this.form.ask.value = val.content;
				this.form.limit.value = val.max_choices;
			}
		},
		pollOptions(opts) {
			if (opts) {
				this.fillOptions(opts);
			}
		},
	},
	methods: {
		...mapMutations({
			setPollEditInfo: 'admin/polls/SET_INFO_EDIT',
		}),
		closeDialog() {
			this.$emit('close-dialog');
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
			});
		},
		delOptRow(index) {
			if (this.optionRows.length > 1) {
				this.optionRows.splice(index, 1);
			}
		},
		fillOptions(opts) {
			this.optionRows = Array.from({ length: opts.length }, () => ({
				value: '',
				id: null,
				placeholder: 'lb-add-option',
				type: 'text',
				rows: 1,
				solo: true,
				flat: true,
				outline: true,
			}));
			for (const key of Object.keys(opts)) {
				if (Object.prototype.hasOwnProperty.call(this.optionRows, key)) {
					this.optionRows[key].value = opts[key].content;
				}
			}
			this.addOptionRow();
		},
		handleEPContent() {
			this.sending = true;
			if (this.form.ask.value === '') {
				this.form.ask.errmsg = this.$t('requireField');
				this.sending = false;
				return;
			}
			if (this.limitMultiple && this.form.limit.value < 2) {
				this.form.limit.errmsg = this.$t('poll-limit-count');
				this.sending = false;
				return;
			}
			if (this.form.ask.value === this.poll.content) {
				if (this.form.limit.value === this.poll.max_choices) {
					this.sending = false;
					this.closeDialog();
					return;
				}
			}
			this.setPollEditInfo({
				id: this.poll.id,
				content: this.form.ask.value,
				max_choices: this.form.limit.value,
			});
		},
		emitEPOption() {
			// ...
		},
	},
};
</script>

<style lang="scss">
.area-field {
	.v-input__slot {
		min-height: 50px;
	}
	textarea {
		margin-top: 0;
	}
}
</style>
