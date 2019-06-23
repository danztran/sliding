<template>
	<!-- @desc: Ideas -->
	<event-setting--expand :info="ideaExpand">
		<template slot="switch-on-title">
			<!-- *enable ideas surveys -->
			<v-switch
				v-model="ideaData.allow_idea"
				class="right"
				color="primary" />
		</template>

		<template slot="content">
			<!-- *dislike idea-->
			<div class="d-flex w-100">
				<v-flex xs8>
					<div
						v-t="'event-setting-dislikes'"
						class="body-1" />
					<div
						v-t="'event-setting-idea-dislike-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs4>
					<v-switch
						v-model="ideaData.allow_idea_dislikes"
						class="right"
						color="primary" />
				</v-flex>
			</div>

			<!-- *allow replies idea -->
			<div class="d-flex w-100 mt-3">
				<v-flex xs8>
					<div
						v-t="'event-setting-replies'"
						class="body-1" />
					<div
						v-t="'event-setting-idea-replies-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs4>
					<v-switch
						v-model="ideaData.allow_idea_reply"
						class="right"
						color="primary" />
				</v-flex>
			</div>

			<!-- *anonymous send ideas -->
			<div class="d-flex w-100 mt-3">
				<v-flex xs8>
					<div
						v-t="'event-setting-idea-guest'"
						class="body-1" />
					<div
						v-t="'event-setting-idea-guest-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs4>
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
import EventSettingExpand from './EventSettingExpand.vue';

export default {
	name: 'EventSettingIdea',
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
		ideaExpand: {
			icon: 'ideas',
			title: 'ideas',
			subtitle: 'event-setting-ideas-des'
		},
		ideaData: {
			allow_idea: false,
			allow_idea_dislikes: false,
			allow_idea_reply: false,
			allow_anonymous_idea: true
		}
	}),
	watch: {
		data(val) {
			// const { ideaData, data } = this;
			// *idea map with default settings
			// ideaData.allow_idea = data.allow_idea;
			// ideaData.allow_idea_dislikes = data.allow_idea_dislikes;
			// ideaData.allow_idea_reply = data.allow_idea_reply;
			// ideaData.allow_anonymous_idea = data.allow_anonymous_idea;
		}
	}
};
</script>
