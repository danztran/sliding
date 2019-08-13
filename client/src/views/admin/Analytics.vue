<template>
	<div>
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<div v-t="'ana-title'" class="subheading first-letter-uppercase mx-3 my-2" />

		<v-layout align-center justify-space-between wrap fill-height>
			<!-- *Active users -->
			<v-flex md4 xs12 :px-2="!isXS" :mb-4="isXS">
				<card--over-view
					icon="group_people"
					:info="cards.activeUsers" />
			</v-flex>

			<!-- *Questions -->
			<v-flex md4 xs12 :px-2="!isXS" :mb-4="isXS">
				<card--over-view
					question
					icon="questions"
					:info="cards.questions"
					:header-count="questions.length"
					:f-title-count="countQuestionReactions.likes"
					:f-sub-title-count="countQuestionReactions.dislikes" />
			</v-flex>

			<!-- *Polls -->
			<v-flex md4 xs12 :pl-1="!isXS">
				<card--over-view
					icon="polls"
					:info="cards.polls"
					:header-count="countAllVotes"
					:f-title-count="polls.length"
					:s-title-count="votePerPoll" />
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import OverViewCard from '@/components/analytics/OverViewCard.vue';
const initCard = () => ({
	activeUsers: {
		color: 'deep-orange',
		header: 'ana-users',
		fTitle: 'ana-users',
		sTitle: 'ana-users',
	},
	questions: {
		color: 'orange',
		header: 'ana-questions',
		fTitle: 'ana-questions-react',
		sTitle: 'ana-questions-anonymous',
	},
	polls: {
		color: 'green',
		header: 'ana-poll-votes',
		fTitle: 'ana-poll-created',
		sTitle: 'ana-vote-per-poll',
	},
});

export default {
	name: 'AdminAnalytics',
	components: {
		'card--over-view': OverViewCard,
	},
	data: () => ({
		cards: initCard(),
	}),
	computed: {
		...mapGetters({
			questions: 'admin/questions/getQuestions',
			polls: 'admin/polls/getPolls',
			pollOptions: 'admin/pollOptions/getAllPollOptions',
		}),
		formatPolls() {
			let rs = {};
			if (this.pollOptions.length !== 0
				&& this.pollOptions[0].choices) {
				rs = this.pollOptions.reduce((obj, opt) => {
					if (obj[opt.poll_id] === undefined) {
						obj[opt.poll_id] = opt.choices.length;
					}
					obj[opt.poll_id] += opt.choices.length;
					return obj;
				}, {});
			}
			return rs;
		},
		countAllVotes() {
			let count = 0;
			for (const key of Object.keys(this.formatPolls)) {
				count += this.formatPolls[key];
			}
			return count;
		},
		votePerPoll() {
			let max = 0;
			for (const key of Object.keys(this.formatPolls)) {
				if (this.formatPolls[key] > max) {
					max = this.formatPolls[key];
				}
			}
			return max;
		},
		countQuestionReactions() {
			let likes = 0;
			let dislikes = 0;
			if (this.questions.length !== 0) {
				const listReactions = [];
				for (const question of this.questions) {
					if (question.reactions) {
						listReactions.push(...question.reactions);
					}
				}
				for (const reaction of listReactions) {
					if (reaction.like) {
						likes += 1;
					}
					else {
						dislikes += 1;
					}
				}
			}
			return { likes, dislikes };
		},
	},
	created() {
		if (this.questions.length === 0) {
			this.$socket.emit('get-questions', ({ errmsg, questions }) => {
				if (errmsg) {
					this.showNotify(errmsg, 'danger');
					return;
				}
				this.setQuestions(questions);
			});
		}
		if (this.polls.length === 0) {
			this.$socket.emit('get-polls', ({ errmsg, polls }) => {
				if (!polls) {
					if (errmsg) {
						this.showNotify(errmsg, 'danger');
					}
					return;
				}
				this.setPolls(polls);
				this.emitGetAllPollOpts();
			});
		}
	},
	methods: {
		...mapMutations({
			setQuestions: 'admin/questions/SET_QUESTIONS',
			setPolls: 'admin/polls/SET_POLLS',
			setPollOptions: 'admin/pollOptions/SET_POLL_OPTIONS',
			setPollOptionChoices: 'admin/pollOptions/SET_POLL_OPTION_CHOICES',
		}),
		emitGetAllPollOpts() {
			const emiter = 'get-all-poll-options';
			this.$socket.emit(emiter, ({ errmsg, poll_options }) => {
				if (!poll_options) {
					if (errmsg) {
						// ...
					}
					return;
				}
				this.setPollOptions(poll_options);
				this.emitGetAllOptChoices();
			});
		},
		emitGetAllOptChoices() {
			const emiter = 'get-all-poll-option-choices';
			this.$socket.emit(emiter, ({ errmsg, choices }) => {
				if (!choices) {
					if (errmsg) {
						this.showNotify(errmsg, 'danger');
					}
					return;
				}
				// console.warn(choices);
				this.setPollOptionChoices(choices);
			});
		},
	},
};
</script>

<style>
</style>
