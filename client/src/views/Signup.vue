<template>
	<v-content id="signup-page">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>

		<v-container fluid fill-height pt-0 pb-5>
			<v-layout align-center justify-center row>
				<v-flex xs12 sm6 md5 lg3 xl3>
					<v-card class="elevation-20 pa-3">

						<loading-linear :loading="loading"/>

						<v-form @submit.prevent="handleSignup">
							<v-layout align-center justify-center row fill-height>
								<v-card-title primary-title>
									<div class="text-xs-center">
										<div class="headline font-weight-regular" v-t="'signUp'">
										</div>
										<span class="grey--text" v-t="'or'">
											{{"&nbsp;  "}}
										</span>
										<a
											href="/login"
											class="primary--text body-2 hyper-link"
											v-t="'loginFormTitle'">
										</a>
									</div>
								</v-card-title>
							</v-layout>

							<v-card-text>
								<text-field :field="form.name" />
								<text-field :field="form.email" />
								<text-field :field="form.username" />
								<text-field :field="form.password" />
								<text-field :field="form.rePassword" />
							</v-card-text>

							<div class="error--text text-xs-center">
								{{ flashMessage }}
								<br>
								{{ errorMessage }}
							</div>

							<v-card-actions class="px-3 py-2">
								<v-layout
									align-center
									justify-center
									column
									fill-height>
									<v-btn
										color="primary"
										v-t="'signUp'"
										type="submit">
									</v-btn>
								</v-layout>
							</v-card-actions>

						</v-form>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-content>
</template>

<script>
const initForm = () => ({
	name: {
		value: '',
		label: 'lb-name',
		required: true,
		prepend: 'tag_faces',
		autofocus: true,
		errmsg: ''
	},
	email: {
		value: '',
		label: 'lb-email',
		required: true,
		type: 'email',
		prepend: 'alternate_email',
		errmsg: ''
	},
	username: {
		value: '',
		label: 'lb-username',
		required: true,
		prepend: 'person',
		errmsg: ''
	},
	password: {
		value: '',
		label: 'lb-password',
		required: true,
		type: 'password',
		prepend: 'lock',
		errmsg: ''
	},
	rePassword: {
		value: '',
		label: 'lb-re-password',
		required: true,
		type: 'password',
		prepend: 'lock',
		errmsg: ''
	}
});

export default {
	name: 'Signup',
	data: () => ({
		loading: false,
		errorMessage: '',
		flashMessage: '',
		form: initForm()
	}),
	watch: {
		'form.rePassword.value': function checkPwd(val) {
			if (val !== this.form.password.value) {
				this.form.rePassword.errmsg = this.$t('password-not-match');
			}
		},
		'form.email.value': function checkEmail(val) {
			const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!emailPattern.test(val)) {
				this.form.email.errmsg = this.$t('invalid-email');
			}
		}
	},
	methods: {
		handleSignup() {
			this.loading = true;
			const { form } = this;
			const signupFormData = {
				name: form.name.value,
				email: form.email.value,
				username: form.username.value,
				password: form.password.value
			};
			this.$axios
				.post(this.$api.auth.signup, signupFormData)
				.then((res) => {
					this.$store.dispatch('auth/signup', res.data.messages);
				})
				.catch(err => this.handleErrorMessages(err.messages))
				.then(() => {
					this.loading = false;
				});
		}
	}
};
</script>

<style lang="css">
.hyper-link {
	text-decoration: none;
}
@media only screen and (max-width: 960px) {
	.fluid, .v-card {
		padding: 5px !important;
	}
}
</style>
