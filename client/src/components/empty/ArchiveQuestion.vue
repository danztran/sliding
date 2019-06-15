<template>
	<v-layout
		align-center
		justify-center
		column
		fill-height>
		<v-icon
			size="35"
			color="grey lighten-1"
			v-html="'$vuetify.icons.archive_all'"/>
		<div class="subheading text-xs-center mt-2">
			<span
				class="grey--text text--darken-2"
				v-t="'empty-archive'">
			</span>
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
