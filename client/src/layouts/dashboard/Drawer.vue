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
					<v-btn icon @click="toggleDialogUserUpdateProfile">
						<v-icon color="white" v-text="'$vuetify.icons.person'" />
					</v-btn>
				</v-layout>
			</v-layout>
		</v-img>

		<v-layout
			column
			class="fill-height">
			<!-- *Homepage -->
			<v-list-tile to="/">
				<v-list-tile-action>
					<v-icon color="secondary" v-text="'$vuetify.icons.home'" />
				</v-list-tile-action>

				<v-list-tile-title v-t="'home-page'" />
			</v-list-tile>

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
					<v-icon color="success" v-text="'$vuetify.icons.group_people'" />
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
			<!-- *Invite-access-request -->
			<list-item--invites :user="user" />

			<!-- *Search -->
			<v-list-tile :to="{ name: 'search' }">
				<v-list-tile-action>
					<v-icon
						size="20"
						v-text="'$vuetify.icons.search'" />
				</v-list-tile-action>

				<v-list-tile-title v-t="'btn-search-event'" />
			</v-list-tile>

			<!-- *Switch language -->
			<v-list>
				<v-list-group
					v-model="dropListLang"
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
			<v-divider v-show="!dropListLang" />
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
import InviteListItem from '@/components/pieces/InviteListItem.vue';

export default {
	name: 'Drawer',
	components: {
		'list-item--invites': InviteListItem,
	},
	data: () => ({
		drawer: false,
		dropListLang: false,
	}),
	computed: {
		...mapGetters({
			user: 'auth/user',
			invites: 'dashboard/getInvites',
		}),
		locale() {
			return this.$i18n.locale;
		},
	},
	mounted() {
		this.$root.$on('toggle-drawer', () => {
			this.drawer = true;
		});
	},
	methods: {
		changeLocale(locale) {
			loadLanguageAsync(locale);
			this.dropListLang = false;
		},
		toggleDialogUserUpdateProfile() {
			this.drawer = false;
			this.$root.$emit('dialog-user-update-profile');
		},
		toggleDialogAccessInviteRequest() {
			this.drawer = false;
			this.$root.$emit('dialog-invite-request');
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
