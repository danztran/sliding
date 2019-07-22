<template>
	<v-dialog
		id="my-invites-request"
		v-model="dialog"
		width="650px"
		:transition="false"
		:fullscreen="isSMnXS">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-card>
			<loading-linear />
			<v-container class="pb-2">
				<v-card-title class="py-0">
					<div
						v-t="'dialog-user-access-invite'"
						class="headline font-weight-light first-letter-uppercase" />

					<v-spacer />
					<!-- *Button close -->
					<v-btn
						v-if="!isSMnXS"
						icon
						@click="dialog=false">
						<v-icon
							size="20"
							v-text="'$vuetify.icons.close'" />
					</v-btn>
				</v-card-title>
				<v-card-text class="wrapper-invites">
					<v-layout wrap>
						<v-flex xs12>
							<card--invite-info
								v-for="invite of invites"
								:key="invite.user_id"
								:info-invite="invite" />
						</v-flex>
					</v-layout>
				</v-card-text>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import InviteInfoCard from './pieces/InviteInfoCard.vue';

export default {
	name: 'DialogInviteRequest',
	components: {
		'card--invite-info': InviteInfoCard,
	},
	data: () => ({
		dialog: false,
	}),
	computed: {
		...mapGetters({
			invites: 'dashboard/getInvites',
		}),
	},
	mounted() {
		this.$root.$on('dialog-invite-request', () => {
			this.dialog = true;
		});
	},
};
</script>

<style lang="scss">
.wrapper-invites {
	min-height: 50vh;
}
</style>
