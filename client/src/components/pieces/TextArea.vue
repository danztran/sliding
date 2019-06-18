<template>
	<v-textarea
		:autofocus="field.autofocus"
		:type="field.type"
		:prepend-icon="field.prepend"
		:append-outer-icon="field.outerIcon"
		v-model="field.value"
		:rules="[fieldRequired(field)]"
		:error-messages="field.errmsg"
		:label="$t(field.label)"
		:rows="field.rows"
		:outline="field.outline"
		:auto-grow="field.autogrow"
		:counter="field.counter"
		:clearable="field.clearable"
		:solo="field.solo"
		@input="onInput"
		:required="field.required">
	</v-textarea>
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
