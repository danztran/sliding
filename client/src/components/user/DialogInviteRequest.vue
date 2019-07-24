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
			<v-container class="px-0">
				<v-card-title class="py-0">
					<div
						v-t="'dialog-user-access-invite'"
						class="headline font-weight-light first-letter-uppercase" />

					<v-spacer />
					<!-- *Button close -->
					<v-btn
						icon
						@click="dialog=false">
						<v-icon
							size="20"
							v-text="'$vuetify.icons.close'" />
					</v-btn>
				</v-card-title>
				<v-card-text class="scrollbar-primary wrapper-invites">
					<v-layout wrap>
						<v-flex xs12>
							<card--invite-info
								v-for="invite of invites"
								:key="invite.event.id"
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
	height: 50vh;
	overflow-y: scroll;
	overflow: auto;
	scroll-behavior: smooth;

	.v-card:nth-child(n+2) {
    padding-top: 8px;
	}
}
@media only screen and (max-width: 960px) {
	.wrapper-invites {
		height: calc(100vh - 80px);
	}
}
</style>
