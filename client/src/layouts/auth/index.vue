<template>
	<v-content id="auth-page">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-container
			fluid
			fill-height
			pt-0
			pb-5>
			<v-layout
				row
				align-center
				justify-center>
				<v-flex xs12 sm6 md5 lg3 xl3 class="pb-5">
					<v-card class="elevation-20 pa-3">
						<transition name="page" mode="out-in">
							<router-view />
						</transition>
						<div class="my-2 text-xs-center">
							<router-link class="body-1 font-weight-medium no-underline" to="/">
								<v-icon small color="primary" v-text="'$vuetify.icons.arrow_back'" />
								<span>&nbsp;{{ $t('btn-back-home') }}</span>
							</router-link>
						</div>
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
		max-height: 580px;
	}
	.page-enter, .page-leave-to {
		max-height: 320px;
		transform: translateY(-15px);
		opacity: 0;
	}
	// background: rgb(61,164,181);
	// background: radial-gradient(circle, rgb(61,164,181) 0%, rgb(9,47,45) 100%);
	background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0.5, 0.3)), url("https://cdn.vuetifyjs.com/images/parallax/material.jpg");
	background-size: cover;
	background-repeat:no-repeat;
	@media only screen and (max-width: 960px) {
		.fluid, .v-card {
			padding: 5px !important;
		}
	}
}
</style>
