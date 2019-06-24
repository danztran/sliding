<template>
	<v-dialog
		ref="dialogTime"
		v-model="dialogTime"
		:return-value.sync="timeInfo.time"
		lazy
		full-width
		width="290px"
		no-click-animation
		:transition="false">
		<template v-slot:activator="{ on }">
			<v-text-field
				v-model="timeInfo.time"
				:label="$t(label)"
				readonly
				v-on="on" />
		</template>
		<v-time-picker
			v-model="timeInfo.time"
			full-width>
			<v-spacer />
			<v-btn
				flat
				color="primary"
				@click="dialogTime = false">
				{{ $t('btn-cancel') }}
			</v-btn>
			<v-btn
				flat
				color="primary"
				@click="$refs.dialogTime.save(timeInfo.time)">
				{{ $t('btn-create') }}
			</v-btn>
		</v-time-picker>
	</v-dialog>
</template>

<script>
export default {
	name: 'TimePickerDialog',
	props: {
		timeInfo: {
			type: Object,
			default: () => ({
				label: '',
				time: new Date().toTimeString().substr(0, 5)
			})
		}
	},
	data: () => ({
		dialogTime: false
	}),
	watch: {
		'timeInfo.time': function(val) {
			this.$emit('update:timeInfo.time', new Date(val).toTimeString.substr(0, 5));
		}
	}
};
</script>
