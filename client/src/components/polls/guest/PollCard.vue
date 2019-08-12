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
				{{ countUsersChoice }}
				<v-icon small v-text="'$vuetify.icons.group_people'" />
			</span>
		</v-card-title>
		<v-divider />

		<v-card-text>
			<v-slide-x-transition hide-on-leave>
				<!-- *result -->
				<poll--result
					v-if="isChoiced"
					:poll-options="pollOptions"
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
							:disabled="selectValid || poll.is_locked || loadingState !== ''"
							:loading="loadingState !== ''"
							@click="submitChoices">
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
		pollOptChoices: [],
		isChoiced: false,
	}),
	computed: {
		...mapGetters({
			getPollOpts: 'guest/pollOptions/getPollOptions',
			user: 'auth/user',
		}),
		selectValid() {
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
		pollOptions() {
			return this.getPollOpts(this.poll.id);
		},
		checkedOptIds() {
			return this.pollOptions.filter((e) => {
				const { choices } = e;
				return choices && choices.some(c => c.user_id == this.user.id);
			}).map(e => e.id);
		},
		countUsersChoice() {
			if (!this.checkedOptIds) return 0;
			const users = new Set();
			for (const opt of this.pollOptions) {
				if (opt.choices) {
					for (const choice of opt.choices) {
						users.add(choice.user_id);
					}
				}
			}
			return users.size;
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
		checkedOptIds(val) {
			if (val) {
				if (this.poll.max_choices > 1) {
					this.checkboxSelect = val;
					this.isChoiced = this.checkboxSelect.length !== 0;
				}
				else {
					this.radioSelect = val.shift();
					this.isChoiced = this.radioSelect != 0;
				}
			}
		},
	},
	methods: {
		...mapMutations({
			editPollOptChoices: 'guest/pollOptions/EDIT_POLL_OPTION_CHOICES',
		}),
		handleRepoll(rs) {
			this.loadingState = '';
			this.isChoiced = false;
		},
		submitChoices() {
			this.loadingState = 'loading';
			let choicesId = [];
			if (this.poll.max_choices > 1) {
				choicesId.push(...this.checkboxSelect);
			}
			else {
				choicesId.push(this.radioSelect);
			}
			choicesId.filter(el => this.pollOptions.find(po => po.id == el.poll_option_id));
			choicesId = choicesId.map(el => ({
				poll_option_id: el,
			}));
			this.emitChoice({ choices: choicesId });
			this.showNotify(this.$t('poll-sent'), 'success');
		},
		isOptChecked(opt) {
			return opt.choices.some(el => el.user_id == this.user.id);
		},
		emitChoice(_choices) {
			const emiter = 'add-poll-option-choices';
			this.$socket.emit(emiter, _choices, ({ errmsg, choices }) => {
				if (!choices) {
					if (errmsg) {
						this.showNotify(errmsg, 'danger');
						this.loadingState = 'fail';
					}
					return;
				}
				console.warn(choices);
				this.editPollOptChoices(choices);
				this.loadingState = 'success';
				this.isChoiced = true;
			});
		},
	},
};
</script>

<style lang="scss">
.custom-select {
	.v-input__control {
		width: 100% !important;
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
