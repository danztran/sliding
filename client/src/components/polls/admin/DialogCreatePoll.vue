<template>
	<v-dialog
		id="my-create-poll"
		v-model="dialog"
		width="500px"
		:transition="false"
		:fullscreen="isXS">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-card>
			<loading-linear />
			<v-container class="px-0 pb-1">
				<v-card-title class="py-0">
					<div
						v-t="'dialog-create-poll'"
						class="headline font-weight-light first-letter-uppercase" />

					<v-spacer />
					<!-- *Button close -->
					<v-btn
						icon
						@click="dialog=false">
						<v-icon
							size="20"
							v-text="'$vuetify.icons.close'" />
					</v-btn>
				</v-card-title>
				<v-card-text class="scrollbar-primary text-xs-center poll-content">
					<v-layout row wrap align-start>
						<v-flex xs12>
							<text-field :field="form.ask" />
						</v-flex>
						<v-flex xs8>
							<text-area :field="form.option" />
						</v-flex>
						<v-checkbox
							v-model="markCorrect"
							color="primary"
							class="mt-0"
							:label="$t('poll-mark-correct')" />
						<v-checkbox
							v-model="selectMultiple"
							color="primary"
							class="mt-0"
							:label="$t('poll-select-multiple')" />
						<v-checkbox
							v-if="selectMultiple"
							v-model="limitMultiple"
							color="primary"
							class="mt-0"
							:label="$t('poll-limit-select')" />
						<v-flex xs5>
							<text-field
								v-if="limitMultiple"
								color="primary"
								:field="form.limit" />
						</v-flex>
					</v-layout>
				</v-card-text>

				<!-- *Cancel/Create -->
				<v-card-actions class="px-3">
					<v-spacer />
					<v-btn
						flat
						medium
						@click="dialog=false">
						<span v-t="'btn-cancel'" class="first-letter-uppercase" />
					</v-btn>
					<v-btn
						flat
						medium
						color="success"
						@click="createPoll">
						<span v-t="'btn-create'" class="first-letter-uppercase" />
					</v-btn>
				</v-card-actions>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapMutations } from 'vuex';
const initForm = () => ({
	ask: {
		value: '',
		label: 'lb-poll-ask',
		type: 'text',
		autofocus: true,
		errmsg: '',
	},
	option: {
		value: '',
		label: 'lb-add-option',
		type: 'text',
		rows: 2,
		outline: true,
		autogrow: true,
		errmsg: '',
	},
	limit: {
		value: 2,
		type: 'number',
		outline: true,
		errmsg: '',
	},
});

export default {
	name: 'DialogCreatePoll',
	data: () => ({
		dialog: false,
		form: initForm(),
		markCorrect: false,
		selectMultiple: false,
		limitMultiple: false,
	}),
	mounted() {
		this.$root.$on('dialog-create-poll', () => {
			this.dialog = true;
		});
	},
	methods: {
		...mapMutations({
			addPoll: 'admin/polls/ADD_POLL',
		}),
		createPoll() {
			const emiter = 'add-poll';
			const opt = {
				max_choices: 1,
				content: '',
			};
			this.$socket.emit(emiter, opt, ({ errmsg, poll }) => {
				if (!poll) {
					if (errmsg) {
						// ...
					}
					return;
				}
				this.addPoll(poll);
			});
		},
	},
};
</script>

<style lang="css">
.poll-content {
	overflow-x: scroll;
	height: 40vh;
}
@media only screen and (max-width: 600px) {
	.poll-content {
		overflow-x: scroll;
		height: 85vh;
	}
}
</style>
