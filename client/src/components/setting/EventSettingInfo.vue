<template>
	<!-- @desc: Basic infomation -->
	<event-setting--expand :info="basicExpand">
		<template #subtitle-text>
			<!-- *event code -->
			<v-list-tile-sub-title class="text-uppercase">
				• #{{ basicSettings.code }}
			</v-list-tile-sub-title>
		</template>

		<!-- *field: eventname, description, date begin/end, code, link -->
		<template #content>
			<v-flex xs12>
				<text-field
					:field="basicSettings.form.name" />
				<text-area
					class="pt-2"
					:field="basicSettings.form.description" />
				<text-field
					class="input-code"
					:field="basicSettings.form.code" />
				<text-field
					:field="basicSettings.form.link" />
			</v-flex>
			<v-flex xs12 sm6 class="pr-1">
				<date-picker--dialog :date-info="basicSettings.form.start_at" />
			</v-flex>
			<v-spacer />
			<v-flex xs12 sm6>
				<date-picker--dialog :date-info="basicSettings.form.end_at" />
			</v-flex>
		</template>
	</event-setting--expand>
</template>

<script>
import { mapGetters } from 'vuex';
import EventSettingExpand from './EventSettingExpand.vue';
import DatePickerDialog from '../pieces/DatePickerDialog.vue';

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
		rows: 2,
		label: 'event-description',
		type: 'text',
		outline: true,
		errmsg: ''
	},
	code: {
		value: '',
		label: 'lb-event-code',
		type: 'text',
		prefix: '#',
		readonly: true,
		errmsg: ''
	},
	link: {
		value: '',
		label: 'lb-event-link',
		type: 'text',
		append: 'file_copy',
		readonly: true,
		required: true,
		errmsg: ''
	},
	start_at: {
		label: 'event-start-date',
		date: null
	},
	end_at: {
		label: 'event-end-date',
		date: null
	}
});

export default {
	name: 'EventSettingInfo',
	components: {
		'event-setting--expand': EventSettingExpand,
		'date-picker--dialog': DatePickerDialog
	},
	data: () => ({
		basicExpand: {
			icon: 'info',
			title: 'event-setting-basic-title'
		},
		basicSettings: {
			form: initForm(),
			code: ''
		}
	}),
	computed: {
		...mapGetters({
			tempSettings: 'admin/event/getTempSettings'
		})
	},
	watch: {
		tempSettings(val) {
			const { basicSettings, tempSettings } = this;
			const baseUrl = process.env.VUE_APP_BASE_URL;

			// *basic info map with default settings
			basicSettings.code = tempSettings.code;
			basicSettings.form.name.value = tempSettings.name;
			basicSettings.form.description.value = tempSettings.description;
			basicSettings.form.code.value = tempSettings.code;
			basicSettings.form.link.value = `${baseUrl}/guest/event/${tempSettings.code}`;

			basicSettings.form.start_at.date = this.formatDate(tempSettings.start_at);
			basicSettings.form.end_at.date = this.formatDate(tempSettings.end_at);
		}
	},
	methods: {
		formatDate(date) {
			return new Date(date).toISOString().substr(0, 10);
		}
	}
};
</script>
