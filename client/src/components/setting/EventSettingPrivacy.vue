<template>
	<!-- @desc: Privacy -->
	<event-setting--expand :info="privacyExpand">
		<template slot="content">
			<!-- *allow search -->
			<div class="d-flex w-100">
				<v-flex xs8>
					<div
						v-t="'event-setting-hidden-search'"
						class="body-1" />
					<div
						v-t="'event-setting-search-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs4>
					<v-switch
						v-model="privacyData.search_hidden"
						class="right"
						color="primary" />
				</v-flex>
			</div>

			<!-- *auth via passcode -->
			<div class="d-flex w-100 mt-3">
				<v-flex xs8>
					<div
						v-t="'event-setting-require-passcode'"
						class="body-1" />
					<div
						v-t="'event-setting-passcode-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs4>
					<v-switch
						:input-value="privacyData.require_passcode"
						class="right"
						color="primary"
						@change="toggleEnblePasscode" />
				</v-flex>
			</div>

			<!-- *field input passcode -->
			<div class="d-flex w-100 mr-5">
				<text-field
					v-show="privacyData.require_passcode"
					:field="privacyData.form.passcode" />
			</div>
		</template>
	</event-setting--expand>
</template>

<script>
import { mapGetters } from 'vuex';
import EventSettingExpand from './EventSettingExpand.vue';
const initForm = () => ({
	passcode: {
		value: '',
		label: 'lb-event-passcode',
		type: 'text',
		prepend: 'lock',
		required: true,
		errmsg: ''
	}
});

export default {
	name: 'EventSettingPrivacy',
	components: {
		'event-setting--expand': EventSettingExpand
	},
	data: () => ({
		privacyExpand: {
			icon: 'privacy',
			title: 'event-setting-privacy-title',
			subtitle: 'event-setting-privacy-subtitle'
		},
		privacyData: {
			form: initForm(),
			allow_search: false,
			require_passcode: false,
			passcode: null,
			require_login: false
		}
	}),
	computed: {
		...mapGetters({
			eventInfo: 'admin/event/getEventInfo'
		})
	},
	watch: {
		eventInfo(val) {
			const { privacyData } = this;

			// *privacy map with default settings
			privacyData.allow_search = val.allow_search;
			privacyData.require_passcode = val.require_passcode;
			privacyData.passcode = val.passcode;
		}
	},
	methods: {
		toggleEnblePasscode() {
			this.privacyData.require_passcode = !this.privacyData.require_passcode;
		}
	}
};
</script>
