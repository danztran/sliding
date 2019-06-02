<template>
	<div>
		<v-layout row justify-center>
			<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
			<v-dialog v-model="modalCreate" persistent max-width="400px">
				<v-card>
					<!-- TITLE -->
					<v-card-title>
						<span class="headline">{{ $t('create-event') }}</span>
					</v-card-title>

					<!-- INPUTS -->
					<v-card-text>
						<v-container grid-list-md>
							<v-layout wrap>
								<v-flex xs12>
									<v-text-field
										autofocus
										type="text"
										v-model="eventName"
										:label="$t('event-name')"
										:rules= "[rules.required]"
										required/>
								</v-flex>

								<v-flex xs6>
									<v-dialog
										ref="dialog"
										v-model="modal"
										:return-value.sync="startDate"
										persistent
										lazy
										full-width
										width="290px">
										<template v-slot:activator="{ on }">
											<v-text-field
												v-model="startDate"
												:label="$t('start-date')"
												readonly
												v-on="on"></v-text-field>
										</template>
										<v-date-picker v-model="startDate" scrollable>
											<v-spacer></v-spacer>
											<v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
											<v-btn flat color="primary" @click="$refs.dialog.save(startDate)">OK</v-btn>
										</v-date-picker>
									</v-dialog>
								</v-flex>

							</v-layout>
						</v-container>
					</v-card-text>

					<!-- BUTTONS -->
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" flat @click="modalCreate = false">Close</v-btn>
						<v-btn color="blue darken-1" flat @click="createEvent">Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-layout>
	</div>
</template>

<script>
export default {
	name: 'CreateEventDialog',
	data: () => ({
		modalCreate: false,
		eventName: '',
		startDate: null,
		endDate: null,
		rules: {
			required: eventName => !!eventName || 'Field is required'
		},
		date: null,
		modal: false
	}),
	methods: {
		createEvent() {}
	},
	mounted() {
		this.$root.$on('create-new-event', () => {
			this.modalCreate = true;
		});
	}
};
</script>
