<template>
	<!-- @desc: Basic infomation -->
	<event-setting--expand :info="basicExpand">
		<template slot="subtitle-text">
			<!-- *event code -->
			<v-list-tile-sub-title class="text-uppercase">
				• #{{ eventInfo ? basicData.code : '...' }}
			</v-list-tile-sub-title>
		</template>

		<!-- *field: eventname, description, date begin/end, code, link -->
		<template slot="content">
			<v-flex xs12>
				<text-field
					:field="basicData.form.name" />
				<text-area
					class="pt-2"
					:field="basicData.form.description" />
				<text-field
					class="input-code"
					:field="basicData.form.code" />
				<text-field
					:field="basicData.form.link" />
			</v-flex>
		</template>
	</event-setting--expand>
</template>

<script>
import { mapGetters } from 'vuex';
import EventSettingExpand from './EventSettingExpand.vue';

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
	}
});

export default {
	name: 'EventSettingInfo',
	components: {
		'event-setting--expand': EventSettingExpand
	},
	data: () => ({
		basicExpand: {
			icon: 'info',
			title: 'event-setting-basic-title'
		},
		basicData: {
			form: initForm(),
			code: '',
			start_at: null,
			end_at: null
		}
	}),
	computed: {
		...mapGetters({
			eventInfo: 'admin/event/getEventInfo'
		})
	},
	watch: {
		eventInfo(val) {
			const { basicData } = this;
			const baseUrl = process.env.VUE_APP_BASE_URL;

			// *basic info map with default settings
			basicData.code = val.code;
			basicData.form.name.value = val.name;
			basicData.form.description.value = val.description;
			basicData.form.code.value = val.code;
			basicData.form.link.value = `${baseUrl}/guest/event/${val.code}`;
		}
	}
};
</script>
