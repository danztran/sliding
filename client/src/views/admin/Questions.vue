<template>
	<div id="admin-question">
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-layout row wrap>
			<!--
				@desc: check question Panel Moderator view
				@hidden panel in XS-SM
			-->
			<v-flex v-if="!showSMnXS" class="pr-1" xs12 md6>
				<question-moderator-panel>
					<!-- <question-card moderator/> -->
				</question-moderator-panel>
			</v-flex>

			<!--
				@desc: tab question live/archive panel
				@show tab moderator in XS-SM
			-->
			<v-flex class="pl-1" xs12 md6>
				<question-main-panel>
					<template v-if="showSMnXS" slot="for-review-moderator-tab">
						<!-- <question-card moderator/> -->
						<p>for review</p>
					</template>

					<template slot="live-tab" v-for="question in questions">
						<question-card
							:key="question.id"
							:question="question"
							reply/>
					</template>

					<template slot="archive-tab">
						<!-- <question-card archive/> -->
					</template>
				</question-main-panel>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import QuestionModeratorPanel from '@/components/QuestionModeratorPanel.vue';
import QuestionMainPanel from '@/components/QuestionMainPanel.vue';
import QuestionCard from '@/components/QuestionCard.vue';

export default {
	name: 'AdminQuestions',
	components: {
		'question-moderator-panel': QuestionModeratorPanel,
		'question-main-panel': QuestionMainPanel,
		'question-card': QuestionCard
	},
	sockets: {
		event_questions(data) {
			console.warn(data);
			this.$store.dispatch('admin/questions/getQuestions', data);
		}
	},
	computed: {
		showSMnXS() {
			return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
		},
		...mapGetters({
			questions: 'admin/questions/questions'
		})
	},
	created() {
		this.$socket.emit('get-questions');
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
			box-shadow: 0 3px 10px rgba(0,0,0,.1);
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
