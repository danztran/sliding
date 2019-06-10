<template>
	<div id="login-page">
		<loading-linear :loading="loading"/>

		<v-form @submit.prevent="handleLogin">
			<v-layout align-center justify-center row fill-height>
				<v-card-title primary-title>
					<div class="text-xs-center">
						<div class="headline font-weight-regular">{{ $t('loginFormTitle') }}</div>
						<span class="grey--text" v-t="'or'">
							&nbsp;
						</span>
						<router-link tag='a' class="primary--text body-2 no-underline" to="/signup">
							{{ $t('signUp') }}
						</router-link>
					</div>
				</v-card-title>
			</v-layout>

			<v-card-text>
				<text-field :field="form.username" />
				<text-field :field="form.password" />
			</v-card-text>

			<div class="warning--text text-xs-center">
				{{ flashMessage }}
			</div>
			<div class="error--text text-xs-center">
				{{ errorMessage }}
			</div>

			<v-card-actions class="px-3 py-2">
				<v-layout align-center justify-center column fill-height>
					<v-btn color="primary" type="submit">{{ $t('loginFormTitle') }}</v-btn>
				</v-layout>
			</v-card-actions>
			<slot></slot>
		</v-form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'Login',
	data: () => ({
		loading: false,
		errorMessage: '',
		flashMessage: '',
		form: {
			username: {
				value: '',
				label: 'lb-username',
				type: 'text',
				required: true,
				prepend: 'person',
				autofocus: true,
				errmsg: ''
			},
			password: {
				value: '',
				label: 'lb-password',
				type: 'password',
				required: true,
				prepend: 'lock',
				errmsg: ''
			}
		}
	}),
	computed: {
		...mapGetters({
			fillInfo: 'auth/fillInfo'
		})
	},
	created() {
		if (this.fillInfo.username !== '') {
			this.form.username.value = this.fillInfo.username;
			this.form.password.value = this.fillInfo.password;
		}
	},
	methods: {
		handleLogin() {
			this.loading = true;
			this.errorMessage = '';
			this.flashMessage = '';
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
