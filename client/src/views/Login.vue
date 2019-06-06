<template>
	<v-content id="login-page">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>

		<v-container fluid fill-height pt-0 pb-5>
			<v-layout align-center justify-center row>
				<v-flex xs12 sm6 md5 lg4 xl3>
					<v-card class="elevation-20 pa-3">
						<loading-linear :loading="loading"/>

						<v-form @submit.prevent="handleLogin">
							<v-layout align-center justify-center row fill-height>
								<v-card-title primary-title>
									<div class="text-xs-center">
										<div class="headline font-weight-regular" v-t="'loginFormTitle'"></div>
										<span class="grey--text" v-t="'or'">{{"&nbsp;  "}}</span>
										<a href="/register" class="primary--text body-2 hyper-link" v-t="'signUp'"></a>
									</div>
								</v-card-title>
							</v-layout>

							<v-card-text>
								<text-field :field="form.username" />
								<text-field :field="form.password" />
							</v-card-text>

							<div class="error--text text-xs-center">
								{{ flashMessage }}
								<br>
								{{ errorMessage }}
							</div>

							<v-card-actions class="px-3 py-2">
								<v-layout align-center justify-center column fill-height>
									<v-btn color="primary" v-t="'loginFormTitle'" type="submit"></v-btn>
								</v-layout>
							</v-card-actions>

						</v-form>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-content>
</template>
<style scoped>
#login-page {
	background: rgb(61,164,181);
	background: radial-gradient(circle, rgb(61,164,181) 0%, rgb(9,47,45) 100%);
	background-size: cover;
	background-repeat:no-repeat;
}
.hyper-link {
	text-decoration: none;
}
@media only screen and (max-width: 960px) {
	.fluid, .v-card {
		padding: 5px !important;
	}
}
</style>
<script>
export default {
	name: 'Login',
	data: () => ({
		loading: false,
		errorMessage: '',
		flashMessage: '',
		form: {
			username: {
				value: '',
				label: 'lbUsername',
				type: 'text',
				required: true,
				prepend: 'person',
				autofocus: true,
				errmsg: ''
			},
			password: {
				value: '',
				label: 'lbPassword',
				type: 'password',
				required: true,
				prepend: 'lock',
				errmsg: ''
			}
		}
	}),
	methods: {
		handleLogin() {
			this.loading = true;
			const loginFormData = {
				username: this.form.username.value,
				password: this.form.password.value
			};

			this.$axios
				.post(this.$api.auth.login, loginFormData)
				.then((res) => {
					this.$store.dispatch('auth/setAuth', res.data.user);
					this.$router.push({ name: 'my-events' });
				})
				.catch(err => this.handleErrorMessages(err.messages))
				.then(() => {
					this.loading = false;
				});
		}
	}
};
</script>
