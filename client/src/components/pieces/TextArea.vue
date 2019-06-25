<template>
	<v-textarea
		v-model="field.value"
		:autofocus="field.autofocus"
		:type="field.type"
		:prepend-icon="field.prepend"
		:append-outer-icon="field.outerIcon"
		:rules="[fieldRequired(field)]"
		:error-messages="field.errmsg"
		:label="$t(field.label)"
		:placeholder="$t(field.placeholder)"
		:rows="field.rows"
		:outline="field.outline"
		:auto-grow="field.autogrow"
		:counter="field.counter"
		:clearable="field.clearable"
		:solo="field.solo"
		:required="field.required"
		@input="onInput" />
</template>

<script>
export default {
	name: 'TextArea',
	props: {
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
					autofocus: false,
					required: false,
					autogrow: false
				};
			}
		},
		outline: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		fieldRequired(field) {
			return !!this.field.value || !this.field.required || this.$t('requireField');
		},
		onInput() {
			this.field.errmsg = '';
		}
	}
};
</script>
