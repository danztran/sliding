<template>
	<v-hover>
		<v-card
			slot-scope="{ hover }"
			class="no-shadow bg-grey hover-pointer"
			@click="toggleCreatePollDialog">
			<v-list-tile class="grow py-3">
				<v-icon
					v-if="!hover"
					medium
					color="grey lighten-3"
					v-text="'$vuetify.icons.add_new'" />
				<v-icon
					v-else
					medium
					color="success"
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
		toggleCreatePollDialog() {
			this.$root.$on('dialog-create-poll');
		}
	}
};
</script>

<style lang="css">
</style>
