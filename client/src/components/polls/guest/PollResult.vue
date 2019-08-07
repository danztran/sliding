<template>
	<div class="custom-progress">
		<div
			v-for="option of pollOptions"
			:key="option.id">
			<div v-text="option.content" />
			<div class="d-flex">
				<v-progress-linear
					class="mt-1"
					background-opacity="0"
					buffer-value="10"
					value="10"
					height="12" />
				<span class="ml-1">N%</span>
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
export default {
	name: 'PollResult',
	props: {
		pollOptions: {
			type: Array,
			default: () => ({}),
		},
		pollOptChoices: {
			type: Array,
			default: () => ({}),
		},
	},
	methods: {
		repoll() {
			this.$emit('re-poll');
		},
	},
};
</script>

<style lang="scss">
.custom-progress {
	.v-progress-linear__bar__determinate {
		border-radius: 10px;
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
