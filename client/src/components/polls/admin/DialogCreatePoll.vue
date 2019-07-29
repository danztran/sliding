<template>
	<v-dialog
		id="my-create-poll"
		v-model="dialog"
		width="650px"
		:transition="false"
		:fullscreen="isXS">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-card>
			<loading-linear />
			<v-container class="px-0">
				<v-card-title class="py-0">
					<div
						v-t="'dialog-create-poll'"
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
				<v-card-text class="scrollbar-primary text-xs-center">
					<span v-t="'dialog-create-poll-title'" class="body-1" />
					<v-container fluid grid-list-xl>
						<v-layout row wrap justify-center>
							<v-flex sm5 xs9>
								<v-card class="hover-pointer elevation-2 py-4">
									<v-icon
										x-large
										color="primary"
										v-text="'$vuetify.icons.multiple_choice'" />
								</v-card>
								<div v-t="'btn-poll-multiple-choice'" class="pt-2" />
							</v-flex>
							<v-flex sm5 xs9>
								<v-card class="hover-pointer elevation-2 py-4">
									<v-icon
										x-large
										color="success"
										v-text="'$vuetify.icons.ask_question'" />
								</v-card>
								<div v-t="'btn-poll-open-text'" class="pt-2" />
							</v-flex>
							<v-flex sm5 xs9>
								<v-card class="hover-pointer elevation-2 py-4">
									<v-icon
										x-large
										color="secondary"
										v-text="'$vuetify.icons.word_cloud'" />
								</v-card>
								<div v-t="'btn-poll-word-cloud'" class="pt-2" />
							</v-flex>
							<v-flex sm5 xs9>
								<v-card class="hover-pointer elevation-2 py-4">
									<v-icon
										x-large
										color="yellow"
										v-text="'$vuetify.icons.star_border'" />
								</v-card>
								<div v-t="'btn-poll-rating'" class="pt-2" />
							</v-flex>
						</v-layout>
					</v-container>
				</v-card-text>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	name: 'DialogCreatePoll',
	data: () => ({
		dialog: false,
		type: null,
	}),
	mounted() {
		this.$root.$on('dialog-create-poll', (otp) => {
			this.dialog = true;
		});
	},
	methods: {
		...mapMutations({
			addPoll: 'admin/polls/ADD_POLL',
		}),
		createPoll() {
			const emiter = 'add-poll';
			const opt = {
				// ...
			};
			this.$socket.emit(emiter, opt, ({ errmsg, poll }) => {
				if (!poll) {
					if (errmsg) {
						// ...
					}
					return;
				}
				this.addPoll(poll);
			});
		},
	},
};
</script>

<style lang="scss">
#my-create-poll {

}
</style>
