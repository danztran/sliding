<template>
	<v-text-field
		:autofocus="field.autofocus"
		:type="field.type"
		:prepend-icon="field.prepend"
		v-model="field.value"
		:rules="[fieldRequired(field)]"
		:error-messages="field.errmsg"
		:label="$t(field.label)"
		required>
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
		}
	}
};
</script>
