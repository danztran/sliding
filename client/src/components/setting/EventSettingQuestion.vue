<template>
	<!-- @desc: Questions -->
	<event-setting--expand :info="questionExpand">
		<template slot="switch-on-title">
			<v-switch
				v-model="questionData.allow_question"
				class="right"
				color="primary" />
		</template>

		<template slot="content">
			<!-- *moderation review quesiton-->
			<div class="d-flex w-100">
				<v-flex xs8>
					<div
						v-t="'moderation-view-stt'"
						class="body-1" />
					<div
						v-t="'event-moderation-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs4>
					<v-switch
						v-model="questionData.on_moderation"
						class="right"
						color="primary" />
				</v-flex>
			</div>

			<!-- *dislikes question -->
			<div class="d-flex w-100 mt-3">
				<v-flex xs8>
					<div
						v-t="'event-setting-dislikes'"
						class="body-1" />
					<div
						v-t="'event-dislikes-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs4>
					<v-switch
						v-model="questionData.dislikes"
						class="right"
						color="primary" />
				</v-flex>
			</div>

			<!-- *replies question -->
			<div class="d-flex w-100 mt-3">
				<v-flex xs8>
					<div
						v-t="'event-setting-replies'"
						class="body-1" />
					<div
						v-t="'event-replies-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs4>
					<v-switch
						v-model="questionData.allow_question_reply"
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
	name: 'EventSettingQuestion',
	components: {
		'event-setting--expand': EventSettingExpand
	},
	data: () => ({
		questionExpand: {
			icon: 'questions',
			title: 'questions',
			subtitle: 'event-setting-questions-des'
		},
		questionData: {
			allow_question: false,
			on_moderation: false,
			allow_question_reply: true,
			allow_question_dislike: false
		}
	}),
	computed: {
		...mapGetters({
			eventInfo: 'admin/event/getEventInfo'
		})
	},
	watch: {
		eventInfo(val) {
			const { questionData } = this;

			// *privacy settings
			questionData.allow_question = val.allow_question;
			questionData.on_moderation = val.on_moderation;
			questionData.allow_question_reply = val.allow_question_reply;
			questionData.allow_question_dislike = val.allow_question_dislike;
		}
	}
};
</script>
