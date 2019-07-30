<template>
	<v-dialog
		id="my-create-poll"
		v-model="dialog"
		width="600px"
		:transition="false"
		:fullscreen="isXS">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-card>
			<loading-linear :loading="loading" />
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
					<v-form ref="form">
						<v-layout row wrap :px-3="!isXS">
							<!-- *Poll ask -->
							<v-flex xs12>
								<text-field :field="form.ask" />
							</v-flex>

							<!-- <text-area :field="form.option" /> -->
							<v-flex xs8>
								<template v-for="(row, idx) in optionRows">
									<text-area :key="idx" :field="row" />
								</template>
							</v-flex>
							<v-flex xs12>
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
							</v-flex>

							<!-- *limit of multi choice -->
							<v-flex xs5>
								<text-field
									v-if="limitMultiple"
									color="primary"
									:field="form.limit" />
							</v-flex>
						</v-layout>
					</v-form>
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
						@click="handleCreate">
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
		required: true,
		errmsg: '',
	},
	limit: {
		value: 2,
		type: 'number',
		solo: true,
		flat: true,
		outline: true,
		errmsg: '',
	},
});

export default {
	name: 'DialogCreatePoll',
	data: () => ({
		dialog: false,
		loading: false,
		form: initForm(),
		optionRows: [
			{
				value: '',
				placeholder: 'lb-add-option',
				type: 'text',
				rows: 2,
				solo: true,
				flat: true,
				outline: true,
				autogrow: true,
			},
		],
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
		handleCreate() {
			this.loading = true;
			if (this.form.ask.value === '') {
				this.form.ask.errmsg = this.$t('requireField');
				this.loading = false;
				return;
			}
			if (this.limitMultiple && this.form.limit.value < 2) {
				this.form.limit.errmsg = this.$t('poll-limit-count');
				this.loading = false;
				return;
			}
			this.createPoll();
		},
		createPoll() {
			const emiter = 'add-poll';
			const { form } = this;
			const opt = {
				max_choices: this.form.limit.value,
				content: form.ask.value,
			};
			this.$socket.emit(emiter, opt, ({ errmsg, poll }) => {
				this.loading = false;
				if (!poll) {
					if (errmsg) {
						// ...
					}
					return;
				}
				this.addPoll(poll);
				this.$refs.form.reset();
				this.dialog = false;
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
