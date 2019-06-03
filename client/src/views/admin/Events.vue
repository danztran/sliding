<template>
	<div>
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-layout row justify-space-between>
			<div>Active</div>
			<div class="text-xs-center">
				<v-btn
					round
					color="success"
					dark small
					@click="createEvent">
					{{ $t('create-event') }}
				</v-btn>
			</div>
		</v-layout>
	</div>
</template>

<script>
export default {
	name: 'Events',
	methods: {
		createEvent() {
			this.$root.$emit('create-new-event');
		}
	}
};
</script>

<style>
</style>
