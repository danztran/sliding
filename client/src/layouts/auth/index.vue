<template>
	<v-content id="auth-page">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-container fluid fill-height pt-0 pb-5>
			<v-layout align-center justify-center row>
				<v-flex xs12 sm6 md5 lg3 xl3>
					<v-card class="elevation-20 pa-3">
						<!-- <v-slide-y-transition mode="out-in"> -->
						<transition name="page" mode="out-in">
							<router-view />
						</transition>
						<!-- </v-slide-y-transition> -->
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-content>
</template>

<script>
export default {};
</script>

<style lang="scss">
#auth-page {
	.page-enter-active, .page-leave-active {
		transition: all .5s ease-out;
		overflow: hidden;
		max-height: 590px;
	}
	.page-enter, .page-leave-to {
		max-height: 350px;
		transform: translateY(-15px);
		opacity: 0;
	}
	// background: rgb(61,164,181);
	// background: radial-gradient(circle, rgb(61,164,181) 0%, rgb(9,47,45) 100%);
	background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0.5, 0.3)), url("https://cdn.vuetifyjs.com/images/parallax/material.jpg");
	background-size: cover;
	background-repeat:no-repeat;
	.hyper-link {
		text-decoration: none;
	}
	@media only screen and (max-width: 960px) {
		.fluid, .v-card {
			padding: 5px !important;
		}
	}
}
</style>
