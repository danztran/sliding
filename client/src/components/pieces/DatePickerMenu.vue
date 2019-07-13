<template>
	<v-menu
		ref="menuPickTime"
		v-model="menuPickTime"
		:close-on-content-click="false"
		:nudge-right="40"
		:return-value.sync="dateInfo.date"
		lazy
		transition="scale-transition"
		offset-y
		full-width
		min-width="290px">
		<template v-slot:activator="{ on }">
			<v-text-field
				v-model="formattedDate"
				:label="$t(dateInfo.labelDate)"
				:prepend-icon="dateInfo.prepend
					? `$vuetify.icons.${dateInfo.prepend}`
					: 'event'"
				readonly
				v-on="on" />
		</template>
		<v-date-picker
			v-model="dateInfo.date"
			color="primary"
			no-title
			scrollable>
			<v-spacer />
			<v-btn
				v-t="'btn-cancel'"
				flat
				color="primary"
				@click="menuPickTime = false" />
			<v-btn
				v-t="'btn-save'"
				flat
				color="primary"
				@click="$refs.menuPickTime.save(dateInfo.date)" />
		</v-date-picker>
	</v-menu>
</template>

<script>
export default {
	name: 'DatePickerMenu',
	props: {
		dateInfo: {
			type: Object,
			default: () => ({
				labelDate: '',
				prepend: '',
				date: null,
				max: null,
				min: null,
			}),
		},
		markDaysEvent: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		menuPickTime: false,
	}),
	computed: {
		formattedDate() {
			const { date } = this.dateInfo;
			return this.formatToDash(this.formatToISO(date));
		},
	},
	methods: {
		formatToDash(date) {
			if (!date) return null;

			const [year, month, day] = date.split('-');
			return `${day}/${month}/${year}`;
		},
		formatToISO(date) {
			if (!date) return null;

			return new Date(date).toISOString().substr(0, 10);
		},
	},
};
</script>
