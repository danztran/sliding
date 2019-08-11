<template>
	<v-layout
		row
		justify-center
		fill-height>
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-dialog
			v-model="dialogCreate"
			max-width="450px"
			no-click-animation
			:fullscreen="isSMnXS">
			<v-card>
				<loading-linear :loading="loading" />
				<v-container class="pb-2">
					<v-card-title class="py-0 px-2" primary-title>
						<div
							v-t="'btn-create-event'"
							class="headline font-weight-light first-letter-uppercase" />
					</v-card-title>

					<v-card-actions>
						<v-layout wrap>
							<v-flex xs12>
								<text-field :field="form.name" />
								<text-area class="pt-2" :field="form.description" />
							</v-flex>

							<!-- *Date start picker -->
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
											v-on="on" />
									</template>
									<v-date-picker
										v-model="form.start.defaultDate"
										:min="currentDate"
										:locale="this.$i18n.locale"
										scrollable>
										<v-spacer />
										<v-btn
											flat
											color="primary"
											@click="dialogDateStart = false">
											<span v-t="'btn-cancel'" class="first-letter-uppercase" />
										</v-btn>
										<v-btn
											flat
											color="primary"
											@click="$refs.dialogDateStart.save(form.start.defaultDate,
												cbCheckBiggerDateEnd(form.start.defaultDate))">
											<span v-t="'btn-pick-date-start'" class="first-letter-uppercase" />
										</v-btn>
									</v-date-picker>
								</v-dialog>
							</v-flex>

							<!-- *Time start -->
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
											v-on="on" />
									</template>
									<v-time-picker
										v-model="form.start.defaultTime"
										full-width>
										<v-spacer />
										<v-btn flat color="primary" @click="dialogTimeStart = false">
											<span v-t="'btn-cancel'" class="first-letter-uppercase" />
										</v-btn>
										<v-btn
											flat
											color="primary"
											@click="$refs.dialogTimeStart.save(form.start.defaultTime,
												dialogDateEnd=true)">
											<span v-t="'btn-pick-time-start'" class="first-letter-uppercase" />
										</v-btn>
									</v-time-picker>
								</v-dialog>
							</v-flex>

							<!-- *Date end picker -->
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
											v-on="on" />
									</template>
									<v-date-picker
										v-model="form.end.defaultDate"
										:min="form.start.defaultDate"
										:locale="this.$i18n.locale"
										scrollable>
										<v-spacer />
										<v-btn
											flat
											color="primary"
											@click="dialogDateEnd = false">
											<span v-t="'btn-cancel'" class="first-letter-uppercase" />
										</v-btn>
										<v-btn
											flat
											color="primary"
											@click="$refs.dialogDateEnd.save(form.end.defaultDate, dialogTimeEnd=true)">
											<span v-t="'btn-pick-date-end'" class="first-letter-uppercase" />
										</v-btn>
									</v-date-picker>
								</v-dialog>
							</v-flex>

							<!-- *Time end -->
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
											v-on="on" />
									</template>
									<v-time-picker
										v-model="form.end.defaultTime"
										full-width>
										<v-spacer />
										<v-btn
											flat
											color="primary"
											@click="dialogTimeEnd = false">
											<span v-t="'btn-cancel'" class="first-letter-uppercase" />
										</v-btn>
										<v-btn
											flat
											color="primary"
											@click="$refs.dialogTimeEnd.save(form.end.defaultTime)">
											<span v-t="'btn-pick-time-end'" class="first-letter-uppercase" />
										</v-btn>
									</v-time-picker>
								</v-dialog>
							</v-flex>

							<!-- *Atendancees description -->
							<v-flex xs12>
								<div class="body-1 font-weight-regular first-letter-uppercase">
									<span v-t="'event-attendees-info'" />
								</div>
							</v-flex>
						</v-layout>
					</v-card-actions>

					<!-- *Error msg -->
					<v-card-text class="error--text text-xs-center first-letter-uppercase">
						{{ errorMessage }}
					</v-card-text>

					<!-- *Cancel/Create -->
					<v-card-actions>
						<v-spacer />
						<v-btn
							flat
							medium
							@click="dialogCreate = false">
							<span v-t="'btn-cancel'" class="first-letter-uppercase" />
						</v-btn>
						<v-btn
							flat
							medium
							color="success"
							:disabled="loading"
							@click="createEvent">
							<span v-t="'btn-create'" class="first-letter-uppercase" />
						</v-btn>
					</v-card-actions>
				</v-container>
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
		errmsg: '',
	},
	description: {
		value: '',
		label: 'event-description',
		type: 'text',
		errmsg: '',
		outline: true,
		rows: 3,
	},
	start: {
		defaultTime: '07:00',
		defaultDate: null,
	},
	end: {
		defaultTime: '11:00',
		defaultDate: null,
	},
});

export default {
	name: 'DashboardEventDialog',
	data: () => ({
		dialogCreate: false,
		loading: false,
		form: initForm(),
		dialogDateStart: false,
		dialogDateEnd: false,
		dialogTimeStart: false,
		dialogTimeEnd: false,
		errorMessage: '',
	}),
	computed: {
		currentDate() {
			return new Date().toISOString().substr(0, 10);
		},
	},
	created() {
		this.formatForm();
	},
	mounted() {
		this.$root.$on('dialog-create-new-event', () => {
			this.dialogCreate = true;
		});
	},
	methods: {
		formatForm() {
			const date = new Date();
			const dayTime = 1000 * 3600 * 24;
			this.form.name.value = '';
			this.form.description.value = '';
			this.form.start.defaultDate = date.toISOString().substr(0, 10);
			this.form.end.defaultDate = new Date((new Date()).valueOf() + dayTime * 3)
				.toISOString().substr(0, 10);
		},
		/*
			@desc: callback when save dateStart compare with dateEnd
				*if: start are bigger than end set defaultDate for dateEnd
		*/
		cbCheckBiggerDateEnd(dateStart) {
			this.dialogTimeStart = true;
			const start = new Date(dateStart).getTime();
			const end = new Date(this.form.end.defaultDate).getTime();
			if (start > end) {
				this.form.end.defaultDate = dateStart;
				return true;
			}
			return false;
		},
		compareTime() {
			const { form } = this;
			const start = new Date(`${form.start.defaultDate}T${form.start.defaultTime}`).getTime();
			const end = new Date(`${form.end.defaultDate}T${form.end.defaultTime}`).getTime();
			if (start >= end) {
				this.errorMessage = this.$t('err-time-end-invalid');
				return false;
			}
			const limitTime = end - start; // at least 15mins
			if (limitTime < (14 * 60000)) {
				this.errorMessage = this.$t('err-time-end-limit');
				return false;
			}
			return true;
		},
		checkValidField() {
			if (this.form.name.value === '') {
				this.form.name.errmsg = this.$t('requireField');
				return false;
			}
			if (new Date(this.form.start.defaultDate).toLocaleDateString()
				=== new Date(this.form.end.defaultDate).toLocaleDateString()) {
				if (!this.compareTime()) {
					return false;
				}
			}
			return true;
		},
		createEvent() {
			this.loading = true;
			if (!this.checkValidField()) {
				this.loading = false;
				return;
			}
			this.errorMessage = '';
			const { form } = this;
			const eventFormData = {
				name: form.name.value,
				description: form.description.value,
				start_at: `${form.start.defaultDate}T${form.start.defaultTime}`,
				end_at: `${form.end.defaultDate}T${form.end.defaultTime}`,
			};

			this.$axios
				.post(this.$api.event.create, eventFormData)
				.then((res) => {
					const { code } = res.data;
					this.loading = false;
					this.dialogCreate = false;
					this.formatForm();
					this.$store.dispatch('dashboard/createEvent', Object.assign(eventFormData, { code }));
				})
				.catch((err) => {
					this.handleErrorMessages(err.messages);
					this.loading = false;
				});
		},
	},
};
</script>

<style lang="scss">
</style>
