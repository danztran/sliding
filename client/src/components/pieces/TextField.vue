<template>
	<v-text-field
		v-model="field.value"
		:autofocus="field.autofocus"
		:type="field.type"
		:prepend-icon="field.prepend"
		:append-icon="field.append"
		:rules="[fieldRequired(field)]"
		:label="$t(field.label)"
		:placeholder="field.placeholderz || $t(field.placeholder)"
		:readonly="field.readonly"
		:validate-on-blur="true"
		:error-messages="field.errmsg"
		:disabled="disabled"
		:prefix="field.prefix"
		autocapitalize="off"
		@input="onInput" />
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
			default: false,
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
					append: '',
					prefix: '',
					autofocus: false,
					required: false,
				};
			},
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
