<template>
	<v-card class="mt-1 mb-3">
		<v-card-title
			class="py-3"
			primary-title>
			<span v-if="poll.is_locked">
				<v-icon
					small
					v-text="'$vuetify.icons.lock'" />
				&nbsp;
			</span>
			<span class="body-2" v-text="poll.content" />
			<v-spacer />
			<span>
				0
				<v-icon small v-text="'$vuetify.icons.group_people'" />
			</span>
		</v-card-title>
		<v-divider />

		<v-card-text>
			<v-slide-x-transition hide-on-leave>
				<!-- *result -->
				<poll--result
					v-if="hadChoice"
					:poll-options="pollOptions"
					:poll-opt-choices="pollOptChoices"
					@re-poll="handleRepoll" />

				<div v-else>
					<!-- *multi choice: show maxChoices and checkbox -->
					<template v-if="poll.max_choices > 1 && pollOptions.length > 0">
						<div class="caption first-letter-uppercase grey--text">
							<span v-t="'poll-max-choices'" />
							<span v-text="poll.max_choices" />
						</div>

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
							small
							round
							color="success"
							:disabled="isValid || loadingState !== ''"
							:loading="loadingState !== ''"
							@click="submitChoice">
							<span v-t="'btn-send'" />
							<template v-slot:loader>
								<loading--icon-circle :state.sync="loadingState" />
							</template>
						</v-btn>
					</v-layout>
				</div>
			</v-slide-x-transition>
		</v-card-text>
	</v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import LoadingIconCircle from '@/components/pieces/LoadingIconCircle.vue';
import PollResult from './PollResult.vue';

export default {
	name: 'PollCard',
	components: {
		'loading--icon-circle': LoadingIconCircle,
		'poll--result': PollResult,
	},
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
		loadingState: '',
		checkboxErrmsg: '',
		radioSelect: null,
		checkboxSelect: [],
		pollOptions: [],
		pollOptChoices: [],
		hadChoice: false,
	}),
	computed: {
		...mapGetters({
			getOptChoices: 'guest/pollOptionChoices/getOptChoices',
			allOptChoices: 'guest/pollOptionChoices/getAllOptChoices',
		}),
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
		allOptChoices(val) {
			if (val.length !== 0) {
				this.pollOptChoices = this.getOptChoices(this.poll.id);
			}
		},
		pollOptChoices(val) {
			if (val.length !== 0) {
				this.hadChoice = true;
				if (this.poll.max_choices > 1) {
					this.checkboxSelect = val.map(el => el.id);
				}
				else {
					this.radioSelect = val[0].id;
				}
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
		handleRepoll() {
			this.hadChoice = false;
		},
		submitChoice() {
			this.loadingState = 'loading';
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
			this.showNotify(this.$t('poll-sent'), 'success');
		},
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
		emitChoice(choiceId) {
			const emiter = 'add-poll-option-choice';
			this.$socket.emit(emiter, {
				poll_option_id: choiceId,
				choice: true,
			}, ({ errmsg, choice }) => {
				if (!choice) {
					if (errmsg) {
						// ...
						this.loadingState = 'fail';
					}
					return;
				}
				console.warn(choice);
				this.loadingState = 'success';
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
