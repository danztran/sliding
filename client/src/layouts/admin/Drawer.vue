<template>
	<v-navigation-drawer
		id="admin-navbar"
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
							{{ eventInfo ? eventInfo.name : '...' }}
						</div>
						<div class="caption text-uppercase">
							{{ eventInfo ? `# ${eventInfo.code}` : '...' }}
						</div>
					</div>
					<v-btn icon @click="toggleDialogUserUpdateProfile">
						<v-icon color="white" v-text="'$vuetify.icons.person'" />
					</v-btn>
				</v-layout>
			</v-layout>
		</v-img>

		<v-layout
			class="fill-height"
			column>
			<!-- *Questions -->
			<v-list-tile
				:to="{ name: 'admin-questions' }"
				active-class="active-tab"
				avatar
				class="v-list-item">
				<v-list-tile-action>
					<v-icon color="yellow" v-text="'$vuetify.icons.questions'" />
				</v-list-tile-action>

				<v-list-tile-title v-t="'questions'" />
			</v-list-tile>

			<!-- *Polls -->
			<v-list-tile
				:to="{ name: 'admin-polls' }"
				active-class="active-tab"
				avatar
				class="v-list-item">
				<v-list-tile-action>
					<v-icon color="primary" v-text="'$vuetify.icons.analytics'" />
				</v-list-tile-action>

				<v-list-tile-title v-t="'polls'" />
			</v-list-tile>

			<!-- *Ideas -->
			<v-list-tile
				:to="{ name: 'admin-ideas' }"
				active-class="active-tab"
				avatar
				class="v-list-item">
				<v-list-tile-action>
					<v-icon color="secondary" v-text="'$vuetify.icons.ideas'" />
				</v-list-tile-action>

				<v-list-tile-title v-t="'ideas'" />
			</v-list-tile>

			<!-- *Analytics -->
			<v-list-tile
				:to="{ name: 'admin-analytics' }"
				active-class="active-tab"
				avatar
				class="v-list-item">
				<v-list-tile-action>
					<v-icon color="red" v-text="'$vuetify.icons.analytics'" />
				</v-list-tile-action>

				<v-list-tile-title v-t="'analytics'" />
			</v-list-tile>

			<v-divider />
			<!-- *Homepage -->
			<v-list-tile to="/">
				<v-list-tile-action>
					<v-icon v-text="'$vuetify.icons.home'" />
				</v-list-tile-action>

				<v-list-tile-title v-t="'home-page'" />
			</v-list-tile>

			<!-- *Invite-access-request -->
			<v-list-tile @click="toggleDialogAccessInviteRequest">
				<v-list-tile-action>
					<v-icon
						class="pl-1"
						size="20"
						v-text="invites.length > 0
							? '$vuetify.icons.notice'
							: '$vuetify.icons.no_notice'" />
				</v-list-tile-action>

				<v-list-tile-content>
					<v-list-tile-title v-t="'invite-request'" />
				</v-list-tile-content>

				<v-list-tile-action v-show="invites.length > 0">
					<v-chip small color="red">
						<span class="white--text" v-text="invites.length" />
					</v-chip>
				</v-list-tile-action>
			</v-list-tile>

			<!-- *Search -->
			<v-list-tile :to="{ name: 'search' }">
				<v-list-tile-action>
					<v-icon
						class="pl-1"
						size="20"
						v-text="'$vuetify.icons.search'" />
				</v-list-tile-action>

				<v-list-tile-title v-t="'btn-search-event'" />
			</v-list-tile>

			<!-- *Switch event -->
			<v-list-tile :to="{ name: 'my-events' }">
				<v-list-tile-action>
					<v-icon v-text="'$vuetify.icons.switch_event'" />
				</v-list-tile-action>

				<v-list-tile-title v-t="'btn-switch-event'" />
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

			<v-divider v-show="!dropList" />
			<!-- *Logout -->
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
import { mapGetters, mapMutations } from 'vuex';
import { loadLanguageAsync } from '@/modules/vue-i18n-setup';

export default {
	name: 'Drawer',
	data: () => ({
		drawer: false,
		loading: false,
		dropList: false,
	}),
	computed: {
		...mapGetters({
			user: 'auth/user',
			eventInfo: 'admin/event/getEventInfo',
			invites: 'dashboard/getInvites',
		}),
		locale() {
			return this.$i18n.locale;
		},
	},
	watch: {
		eventInfo(val) {
			this.loading = true;
		},
	},
	mounted() {
		this.$root.$on('toggle-drawer', () => {
			this.drawer = true;
		});
		if (this.user
			&& this.user.username !== null
			&& this.invites.length === 0) {
			this.emitQueryInvites();
		}
	},
	methods: {
		...mapMutations({
			setInvites: 'dashboard/SET_INVITES',
		}),
		changeLocale(locale) {
			loadLanguageAsync(locale);
			this.dropList = false;
		},
		switchEvent() {
			this.$router.push({ name: 'my-events' });
		},
		toggleDialogUserUpdateProfile() {
			this.drawer = false;
			this.$root.$emit('dialog-user-update-profile');
		},
		toggleDialogAccessInviteRequest() {
			this.drawer = false;
			this.$root.$emit('dialog-invite-request');
		},
		emitQueryInvites() {
			this.loadingState = 'loading';
			const emiter = 'query-invited';
			const queryOpt = {
				order: '-created_at',
				limit: 0,
				offset: 0,
			};
			this.$socket.emit(emiter, queryOpt, ({ errmsg, events }) => {
				if (!events) {
					if (errmsg) {
						// ...
					}
					return;
				}
				this.loadingState = 'success';
				this.setInvites(events);
			});
		},
	},
};
</script>

<style lang="scss">
#admin-navbar {
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
