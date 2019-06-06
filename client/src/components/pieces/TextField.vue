<template>
	<v-text-field
		:autofocus="field.autofocus"
		:type="field.type"
		:prepend-icon="field.prepend"
		v-model="field.value"
		:rules="[fieldRequired(field)]"
		:label="$t(field.label)"
		:readonly="field.readonly"
		:validate-on-blur="true"
		:error-messages="field.errmsg"
		@input="onInput"
		:disabled="disabled">
	</v-text-field>
</template>
<style scoped>
.v-text-field {
	height: 67px;
}
</style>
<script>
export default {
	name: 'TextField',
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		field: {
			type: Object,
			default() {
				return {
					label: 'label',
					type: 'text',
					value: '',
					errmsg: '',
					prepend: '',
					autofocus: false,
					required: false
				};
			}
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
