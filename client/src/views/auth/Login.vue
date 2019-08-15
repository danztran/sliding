<template>
	<div id="login-page">
		<loading-linear :loading="loading" />

		<v-form @submit.prevent="handleLogin">
			<!--
				@desc: form title, and link to signup
			-->
			<v-layout
				row
				align-center
				justify-center
				fill-height>
				<v-card-title primary-title>
					<div class="text-xs-center">
						<div v-t="'loginFormTitle'" class="headline font-weight-regular" />
						<span v-t="'or'" class="grey--text">
							&nbsp;
						</span>
						<router-link tag="a" class="primary--text body-2 no-underline" to="/signup">
							<span v-t="'signUp'" class="text-lowercase" />
						</router-link>
					</div>
				</v-card-title>
			</v-layout>

			<!--
				@desc: input username/password
			-->
			<v-card-text>
				<text-field :field="form.username" />
				<text-field :field="form.password" />
			</v-card-text>

			<!--
				@desc: show error message, flash message
				@example: username wrong, pass wrong, logout msg
			-->
			<div class="warning--text text-xs-center">
				{{ flashMessage }}
			</div>
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
					<v-btn round small color="primary" type="submit">
						<span v-t="'loginFormTitle'" class="px-3" />
					</v-btn>
					<span v-t="'or'" class="grey--text" />
					<v-btn flat outline round small color="primary" class="px-3" href="/api/auth/outlook">
						<span v-t="'login-microsoft'" class="primary--text px-3" />
						&nbsp;
						<img :src="require('@/assets/microsoft_logo.svg')">
					</v-btn>
				</v-layout>
			</v-card-actions>
			<slot />
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
				errmsg: '',
			},
			password: {
				value: '',
				label: 'lb-password',
				type: 'password',
				required: true,
				prepend: 'lock',
				errmsg: '',
			},
		},
		beforeAuth: true,
	}),
	computed: {
		...mapGetters({
			user: 'auth/user',
			fillInfo: 'auth/fillInfo',
		}),
	},
	watch: {
		user(val) {
			this.loading = true;
			if (val && this.beforeAuth) {
				if (this.$cookies.get('redirected')) {
					this.$cookies.remove('redirected');
					this.$router.go(-1);
				}
				else {
					this.$router.push({ name: 'dashboard' });
				}
			}
		},
	},
	beforeRouteLeave(to, from, next) {
		sessionStorage.removeItem('redirectToEvent');
		next();
	},
	created() {
		if (this.fillInfo.username !== '') {
			this.form.username.value = this.fillInfo.username;
			this.form.password.value = this.fillInfo.password;
		}
	},
	mounted() {
		/*
			@params: ecfs: event code from search
							 set code to session
		*/
		if (this.$route.params.ecfs !== undefined) {
			sessionStorage.setItem('redirectToEvent', this.$route.params.ecfs);
		}
		this.$root.$emit('hide-loading-overlay');
	},
	methods: {
		handleLogin() {
			this.beforeAuth = false;
			this.loading = true;
			this.errorMessage = '';
			this.flashMessage = '';
			const redirectWEC = sessionStorage.getItem('redirectToEvent');
			const loginFormData = {
				username: this.form.username.value,
				password: this.form.password.value,
			};

			this.$axios
				.post(this.$api.auth.login, loginFormData)
				.then((res) => {
					this.$store.dispatch('auth/setAuth', res.data.user);
					this.$socket.emit('update-authen', ({ reload }) => {
						if (redirectWEC !== null) {
							if (reload) {
								window.location.pathname = `guest/event/${redirectWEC}`;
								return;
							}
							this.$router.push({
								name: 'guest-event',
								params: { code: redirectWEC },
							});
							return;
						}
						if (reload) {
							window.location.pathname = '/dashboard/my-events';
							return;
						}
						this.$router.push({ name: 'my-events' });
					});
				})
				.catch(err => this.handleErrorMessages(err.messages))
				.then(() => {
					this.loading = false;
				});
		},
	},
};
</script>
