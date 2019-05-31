<template>
	<v-content class="imgBg">
		<v-container  fluid fill-height pt-0 pb-5>
			<v-layout align-center justify-center row>
				<v-flex xs12 sm9 md7 lg4>
					<v-card class="elevation-20">
						<v-form @submit.prevent="handleLogin">
							<v-toolbar dark color="primary">
								<v-toolbar-title v-t="'loginFormTitle'">Login</v-toolbar-title>
								<v-spacer></v-spacer>
							</v-toolbar>
							<v-card-text>
								<v-text-field
									autofocus
									type="text"
									prepend-icon="person"
									ref="username.value"
									v-model="username.value"
									:rules="[() => !!username.value || 'This field is required']"
									:error-messages="username.message"
									label="Username"
									required>
								</v-text-field>
								<v-text-field
									type="password"
									prepend-icon="lock"
									ref="password.value"
									v-model="password.value"
									:rules="[() => !!password.value || 'This field is required']"
									:error-messages="password.message"
									label="Password"
									required>
								</v-text-field>
							</v-card-text>
							<v-card-actions>
								<div class="caption pl-3 font-weight-medium">{{errorMessage}}</div>
								<v-spacer></v-spacer>
								<v-btn color="primary" v-t="'loginFormTitle'" type="submit"></v-btn>
							</v-card-actions>
							<loading-linear :show="loading"/>
						</v-form>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-content>
</template>

<script>
import LoadingLinear from '@/components/LoadingLinear.vue';

export default {
	name: 'Login',
	components: {
		'loading-linear': LoadingLinear
	},
	data: () => ({
		loading: false,
		username: {
			value: '',
			message: ''
		},
		password: {
			value: '',
			message: ''
		},
		errorMessage: ''
	}),
	methods: {
		handleLogin() {}
	}
};
</script>

<style lang='scss'>
$backgroundUrl: 'https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80';

.imgBg {
	background: url($backgroundUrl) no-repeat center;
	background-size: cover;
}
</style>
