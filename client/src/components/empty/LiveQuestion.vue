<template>
	<v-layout
		align-center
		justify-center
		column
		fill-height>
		<v-icon size="35" color="success" v-html="'$vuetify.icons.question_mark'"/>
		<div class="subheading text-xs-center">
			<span
				class="grey--text text--darken-2"
				v-t="'live-view-empty-title-join'">
			</span>
			<span class="font-weight-bold"> www.sliding.com</span>
		</div>
		<div class="subheading">
			<span
				class="grey--text text--darken-2"
				v-t="'live-view-empty-title-joincode'">
			</span>
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
			eventInfo: 'admin/event/infoCurrentEvent'
		})
	}
};
</script>

<style>
</style>
