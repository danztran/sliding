<template>
	<div class="custom-progress">
		<div
			v-for="option of pollOptions"
			:key="option.id">
			<div v-text="option.content" />
			<div class="d-flex">
				<v-progress-linear
					class="mt-1"
					background-opacity=".1"
					:color="isChoiced(option) ? 'primary' : 'grey lighten-2'"
					buffer-value="100"
					:value="calPercent(option)"
					height="11" />
				<span class="ml-1">{{ calPercent(option) }}%</span>
			</div>
		</div>

		<!-- *repoll -->
		<v-layout
			align-center
			justify-center>
			<v-btn
				small
				round
				outline
				class="grey grey--text text--darken-2 px-3"
				@click="repoll">
				<span v-t="'btn-repoll'" />
			</v-btn>
		</v-layout>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'PollResult',
	props: {
		pollOptions: {
			type: Array,
			default: () => ({}),
		},
	},
	computed: {
		...mapGetters({
			user: 'auth/user',
		}),
		allChoices() {
			let choices = [];
			for (const opt of this.pollOptions) {
				choices = [...choices, ...opt.choices];
			}
			return choices;
		},
	},
	methods: {
		repoll() {
			this.$emit('re-poll');
		},
		isChoiced(opt) {
			return opt.choices.some(c => c.user_id == this.user.id);
		},
		calPercent(opt) {
			return (opt.choices.length / this.allChoices.length) * 100;
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
