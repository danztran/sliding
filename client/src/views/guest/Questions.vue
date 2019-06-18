<template>
	<div>
		<span
			class="subheading grey--text"
			v-t="'guest-ask-title'">
		</span>
		<!-- <v-icon>message</v-icon> -->
		<div id="wrapper-ask" class="elevation-2">
			<v-textarea
				class="custom-textarea"
				v-model="form.ask.value"
				:placeholder="$t('lb-question')"
				rows="1"
				prepend-icon="message"
				auto-grow>
			</v-textarea>

			<div class="footer-ask">
				<v-input v-model="form.name.value"/>
				<v-btn>send</v-btn>
			</div>
		</div>
		<v-input v-model="form.name.value"/>
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

	.custom-textarea {
		padding: 25px 30px 8px 25px;
		.v-input__slot:after, .v-input__slot:before {
			content: none !important;
			display: none !important;
		};
		&:focus-within {
			padding-left: 30px !important;
			height: 200px;

			.v-input__prepend-outer {
				display: none;
			}
		}
	}
}
</style>
