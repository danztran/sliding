<template>
	<div id="my-events-page">
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-layout class="mx-3" row justify-space-between align-center>
			<!--
				@desc: event being activated
			-->
			<div v-t="'event-status'"></div>

			<!--
				@desc: button create event
			-->
			<v-btn
				round
				color="success"
				dark small
				@click.stop="createEvent">
				{{ $t('btn-create-event') }}
			</v-btn>
		</v-layout>

		<!--
			@desc: list events
		-->
		<v-card class="list-event scrollbar-primary">
			<template v-for="event of events">
				<div @click="toEventLive(event.code)" :key="event.code">
					<event-card :field="event"/>
				</div>
			</template>
		</v-card>

		<!--
			@desc: message empty event
		-->
		<div v-if="loading || isEmpty" style="height: 70vh; width: 100%;">
			<bouncy-loader v-show="loading" />
			<div class="empty-state" v-show="isEmpty">
				<span class="empty-state-title headline" v-t="'no-event-found'">
				</span>
			</div>
		</div>
	</div>
</template>

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
			order: '-created_at',
			role: 'host'
		},
		isEmpty: false,
		loading: false
	}),
	computed: {
		...mapGetters({
			events: 'dashboard/events'
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
			this.$store.dispatch('dashboard/queryEvent', this.queryOpt);
		}
	},
	methods: {
		createEvent() {
			this.$root.$emit('dialog-create-new-event');
		},
		toEventLive(code) {
			this.$router.push({ name: 'admin-event', params: { code } });
		}
	}
};
</script>

<style lang="scss">
#my-events-page {
	.list-event {
		max-height: 75vh;
		overflow-y: auto;
		box-shadow: 0 3px 10px rgba(0,0,0,.1);
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
