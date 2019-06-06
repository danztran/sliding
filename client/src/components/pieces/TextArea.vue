<template>
	<v-textarea
		:autofocus="field.autofocus"
		:type="field.type"
		:prepend-icon="field.prepend"
		v-model="field.value"
		:rules="[fieldRequired(field)]"
		:error-messages="field.errmsg"
		:label="$t(field.label)"
		:rows="field.row || 2"
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
					rows: null,
					autofocus: false,
					required: false
				};
			}
		}
	},
	methods: {
		fieldRequired(field) {
			return !!this.field.value || !this.field.required || this.$t('requireField');
		}
	}
};
</script>
