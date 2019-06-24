<template>
	<v-dialog
		ref="dialogDate"
		v-model="dialogDate"
		:return-value.sync="dateInfo.date"
		width="290px"
		lazy
		no-click-animation
		:transition="false">
		<template v-slot:activator="{ on }">
			<v-text-field
				v-model="formattedDate"
				:label="$t(dateInfo.label)"
				readonly
				v-on="on" />
		</template>
		<v-date-picker
			v-model="dateInfo.date"
			:max="dateInfo.max"
			:min="dateInfo.min"
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
				date: null,
				max: null,
				min: null
			})
		}
	},
	data: () => ({
		dialogDate: false
	}),
	computed: {
		formattedDate() {
			if (this.dateInfo.date) {
				return this.formatToDash(new Date(this.dateInfo.date).toISOString().substr(0, 10));
			}
			return new Date();
		}
	},
	methods: {
		formatToDash(date) {
			if (!date) return null;

			const [year, month, day] = date.split('-');
			return `${month}/${day}/${year}`;
		}
	}
};
</script>
