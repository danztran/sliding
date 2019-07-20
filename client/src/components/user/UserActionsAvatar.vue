<template>
	<v-menu
		class="hidden-xs-only"
		transition="slide-y-transition"
		bottom
		left
		offset-y
		:nudge-width="250"
		nudge-bottom="5"
		content-class="dropdown-menu">
		<!-- Avatar Actions List -->
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<template v-slot:activator="{ on }">
			<v-avatar :size="35" class="hover ml-2 hidden-xs-only" v-on="on">
				<v-icon
					size="20"
					:color="_cm.resultColor(inSearch, 'grey', 'white')"
					v-text="'$vuetify.icons.person'" />
			</v-avatar>
		</template>

		<v-layout
			class="fill-height"
			column>
			<v-card>
				<v-list>
					<v-list-tile>
						<v-list-tile-avatar size="30">
							<v-icon size="20" v-text="'$vuetify.icons.person'" />
						</v-list-tile-avatar>

						<v-list-tile-content>
							<div class="body-1 text-capitalize">
								{{ user ? user.name : '' }}
							</div>
							<div class="caption grey--text">
								{{ user ? user.email : $t('anonymous-empty-email') }}
							</div>
						</v-list-tile-content>

						<v-list-tile-action>
							<v-btn icon>
								<span
									v-t="'btn-edit-profile'"
									class="primary--text" />
							</v-btn>
						</v-list-tile-action>
					</v-list-tile>
				</v-list>
				<v-divider />

				<v-list class="pa-0">
					<!-- *Homepage -->
					<v-list-tile to="/">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="secondary"
								size="20"
								v-text="'$vuetify.icons.home'" />
						</v-list-tile-action>

						<v-list-tile-title v-t="'home-page'" />
					</v-list-tile>

					<!-- *Event -->
					<v-list-tile :to="{ name: 'my-events' }">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="primary"
								size="20"
								v-text="'$vuetify.icons.event'" />
						</v-list-tile-action>

						<v-list-tile-title v-t="'my-events'" />
					</v-list-tile>

					<!-- *Button for toggle diaog create event -->
					<v-list-tile @click="toggleDialogCreateEvent">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="yellow"
								size="20"
								v-text="'$vuetify.icons.add'" />
						</v-list-tile-action>

						<v-list-tile-title v-t="'btn-create-event'" />
					</v-list-tile>

					<!-- *Coop-event -->
					<v-list-tile :to="{ name: 'coop-events' }">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="success"
								size="20"
								v-text="'$vuetify.icons.person'" />
						</v-list-tile-action>

						<v-list-tile-title v-t="'coop-events'" />
					</v-list-tile>

					<!-- *Analytic activities -->
					<v-list-tile :to="{ name: 'activity-logs' }">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="red"
								size="20"
								v-text="'$vuetify.icons.analytics'" />
						</v-list-tile-action>

						<v-list-tile-title v-t="'activity-logs'" />
					</v-list-tile>

					<v-divider />
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

					<!-- *Switch language -->
					<v-list-tile @click="changeLocale('vi')">
						<v-list-tile-action>
							<v-icon
								v-show="locale === 'vi'"
								:color="locale === 'vi' ? 'primary' : ''"
								class="pl-1"
								size="20"
								v-text="'$vuetify.icons.language'" />
						</v-list-tile-action>

						<v-list-tile-content>
							<v-list-tile-title
								v-t="'lang-choose-vi'"
								:class="locale === 'vi' ? 'primary--text' : ''" />
						</v-list-tile-content>
					</v-list-tile>

					<!-- *English -->
					<v-list-tile @click="changeLocale('en')">
						<v-list-tile-action>
							<v-icon
								v-show="locale === 'en'"
								:color="locale === 'en' ? 'primary' : ''"
								class="pl-1"
								size="20"
								v-text="'$vuetify.icons.language'" />
						</v-list-tile-action>

						<v-list-tile-content>
							<v-list-tile-title
								v-t="'lang-choose-en'"
								:class="locale === 'en' ? 'primary--text' : ''" />
						</v-list-tile-content>
					</v-list-tile>

					<!-- *Logout -->
					<v-list-tile :to="{ name: 'logout' }">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								size="20"
								v-text="'$vuetify.icons.signout'" />
						</v-list-tile-action>

						<v-list-tile-title v-t="'logout'" />
					</v-list-tile>
				</v-list>
			</v-card>
		</v-layout>
	</v-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import { loadLanguageAsync } from '@/modules/vue-i18n-setup';

export default {
	name: 'UserActionsAvatar',
	props: {
		inSearch: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		...mapGetters({
			user: 'auth/user',
		}),
		locale() {
			return this.$i18n.locale;
		},
	},
	methods: {
		editProfile() {},
		changeLocale(locale) {
			loadLanguageAsync(locale);
		},
		toggleDialogCreateEvent() {
			this.$root.$emit('dialog-create-new-event');
		},
	},
};
</script>

<style>
.hover {
	cursor: pointer;
	opacity: .8;
}
</style>
