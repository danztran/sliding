<template>
	<v-layout row justify-center fill-height>
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-dialog v-model="dialogCreate" max-width="400px" no-click-animation>
			<v-card>
				<loading-linear :loading="loading"/>
				<v-card-title class="pb-0 ml-3" primary-title>
					<div class="headline">
						{{ $t('btn-create-event') }}
					</div>
				</v-card-title>

				<v-card-actions>
					<v-container grid-list-md class="pt-0">
						<v-layout wrap>
							<v-flex xs12>
								<text-field :field="form.name" />
								<text-area class="pt-2" :field="form.description"/>
							</v-flex>

							<!-- DATE START PICKER -->
							<v-flex xs6>
								<v-dialog
									ref="dialogDateStart"
									v-model="dialogDateStart"
									:return-value.sync="form.start.defaultDate"
									width="290px"
									lazy
									full-width
									no-click-animation>
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="form.start.defaultDate"
											:label="$t('event-start-date')"
											readonly
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker
										:min="currentDate"
										:max="form.end.defaultDate"
										v-model="form.start.defaultDate"
										:locale="this.$i18n.locale"
										no-title
										scrollable>
										<v-spacer></v-spacer>
										<v-btn
											flat
											color="primary"
											@click="dialogDateStart = false">
											{{ $t('btn-cancel') }}
										</v-btn>
										<v-btn
											flat
											color="primary"
											@click="$refs.dialogDateStart.save(form.start.defaultDate)">
											{{ $t('btn-create') }}
										</v-btn>
									</v-date-picker>
								</v-dialog>
							</v-flex>

							<!-- DATE END PICKER -->
							<v-flex xs6>
								<v-dialog
									ref="dialogDateEnd"
									v-model="dialogDateEnd"
									:return-value.sync="form.end.defaultDate"
									width="290px"
									lazy
									full-width
									no-click-animation>
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="form.end.defaultDate"
											:label="$t('event-end-date')"
											readonly
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker
										:min="form.start.defaultDate"
										v-model="form.end.defaultDate"
										:locale="this.$i18n.locale"
										no-title
										scrollable>
										<v-spacer></v-spacer>
										<v-btn
											flat
											color="primary"
											@click="dialogDateEnd = false">
											{{ $t('btn-cancel') }}
										</v-btn>
										<v-btn
											flat
											color="primary"
											@click="$refs.dialogDateEnd.save(form.end.defaultDate)">
											{{ $t('btn-save') }}
										</v-btn>
									</v-date-picker>
								</v-dialog>
							</v-flex>

							<!-- TIME START PICKER -->
							<v-flex xs6>
								<v-dialog
									ref="dialogTimeStart"
									v-model="dialogTimeStart"
									:return-value.sync="form.start.defaultTime"
									lazy
									full-width
									width="290px"
									no-click-animation>
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="form.start.defaultTime"
											:label="$t('event-start-time')"
											readonly
											v-on="on">
										</v-text-field>
									</template>
									<v-time-picker
										v-model="form.start.defaultTime"
										full-width>
										<v-spacer></v-spacer>
										<v-btn flat color="primary" @click="dialogTimeStart = false">
											{{ $t('btn-cancel') }}
										</v-btn>
										<v-btn
											flat
											color="primary"
											@click="$refs.dialogTimeStart.save(form.start.defaultTime)">
											{{ $t('btn-save') }}
										</v-btn>
									</v-time-picker>
								</v-dialog>
							</v-flex>

							<!-- TIME END PICKER -->
							<v-flex xs6>
								<v-dialog
									ref="dialogTimeEnd"
									v-model="dialogTimeEnd"
									:return-value.sync="form.end.defaultTime"
									lazy
									full-width
									width="290px"
									no-click-animation>
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="form.end.defaultTime"
											:label="$t('event-end-time')"
											readonly
											v-on="on">
										</v-text-field>
									</template>
									<v-time-picker
										v-model="form.end.defaultTime"
										full-width>
										<v-spacer></v-spacer>
										<v-btn
											flat
											color="primary"
											@click="dialogTimeEnd = false">
											{{ $t('btn-cancel') }}
										</v-btn>
										<v-btn
											flat
											color="primary"
											@click="$refs.dialogTimeEnd.save(form.end.defaultTime)">
											{{ $t('btn-create') }}
										</v-btn>
									</v-time-picker>
								</v-dialog>
							</v-flex>

							<!-- ATENDANCEES DESCRIPTION -->
							<v-flex xs12>
								<div class="body-1 font-weight-regular">
									{{ $t('event-attendees-info') }}
								</div>
							</v-flex>

						</v-layout>
					</v-container>
				</v-card-actions>

				<div class="error--text text-xs-center">
					{{ errorMessage }}
				</div>

				<!-- ACTION BTN -->
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" flat @click="dialogCreate = false" >
						{{ $t('btn-cancel') }}
					</v-btn>
					<v-btn color="primary" :disabled="loading" @click="createEvent">
						{{ $t('btn-create') }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
const initForm = () => ({
	name: {
		value: '',
		label: 'event-name',
		type: 'text',
		required: true,
		autofocus: true,
		errmsg: ''
	},
	description: {
		value: '',
		label: 'event-description',
		type: 'text',
		errmsg: '',
		outline: true,
		rows: 3
	},
	start: {
		defaultTime: null,
		defaultDate: null
	},
	end: {
		defaultTime: null,
		defaultDate: null
	}
});

export default {
	name: 'DashboardEventDialog',
	data: () => ({
		dialogCreate: false,
		loading: false,
		form: initForm(),
		currentDate: null,
		dialog: {
			dateStart: false,
			dateEnd: false,
			timeStart: false,
			timeEnd: false
		},
		dialogDateStart: false,
		dialogDateEnd: false,
		dialogTimeStart: false,
		dialogTimeEnd: false,
		errorMessage: ''
	}),
	created() {
		const date = new Date();
		const dayTime = 1000 * 3600 * 24;
		this.currentDate = date.toISOString().substr(0, 10);
		this.form.start.defaultDate = date.toISOString().substr(0, 10);
		this.form.start.defaultTime = date.toLocaleTimeString().substr(0, 4);
		// 3 days next
		this.form.end.defaultDate = new Date((new Date()).valueOf() + dayTime * 3)
			.toISOString().substr(0, 10);
		this.form.end.defaultTime = date.toLocaleTimeString().substr(0, 4);
	},
	mounted() {
		this.$root.$on('dialog-create-new-event', () => {
			this.dialogCreate = true;
		});
	},
	methods: {
		createEvent() {
			this.loading = true;
			const { form } = this;
			const eventFormData = {
				name: form.name.value,
				description: form.description.value,
				start_at: form.start.defaultDate,
				end_at: form.end.defaultDate
			};

			this.$axios
				.post(this.$api.event.create, eventFormData)
				.then((res) => {
					const { code } = res.data;
					this.$store.dispatch('dashboard/createEvent', Object.assign(eventFormData, { code }));
					this.dialogCreate = false;
				})
				.catch((err) => {
					this.handleErrorMessages(err.messages);
					this.loading = false;
				});
		}
	}
};
</script>

<style lang="scss">
</style>
