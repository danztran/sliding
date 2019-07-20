<template>
	<div id="home-page">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<!--
			@desc: Header navigator bar
			@contains: username, change language, login, logout, signup
		-->
		<v-toolbar id="my-navbar" fixed class="nav-transparent">
			<v-layout row align-center>
				<v-toolbar-title v-t="'app-name'" class="mx-0" />
				<v-spacer />
				<section class="nav-btn body-2">
					<template v-if="!user">
						<span
							:class="{ langActive: locale === 'vi' }"
							class="changeLang"
							@click="changeLocale('vi')">
							VI
						</span> |
						<span
							:class="{ langActive: locale === 'en' }"
							class="changeLang"
							@click="changeLocale('en')">
							EN
						</span>
						<v-btn
							to="/login"
							flat medium>
							<router-link v-t="'loginFormTitle'" class="no-underline" to="/login" />
						</v-btn>
						<v-btn
							v-t="'btn-signup'"
							to="/signup"
							flat
							medium
							class="primary no-underline"
							color="white">
							<router-link v-t="'signUp'" to="/signup" />
						</v-btn>
					</template>
					<template v-else>
						<actions-avatar--user in-search />
					</template>
				</section>
			</v-layout>
		</v-toolbar>
		<v-content>
			<!-- @desc: Main picture introduce, input event code -->
			<v-parallax
				class="pa-0"
				height="500"
				dark
				:src="backgroundNav">
				<v-layout
					row
					align-center
					justify-center>
					<v-container grid-list-xs>
						<!-- *sologan -->
						<v-flex
							xs12
							text-xs-center
							class="mb-5"
							style="text-shadow: 0.2em 0.4em 9em #000000de">
							<h1 v-t="'sologan'" class="display-3 font-weight-regular text-capitalize mb-3" />
							<span v-t="'sub-sologan'" class="font-weight-light headline" />
						</v-flex>

						<!-- *Input code -->
						<v-layout row justify-center>
							<div class="my-input-code w-3">
								<v-text-field
									v-model="inputEventCode"
									height="60"
									solo
									:label="$t('plhEnterCode')"
									prefix="#"
									@keydown.native.enter.capture="findEventByCode" />
								<v-btn color="primary" @click="findEventByCode">
									<span v-t="'btn-join'" />
								</v-btn>
							</div>
							<div class="mx-4 pt-3 hidden-sm-and-down">
								<span v-t="'or'" class="headline" />
							</div>
							<div class="hidden-sm-and-down">
								<v-btn
									v-t="'btn-intro-sigup'"
									outline
									dark
									class="w-3 h-6 ma-0"
									to="/signup" />
							</div>
						</v-layout>
					</v-container>
				</v-layout>
			</v-parallax>

			<!-- *3 card introduce product -->
			<section class="white-bg">
				<v-layout
					row
					wrap
					class="py-4"
					justify-center
					align-center>
					<v-flex xs12 sm6 class="my-3">
						<div class="text-xs-center">
							<h2
								v-t="'card-header-title'"
								class="headline text-uppercase" />
							<span
								v-t="'card-subheader-title'"
								class="subheading" />
						</div>
					</v-flex>

					<v-flex xs12>
						<v-container grid-list-xl>
							<v-layout row wrap>
								<template v-for="card in cards">
									<v-flex :key="card.id" xs12 md4>
										<v-card>
											<v-img :src="card.urlImg" height="200px" />
											<v-card-text class="text-xs-center">
												<div v-t="card.title" class="headline" />
											</v-card-text>
											<v-card-text v-t="card.description" class="pt-1" />
										</v-card>
									</v-flex>
								</template>
							</v-layout>
						</v-container>
					</v-flex>
				</v-layout>
			</section>

			<!-- *intro reponsive device -->
			<section>
				<v-layout
					row
					wrap
					class="py-4"
					align-center>
					<v-flex xs12>
						<v-container grid-list-xl>
							<v-layout row wrap>
								<v-flex xs12 sm6>
									<v-img :src="phone.urlImg" aspect-ratio="1.2" contain />
								</v-flex>
								<v-flex xs12 sm6>
									<h1 v-t="phone.title" class="headline font-weight-regular mb-3" />
									<p v-t="phone.description" class="font-weight-light subheading" />
									<v-layout row wrap>
										<v-flex xs6>
											<v-btn
												depressed
												large
												color="primary"
												class="mx-0">
												<span v-t="'phone-intro-start-btn'" />
											</v-btn>
										</v-flex>
										<v-flex xs6>
											<v-btn
												depressed
												large
												flat
												color="primary">
												<span v-t="'phone-intro-findout-btn'" class="underline" />
											</v-btn>
										</v-flex>
									</v-layout>
								</v-flex>
							</v-layout>
						</v-container>
					</v-flex>
				</v-layout>
			</section>

			<!-- *partner -->
			<section class="white-bg">
				<v-layout
					row
					wrap
					class="py-4"
					justify-center
					align-center>
					<v-flex xs12 class="my-4">
						<div class="text-xs-center">
							<h2 v-t="'partner-title'" class="headline font-weight-regular text-uppercase" />
						</div>
					</v-flex>

					<v-flex xs12>
						<v-container grid-list-xl>
							<v-layout
								row
								wrap
								align-center
								justify-center>
								<template v-for="partner in partners">
									<v-flex :key="partner.id" xs6 sm3>
										<v-img
											:src="partner.urlImg"
											:lazy-src="partner.urlImg"
											aspect-ratio="5"
											contain />
									</v-flex>
								</template>
							</v-layout>
						</v-container>
					</v-flex>
				</v-layout>
			</section>

			<!-- *title uses product -->
			<section id="primary-bg">
				<v-layout
					row
					wrap
					class="pt-5"
					justify-center
					align-center>
					<v-flex xs12 sm6 class="my-4">
						<div class="text-xs-center">
							<h2
								v-t="'experience-title'"
								class="headline font-weight-regular text-uppercase white--text" />
							<div>
								<v-btn
									depressed
									large
									color="white"
									class="my-3">
									<span v-t="'phone-intro-start-btn'" />
								</v-btn>
							</div>
						</div>
					</v-flex>
				</v-layout>
			</section>

			<!--
				@desc: footer
				@contains: advertise product/customer/about/contact
			-->
			<section class="white-bg">
				<v-layout
					id="footer"
					row
					wrap
					class="py-4">
					<v-flex xs12>
						<v-container grid-list-xl>
							<v-layout row wrap>
								<!-- *advertise products -->
								<v-flex xs6 sm3>
									<ul>
										<span v-t="'footer-product'" class="subheading pb-2 font-weight-medium" />
										<template v-for="item in footerProducts">
											<li :key="item.title">
												<router-link v-t="item.title" :to="item.url" />
											</li>
										</template>
									</ul>
								</v-flex>
								<!-- *customer -->
								<v-flex xs6 sm3>
									<ul>
										<span v-t="'footer-customer'" class="subheading pb-2 font-weight-medium" />
										<template v-for="item in footerCustomer">
											<li :key="item.title">
												<router-link v-t="item.title" :to="item.url" />
											</li>
										</template>
									</ul>
								</v-flex>
								<!-- *about us -->
								<v-flex xs6 sm3>
									<ul>
										<span v-t="'footer-about'" class="subheading pb-2 font-weight-medium" />
										<template v-for="item in footerAbout">
											<li :key="item.title">
												<router-link v-t="item.title" :to="item.url" />
											</li>
										</template>
									</ul>
								</v-flex>
								<!-- *contact -->
								<v-flex xs6 sm3>
									<ul>
										<span
											v-t="'app-name'"
											class="display-1 pb-2 font-weight-medium" />
										<li v-t="'footer-contact'" class="subheading font-weight-medium" />
										<li>(+84) 123 456 789</li>
										<li>sliding@sli.com</li>
									</ul>
								</v-flex>
							</v-layout>
						</v-container>
					</v-flex>
				</v-layout>
			</section>
		</v-content>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { loadLanguageAsync } from '@/modules/vue-i18n-setup';
import UserActionsAvatar from '@/components/user/UserActionsAvatar.vue';

export default {
	name: 'Home',
	components: {
		'actions-avatar--user': UserActionsAvatar,
	},
	data: () => ({
		inputEventCode: '',
		backgroundNav: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
		cards: [
			{
				id: 1,
				urlImg: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
				title: 'card-intro-title1',
				description: 'card-intro-des1',
			},
			{
				id: 2,
				urlImg: 'https://images.unsplash.com/photo-1532190795157-3f983fb7fa3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
				title: 'card-intro-title2',
				description: 'card-intro-des2',
			},
			{
				id: 3,
				urlImg: 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2252&q=80',
				title: 'card-intro-title3',
				description: 'card-intro-des3',
			},
		],
		phone: {
			title: 'phone-intro-title',
			description: 'phone-intro-description',
			urlImg: 'https://images.unsplash.com/photo-1543582890-139a4ff9946e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80',
		},
		partners: [
			{
				id: 1,
				urlImg: 'https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c516.png',
			},
			{
				id: 2,
				urlImg: 'http://pluspng.com/img-png/google-logo-png-open-2000.png',
			},
			{
				id: 3,
				urlImg: 'https://cdn.freebiesupply.com/logos/large/2x/bmw-2-logo-png-transparent.png',
			},
			{
				id: 4,
				urlImg: 'https://cdn.freebiesupply.com/logos/large/2x/mercedes-benz-1-logo-png-transparent.png',
			},
		],
		footerProducts: [
			{ title: 'footer-product-item1', url: '/questions' },
			{ title: 'footer-product-item2', url: '/polls' },
			{ title: 'footer-product-item3', url: '/ideas' },
			{ title: 'footer-product-item4', url: '/analytics' },
		],
		footerCustomer: [
			{ title: 'footer-customer-item1', url: '/' },
			{ title: 'footer-customer-item2', url: '/' },
		],
		footerAbout: [
			{ title: 'footer-about-item1', url: '/' },
			{ title: 'footer-about-item2', url: '/' },
			{ title: 'footer-about-item3', url: '/' },
		],
	}),
	computed: {
		...mapGetters({
			user: 'auth/user',
		}),
		locale() {
			return this.$i18n.locale;
		},
	},
	methods: {
		changeLocale(locale) {
			loadLanguageAsync(locale);
		},
		findEventByCode() {
			if (this.inputEventCode === '') return;
			this.$router.push({ name: 'search', query: { code: this.inputEventCode } });
		},
	},
};
</script>

<style lang="scss" scoped>
	$primary: #3da4b5;
	$navColor: #ffffffe6;
	$black: #000000de;
	#home-page {
		#my-navbar {
			color: $black;
		}
		.nav-transparent {
			background-color: $navColor !important;
		}
		.v-parallax .v-parallax__content {
			background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ) !important;
		}
		.w-3 {
			width: 300px;
		}
		.h-6 {
			height: 60px;
		}
		.my-input-code {
			position: relative;
			z-index: 10;
			right: 0;
			.v-btn {
				position: absolute;
				top: .1em;
				right: -.2em;
				height: 45px;
			}
		}
		.white-bg {
			background-color: #fff;
		}
		.underline {
			text-decoration: underline;
		}
		#primary-bg {
			background-color: $primary;
		}
		ul {
			list-style: none;
		}
		#footer {
			a {
				text-decoration: none;
				color: $black !important;
			}
		}
		.changeLang {
			&:hover {
				color: $primary;
				cursor: pointer;
			}
		}
		.langActive {
			color: $primary;
		}
		@media only screen and (max-width: 600px) {
			.nav-btn .v-btn{
				margin: 0;
			}
		}
	}
</style>
