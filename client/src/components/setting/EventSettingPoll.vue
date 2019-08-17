<template>
	<!-- @desc: Polls -->
	<event-setting--expand :info="pollExpand">
		<template #content>
			<!-- *Poll allow-->
			<div class="d-flex w-100">
				<v-flex xs9>
					<div
						v-t="'polls'"
						class="body-1" />
					<div
						v-t="'event-setting-polls-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs3>
					<v-switch
						v-model="pollSettings.on_poll"
						class="right"
						color="primary" />
				</v-flex>
			</div>

			<!-- *poll counter-->
			<!-- <div class="d-flex w-100 mt-3">
				<v-flex xs9>
					<div
						v-t="'event-setting-poll-counter'"
						class="body-1" />
					<div
						v-t="'event-setting-poll-counter-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs3>
					<v-switch
						v-model="pollSettings.on_poll_counter"
						class="right"
						color="primary" />
				</v-flex>
			</div> -->

			<!-- *show poll result -->
			<!-- <div class="d-flex w-100 mt-3">
				<v-flex xs9>
					<div
						v-t="'event-setting-poll-result'"
						class="body-1" />
					<div
						v-t="'event-setting-poll-result-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs3>
					<v-switch
						v-model="pollSettings.on_poll_result"
						class="right"
						color="primary" />
				</v-flex>
			</div> -->
		</template>
	</event-setting--expand>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import EventSettingExpand from './EventSettingExpand.vue';

export default {
	name: 'EventSettingPoll',
	components: {
		'event-setting--expand': EventSettingExpand,
	},
	props: {
		data: {
			type: Object,
			default() {},
		},
	},
	data: () => ({
		pollExpand: {
			icon: 'polls',
			title: 'polls',
			subtitle: 'event-setting-polls-des',
		},
		pollSettings: {
			on_poll: false,
			// on_poll_counter: false,
			// on_poll_result: false,
		},
	}),
	computed: {
		...mapGetters({
			tempSettings: 'admin/event/getTempSettings',
		}),
	},
	watch: {
		tempSettings(val) {
			const { pollSettings, tempSettings } = this;
			for (const s of Object.keys(pollSettings)) {
				if (tempSettings[s] !== undefined) {
					pollSettings[s] = tempSettings[s];
				}
			}
		},
		pollSettings: {
			deep: true,
			handler(val) {
				this.mergeTempSettings(val);
			},
		},
	},
	methods: {
		...mapMutations({
			mergeTempSettings: 'admin/event/MERGE_TEMP_SETTINGS',
		}),
	},
};
</script>
