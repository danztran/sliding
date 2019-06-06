<template>
	<div id="my-events-page">
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-layout row justify-space-between align-center>
			<div v-t="'event-status'"></div>
			<v-btn
				round
				color="success"
				dark small
				@click.stop="createEvent">
				{{ $t('create-event') }}
			</v-btn>
		</v-layout>
		<v-card class="list-event scrollbar-primary">
			<bouncy-loader v-show="loading"/>
			<template v-for="event of events">
				<event-card  :key="event.code" :field="event"/>
			</template>
			<div class="empty-state" v-if="isEmpty">
				<h2 class="empty-state-title">No event found. Create one !</h2>
			</div>
		</v-card>
	</div>
</template>
<style lang="scss">
#my-events-page {
	.list-event {
		height: 75vh;
		overflow-y: auto;
		box-shadow: 0 3px 10px rgba(0,0,0,.1);;
	}
	.empty-state {
		text-align: center;
		height: 100%;
		.empty-state-title {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
</style>
<script>
import { mapGetters } from 'vuex';
import EventCard from '@/components/EventCard.vue';
export default {
	name: 'Events',
	components: {
		'event-card': EventCard
	},
	data: () => ({
		queryOpt: {
			offset: 0,
			limit: 0,
			order: '-created_at'
		},
		isEmpty: false,
		loading: false
	}),
	computed: {
		...mapGetters({
			events: 'event/events'
		})
	},
	watch: {
		events(val) {
			this.loading = false;
			this.isEmpty = val.length === 0;
		}
	},
	mounted() {
		if (this.events.length === 0) {
			this.loading = true;
			this.$store.dispatch('event/queryEvent', this.queryOpt);
		}
	},
	methods: {
		createEvent() {
			this.$root.$emit('create-new-event');
		}
	}
};
</script>
