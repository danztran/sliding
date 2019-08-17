<template>
	<event-setting--expand :info="questionExpand">
		<template #content>
			<!-- *Allow ask question -->
			<div class="d-flex w-100">
				<v-flex xs9>
					<div
						v-t="'event-setting-ask-question'"
						class="body-1" />
					<div
						v-t="'event-setting-questions-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs3>
					<v-switch
						v-model="questionSettings.allow_question"
						class="right"
						color="primary" />
				</v-flex>
			</div>

			<!-- *moderation review quesiton-->
			<div class="d-flex w-100 mt-3">
				<v-flex xs9>
					<div
						v-t="'moderation-view-stt'"
						class="body-1" />
					<div
						v-t="'event-moderation-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs3>
					<v-switch
						v-model="questionSettings.on_moderation"
						class="right"
						color="primary" />
				</v-flex>
			</div>

			<!-- *dislikes question -->
			<div class="d-flex w-100 mt-3">
				<v-flex xs9>
					<div
						v-t="'event-setting-dislikes'"
						class="body-1" />
					<div
						v-t="'event-dislikes-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs3>
					<v-switch
						v-model="questionSettings.allow_question_dislike"
						class="right"
						color="primary" />
				</v-flex>
			</div>

			<!-- *replies question -->
			<div class="d-flex w-100 mt-3">
				<v-flex xs9>
					<div
						v-t="'event-setting-replies'"
						class="body-1" />
					<div
						v-t="'event-replies-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs3>
					<v-switch
						v-model="questionSettings.allow_question_reply"
						class="right"
						color="primary" />
				</v-flex>
			</div>
		</template>
	</event-setting--expand>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import EventSettingExpand from './EventSettingExpand.vue';

export default {
	name: 'EventSettingQuestion',
	components: {
		'event-setting--expand': EventSettingExpand,
	},
	data: () => ({
		questionExpand: {
			icon: 'questions',
			title: 'questions',
			subtitle: 'event-setting-questions-des',
		},
		questionSettings: {
			on_question: false,
			on_moderation: false,
			allow_question: false,
			allow_question_reply: true,
			allow_question_dislike: false,
		},
	}),
	computed: {
		...mapGetters({
			tempSettings: 'admin/event/getTempSettings',
		}),
	},
	watch: {
		tempSettings(val) {
			const { questionSettings, tempSettings } = this;
			for (const s of Object.keys(questionSettings)) {
				questionSettings[s] = tempSettings[s];
			}
		},
		questionSettings: {
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
