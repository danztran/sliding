<template>
	<div id="login-form">
		<loading-linear :loading="loading" />

		<v-form @submit.prevent="handleLogin">
			<!-- form title	-->
			<v-layout
				row
				align-center
				justify-center
				fill-height>
				<v-card-title primary-title>
					<div class="text-xs-center">
						<div class="headline font-weight-regular">
							<span v-t="'loginFormTitle'" />
							&nbsp;
						</div>
						<span v-t="'or'" class="grey--text">
							&nbsp;
						</span>
						<router-link tag="a" class="primary--text body-2 no-underline" to="/signup">
							<span v-t="'signUp'" class="text-lowercase" />
						</router-link>
					</div>
				</v-card-title>
			</v-layout>

			<!-- field input -->
			<v-card-text class="pb-0">
				<text-field :field="form.username" />
				<text-field :field="form.password" />
			</v-card-text>

			<!-- error message -->
			<div class="warning--text text-xs-center">
				{{ flashMessage }}
			</div>
			<div class="error--text text-xs-center">
				{{ errorMessage }}
			</div>

			<!-- submit login -->
			<v-card-actions class="px-5 py-2">
				<v-layout
					column
					align-center
					justify-center
					fill-height>
					<v-btn block color="primary" type="submit" class="py-2">
						<span v-t="'loginFormTitle'" class="px-3 first-letter-uppercase" />
						&nbsp;
						<!-- <span v-text="'&nbsp;'" class="first-letter-uppercase" /> -->
					</v-btn>

					<span class="grey--text text--lighten-1 py-2" />
					<!-- <div class="d-flex"> -->
					<v-btn
						block
						outline
						color="grey"
						href="/api/auth/outlook"
						class="login-mrs py-2 text--lighten-1 no-underline d-flex align-center">
						<img :src="require('@/assets/microsoft_logo.svg')">
						<span v-t="'login-with'" class="pl-2 first-letter-uppercase" />
							&nbsp;
						<span class="first-letter-uppercase" v-text="'Microsoft'" />
					</v-btn>
					<!-- </div> -->
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
				required: false,
				autofocus: true,
				errmsg: '',
			},
			password: {
				value: '',
				label: 'lb-password',
				type: 'password',
				required: false,
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
		/* check redirect with event-code from search, login then go to event */
		if (this.$route.params.ecfs !== undefined) {
			sessionStorage.setItem('redirectToEvent', this.$route.params.ecfs);
		}
		this.$root.$emit('hide-loading-overlay');
	},
	methods: {
		isValidField() {
			let countErr = 0;
			for (const key of Object.keys(this.form)) {
				if (key.value === '') {
					countErr += 1;
					key.required = true;
				}
			}
			if (countErr > 0) {
				return false;
			}
			return true;
		},
		handleLogin() {
			if (!this.isValidField()) {
				return;
			}
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
