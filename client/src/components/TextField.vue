<template>
	<v-text-field
		:type="field.type || 'text'"
		:prepend-icon="icon"
		:ref="field.value"
		v-model="field.value"
		:error-messages="field.errMsg"
		:label="field.label"
		:placeholder="field.placeholder || ''"
		:hint="field.helperText"
		:maxLength="field.maxLength"
		:disabled="disabled">
	</v-text-field>
</template>

<script>
export default {
	name: 'TextField',
	props: {
		field: {
			type: Object,
			default() {
				return {
					label: 'Label',
					name: '',
					type: 'text',
					value: '',
					placeholder: '',
					errMsg: '',
					helperText: '',
					maxLength: null
				};
			}
		},
		icon: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style>
</style>
