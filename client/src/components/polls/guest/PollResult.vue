<template>
	<div class="custom-progress">
		<div
			v-for="option of pollOptions"
			:key="option.id">
			<div v-text="option.content" />
			<div class="d-flex">
				<v-progress-linear
					class="mt-1"
					background-opacity="0"
					:color="idChoices.indexOf(option.id) > -1 ? 'primary' : 'grey lighten-4'"
					:buffer-value="calPecent(option.id)"
					:value="calPecent(option.id)"
					height="11" />
				<span class="ml-1">{{ calPecent(option.id) }}%</span>
			</div>
		</div>

		<!-- *repoll -->
		<v-layout
			align-center
			justify-center>
			<v-btn
				small
				round
				outline
				class="grey grey--text text--darken-2 px-3"
				@click="repoll">
				<span v-t="'btn-repoll'" />
			</v-btn>
		</v-layout>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'PollResult',
	props: {
		pollOptions: {
			type: Array,
			default: () => ({}),
		},
		pollOptChoices: {
			type: Array,
			default: () => ({}),
		},
		countUsersChoice: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		...mapGetters({
			user: 'auth/user',
		}),
		idChoices() {
			const userID = Number(this.user.id);
			return this.pollOptChoices.reduce((rs, cur) => {
				if (cur.users.indexOf(userID) > -1) {
					rs.push(cur.option_id);
				}
				return rs;
			}, []);
		},
		sumPoll() {
			return this.pollOptChoices.reduce((sum, cur) => {
				// eslint-disable-next-line
				sum += cur.users ? cur.users.length : 0;
				return sum;
			}, 0);
		},
	},
	methods: {
		repoll() {
			this.$emit('re-poll', this.idChoices);
		},
		calPecent(optID) {
			const rs = this.pollOptChoices.find(el => el.option_id === optID);
			return (rs ? rs.users.length : 0) * 100 / this.sumPoll;
		},
	},
};
</script>

<style lang="scss">
.custom-progress {
	.v-progress-linear__bar__determinate {
		border-radius: 10px;
		background-size: 40px 40px;
		background-repeat: repeat-x;
		background-image: linear-gradient(135deg,
			rgba(255, 255, 255, 0.25) 25%, transparent 0,
			transparent 50%, rgba(255, 255, 255, 0.25) 0,
			rgba(255, 255, 255, 0.25) 75%, transparent 0,
			transparent);
	}
}
</style>
