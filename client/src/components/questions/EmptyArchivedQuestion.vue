<template>
	<v-layout
		align-center
		justify-center
		column
		fill-height>
		<v-icon
			size="35"
			color="grey lighten-1"
			v-text="'$vuetify.icons.archive_all'" />
		<div class="subheading text-xs-center mt-2">
			<span
				v-t="'empty-archive'"
				class="grey--text text--darken-2" />
		</div>
	</v-layout>
</template>

<script>
export default {
	name: 'EmptyArchiveQuestion'
};
</script>

<style>
</style>
