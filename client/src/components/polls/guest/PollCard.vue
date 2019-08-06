<template>
	<v-card class="mt-1 mb-3">
		<v-card-title
			class="py-3 body-2"
			primary-title>
			<span v-if="poll.is_locked">
				<v-icon
					small
					v-text="'$vuetify.icons.lock'" />
				&nbsp;
			</span>
			<span v-text="poll.content" />
		</v-card-title>
		<v-divider />

		<v-card-text>
			<template v-if="poll.max_choices > 1 && pollOptions.length > 0">
				<!-- *description max choice -->
				<div class="caption first-letter-uppercase grey--text">
					<span v-t="'poll-max-choices'" />
					<span v-text="poll.max_choices" />
				</div>

				<!-- *multi choice: show checkbox -->
				<div class="mt-2 custom-select checkbox">
					<v-checkbox
						v-for="option of pollOptions"
						:key="option.id"
						v-model="checkboxSelect"
						:label="option.content"
						:value="option.id"
						:disabled="poll.is_locked"
						color="primary"
						class="mt-0" />
				</div>
				<div class="text-xs-center red--text" v-text="checkboxErrmsg" />
			</template>

			<!-- *one choice: show radio -->
			<v-radio-group
				v-else
				v-model="radioSelect"
				:disabled="poll.is_locked"
				class="mt-2 custom-select radio">
				<v-radio
					v-for="option of pollOptions"
					:key="option.id"
					:label="option.content"
					:value="option.id"
					color="primary"
					class="mr-0 mb-3 px-2 py-1" />
			</v-radio-group>

			<!-- *emit send choice -->
			<v-layout
				align-center
				justify-center>
				<v-btn
					v-t="'btn-send'"
					center
					small
					round
					color="success"
					:disabled="isValid"
					@click="submitChoice" />
			</v-layout>
		</v-card-text>
	</v-card>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	name: 'PollCard',
	props: {
		poll: {
			type: Object,
			default: () => ({
				id: null,
				content: '',
				max_choices: null,
				is_locked: true,
			}),
		},
	},
	data: () => ({
		radioSelect: null,
		checkboxSelect: [],
		pollOptions: [],
		checkboxErrmsg: '',
	}),
	computed: {
		isValid() {
			if (this.poll.max_choices > 1) {
				if (this.checkboxSelect.length > 0
					&& this.checkboxSelect.length <= this.poll.max_choices) {
					return false;
				}
				if (this.checkboxSelect.length > this.poll.max_choices) {
					return true;
				}
			}
			else if (this.radioSelect) {
				return false;
			}
			return true;
		},
	},
	watch: {
		checkboxSelect(val) {
			if (val.length > this.poll.max_choices) {
				this.checkboxErrmsg = this.$t('poll-err-limit-choice');
			}
			else {
				this.checkboxErrmsg = '';
			}
		},
	},
	created() {
		if (this.pollOptions.length === 0) {
			if (this.poll.id) {
				this.emitGetPollOpts(this.poll.id);
			}
		}
	},
	methods: {
		...mapMutations({
			setPollOptions: 'guest/pollOptions/SET_POLL_OPTIONS',
		}),
		emitGetPollOpts(pID) {
			const emiter = 'get-poll-options';
			this.loadingLinear = true;
			this.$socket.emit(emiter, { poll_id: pID }, (result) => {
				this.loadingLinear = false;
				if (!result.poll_options) {
					if (result.errmsg) {
						this.showNotify(result.errmsg, 'danger');
					}
					return;
				}
				this.setPollOptions({
					poll_id: pID,
					options: result.poll_options,
				});
				this.pollOptions = result.poll_options;
			});
		},
		submitChoice() {
			const choicesId = [];
			if (this.poll.max_choices > 1) {
				choicesId.push(...this.checkboxSelect);
			}
			else {
				choicesId.push(this.radioSelect);
			}
			for (const id of choicesId) {
				this.emitChoice(id);
			}
		},
		emitChoice(choiceId) {
			const emiter = 'add-poll-option-choice';
			this.$socket.emit(emiter, {
				poll_option_id: choiceId,
				choice: true,
			}, (data) => {
				console.warn(data);
			});
		},
	},
};
</script>

<style lang="scss">
.custom-select {
	.v-input__control {
		width: 100%;
		.v-radio {
			background-color: rgba(0, 0, 0, .04);
			border-radius: 10px;
		}
	}
	.v-input--selection-controls__input {
		height: 20px;
	}
	.v-label {
		padding-top: 3px;
		width: 100%;
		color: #555;
		font-size: .9em;
	}
	.v-messages {
		display: none;
	}
	&.radio {
		.v-input__slot {
			margin-bottom: 0px;
		}
	}
	&.checkbox {
		.v-input__slot {
			background-color: rgba(0, 0, 0, .04);
			border-radius: 10px;
			padding: 4px 8px 4px 8px;
		}
	}
}
</style>
