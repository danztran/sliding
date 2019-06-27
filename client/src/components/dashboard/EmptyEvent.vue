<template>
	<v-layout
		row
		wrap
		align-center>
		<v-flex xs12 md7 order-md2>
			<v-img
				aspect-ratio="1.7"
				contain
				:src="require('@/assets/welcome.svg')" />
		</v-flex>
		<v-flex
			class="text-md-left text-xs-center"
			xs12
			md5
			order-md1>
			<div
				v-t="'welcome'"
				:class="{'headline mt-3': isSMnXS}"
				class="display-1 font-weight-light" />
			<div
				v-t="'event-welcome'"
				:class="{'mt-2 subheading': isSMnXS, 'mt-4': !isSMnXS}"
				class="title font-weight-light" />
			<v-btn
				v-t="'btn-create-event'"
				class="px-4 ma-0 mt-3"
				color="success lighten--2"
				round
				dark
				medium
				@click.stop="toggleCreateEventDialog" />
		</v-flex>
	</v-layout>
</template>

<script>
export default {
	name: 'EmptyEvent',
	methods: {
		toggleCreateEventDialog() {
			this.$root.$emit('dialog-create-new-event');
		}
	}
};
</script>

<style lang="css" scoped>
</style>
