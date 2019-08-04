<template>
	<v-textarea
		v-model.trim="field.value"
		:autofocus="field.autofocus"
		:type="field.type"
		:prepend-icon="field.prepend"
		:append-outer-icon="field.outerIcon"
		:rules="[fieldRequired(field)]"
		:error-messages="field.errmsg"
		:label="field.label !== '' ? $t(field.label) : ''"
		:placeholder="$t(field.placeholder)"
		:rows="field.rows"
		:flat="field.flat"
		:outline="field.outline"
		:auto-grow="field.autogrow"
		:counter="field.counter"
		:clearable="field.clearable"
		:solo="field.solo"
		:required="field.required"
		:disabled="disabled || field.disabled"
		:readonly="field.readonly"
		:single-line="field.singleLine"
		@input="onInput" />
</template>

<script>
export default {
	name: 'TextArea',
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		field: {
			type: Object,
			default() {
				return {
					label: '',
					type: 'text',
					value: '',
					errmsg: '',
					prepend: '',
					outerIcon: '',
					counter: '',
					rows: 2,
					singleLine: false,
					flat: false,
					autofocus: false,
					required: false,
					autogrow: false,
					readonly: false,
					disabled: false,
				};
			},
		},
		outline: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		fieldRequired(field) {
			return !!this.field.value || !this.field.required || this.$t('requireField');
		},
		onInput() {
			this.field.errmsg = '';
		},
	},
};
</script>
