<template>
	<v-dialog
		ref="dialogDate"
		v-model="dialogDate"
		:return-value.sync="dateInfo.date"
		width="290px"
		lazy
		full-width
		no-click-animation>
		<template v-slot:activator="{ on }">
			<v-text-field
				v-model="dateInfo.date"
				:label="$t(dateInfo.label)"
				readonly
				v-on="on" />
		</template>
		<v-date-picker
			v-model="dateInfo.date"
			:min="dateInfo.min"
			:max="dateInfo.max"
			:locale="this.$i18n.locale"
			no-title
			scrollable>
			<v-spacer />
			<v-btn
				flat
				color="primary"
				@click="dialogDate = false">
				{{ $t('btn-cancel') }}
			</v-btn>
			<v-btn
				flat
				color="primary"
				@click="$refs.dialogDate.save(dateInfo.date)">
				{{ $t('btn-save') }}
			</v-btn>
		</v-date-picker>
	</v-dialog>
</template>

<script>
export default {
	name: 'DatePickerDialog',
	props: {
		dateInfo: {
			type: Object,
			default: () => ({
				label: '',
				date: new Date().toISOString().substr(0, 10),
				max: null,
				min: new Date().toISOString().substr(0, 10)
			})
		}
	},
	data: () => ({
		dialogDate: false
	})
};
</script>
