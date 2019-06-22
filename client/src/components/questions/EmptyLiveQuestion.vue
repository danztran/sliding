<template>
	<v-layout
		align-center
		justify-center
		column
		fill-height>
		<v-icon size="35" color="success" v-text="'$vuetify.icons.question_mark'" />
		<div class="subheading text-xs-center">
			<span
				v-t="'live-view-empty-title-join'"
				class="grey--text text--darken-2" />
			<span class="font-weight-bold"> www.sliding.com</span>
		</div>
		<div class="subheading px-2">
			<span
				v-t="'live-view-empty-title-joincode'"
				class="grey--text text--darken-2" />
			<span class="font-weight-bold text-uppercase">
				{{ eventInfo ? `#${eventInfo.code}` : '#...' }}
			</span>
		</div>
	</v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'EmptyLiveQuestion',
	computed: {
		...mapGetters({
			eventInfo: 'admin/event/infoEvent'
		})
	}
};
</script>

<style>
</style>
