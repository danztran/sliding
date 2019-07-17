<template>
	<div>
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-toolbar
			id="search-toolbar"
			dark
			color="transparent"
			tabs>
			<v-layout
				row
				align-center
				justify-space-between
				fill-height>
				<v-btn flat icon color="grey lighten-2" to="/">
					<v-icon color="grey" size="20" v-text="'$vuetify.icons.home'" />
				</v-btn>

				<v-toolbar-title class="white--text ml-0">
					<v-list-tile-content>
						<div class="text-xs-center black--text">
							Sliding
						</div>
					</v-list-tile-content>
				</v-toolbar-title>

				<v-list-tile>
					<actions-avatar--user v-if="user" in-search />
					<actions-avatar--anonymous v-else />
				</v-list-tile>
			</v-layout>
		</v-toolbar>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import AnonyActionsAvatar from '@/components/user/AnonyActionsAvatar.vue';
import UserActionsAvatar from '@/components/user/UserActionsAvatar.vue';

export default {
	components: {
		'actions-avatar--anonymous': AnonyActionsAvatar,
		'actions-avatar--user': UserActionsAvatar,
	},
	computed: {
		...mapGetters({
			user: 'auth/user',
		}),
	},
};
</script>

<style lang="scss">
#search-toolbar {
	&.v-toolbar {
		box-shadow: none;
	}
	.v-list__tile {
		padding-right: 0;
	}
}
</style>
