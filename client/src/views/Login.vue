<template>
	<v-content class="imgBg">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>

		<v-container  fluid fill-height pt-0 pb-5>
			<v-layout align-center justify-center row>
				<v-flex flex xs12 sm9 md8 lg6>
					<v-card class="elevation-20">
						<v-form @submit.prevent="handleLogin">
							<v-toolbar dark color="primary">
								<v-toolbar-title v-t="'loginFormTitle'"></v-toolbar-title>
								<v-spacer></v-spacer>
							</v-toolbar>

							<v-card-text>
								<text-field :field="form.username" />
								<text-field :field="form.password" />
							</v-card-text>

							<v-card-actions>
								<div class="caption pl-3 font-weight-medium">{{errorMessage}}</div>
								<v-spacer></v-spacer>
								<v-btn color="primary" v-t="'loginFormTitle'" type="submit"></v-btn>
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
import LoadingLinear from '@/components/LoadingLinear.vue';
import TextField from '@/components/TextField.vue';

export default {
	name: 'Login',
	components: {
		'loading-linear': LoadingLinear,
		'text-field': TextField
	},
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
				type: 'text',
				required: true,
				prepend: 'lock',
				errmsg: ''
			}
		},
		errorMessage: ''
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
</style>
