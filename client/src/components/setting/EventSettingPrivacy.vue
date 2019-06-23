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
						v-model="privacySettings.search_hidden"
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
						:input-value="privacySettings.require_passcode"
						class="right"
						color="primary"
						@change="toggleEnblePasscode" />
				</v-flex>
			</div>

			<!-- *field input passcode -->
			<div class="d-flex w-100 mr-5">
				<text-field
					v-show="privacySettings.require_passcode"
					:field="form.passcode" />
			</div>
		</template>
	</event-setting--expand>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
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
		form: initForm(),
		privacySettings: {
			search_hidden: false,
			require_passcode: false,
			require_login: false
		}
	}),
	computed: {
		...mapGetters({
			tempSettings: 'admin/event/getTempSettings'
		})
	},
	watch: {
		tempSettings(val) {
			const { privacySettings, tempSettings } = this;
			for (const s of Object.keys(privacySettings)) {
				if (tempSettings[s] !== undefined) {
					privacySettings[s] = tempSettings[s];
				}
			}
			this.form.passcode.value = privacySettings.require_passcode
				? tempSettings.passcode
				: '';
		},
		privacySettings: {
			deep: true,
			handler(val) {
				if (!val.require_passcode) {
					this.mergeTempSettings(val);
				}
			}
		}
	},
	methods: {
		...mapMutations({
			mergeTempSettings: 'admin/event/MERGE_TEMP_SETTINGS'
		}),
		toggleEnblePasscode() {
			this.privacySettings.require_passcode = !this.privacySettings.require_passcode;
		}
	}
};
</script>
