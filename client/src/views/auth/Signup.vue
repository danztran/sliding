<template>
	<div id="signup-page">
		<loading-linear :loading="loading" />
		<!--
			@desc: form title
		-->
		<v-form @submit.prevent="handleSignup">
			<v-layout
				row
				align-center
				justify-center
				fill-height>
				<v-card-title primary-title>
					<div class="text-xs-center">
						<div v-t="'signUp'" class="headline font-weight-regular first-letter-uppercase" />
						<span v-t="'or'" class="grey--text">
							&nbsp;
						</span>
						<router-link tag="a" class="primary--text body-2 no-underline" to="/login">
							<span v-t="'loginFormTitle'" class="text-lowercase" />
						</router-link>
					</div>
				</v-card-title>
			</v-layout>

			<!--
				@desc: input field
				@contains: name, email, username, pw, re-pw
			-->
			<v-card-text>
				<text-field :field="form.name" />
				<text-field :field="form.email" />
				<text-field :field="form.username" />
				<text-field :field="form.password" />
				<text-field :field="form.rePassword" />
			</v-card-text>

			<!--
				@desc: show errorr messange
			-->
			<div class="error--text text-xs-center">
				{{ errorMessage }}
			</div>

			<!--
				@desc: button submit
			-->
			<v-card-actions class="px-3 py-2">
				<v-layout
					column
					align-center
					justify-center
					fill-height>
					<v-btn round small color="primary" type="submit" class="px-3">
						<span v-t="'signUp'" class="first-letter-uppercase px-3" />
					</v-btn>
				</v-layout>
			</v-card-actions>
			<slot />
		</v-form>
	</div>
</template>

<script>
const initForm = () => ({
	name: {
		value: '',
		label: 'lb-name',
		required: true,
		prepend: 'tag_faces',
		autofocus: true,
		errmsg: '',
	},
	email: {
		value: '',
		label: 'lb-email',
		required: true,
		type: 'email',
		prepend: 'alternate_email',
		errmsg: '',
	},
	username: {
		value: '',
		label: 'lb-username',
		required: true,
		prepend: 'person',
		errmsg: '',
	},
	password: {
		value: '',
		label: 'lb-password',
		required: true,
		type: 'password',
		prepend: 'lock',
		errmsg: '',
	},
	rePassword: {
		value: '',
		label: 'lb-re-password',
		required: true,
		type: 'password',
		prepend: 'lock',
		errmsg: '',
	},
});

export default {
	name: 'Signup',
	data: () => ({
		loading: false,
		errorMessage: '',
		form: initForm(),
	}),
	watch: {
		'form.password.value': function cpPwd(val) {
			const rePassword = this.form.rePassword.value;
			if (val !== '' && rePassword !== '') {
				if (rePassword !== val && val !== rePassword) {
					this.form.rePassword.errmsg = this.$t('password-not-match');
				}
				else {
					this.form.rePassword.errmsg = '';
				}
			}
		},
		'form.rePassword.value': function cpPwd(val) {
			if (val !== this.form.password.value) {
				this.form.rePassword.errmsg = this.$t('password-not-match');
			}
		},
		'form.email.value': function checkEmail(val) {
			const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!emailPattern.test(val)) {
				this.form.email.errmsg = this.$t('invalid-email');
			}
		},
	},
	methods: {
		fieldValid() {
			for (const key of Object.keys(this.form)) {
				if (Object.prototype.hasOwnProperty.call(this.form, key)) {
					if (this.form[key].errmsg !== '' || this.form[key].value === '') {
						return false;
					}
				}
			}
			return true;
		},
		handleSignup() {
			this.errorMessage = '';
			this.loading = true;
			if (!this.fieldValid()) {
				this.loading = false;
				this.errorMessage = this.$t('err-some-field');
				setTimeout(() => {
					this.errorMessage = '';
				}, 2000);
				return;
			}

			const { form } = this;
			const signupFormData = {
				name: form.name.value.trim(),
				email: form.email.value.trim(),
				username: form.username.value.trim(),
				password: form.password.value.trim(),
				rePassword: form.rePassword.value.trim(),
			};
			this.$axios
				.post(this.$api.auth.signup, signupFormData)
				.then((res) => {
					this.$store.dispatch('auth/signup', Object.assign(signupFormData, res.data));
				})
				.catch(err => this.handleErrorMessages(err.messages))
				.then(() => {
					this.loading = false;
				});
		},
	},
};
</script>
