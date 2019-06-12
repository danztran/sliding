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
		:rows="field.rows || 3"
		:outline="outline"
		:auto-grow="field.autogrow"
		:counter="field.counter"
		required>
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
					label: 'label',
					type: 'text',
					value: '',
					errmsg: '',
					prepend: '',
					outerIcon: '',
					counter: '',
					rows: null,
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
		}
	}
};
</script>
