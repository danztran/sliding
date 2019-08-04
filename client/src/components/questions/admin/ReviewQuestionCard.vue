<!-- @desc: question card in live/archive tabs -->
<template>
	<div>
		<question-card :question="question" :show-reaction="false">
			<template #action-buttons>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn class="mx-1" flat icon color="success" v-on="on"
							@click="approveQuestion">
							<v-icon
								color="success"
								:size="icon.lg"
								v-text="'$vuetify.icons.approve'" />
						</v-btn>
					</template>
					<span v-t="'btn-approve-question'" />
				</v-tooltip>

				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn class="mr-1" flat icon color="red" v-on="on"
							@click="dismissQuestion">
							<v-icon
								color="red"
								:size="icon.lg"
								v-text="'$vuetify.icons.dismiss'" />
						</v-btn>
					</template>
					<span v-t="'btn-dismiss-question'" />
				</v-tooltip>
			</template>

			<template v-if="isSMnXS" #menu-items>
				<!-- *options: archive -->
				<v-list-tile @click="approveQuestion">
					<v-list-tile-action>
						<v-icon v-text="'$vuetify.icons.approve'" />
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title v-t="'btn-approve-question'" />
					</v-list-tile-content>
				</v-list-tile>

				<v-list-tile @click="dismissQuestion">
					<v-list-tile-action>
						<v-icon v-text="'$vuetify.icons.dismiss'" />
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title v-t="'btn-dismiss-question'" />
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
	name: 'ReviewQuestionCard',
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
		approveQuestion() {
			this.emitEdit({ stage: 'public' });
		},
		dismissQuestion() {
			this.deleteQuestion();
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
		deleteQuestion() {
			const emiter = 'delete-question';
			this.$socket.emit(emiter, { id: this.question.id }, ({ errmsg, question }) => {
				if (errmsg) {
					// show notify
					return;
				}
				this.delQuestion(question);
			});
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
