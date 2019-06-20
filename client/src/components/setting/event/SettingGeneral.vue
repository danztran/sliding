<template>
	<v-window-item
		:reverse-transition="false"
		:transition="false">
		<!-- @desc: basic infomation -->
		<v-expansion-panel expand>
			<v-expansion-panel-content>
				<template v-slot:header>
					<v-list dense>
						<v-list-tile class="grow">
							<v-list-tile-avatar>
								<v-icon
									color="primary"
									size="20"
									v-text="'$vuetify.icons.info'" />
							</v-list-tile-avatar>

							<v-list-tile-content class="primary--text body-2  font-weight-medium">
								<v-list-tile-title v-t="'event-setting-basic-title'" />
								<v-list-tile-sub-title class="text-uppercase">
									• #{{ eventInfo ? eventInfo.code : '...' }}
								</v-list-tile-sub-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</template>

				<template v-slot:actions>
					<v-icon color="primary" v-text="'keyboard_arrow_down'" />
				</template>

				<v-card flat>
					<v-card-text flat>
						<v-layout wrap>
							<v-flex xs12>
								<text-field :field="form.name" />
								<text-area class="pt-2" :field="form.description" />
								<text-field class="input-code" :field="form.code" />
								<text-field :field="form.link" />
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-card>
			</v-expansion-panel-content>
		</v-expansion-panel>

		<!-- @desc: Privacy setting -->
		<v-expansion-panel expand>
			<v-expansion-panel-content>
				<template v-slot:header>
					<v-list dense>
						<v-list-tile class="grow">
							<v-list-tile-avatar>
								<v-icon
									color="primary"
									size="20"
									v-text="'$vuetify.icons.privacy'" />
							</v-list-tile-avatar>

							<v-list-tile-content class="primary--text body-2  font-weight-medium">
								<v-list-tile-title v-t="'event-setting-privacy-title'" />
								<v-list-tile-sub-title>
									• Public
								</v-list-tile-sub-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</template>
				<!-- arrow -->
				<template v-slot:actions>
					<v-icon color="primary" v-text="'keyboard_arrow_down'" />
				</template>

				<!-- *option: allow search, auth require -->
				<v-card flat>
					<v-card-text flat>
						<v-layout wrap justify-center align-center>
							<!-- allow search -->
							<div class="d-flex">
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
										v-model="allowSearch"
										class="right"
										color="primary" />
								</v-flex>
							</div>

							<!-- auth require -->
							<div class="d-flex mt-3">
								<v-flex xs8>
									<div
										v-t="'event-setting-require-auth'"
										class="body-1" />
									<div
										v-t="'event-setting-auth-des'"
										class="body-1 grey--text" />
								</v-flex>
								<v-flex xs4>
									<v-switch
										v-model="requireAuth"
										class="right"
										color="primary" />
								</v-flex>
							</div>
						</v-layout>
					</v-card-text>
				</v-card>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-window-item>
</template>

<script>
import { mapGetters } from 'vuex';

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
		required: true,
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
	start: {
		defaultTime: null,
		defaultDate: null
	},
	end: {
		defaultTime: null,
		defaultDate: null
	}
});

export default {
	name: 'SettingGeneral',
	data: () => ({
		form: initForm()
	}),
	computed: {
		...mapGetters({
			eventInfo: 'admin/event/infoCurrentEvent'
		}),
		allowSearch() {
			return this.eventInfo ? this.eventInfo.allow_search : false;
		},
		requireAuth() {
			return this.eventInfo ? this.eventInfo.require_auth : false;
		}
	},
	watch: {
		eventInfo(val) {
			if (this._cm.notEmpty(val)) {
				const { form, eventInfo } = this;
				const baseUrl = process.env.VUE_APP_BASE_URL;
				form.name.value = eventInfo.name;
				form.description.value = eventInfo.description;
				form.code.value = eventInfo.code;
				form.link.value = `${baseUrl}/guest/event/${eventInfo.code}`;
			}
		}
	}
};
</script>

<style lang="scss">
.input-code input[type="text"] {
	text-transform: uppercase;
}
</style>
