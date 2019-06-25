<template>
	<div>
		<div
			v-t="'guest-ask-title'"
			class="px-3 py-1 body-1 grey--text" />
		<div id="guest-ask">
			<text-area class="custom-area-field pt-3 px-3" :field="form.ask" />
			<v-divider />
			<v-layout
				align-center
				justify-space-between
				class="px-3 py-1">
				<span class="grey--text">{{ countCharacters }}</span>
				<v-btn
					v-t="'btn-send'"
					color="primary"
					small
					round
					:diabled="checkValidLength"
					@click="sendQuestion" />
			</v-layout>
		</div>
	</div>
</template>

<script>
const askForm = () => ({
	ask: {
		value: '',
		placeholder: 'lb-question',
		type: 'text',
		prepend: 'message',
		rows: 2,
		autogrow: true,
		maxLength: 160,
		errmsg: ''
	}
});

export default {
	name: 'FieldAsk',
	data: () => ({
		form: askForm()
	}),
	computed: {
		checkValidLength() {
			const { ask } = this.form;
			if (ask.value && ask.value.length > ask.maxLength) {
				ask.errmsg = this.$t('err-question-limit');
				return true;
			}
			return !this._cm.notEmpty(ask.value);
		},
		countCharacters() {
			const { ask } = this.form;
			return ask.maxLength - ask.value.length;
		}
	},
	methods: {
		sendQuestion() {
			// ...
		}
	}
};
</script>

<style lang="scss">
#guest-ask {
	-webkit-box-shadow: 0 1px 4px rgba(0,0,0,.2);
	-moz-box-shadow: 0 1px 4px rgba(0,0,0,.2);
	box-shadow: 0 1px 4px rgba(0,0,0,.2);
	background-color: #fff;

	.custom-area-field {
		.v-input__slot:after, .v-input__slot:before {
			content: none !important;
			display: none !important;
		}
	}
}
</style>
