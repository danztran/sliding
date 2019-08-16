<template>
	<v-dialog
		v-model="dialog"
		width="600px"
		no-click-animation
		:fullscreen="isSMnXS">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-card>
			<v-card-title class="py-2 px-3 headline font-weight-light" primary-title>
				<div
					v-t="'poll-results'"
					class="first-letter-uppercase" />

				<!-- *close dialog -->
				<v-spacer />
				<v-btn
					icon
					@click="dialog=false">
					<v-icon
						size="20"
						v-text="'$vuetify.icons.close'" />
				</v-btn>
			</v-card-title>
			<div class="content-result scrollbar-primary">
				<card--poll-result />
			</div>
		</v-card>
	</v-dialog>
</template>

<script>
import PollResultCard from './PollResultCard.vue';

export default {
	name: 'DialogPollResult',
	components: {
		'card--poll-result': PollResultCard,
	},
	data: () => ({
		dialog: false,
	}),
	mounted() {
		this.$root.$on('dialog-poll-result', () => {
			this.dialog = true;
		});
	},
};
</script>

<style lang="css" scoped>
.content-result {
	height: calc(100vh - 65px);
	overflow: hidden;
	overflow-y: scroll;
}
</style>
