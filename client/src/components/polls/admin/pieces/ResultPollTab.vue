<template>
	<v-tab-item
		:transition="false"
		:reverse-transition="false">
		<v-card-text class="scrollbar-primary text-xs-center poll-content">
			hello results
		</v-card-text>

		<v-divider />
		<v-card-actions class="px-3">
			<v-spacer />
			<v-btn
				flat
				medium
				@click="closeDialog">
				<span v-t="'btn-cancel'" class="first-letter-uppercase" />
			</v-btn>
		</v-card-actions>
	</v-tab-item>
</template>

<script>
export default {
	name: 'ResultPollTab',
	methods: {
		closeDialog() {
			this.$emit('close-dialog');
		},
	},
};
</script>

<style>
</style>
