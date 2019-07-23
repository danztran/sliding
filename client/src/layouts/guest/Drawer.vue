<template>
	<v-navigation-drawer
		v-model="drawer"
		width="230"
		:hide-overlay="!isSMnXS ? true : false"
		:clipped="!isSMnXS"
		:stateless="!isSMnXS"
		fixed
		:floating="!isSMnXS"
		:class="{ 'transparent': !isSMnXS }">
		<v-layout column fill-height pt-5>
			<v-list two-line>
				<!-- *Event info -->
				<v-list-tile>
					<v-list-tile-content>
						<v-list-tile-title class="body-1">
							{{ eventInfo ? eventInfo.name : '...' }}
						</v-list-tile-title>
						<v-list-tile-sub-title>
							{{ eventDate }}
						</v-list-tile-sub-title>
						<v-list-tile-sub-title class="text-uppercase">
							#{{ eventInfo ? eventInfo.code : '...' }}
						</v-list-tile-sub-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
			<v-list dense class="custom-list pl-1">
				<v-divider />

				<!-- *Search -->
				<v-list-tile :to="{ name: 'search' }">
					<v-list-tile-action>
						<v-icon
							small
							v-text="'$vuetify.icons.switch_event'" />
					</v-list-tile-action>

					<v-list-tile-title v-t="'btn-search-event'" />
				</v-list-tile>

				<!-- *Switch language -->
				<v-list-group
					v-model="dropListLang"
					small>
					<template v-slot:activator>
						<v-list-tile>
							<v-list-tile-action>
								<v-icon
									small
									v-text="'$vuetify.icons.language'" />
							</v-list-tile-action>
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
							<v-icon small color="primary" v-text="locale === 'vi' ? 'check' : ''" />
						</v-list-tile-action>
					</v-list-tile>

					<!-- *English -->
					<v-list-tile @click="changeLocale('en')">
						<v-list-tile-content>
							<v-list-tile-title v-t="'btn-lang-en'" />
						</v-list-tile-content>

						<v-list-tile-action>
							<v-icon small color="primary" v-text="locale === 'en' ? 'check' : ''" />
						</v-list-tile-action>
					</v-list-tile>
				</v-list-group>
			</v-list>
		</v-layout>
	</v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';
import { loadLanguageAsync } from '@/modules/vue-i18n-setup';

export default {
	name: 'Drawer',
	data: () => ({
		drawer: true,
		dropListLang: false,
	}),
	computed: {
		...mapGetters({
			eventInfo: 'guest/event/getEventInfo',
		}),
		locale() {
			return this.$i18n.locale;
		},
		eventDate() {
			const start = new Date(this.eventInfo ? this.eventInfo.start_at : null);
			const end = new Date(this.eventInfo ? this.eventInfo.end_at : null);
			const dateEnd = end.toUTCString().toString().substr(4, 12);
			return `${start.getDate()} ${start.getMonth() !== end.getMonth() ? start.toLocaleString('default', { month: 'long' }) : ''} - ${dateEnd}`;
		},
	},
	mounted() {
		this.$root.$on('toggle-guest-drawer', () => {
			this.drawer = !this.drawer;
		});
	},
	methods: {
		changeLocale(locale) {
			loadLanguageAsync(locale);
			this.dropListLang = false;
		},
	},
};
</script>

<style lang="scss">
</style>
