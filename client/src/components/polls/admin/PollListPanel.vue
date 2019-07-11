<template>
	<v-layout row wrap>
		<!-- @desc: title - actions create -->
		<v-layout
			class="pl-3 py-2"
			align-center
			justify-space-between
			row
			fill-height>
			<!-- *title: List poll -->
			<div v-t="'poll-list-view-title'" class="pt-1 body-1 grey--text" />
			<!-- *create poll -->
			<div class="d-flex">
				<v-btn
					small
					round
					color="success">
					<span v-t="'btn-create-poll'" class="first-letter-uppercase px-2" />
				</v-btn>
			</div>
		</v-layout>

		<v-card class="w-100 card-wrapper list-scroll scrollbar-primary list-scroll">
			<v-layout row wrap>
				<v-flex xs12>
					<poll-card--create />
				</v-flex>
			</v-layout>
		</v-card>
	</v-layout>
</template>

<script>
import PollCreateCard from './PollCreateCard.vue';
export default {
	name: 'PollListPanel',
	components: {
		'poll-card--create': PollCreateCard
	}
};
</script>

<style lang="css" scoped>
</style>
