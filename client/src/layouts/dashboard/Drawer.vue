<template>
	<v-navigation-drawer
		id="dashboard-navbar"
		v-model="drawer"
		absolute
		temporary
		app>
		<v-img
			:aspect-ratio="16/9"
			src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
			<v-layout
				column
				pa-2
				fill-height
				class="lightbox white--text">
				<v-spacer />
				<v-layout
					row
					align-center
					justify-space-between
					shrink>
					<div class="d-inline-block w-100">
						<div class="body-2">
							{{ user.email }}
						</div>
						<div class="caption">
							{{ user.name }}
						</div>
					</div>
					<v-tooltip top>
						<template v-slot:activator="{ on }">
							<v-btn icon v-on="on">
								<v-icon color="white" v-text="'$vuetify.icons.setting'" />
							</v-btn>
						</template>
						<span v-t="'accountSetting'" />
					</v-tooltip>
				</v-layout>
			</v-layout>
		</v-img>

		<v-layout
			column
			class="fill-height">
			<!-- *My-event -->
			<v-list-tile
				:to="{ name: 'my-events' }"
				active-class="active-tab"
				avatar
				class="v-list-item">
				<v-list-tile-action>
					<v-icon color="primary" v-text="'$vuetify.icons.event'" />
				</v-list-tile-action>

				<v-list-tile-title v-t="'my-events'" />
			</v-list-tile>

			<!-- *Coop-events -->
			<v-list-tile
				:to="{ name: 'coop-events' }"
				active-class="active-tab"
				avatar
				class="v-list-item">
				<v-list-tile-action>
					<v-icon color="success" v-text="'$vuetify.icons.person'" />
				</v-list-tile-action>

				<v-list-tile-title v-t="'coop-events'" />
			</v-list-tile>

			<!-- *Activity-logs -->
			<v-list-tile
				:to="{ name: 'activity-logs' }"
				active-class="active-tab"
				avatar
				class="v-list-item">
				<v-list-tile-action>
					<v-icon color="red" v-text="'$vuetify.icons.analytics'" />
				</v-list-tile-action>

				<v-list-tile-title v-t="'activity-logs'" />
			</v-list-tile>
			<v-divider />

			<!-- *Homepage -->
			<v-list-tile to="/">
				<v-list-tile-action>
					<v-icon v-text="'$vuetify.icons.home'" />
				</v-list-tile-action>

				<v-list-tile-title v-t="'home-page'" />
			</v-list-tile>

			<!-- *Profile -->
			<v-list-tile>
				<v-list-tile-action>
					<v-icon v-text="'$vuetify.icons.user'" />
				</v-list-tile-action>

				<v-list-tile-title v-t="'btn-your-profile'" />
			</v-list-tile>

			<!-- *Switch language -->
			<v-list>
				<v-list-group
					v-model="dropList"
					prepend-icon="language"
					no-action>
					<template v-slot:activator>
						<v-list-tile>
							<v-list-tile-content>
								<v-list-tile-title v-t="locale === 'vi' ? 'lang-choose-vi' : 'lang-choose-en'" />
							</v-list-tile-content>
						</v-list-tile>
					</template>

					<!-- *Vietnamese -->
					<v-list-tile @click="changeLocale('vi')">
						<v-list-tile-content>
							<v-list-tile-title v-t="'btn-lang-vi'" />
						</v-list-tile-content>

						<v-list-tile-action>
							<v-icon color="primary" v-text="locale === 'vi' ? 'check' : ''" />
						</v-list-tile-action>
					</v-list-tile>

					<!-- *English -->
					<v-list-tile @click="changeLocale('en')">
						<v-list-tile-content>
							<v-list-tile-title v-t="'btn-lang-en'" />
						</v-list-tile-content>

						<v-list-tile-action>
							<v-icon color="primary" v-text="locale === 'en' ? 'check' : ''" />
						</v-list-tile-action>
					</v-list-tile>
				</v-list-group>
			</v-list>

			<!-- *Logout -->
			<v-divider v-show="!dropList" />
			<v-list-tile :to="{ name: 'logout' }">
				<v-list-tile-action>
					<v-icon v-text="'$vuetify.icons.signout'" />
				</v-list-tile-action>

				<v-list-tile-title v-t="'logout'" />
			</v-list-tile>
		</v-layout>
	</v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';
import { loadLanguageAsync } from '@/modules/vue-i18n-setup';

export default {
	name: 'Drawer',
	data: () => ({
		drawer: false,
		dropList: false,
	}),
	computed: {
		...mapGetters({
			user: 'auth/user',
		}),
		locale() {
			return this.$i18n.locale;
		},
	},
	mounted() {
		this.$root.$on('toggle-drawer', () => {
			this.drawer = !this.drawer;
		});
	},
	methods: {
		changeLocale(locale) {
			loadLanguageAsync(locale);
			this.dropList = false;
		},
	},
};
</script>

<style lang="scss">
	#dashboard-navbar {
		.v-navigation-drawer {
			transition: all .8s;
			-webkit-transition: all .8s;
		}

		.active-tab {
			background-color: #f3f3f3;
		};

		.lightbox {
			box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
			background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 80px);
		}
	}
</style>
