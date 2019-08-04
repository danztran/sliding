<!-- @desc: question card in live/archive tabs -->
<template>
	<div>
		<question-card :question="question" :show-reaction="false">
			<template #action-buttons>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn class="mx-1" flat icon color="success" v-on="on"
							@click="restoreQuestion">
							<v-icon
								color="success"
								:size="icon.lg"
								v-text="'$vuetify.icons.restore'" />
						</v-btn>
					</template>
					<span v-t="'btn-restore-question'" />
				</v-tooltip>
			</template>

			<template v-if="isSMnXS" #menu-items>
				<!-- *options: archive -->
				<v-list-tile @click="restoreQuestion">
					<v-list-tile-action>
						<v-icon v-text="'$vuetify.icons.restore'" />
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title v-t="'btn-restore-question'" />
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
	name: 'ArchivedQuestionCard',
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
	}),
	methods: {
		...mapMutations({
			mergeQuestion: 'admin/questions/MERGE_QUESTION',
			delQuestion: 'admin/questions/DELETE_QUESTION',
		}),
		restoreQuestion() {
			this.emitEdit({ stage: 'public' });
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
