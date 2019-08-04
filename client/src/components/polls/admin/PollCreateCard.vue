<template>
	<v-hover>
		<v-card
			slot-scope="{ hover }"
			class="no-shadow bg-grey hover-pointer"
			@click="toggleDialogCreatePoll">
			<v-list-tile class="grow py-3 px-2">
				<v-icon
					medium
					:color="hover ? 'success' : 'grey lighten-3'"
					v-text="'$vuetify.icons.add_new'" />

				<span
					v-t="'btn-card-create-poll'"
					:class="{ 'success--text': hover, 'grey--text lighten-3': !hover }"
					class="pl-2 body-1" />
			</v-list-tile>
		</v-card>
	</v-hover>
</template>

<script>
export default {
	name: 'PollCreateCard',
	methods: {
		toggleDialogCreatePoll() {
			this.$root.$emit('dialog-handle-poll', { type: 'create' });
		},
		// toggleDialogCreatePoll() {
		// 	this.$root.$emit('dialog-create-poll');
		// },
	},
};
</script>

<style lang="css">
</style>
