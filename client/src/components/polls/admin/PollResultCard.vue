<template>
	<v-card class="no-shadow">
		<v-card-title>
			<span class="title font-weight-bold">
				{{ pollName }}
			</span>
			<v-layout
				align-center
				justify-end>
				<span class="font-weight-bold">
					{{ countUsersChoice }}
					<v-icon small v-text="'$vuetify.icons.group_people'" />
				</span>
			</v-layout>
		</v-card-title>
		<v-divider />
		<v-card-text>
			<div class="custom-progress">
				<div
					v-for="option of pollOptions"
					:key="option.id">
					<div v-text="option.content" />
					<div class="d-flex">
						<v-progress-linear
							class="mt-1"
							background-opacity=".1"
							color="primary"
							buffer-value="100"
							:value="calPercent(option)"
							height="11" />
						<span class="ml-1">{{ calPercent(option) }}%</span>
					</div>
				</div>
			</div>
		</v-card-text>
	</v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'PollResultCard',
	computed: {
		...mapGetters({
			getPollResult: 'admin/pollOptions/getPollResult',
		}),
		pollOptions() {
			if (this._cm.notEmpty(this.getPollResult)) {
				return this.getPollResult.pollOptions;
			}
			return [];
		},
		pollName() {
			if (this._cm.notEmpty(this.getPollResult)) {
				return this.getPollResult.poll.content;
			}
			return '';
		},
		allChoices() {
			let choices = [];
			for (const opt of this.pollOptions) {
				choices = [...choices, ...opt.choices];
			}
			return choices;
		},
		countUsersChoice() {
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
	methods: {
		calPercent(opt) {
			if (opt.choices.length === 0) {
				return 0;
			}
			return ((opt.choices.length / this.allChoices.length) * 100).toFixed(2);
		},
	},
};
</script>

<style lang="scss">
.custom-progress {
	.v-progress-linear__background, .v-progress-linear__bar__determinate {
		border-radius: 10px;
	}
	.v-progress-linear__bar__determinate {
		background-size: 40px 40px;
		background-repeat: repeat-x;
		background-image: linear-gradient(135deg,
			rgba(255, 255, 255, 0.25) 25%, transparent 0,
			transparent 50%, rgba(255, 255, 255, 0.25) 0,
			rgba(255, 255, 255, 0.25) 75%, transparent 0,
			transparent);
	}
}
</style>
