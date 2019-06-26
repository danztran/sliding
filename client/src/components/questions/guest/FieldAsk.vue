<template>
	<div>
		<div
			v-t="'guest-ask-title'"
			class="px-3 py-1 body-1 grey--text" />
		<div id="guest-ask">
			<text-area
				class="custom-area-field pt-3 px-3"
				:class="{'blur': !allowQuestion}"
				:field="form.ask"
				:disabled="!allowQuestion" />
			<v-divider />
			<v-layout
				align-center
				justify-space-between
				class="px-3 py-1"
				:class="{'blur': !allowQuestion}">
				<span class="grey--text">
					{{ countCharacters }}
				</span>
				<v-btn
					v-t="'btn-send'"
					color="primary"
					small
					round
					:disabled="checkValidLength || !allowQuestion"
					@click="sendQuestion" />
			</v-layout>
			<div v-if="!allowQuestion" class="question-not-allow">
				<div
					v-t="'guest-ask-disable'"
					class="text--center red--text text--darken-1 subheading" />
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
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
		...mapGetters({
			eventInfo: 'guest/event/getEventInfo'
		}),
		allowQuestion() {
			return this.eventInfo.allow_question;
		},
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
	position: relative;
	z-index: 1;

	.question-not-allow {
		position: absolute;
		height: 100%;
		width: 100%;
		text-align: center;
		top: 0;
		background-color: rgba(224, 224, 224, 0.14);
		z-index: 2;

		.text--center {
			transform: translateY(-50%);
			position: relative;
			top: 50%;
			z-index: 3;
		}
	}

	.custom-area-field {
		.v-input__slot:after, .v-input__slot:before {
			content: none !important;
			display: none !important;
		}
	}
	.blur {
		-webkit-filter: blur(3px);
		-moz-filter: blur(3px);
		-ms-filter: blur(3px);
		-o-filter: blur(3px);
		filter: blur(3px);
	}
}
</style>
