<template>
	<!-- *Invite-access-request -->
	<v-list-tile @click="toggleDialogAccessInviteRequest">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-list-tile-action>
			<v-icon
				:class="{ 'pl-2': inAvatar }"
				size="20"
				v-text="inviteNotResponsed > 0
					? '$vuetify.icons.notice'
					: '$vuetify.icons.no_notice'" />
		</v-list-tile-action>

		<v-list-tile-content>
			<v-list-tile-title v-t="'invite-request'" />
		</v-list-tile-content>

		<v-list-tile-action>
			<v-chip v-show="inviteNotResponsed > 0 && loadingState === ''" small color="red">
				<span class="white--text" v-text="inviteNotResponsed" />
			</v-chip>
			<loading--icon-circle v-if="loadingState !== ''" :state.sync="loadingState" />
		</v-list-tile-action>
	</v-list-tile>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import LoadingIconCircle from '@/components/pieces/LoadingIconCircle.vue';

export default {
	name: 'InviteListItem',
	components: {
		'loading--icon-circle': LoadingIconCircle,
	},
	props: {
		inAvatar: {
			type: Boolean,
			default: false,
		},
		user: {
			type: Object,
			default: () => ({}),
		},
	},
	data: () => ({
		loadingState: '',
	}),
	computed: {
		...mapGetters({
			invites: 'dashboard/getInvites',
		}),
		inviteNotResponsed() {
			return this.invites.filter(el => el.is_accepted === null).length;
		},
	},
	created() {
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
		toggleDialogAccessInviteRequest() {
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
