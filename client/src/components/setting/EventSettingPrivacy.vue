<template>
	<!-- @desc: Privacy -->
	<event-setting--expand :info="prrivacyExpand">
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
						v-model="privacyData.allow_search"
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

			<!-- *login required -->
			<div class="d-flex w-100 mt-3">
				<v-flex xs8>
					<div
						v-t="'event-setting-require-login'"
						class="body-1" />
					<div
						v-t="'event-setting-require-login-des'"
						class="body-1 grey--text" />
				</v-flex>
				<v-flex xs4>
					<v-switch
						v-model="privacyData.requireLogin"
						class="right"
						color="primary" />
				</v-flex>
			</div>
		</template>
	</event-setting--expand>
</template>

<script>
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
	props: {
		data: {
			type: Object,
			default() {}
		}
	},
	data: () => ({
		prrivacyExpand: {
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
	watch: {
		data(val) {
			const { privacyData, data } = this;

			// *privacy map with default settings
			privacyData.allow_search = data.allow_search;
			privacyData.require_passcode = data.require_passcode;
			privacyData.passcode = data.passcode;
		}
	},
	methods: {
		toggleEnblePasscode() {
			this.privacy.require_passcode = !this.privacy.require_passcode;
		}
	}
};
</script>
