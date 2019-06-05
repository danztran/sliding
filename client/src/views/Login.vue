<template>
	<v-content class="imgBg">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>

		<v-container  fluid fill-height pt-0 pb-5>
			<v-layout align-center justify-center row>
				<v-flex flex xs12 sm9 md8 lg6>
					<v-card class="elevation-20 pa-3">
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

							<div class="caption error--text text-xs-center">
								{{errorMessages}}
							</div>

							<v-card-actions class="px-3 py-2">
								<v-layout align-center justify-center column fill-height>
									<v-btn color="primary" v-t="'loginFormTitle'" type="submit"></v-btn>
								</v-layout>
							</v-card-actions>

							<loading-linear :loading="loading"/>
						</v-form>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-content>
</template>

<script>
export default {
	name: 'Login',
	data: () => ({
		loading: false,
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
		},
		errorMessages: ''
	}),
	methods: {
		handleLogin() {
			const userData = {
				username: this.form.username.value,
				password: this.form.password.value
			};

			this.$store.dispatch('auth/login', userData);
			this.loading = true;
		}
	}
};
</script>

<style lang='scss' scoped>
$backgroundUrl: 'https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80';

.imgBg {
	background: url($backgroundUrl) no-repeat center;
	background-size: cover;
}
.hyper-link {
	text-decoration: none;
}
</style>
