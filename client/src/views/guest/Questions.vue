<template>
	<div>
		<span
			v-t="'guest-ask-title'"
			class="pl-2 body-1 grey--text" />
		<!-- <v-icon>message</v-icon> -->
		<div id="wrapper-ask" class="elevation-2">
			<v-textarea
				v-model="form.ask.value"
				class="custom-textarea"
				:placeholder="$t('lb-question')"
				rows="1"
				prepend-icon="message"
				auto-grow />

			<div class="footer-ask">
				<v-divider />
				<v-spacer />
				<v-btn>send</v-btn>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Questions',
	data: () => ({
		form: {
			ask: {
				value: '',
				errmsg: ''
			},
			name: {
				value: ''
			}
		}
	})
};
</script>

<style lang="scss">
#wrapper-ask {
	background-color: white;
	border-radius: 3px;
	display: block;
	box-shadow: 0 1px 4px rgba(0,0,0,.2);

	.footer-ask {
		overflow: hidden;
		max-height: 0;
		transition: max-height .3s, overflow 0s, opacity .3s;
		opacity: 0;
		padding: 0 20px;
		visibility: hidden;
	}

	&:focus-within, &:visited {
		.footer-ask {
			max-height: 65px;
			transition: max-height .3s, overflow 0s .3s, opacity .3s;
			overflow: visible;
			opacity: 1;
			visibility: visible;
		}
	};

	.custom-textarea {
		padding: 25px 30px 8px 25px;
		height: 80px;
		transition: height .5s;
		.v-input__slot:after, .v-input__slot:before {
			content: none !important;
			display: none !important;
		};
		&:focus-within, &:hover {
			padding-left: 30px !important;
			// height: 84px;

			.v-input__prepend-outer {
				display: none;
			}
		}
	}
}
</style>
