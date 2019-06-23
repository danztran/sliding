<template>
	<div id="admin-question">
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<question-reply--dialog />
		<v-layout row wrap>
			<!--
				@desc: check question Panel Moderation view
				@hidden panel in XS-SM
			-->
			<v-flex v-if="!showSMnXS" class="pr-1" xs12 md6>
				<question-panel--review :empty-question="true">
					<question-card--review />
				</question-panel--review>
			</v-flex>

			<!--
				@desc: tab question live/archived panel
				@show tab moderation in XS-SM
			-->
			<v-flex
				:class="{'pl-1': !showSMnXS}"
				xs12
				md6>
				<question-panel--main
					:empty-live="Boolean(questions.length)"
					:empty-archive="true">
					<template
						v-if="showSMnXS"
						#for-review-moderation-tab>
						<!-- <question-card--review /> -->
					</template>

					<template
						v-for="question in questions"
						#live-tab>
						<question-card--live
							:key="question.id"
							:question="question"
							reply />
					</template>

					<template
						#archived-tab>
						<!-- <question-card archived/> -->
					</template>
				</question-panel--main>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import QuestionReviewPanel from '@/components/questions/QuestionReviewPanel.vue';
import QuestionMainPanel from '@/components/questions/QuestionMainPanel.vue';
import LiveQuestionCard from '@/components/questions/LiveQuestionCard.vue';
import ReviewQuestionCard from '@/components/questions/ReviewQuestionCard.vue';
import QuestionReplyDialog from '@/components/questions/QuestionReplyDialog.vue';

export default {
	name: 'AdminQuestions',
	components: {
		'question-panel--review': QuestionReviewPanel,
		'question-panel--main': QuestionMainPanel,
		'question-card--live': LiveQuestionCard,
		'question-card--review': ReviewQuestionCard,
		'question-reply--dialog': QuestionReplyDialog
	},
	computed: {
		...mapGetters({
			questions: 'admin/questions/getQuestions',
			event: 'admin/event/getEventInfo'
		}),
		showSMnXS() {
			return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
		},
		forReviewQuestions() {
			return this.questions.filter(q => q.stage === 'private');
		},
		liveQuestions() {
			return this.questions.filter(q => q.stage === 'public');
		},
		archivedQuestions() {
			return this.questions.filter(q => q.stage === 'archived');
		}
	},
	created() {
		this.$socket.emit('get-questions', ({ errmsg, questions }) => {
			if (errmsg) {
				// notify
				return;
			}
			// this.$store.dispatch('admin/questions/getQuestions', questions);
			this.setQuestions(questions);
		});
	},
	mounted() {
		this.$root.$on('toggle-mode-moderation', () => {
			this.onModeration = !this.onModeration;
		});
	},
	sockets: {
		new_added_question_reply(reply) {
			this.addQuestionReply(reply);
		},
		new_edited_question_reply(reply) {
			this.mergeQuestionReply(reply);
		},
		new_deleted_question_reply(reply) {
			this.deleteQuestionReply(reply);
			this.$root.$emit('update-replies');
		}
	},
	methods: {
		...mapMutations({
			setQuestions: 'admin/questions/SET_QUESTIONS',
			addQuestionReply: 'admin/questions/ADD_QUESTION_REPLY',
			mergeQuestionReply: 'admin/questions/MERGE_EDIT_REPLY',
			deleteQuestionReply: 'admin/questions/DELETE_QUESTION_REPLY'
		})
	}
};
</script>

<style lang="scss">
	$primary: #3da4b5;
	#admin-question {
		.list-scroll {
			max-height: 75vh;
			height: 75vh;
			overflow-y: auto;
			box-shadow: 0 3px 10px rgba(0,0,0,.1) !important;
		}
		.v-input--switch label {
			font-size: 14px !important;
		}
		.v-tabs__div {
			text-transform: capitalize;
			font-weight: 400;
		}
		.card-parent {
			margin: .1px 0 !important;
			border: .5px solid rgb(224, 224, 224);
			box-shadow: none;
			overflow-x: hidden;
		}
		.no-shadow.v-card:hover {
			background-color: #efefef;
			.v-list {
				background-color: #efefef;
			}
		}
		.v-list__tile__action {
			min-width: 35px !important
		}
	}
</style>
