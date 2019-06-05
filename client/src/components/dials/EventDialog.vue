<template>
	<div>
		<v-layout row justify-center>
			<span v-show="false">
				{{ $t('FOR_A_PURPOSE') }}
			</span>
			<v-dialog v-model="modalCreate" max-width="400px" no-click-animation>
				<v-card>
					<v-card-title>
						<span class="headline">
							{{ $t('create-event') }}
						</span>
					</v-card-title>

					<v-card-text>
						<v-container grid-list-md>
							<v-layout wrap>
								<v-flex xs12>
									<text-field :field="field.eventname" />
								</v-flex>

								<!-- DATE START PICKER -->
								<v-flex xs6>
									<v-dialog
										ref="dialogDateStart"
										v-model="dialogDateStart"
										:return-value.sync="start.defaultDate"
										width="290px"
										lazy
										full-width
										no-click-animation>
										<template v-slot:activator="{ on }">
											<v-text-field
												v-model="start.defaultDate"
												:label="$t('event-start-date')"
												readonly
												v-on="on">
											</v-text-field>
										</template>
										<v-date-picker
											:min="currentDate"
											:max="end.defaultDate"
											v-model="start.defaultDate"
											:locale="this.$i18n.locale"
											no-title
											scrollable>
											<v-spacer></v-spacer>
											<v-btn
												flat
												color="primary"
												@click="dialogDateStart = false">
												{{ $t('cancel-btn') }}
											</v-btn>
											<v-btn
												flat
												color="primary"
												@click="$refs.dialogDateStart.save(start.defaultDate)">
												{{ $t('create-btn') }}
											</v-btn>
										</v-date-picker>
									</v-dialog>
								</v-flex>

								<!-- DATE END PICKER -->
								<v-flex xs6>
									<v-dialog
										ref="dialogDateEnd"
										v-model="dialogDateEnd"
										:return-value.sync="end.defaultDate"
										width="290px"
										lazy
										full-width
										no-click-animation>
										<template v-slot:activator="{ on }">
											<v-text-field
												v-model="end.defaultDate"
												:label="$t('event-end-date')"
												readonly
												v-on="on">
											</v-text-field>
										</template>
										<v-date-picker
											:min="start.defaultDate"
											v-model="end.defaultDate"
											:locale="this.$i18n.locale"
											no-title
											scrollable>
											<v-spacer></v-spacer>
											<v-btn
												flat
												color="primary"
												@click="dialogDateEnd = false">
												{{ $t('cancel-btn') }}
											</v-btn>
											<v-btn
												flat
												color="primary"
												@click="$refs.dialogDateEnd.save(end.defaultDate)">
												{{ $t('save-btn') }}
											</v-btn>
										</v-date-picker>
									</v-dialog>
								</v-flex>

								<!-- TIME START PICKER -->
								<v-flex xs6>
									<v-dialog
										ref="dialogTimeStart"
										v-model="dialogTimeStart"
										:return-value.sync="start.defaultTime"
										lazy
										full-width
										width="290px"
										no-click-animation>
										<template v-slot:activator="{ on }">
											<v-text-field
												v-model="start.defaultTime"
												:label="$t('event-start-time')"
												readonly
												v-on="on">
											</v-text-field>
										</template>
										<v-time-picker
											v-model="start.defaultTime"
											full-width>
											<v-spacer></v-spacer>
											<v-btn flat color="primary" @click="dialogTimeStart = false">
												{{ $t('cancel-btn') }}
											</v-btn>
											<v-btn
												flat
												color="primary"
												@click="$refs.dialogTimeStart.save(start.defaultTime)">
												{{ $t('save-btn') }}
											</v-btn>
										</v-time-picker>
									</v-dialog>
								</v-flex>

								<!-- TIME END PICKER -->
								<v-flex xs6>
									<v-dialog
										ref="dialogTimeEnd"
										v-model="dialogTimeEnd"
										:return-value.sync="end.defaultTime"
										lazy
										full-width
										width="290px"
										no-click-animation>
										<template v-slot:activator="{ on }">
											<v-text-field
												v-model="end.defaultTime"
												:label="$t('event-end-time')"
												readonly
												v-on="on">
											</v-text-field>
										</template>
										<v-time-picker
											v-model="end.defaultTime"
											full-width>
											<v-spacer></v-spacer>
											<v-btn
												flat
												color="primary"
												@click="dialogTimeEnd = false">
												{{ $t('cancel-btn') }}
											</v-btn>
											<v-btn
												flat
												color="primary"
												@click="$refs.dialogTimeEnd.save(end.defaultTime)">
												{{ $t('create-btn') }}
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
					</v-card-text>

					<!-- ACTION BTN -->
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" flat @click="modalCreate = false" >
							{{ $t('cancel-btn') }}
						</v-btn>
						<v-btn color="blue darken-1" flat @click="createEvent">
							{{ $t('create-btn') }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-layout>
	</div>
</template>

<script>
export default {
	name: 'EventDialog',
	data: () => ({
		modalCreate: false,
		field: {
			eventname: {
				value: '',
				label: 'event-name',
				type: 'text',
				required: true,
				autofocus: true
			}
		},
		currentDate: null,
		start: {
			defaultDate: null,
			defaultTime: null
		},
		dialogDateStart: false,
		dialogTimeStart: false,
		end: {
			defaultDate: null,
			defaultTime: null
		},
		dialogDateEnd: false,
		dialogTimeEnd: false
	}),
	methods: {
		createEvent() {}
	},
	created() {
		const date = new Date();
		const dayTime = 1000 * 3600 * 24;
		this.currentDate = date.toISOString().substr(0, 10);
		this.start.defaultDate = date.toISOString().substr(0, 10);
		this.start.defaultTime = date.toLocaleTimeString().substr(0, 5);
		// 3 days next
		this.end.defaultDate = new Date((new Date()).valueOf() + dayTime * 3)
			.toISOString().substr(0, 10);
		this.end.defaultTime = date.toLocaleTimeString().substr(0, 5);
	},
	mounted() {
		this.$root.$on('create-new-event', () => {
			this.modalCreate = true;
		});
	}
};
</script>

<style lang="scss" scoped>
	.w100 {
		width: 100%;
	}
</style>
