<template>
	<!-- @desc: Polls -->
	<event-setting--expand :info="pollExpand">
		<template slot="switch-on-title">
			<!-- *enable poll features -->
			<v-switch
				v-model="pollData.allow_poll"
				class="right"
				color="primary" />
		</template>

		<template slot="content">
			<!-- *poll counter-->
			<div class="d-flex w-100">
				<v-flex xs8>
					<div
						v-t="'event-setting-poll-counter'"
						class="body-1" />
					<div
						v-t="'event-setting-poll-counter-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs4>
					<v-switch
						v-model="pollData.allow_poll_counter"
						class="right"
						color="primary" />
				</v-flex>
			</div>

			<!-- *show poll result -->
			<div class="d-flex w-100 mt-3">
				<v-flex xs8>
					<div
						v-t="'event-setting-poll-result'"
						class="body-1" />
					<div
						v-t="'event-setting-poll-result-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs4>
					<v-switch
						v-model="pollData.allow_poll_result"
						class="right"
						color="primary" />
				</v-flex>
			</div>
		</template>
	</event-setting--expand>
</template>

<script>
import EventSettingExpand from './EventSettingExpand.vue';

export default {
	name: 'EventSettingPoll',
	components: {
		'event-setting--expand': EventSettingExpand
	},
	props: {
		data: {
			type: Object,
			default() {}
		}
	},
	data: () => ({
		pollExpand: {
			icon: 'polls',
			title: 'polls',
			subtitle: 'event-setting-polls-des'
		},
		pollData: {
			allow_poll: false,
			allow_poll_counter: false,
			allow_poll_result: false
		}
	}),
	watch: {
		data(val) {
			// const { pollData, data } = this;
			// *poll map with default settings
			// pollData.allow_poll = data.allow_poll;
			// pollData.allow_poll_counter = data.allow_poll_counter;
			// pollData.allow_poll_result = data.allow_poll_result;
		}
	}
};
</script>
