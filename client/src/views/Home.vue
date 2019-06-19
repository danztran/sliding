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
			<v-layout align-center row>
				<v-toolbar-title class="mx-0" v-t="'app-name'"></v-toolbar-title>
				<v-spacer></v-spacer>
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
							<router-link class="no-underline" to='/login' v-t="'loginFormTitle'" />
						</v-btn>
						<v-btn
							to="/signup"
							flat
							medium
							class="primary no-underline"
							color="white"
							v-t="'btn-signup'">
							<router-link to='/signup' v-t="'signUp'" />
						</v-btn>
					</template>
					<template v-else>
						<v-btn class="text-capitalize">
							<router-link class="no-underline" :to="{ name: 'dashboard' }">
								{{ $t('hello') }}&nbsp;{{ user.name }}
							</router-link>
						</v-btn>
						<v-btn
							@click="callLogout"
							flat
							medium
							class="no-underline"
							v-t="'logout'">
						</v-btn>
					</template>
				</section>
			</v-layout>
		</v-toolbar>
		<v-content>
			<!--
				@desc: Main picture introduce, input event code
				@contains: sologan, signup btn, input event code
			-->
			<v-parallax
				class="pa-0"
				dark
				height="500"
				:src="backgroundNav">
				<v-layout align-center justify-center row>
					<v-container grid-list-xs>
						<!--
							@desc: sologan
						-->
						<v-flex
							xs12
							text-xs-center
							class="mb-5"
							style="text-shadow: 0.2em 0.4em 9em #000000de">
							<h1 class="display-3 font-weight-regular text-capitalize mb-3" v-t="'sologan'"></h1>
							<span class="font-weight-light headline" v-t="'sub-sologan'"></span>
						</v-flex>

						<!--
							@desc: Input code
						-->
						<v-layout justify-center row>
							<div class="my-input-code w-3">
								<v-text-field
									height="60"
									solo
									:label="$t('plhEnterCode')"
									v-model="inputEventCode"
									prefix="#">
								</v-text-field>
								<v-btn color="primary" :to="inputEventCode">
									<span v-t="'btn-join'"></span>
								</v-btn>
							</div>
							<div class="mx-4 pt-3 hidden-sm-and-down">
								<span class="headline" v-t="'or'"></span>
							</div>
							<div class="hidden-sm-and-down">
								<v-btn
									outline
									dark
									class="w-3 h-6 ma-0"
									v-t="'btn-intro-sigup'"
									to="/signup">
								</v-btn>
							</div>
						</v-layout>
					</v-container>
				</v-layout>
			</v-parallax>

			<!--
				@desc: 3 card introduce product
			-->
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
								class="headline text-uppercase"
								v-t="'card-header-title'">
							</h2>
							<span
								class="subheading"
								v-t="'card-subheader-title'">
							</span>
						</div>
					</v-flex>

					<v-flex xs12>
						<v-container grid-list-xl>
							<v-layout row wrap>
								<template v-for="card in cards">
									<v-flex xs12 md4 :key="card.id">
										<v-card>
											<v-img :src="card.urlImg" height="200px"></v-img>
											<v-card-text class="text-xs-center">
												<div class="headline" v-t="card.title"></div>
											</v-card-text>
											<v-card-text class="pt-1" v-t="card.description"></v-card-text>
										</v-card>
									</v-flex>
								</template>
							</v-layout>
						</v-container>
					</v-flex>

				</v-layout>
			</section>

			<!--
				@desc: intro reponsive device
			-->
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
									<v-img :src="phone.urlImg" aspect-ratio="1.2" contain></v-img>
								</v-flex>
								<v-flex xs12 sm6>
									<h1 class="headline font-weight-regular mb-3" v-t="phone.title"></h1>
									<p class="font-weight-light subheading" v-t="phone.description"></p>
									<v-layout row wrap>
										<v-flex xs6>
											<v-btn depressed large color="primary" class="mx-0">
												<span v-t="'phone-intro-start-btn'"></span>
											</v-btn>
										</v-flex>
										<v-flex xs6>
											<v-btn depressed large color="primary" flat>
												<span class="underline" v-t="'phone-intro-findout-btn'"></span>
											</v-btn>
										</v-flex>
									</v-layout>
								</v-flex>
							</v-layout>
						</v-container>

					</v-flex>
				</v-layout>
			</section>

			<!--
				@desc: partner
			-->
			<section class="white-bg">
				<v-layout
					row
					wrap
					class="py-4"
					justify-center
					align-center>
					<v-flex xs12 class="my-4">
						<div class="text-xs-center">
							<h2 class="headline font-weight-regular text-uppercase" v-t="'partner-title'"></h2>
						</div>
					</v-flex>

					<v-flex xs12>
						<v-container grid-list-xl>
							<v-layout row wrap align-center justify-center>
								<template v-for="partner in partners">
									<v-flex :key="partner.id" xs6 sm3>
										<v-img
											:src="partner.urlImg"
											:lazy-src="partner.urlImg"
											aspect-ratio="5"
											contain>
										</v-img>
									</v-flex>
								</template>
							</v-layout>
						</v-container>
					</v-flex>
				</v-layout>
			</section>

			<!--
				@desc: title uses product
			-->
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
								class="headline font-weight-regular text-uppercase white--text"
								v-t="'experience-title'">
							</h2>
							<div>
								<v-btn depressed large color="white" class="my-3">
									<span v-t="'phone-intro-start-btn'"></span>
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
								<!--
									@desc: advertise products
								-->
								<v-flex xs6 sm3>
									<ul>
										<span class="subheading pb-2 font-weight-medium" v-t="'footer-product'">
										</span>
										<template v-for="item in footerProducts">
											<li :key="item.title">
												<router-link :to="item.url" v-t="item.title">
												</router-link>
											</li>
										</template>
									</ul>
								</v-flex>
								<!--
									@desc: customer
								-->
								<v-flex xs6 sm3>
									<ul>
										<span class="subheading pb-2 font-weight-medium" v-t="'footer-customer'">
										</span>
										<template v-for="item in footerCustomer">
											<li :key="item.title">
												<router-link :to="item.url" v-t="item.title">
												</router-link>
											</li>
										</template>
									</ul>
								</v-flex>
								<!--
									@desc: about us
								-->
								<v-flex xs6 sm3>
									<ul>
										<span class="subheading pb-2 font-weight-medium" v-t="'footer-about'">
										</span>
										<template v-for="item in footerAbout">
											<li :key="item.title">
												<router-link :to="item.url" v-t="item.title">
												</router-link>
											</li>
										</template>
									</ul>
								</v-flex>
								<!--
									@desc: contact
								-->
								<v-flex xs6 sm3>
									<ul>
										<span
											class="display-1 pb-2 font-weight-medium"
											v-t="'app-name'">
										</span>
										<li class="subheading font-weight-medium" v-t="'footer-contact'"></li>
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

export default {
	name: 'Home',
	data: () => ({
		inputEventCode: '',
		backgroundNav: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
		cards: [
			{
				id: 1,
				urlImg: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
				title: 'card-intro-title1',
				description: 'card-intro-des1'
			},
			{
				id: 2,
				urlImg: 'https://images.unsplash.com/photo-1532190795157-3f983fb7fa3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
				title: 'card-intro-title2',
				description: 'card-intro-des2'
			},
			{
				id: 3,
				urlImg: 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2252&q=80',
				title: 'card-intro-title3',
				description: 'card-intro-des3'
			}
		],
		phone: {
			title: 'phone-intro-title',
			description: 'phone-intro-description',
			urlImg: 'https://images.unsplash.com/photo-1543582890-139a4ff9946e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80'
		},
		partners: [
			{
				id: 1,
				urlImg: 'https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c516.png'
			},
			{
				id: 2,
				urlImg: 'http://pluspng.com/img-png/google-logo-png-open-2000.png'
			},
			{
				id: 3,
				urlImg: 'https://cdn.freebiesupply.com/logos/large/2x/bmw-2-logo-png-transparent.png'
			},
			{
				id: 4,
				urlImg: 'https://cdn.freebiesupply.com/logos/large/2x/mercedes-benz-1-logo-png-transparent.png'
			}
		],
		footerProducts: [
			{ title: 'footer-product-item1', url: '/questions' },
			{ title: 'footer-product-item2', url: '/polls' },
			{ title: 'footer-product-item3', url: '/ideas' },
			{ title: 'footer-product-item4', url: '/analytics' }
		],
		footerCustomer: [
			{ title: 'footer-customer-item1', url: '/' },
			{ title: 'footer-customer-item2', url: '/' }
		],
		footerAbout: [
			{ title: 'footer-about-item1', url: '/' },
			{ title: 'footer-about-item2', url: '/' },
			{ title: 'footer-about-item3', url: '/' }
		]
	}),
	computed: {
		...mapGetters({
			user: 'auth/user'
		}),
		locale() {
			return this.$i18n.locale;
		}
	},
	methods: {
		changeLocale(locale) {
			loadLanguageAsync(locale);
		},
		callLogout() {
			this.$store.dispatch('auth/logout');
		}
	}
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
			input[type="text"] {
				text-transform: uppercase;
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
