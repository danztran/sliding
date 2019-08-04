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
			<template v-if="poll.max_choices > 1">
				<div class="caption first-letter-uppercase grey--text">
					<span v-t="'poll-max-choices'" />
					<span v-text="poll.max_choices" />
				</div>
			</template>

			<!-- *one choice -->
			<div v-if="poll.max_choices > 1" class="mt-2 custom-select checkbox">
				<v-checkbox
					v-for="n in 3"
					:key="n"
					:label="`Checkbox ${n}`"
					:value="n"
					color="primary"
					class="mt-0" />
			</div>

			<!-- *multi choice -->
			<v-radio-group
				v-else
				v-model="radioGroup"
				class="mt-2 custom-select">
				<v-radio
					v-for="n in 3"
					:key="n"
					:label="`Radio ${n}`"
					:value="n"
					color="primary"
					class="mr-0 mb-3 px-2 py-1" />
			</v-radio-group>
			<v-layout
				align-center
				justify-center>
				<v-btn
					v-t="'btn-send'"
					center
					small
					round
					color="success"
					@click="emitChoice" />
			</v-layout>
		</v-card-text>
	</v-card>
</template>

<script>
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
		radioGroup: null,
		pollOptions: [],
	}),
	methods: {
		emitChoice() {
			// ...
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
	&.checkbox {
		.v-input__slot {
			background-color: rgba(0, 0, 0, .04);
			border-radius: 10px;
			padding: 4px 8px 4px 8px;
		}
		.v-messages {
			display: none;
		}
	}
}
</style>
