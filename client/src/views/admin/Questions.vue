<template>
	<div id="admin-question">
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-layout row wrap>
			<!-- MODERATOR CHECK QUESTIONS VIEW -->
			<v-flex class="pr-1" xs12 sm6>
				<question-moderator-panel>
					<question-main-card moderator/>
				</question-moderator-panel>
			</v-flex>

			<!-- MAIN QUESTION VIEW -->
			<v-flex class="pl-1" xs12 sm6>
				<question-main-panel>
					<template slot="live-tab">
						<question-main-card reply/>
					</template>

					<template slot="archive-tab">
						<question-main-card archive/>
					</template>
				</question-main-panel>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import QuestionModeratorPanel from '@/components/QuestionModeratorPanel.vue';
import QuestionMainPanel from '@/components/QuestionMainPanel.vue';
// import QuestionModeratorCard from '@/components/QuestionModeratorCard.vue';
import QuestionMainCard from '@/components/QuestionMainCard.vue';

export default {
	name: 'AdminQuestions',
	components: {
		'question-moderator-panel': QuestionModeratorPanel,
		'question-main-panel': QuestionMainPanel,
		// 'question-moderator-card': QuestionModeratorCard,
		'question-main-card': QuestionMainCard
	},
	sockets: {
		event_questions(data) {
			console.warn(data);
		}
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
