<template>
	<div id="home-page">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>

		<!-- header -->
		<v-toolbar id="my-navbar" fixed flat class="nav-transparent">
			<v-layout row align-center>
				<!-- app title -->
				<v-toolbar-title v-t="'app-name'" class="mx-0 font-weight-bold" />

				<v-spacer />

				<!-- actions -->
				<section class="nav-btn body-2">
					<actions-avatar--user v-if="user" in-search />
					<template v-else>
						<div class="d-inline">
							<span
								:class="{ langActive: locale === 'vi' }"
								class="changeLang"
								@click="changeLocale('vi')"
								v-text="'VI'" />
							|
							<span
								:class="{ langActive: locale === 'en' }"
								class="changeLang"
								@click="changeLocale('en')"
								v-text="'EN'" />
						</div>

						<!-- auth -->
						<router-link class="no-underline" :to="{ name: 'login' }">
							<v-btn flat medium>
								<span v-t="'loginFormTitle'" />
							</v-btn>
						</router-link>
						<router-link class="no-underline white--text" :to="{ name: 'signup' }">
							<v-btn flat medium class="primary white--text">
								<span v-t="'btn-signup'" />
							</v-btn>
						</router-link>
					</template>
				</section>
			</v-layout>
		</v-toolbar>

		<v-content>
			<!-- main background -->
			<v-img
				height="75vh"
				cover
				:src="require('@/assets/asking.svg')"
				gradient="to top, rgba(0, 0, 0, 0.5), rgba(210, 210, 210, 0)">
				<v-layout fluid fill-height>
					<v-container>
						<!-- *sologan -->
						<v-flex
							xs12
							text-xs-center
							class="mb-5"
							style="text-shadow: 0.2em 0.7em 9em #000000de">
							<div
								v-t="'sologan'"
								class="display-3 white--text font-weight-medium text-capitalize mb-3" />
							<span
								v-t="'sub-sologan'"
								class="font-weight-light headline white--text" />
						</v-flex>

						<!-- *Input code -->
						<v-layout row wrap justify-center>
							<div class="my-input-code w-3 text-uppercase">
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
							<template v-if="!user">
								<div v-t="'or'" class="mx-4 pt-3 headline white--text" />
								<div>
									<v-btn
										outline
										dark
										class="w-3 h-6 ma-0"
										:to="{ name: 'signup' }">
										<span
											v-t="'btn-intro-sigup'"
											class="no-underline white--text" />
									</v-btn>
								</div>
							</template>
						</v-layout>
					</v-container>
				</v-layout>
			</v-img>

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
										<v-card height="400">
											<v-img :src="require(`@/assets/${card.url}`)" height="230px" contain />
											<v-card-text class="text-xs-center px-4">
												<div v-t="card.title" class="headline" />
												<div v-t="card.description" class="pt-2" />
											</v-card-text>
										</v-card>
									</v-flex>
								</template>
							</v-layout>
						</v-container>
					</v-flex>
				</v-layout>
			</section>

			<!-- *intro mobile device -->
			<section>
				<v-layout
					row
					wrap
					class="py-4"
					align-center>
					<v-flex xs12>
						<v-container grid-list-xl>
							<v-layout row wrap>
								<v-flex xs12 sm8>
									<v-img :src="require(`@/assets/${phone.url}`)" aspect-ratio="2" contain />
								</v-flex>
								<v-flex xs12 sm4>
									<h1 v-t="phone.title" class="display-1 font-weight-medium mb-3" />
									<p v-t="phone.description" class="font-weight-light subheading" />
									<div>
										<v-btn
											depressed
											large
											color="primary"
											class="mx-0"
											:to="{ name: 'signup' }">
											<span v-t="'phone-intro-start-btn'" />
										</v-btn>
										<v-btn
											class="underline"
											depressed
											large
											flat
											color="primary"
											:to="{ name: 'signup' }">
											<span v-t="'phone-intro-start-btn'" />
										</v-btn>
									</div>
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
					class="py-5"
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
											:src="require('@/assets/VLu.png')"
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
					class="py-5"
					justify-center
					align-center>
					<v-flex xs12 sm6 class="my-4">
						<div class="text-xs-center">
							<h2
								v-t="'experience-title'"
								class="headline font-weight-medium text-uppercase white--text" />
							<div>
								<v-btn
									depressed
									large
									color="white"
									class="my-3"
									:to="{ name: 'signup' }">
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
										<div v-t="'footer-product'" class="subheading mb-2 font-weight-medium" />
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
										<div v-t="'footer-customer'" class="subheading mb-2 font-weight-medium" />
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
										<div v-t="'footer-about'" class="subheading mb-2 font-weight-medium" />
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
										<div
											v-t="'app-name'"
											class="title" />
										<li v-t="'footer-contact'" class="subheading font-weight-medium" />
										<li>(+84) 123 456 789</li>
										<li>sliding@vanlanguni.com</li>
										<li>ROBOKU Team</li>
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
		cards: [
			{
				id: 1,
				url: 'group_meeting.svg',
				title: 'card-intro-title1',
				description: 'card-intro-des1',
			},
			{
				id: 2,
				url: 'team_meeting.svg',
				title: 'card-intro-title2',
				description: 'card-intro-des2',
			},
			{
				id: 3,
				url: 'customer_meeting.svg',
				title: 'card-intro-title3',
				description: 'card-intro-des3',
			},
		],
		phone: {
			title: 'phone-intro-title',
			description: 'phone-intro-description',
			url: 'mobile_device.svg',
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

<style lang="scss">
$primary: var(--v-primary-base);
$navColor: #ffffff94;
$black: #000000de;
#home-page {
	#my-navbar {
		color: $black;
	}
	.nav-transparent {
		background-color: $navColor !important;
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
		.v-input__control .v-text-field__details {
			display: none;
		}
		.v-input__slot {
			margin: 0;
		}
		.v-btn {
			position: absolute;
			top: .1em;
			right: -.2em;
			height: 45px;
		}
		input[type="text"] {
			max-width: 55% !important;
			font-size: 1.2em;
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
