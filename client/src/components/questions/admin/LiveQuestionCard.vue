<!-- @desc: question card in live/archive tabs -->
<template>
	<div>
		<question-card :question="question">
			<template #action-buttons>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn flat icon :color="_cm.resultColor(!isAnswered)" v-on="on"
							@click="toggleAnswered">
							<v-icon
								:color="_cm.resultColor(!isAnswered)"
								:size="icon.lg"
								v-text="'$vuetify.icons.mark_answered'" />
						</v-btn>
					</template>
					<span v-t="answerText" />
				</v-tooltip>

				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn class="mx-1" flat icon :color="_cm.resultColor(!isPinned)" v-on="on"
							@click="togglePinned">
							<v-icon
								class="btn-pin"
								:color="_cm.resultColor(!isPinned)"
								:size="icon.lg"
								v-text="'$vuetify.icons.highlight_question'" />
						</v-btn>
					</template>
					<span v-t="'btn-pin-question'" />
				</v-tooltip>

				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn class="mr-1" flat icon color="primary lighten-1" v-on="on"
							@click="archiveQuestion">
							<v-icon
								color="primary lighten-1"
								:size="icon.lg"
								v-text="'$vuetify.icons.archive'" />
						</v-btn>
					</template>
					<span v-t="'btn-archive'" />
				</v-tooltip>
			</template>

			<template v-if="isSMnXS" #menu-items>
				<!-- *options: archive -->
				<v-list-tile @click="archiveQuestion">
					<v-list-tile-action>
						<v-icon v-text="'$vuetify.icons.archive_all'" />
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title v-t="'btn-archive'" />
					</v-list-tile-content>
				</v-list-tile>

				<v-list-tile @click="toggleAnswered">
					<v-list-tile-action>
						<v-icon v-text="'$vuetify.icons.mark_answered'" />
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title v-t="answerText" />
					</v-list-tile-content>
				</v-list-tile>

				<v-list-tile @click="togglePinned">
					<v-list-tile-action>
						<v-icon v-text="'$vuetify.icons.highlight_question'" />
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title v-t="'btn-pin-question'" />
					</v-list-tile-content>
				</v-list-tile>
			</template>
		</question-card>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
import QuestionCard from './QuestionCard.vue';

export default {
	name: 'LiveQuestionCard',
	components: {
		'question-card': QuestionCard,
	},
	props: {
		question: {
			type: Object,
			default: () => ({}),
		},
	},
	data: () => ({
		icon: {
			xs: 14,
			sm: 17,
			lg: 25,
		},
		tempQuestion: null,
	}),
	computed: {
		isAnswered() {
			return this.question.is_answered;
		},
		isPinned() {
			return this.question.is_pinned;
		},
		answerText() {
			return this.isAnswered ? 'btn-unmark-answer' : 'btn-mark-answer';
		},
	},
	methods: {
		...mapMutations({
			mergeQuestion: 'admin/questions/MERGE_QUESTION',
		}),
		togglePinned() {
			this.tempQuestion = { ...this.question };
			this.question.is_pinned = !this.question.is_pinned;
			this.emitEdit({ is_pinned: this.question.is_pinned });
		},
		archiveQuestion() {
			this.emitEdit({ stage: 'archived' });
		},
		toggleAnswered() {
			this.tempQuestion = { ...this.question };
			this.question.is_answered = !this.question.is_answered;
			this.emitEdit({ is_answered: this.question.is_answered });
		},
		emitEdit(info) {
			const formData = {
				...info,
				id: this.question.id,
			};
			const emiter = 'edit-question';
			this.$socket.emit(emiter, formData, ({ errmsg, question }) => {
				if (errmsg) {
					// do something
					if (this.tempQuestion) {
						this.question = { ...this.question, ...this.tempQuestion };
					}
					return;
				}
				this.mergeQuestion(question);
			});
		},
	},
};
</script>

<style lang="scss" scoped>

</style>
