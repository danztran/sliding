<template>
	<v-navigation-drawer
		v-model="drawer"
		absolute
		temporary
		app
		id="admin-navbar">
		<v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
			<v-layout pa-2 column fill-height class="lightbox white--text">
				<v-spacer></v-spacer>
				<v-layout align-center justify-space-between row shrink>
					<div class="d-inline-block w-100">
						<div class="body-2">
							{{ loading ? eventInfo.name : 'loading' }}
						</div>
						<div class="caption text-uppercase">
							{{ loading ? eventInfo.code : 'loading' }}
						</div>
					</div>
					<v-tooltip top>
						<template v-slot:activator="{ on }">
							<v-btn icon v-on="on">
								<v-icon color="white" v-html="'$vuetify.icons.setting'"/>
							</v-btn>
						</template>
						<span v-t="'accountSetting'" />
					</v-tooltip>
				</v-layout>
			</v-layout>
		</v-img>

		<v-layout
			class="fill-height"
			column>
			<v-list-tile
				v-for="(link, i) in links"
				:key="i"
				:to="link.to"
				active-class="active-tab"
				avatar
				class="v-list-item">
				<v-list-tile-action>
					<v-icon :color="link.color">{{ link.icon }}</v-icon>
				</v-list-tile-action>

				<v-list-tile-title v-text="link.name"/>
			</v-list-tile>

			<!-- SWITCH EVENT -->
			<v-divider/>
			<v-list-tile @click="switchEvent">
				<v-list-tile-action>
					<v-icon v-html="'$vuetify.icons.switch_event'"></v-icon>
				</v-list-tile-action>

				<v-list-tile-title v-t="'btn-switch-event'"/>
			</v-list-tile>

			<!-- LOGOUT -->
			<v-list-tile @click="callLogout">
				<v-list-tile-action>
					<v-icon v-html="'$vuetify.icons.signout'"></v-icon>
				</v-list-tile-action>

				<v-list-tile-title v-t="'logout'"/>
			</v-list-tile>

		</v-layout>
	</v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'Drawer',
	data: () => ({
		drawer: false,
		loading: false,
		links: [
			{
				to: 'questions',
				icon: 'question_answer',
				name: 'questions',
				color: 'yellow'
			},
			{
				to: 'polls',
				icon: 'sort',
				name: 'polls',
				color: 'primary'
			},
			{
				to: 'ideas',
				icon: 'new_releases',
				name: 'ideas',
				color: 'secondary'
			},
			{
				to: 'analytics',
				icon: 'poll',
				name: 'analytics',
				color: 'red'
			}
		]
	}),
	computed: {
		...mapGetters({
			eventInfo: 'admin/event/infoCurrentEvent'
		})
	},
	created() {
		this.links.forEach((e) => {
			e.name = this.$t(e.name);
		});
	},
	watch: {
		eventInfo(val) {
			this.loading = true;
		}
	},
	mounted() {
		this.$root.$on('toggle-drawer', () => {
			this.drawer = !this.drawer;
		});
	},
	methods: {
		callLogout() {
			this.$store.dispatch('auth/logout');
		},
		switchEvent() {
			this.$router.push({ name: 'my-events' });
		}
	}
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
