<template>
	<div>
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
		<v-card class="list-event">
			<bouncy-loader v-show="loading"/>
			<template v-for="(event, i) in events">
				<event-card  :key="i" :field="event"/>
			</template>
		</v-card>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import EventCard from '@/components/EventCard.vue';
import BouncyBallLoader from '@/components/BouncyBallLoader.vue';

export default {
	name: 'Events',
	components: {
		'event-card': EventCard,
		'bouncy-loader': BouncyBallLoader
	},
	data: () => ({
		queryOpt: {
			offset: 0,
			limit: 0,
			order: '-created_at'
		},
		loading: true
	}),
	computed: {
		...mapGetters({
			events: 'event/events'
		}),
		queryParams() {
			// ?limit=1&offset=1&order=-updated_at
			const { queryOpt } = this;
			const limit = `limit=${queryOpt.limit}`;
			const offset = `&offset=${queryOpt.offset}`;
			const order = `&order=${queryOpt.order}`;
			return limit + offset + order;
		}
	},
	watch: {
		events(val) {
			if (this._cm.notEmpty(val)) {
				this.loading = false;
			}
		}
	},
	created() {
		this.$store.dispatch('event/queryEvent', this.queryParams);
	},
	methods: {
		createEvent() {
			this.$root.$emit('create-new-event');
		}
	}
};
</script>

<style lang="css">
.list-event {
	height: 600px;
	max-height: 600px;
	overflow-y: scroll;
}
</style>
