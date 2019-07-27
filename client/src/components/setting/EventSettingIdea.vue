<template>
	<!-- @desc: Ideas -->
	<event-setting--expand :info="ideaExpand">
		<template #switch-on-title>
			<!-- *enable ideas surveys -->
			<v-switch
				v-model="ideaData.allow_idea"
				class="right"
				color="primary" />
		</template>

		<template #content>
			<!-- *dislike idea-->
			<div class="d-flex w-100">
				<v-flex xs9>
					<div
						v-t="'event-setting-dislikes'"
						class="body-1" />
					<div
						v-t="'event-setting-idea-dislike-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs3>
					<v-switch
						v-model="ideaData.allow_idea_dislikes"
						class="right"
						color="primary" />
				</v-flex>
			</div>

			<!-- *allow replies idea -->
			<div class="d-flex w-100 mt-3">
				<v-flex xs9>
					<div
						v-t="'event-setting-replies'"
						class="body-1" />
					<div
						v-t="'event-setting-idea-replies-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs3>
					<v-switch
						v-model="ideaData.allow_idea_reply"
						class="right"
						color="primary" />
				</v-flex>
			</div>

			<!-- *anonymous send ideas -->
			<div class="d-flex w-100 mt-3">
				<v-flex xs9>
					<div
						v-t="'event-setting-idea-guest'"
						class="body-1" />
					<div
						v-t="'event-setting-idea-guest-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs3>
					<v-switch
						v-model="ideaData.allow_anonymous_idea"
						class="right"
						color="primary" />
				</v-flex>
			</div>
		</template>
	</event-setting--expand>
</template>

<script>
import { mapGetters } from 'vuex';
import EventSettingExpand from './EventSettingExpand.vue';

export default {
	name: 'EventSettingIdea',
	components: {
		'event-setting--expand': EventSettingExpand,
	},
	data: () => ({
		ideaExpand: {
			icon: 'ideas',
			title: 'ideas',
			subtitle: 'event-setting-ideas-des',
		},
		ideaData: {
			allow_idea: false,
			allow_idea_dislikes: false,
			allow_idea_reply: false,
			allow_anonymous_idea: true,
		},
	}),
	computed: {
		...mapGetters({
			eventInfo: 'admin/event/getEventInfo',
		}),
	},
	watch: {
		eventInfo(val) {
			// const { ideaData } = this;
			// *idea map with default settings
			// ideaData.allow_idea = val.allow_idea;
			// ideaData.allow_idea_dislikes = val.allow_idea_dislikes;
			// ideaData.allow_idea_reply = val.allow_idea_reply;
			// ideaData.allow_anonymous_idea = val.allow_anonymous_idea;
		},
	},
};
</script>
