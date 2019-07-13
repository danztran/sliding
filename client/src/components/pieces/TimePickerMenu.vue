<template>
	<v-menu
		ref="menuPickTime"
		v-model="menuPickTime"
		:close-on-content-click="true"
		:nudge-right="40"
		:return-value.sync="time"
		lazy
		:transition="false"
		offset-y
		full-width
		max-width="290px"
		min-width="290px">
		<template v-slot:activator="{ on }">
			<v-text-field
				v-model="time"
				:label="$t(timeInfo.labelTime)"
				:prepend-icon="timeInfo.prepend
					? `$vuetify.icons.${timeInfo.prepend}`
					: 'access_time'"
				readonly
				v-on="on" />
		</template>
		<v-time-picker
			v-model="time"
			:min="timeInfo.min"
			:max="timeInfo.max"
			full-width
			color="primary"
			@click:minute="$refs.menuPickTime.save(time)" />
	</v-menu>
</template>

<script>
export default {
	name: 'TimePickerMenu',
	props: {
		timeInfo: {
			type: Object,
			default: () => ({
				labelTime: '',
				prepend: '',
				time: null,
				min: null,
				max: null,
			}),
		},
	},
	data: () => ({
		menuPickTime: false,
		time: null,
	}),
	watch: {
		'timeInfo.time': function t(val) {
			this.time = this.formatTime(val);
		},
	},
	methods: {
		formatTime(time) {
			if (!time) return null;
			return new Date(time).toTimeString().substr(0, 5);
		},
	},
};
</script>
