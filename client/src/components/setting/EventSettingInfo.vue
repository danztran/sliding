<template>
	<event-setting--expand :info="basicExpand">
		<template #subtitle-text>
			<!-- *event code -->
			<v-list-tile-sub-title class="text-uppercase">
				• #{{ basicSettings.form.code.value }}
			</v-list-tile-sub-title>
		</template>

		<!-- *field: eventname, description, date begin/end, code, link -->
		<template #content>
			<text-field
				:field="basicSettings.form.name" />
			<text-area
				class="pt-2 w-100"
				:field="basicSettings.form.description" />
			<text-field
				class="input-code"
				:field="basicSettings.form.code" />
			<v-text-field
				ref="link"
				readonly
				:label="$t('lb-event-link-copy')"
				:value="basicSettings.form.link.value"
				:append-icon="basicSettings.form.link.append"
				@click="copyLink" />

			<v-layout row wrap>
				<!-- *date start -->
				<v-flex xs12 sm6 class="pr-1">
					<!-- <date-picker--menu :date-info="basicSettings.form.start_at" /> -->
					<v-menu
						ref="menuDateStart"
						v-model="menuDateStart"
						:close-on-content-click="false"
						:nudge-right="40"
						:return-value.sync="basicSettings.form.start_at.value"
						width="290px"
						lazy
						transition="scale-transition"
						offset-y
						min-width="290px">
						<template v-slot:activator="{ on }">
							<v-text-field
								v-model="basicSettings.form.start_at.value"
								:label="$t('event-start-date')"
								readonly
								v-on="on" />
						</template>
						<v-date-picker
							v-model="basicSettings.form.start_at.value"
							scrollable>
							<v-spacer />
							<v-btn
								flat
								color="primary"
								@click="menuDateStart = false">
								<span v-t="'btn-cancel'" class="first-letter-uppercase" />
							</v-btn>
							<v-btn
								flat
								color="primary"
								@click="$refs.menuDateStart.save(
									basicSettings.form.start_at.value,
									cbCheckBiggerDateEnd(basicSettings.form.start_at.value)
								)">
								<span v-t="'btn-save'" class="first-letter-uppercase" />
							</v-btn>
						</v-date-picker>
					</v-menu>
				</v-flex>

				<!-- *time start -->
				<v-flex xs12 sm6>
					<!-- <time-picker--menu :time-info="basicSettings.form.start_at" /> -->
					<v-menu
						ref="menuTimeStart"
						v-model="menuTimeStart"
						:close-on-content-click="false"
						:nudge-right="40"
						:return-value.sync="timeStart"
						width="290px"
						lazy
						transition="scale-transition"
						offset-y
						min-width="290px">
						<template v-slot:activator="{ on }">
							<v-text-field
								v-model="timeStart"
								:label="$t('event-start-time')"
								readonly
								v-on="on" />
						</template>
						<v-time-picker
							v-model="timeStart"
							full-width>
							<v-spacer />
							<v-btn flat color="primary" @click="menuTimeStart = false">
								<span v-t="'btn-cancel'" class="first-letter-uppercase" />
							</v-btn>
							<v-btn
								flat
								color="primary"
								@click="$refs.menuTimeStart.save(
									timeStart,
									mergeTempTimeStart(timeStart)
								)">
								<span v-t="'btn-save'" class="first-letter-uppercase" />
							</v-btn>
						</v-time-picker>
					</v-menu>
				</v-flex>

				<!-- *date end -->
				<v-flex xs12 sm6 class="pr-1">
					<!-- <date-picker--menu :date-info="basicSettings.form.end_at" /> -->
					<v-menu
						ref="menuDateEnd"
						v-model="menuDateEnd"
						:close-on-content-click="false"
						:nudge-right="40"
						:return-value.sync="basicSettings.form.end_at.value"
						width="290px"
						lazy
						transition="scale-transition"
						offset-y
						min-width="290px">
						<template v-slot:activator="{ on }">
							<v-text-field
								v-model="basicSettings.form.end_at.value"
								:label="$t('event-end-date')"
								readonly
								v-on="on" />
						</template>
						<v-date-picker
							v-model="basicSettings.form.end_at.value"
							:min="basicSettings.form.start_at.value"
							scrollable>
							<v-spacer />
							<v-btn
								flat
								color="primary"
								@click="menuDateEnd = false">
								<span v-t="'btn-cancel'" class="first-letter-uppercase" />
							</v-btn>
							<v-btn
								flat
								color="primary"
								@click="$refs.menuDateEnd.save(
									basicSettings.form.end_at.value,
									cbDateEnd(),
								)">
								<span v-t="'btn-save'" class="first-letter-uppercase" />
							</v-btn>
						</v-date-picker>
					</v-menu>
				</v-flex>

				<!-- *time end -->
				<v-flex xs12 sm6>
					<!-- <time-picker--menu :time-info="basicSettings.form.end_at" /> -->
					<v-menu
						ref="menuTimeEnd"
						v-model="menuTimeEnd"
						:return-value.sync="timeEnd"
						:close-on-content-click="false"
						:nudge-right="40"
						lazy
						transition="scale-transition"
						offset-y
						min-width="290px">
						<template v-slot:activator="{ on }">
							<v-text-field
								v-model="timeEnd"
								:label="$t('event-end-time')"
								readonly
								v-on="on" />
						</template>
						<v-time-picker
							v-model="timeEnd"
							full-width>
							<v-spacer />
							<v-btn
								flat
								color="primary"
								@click="menuTimeEnd = false">
								<span v-t="'btn-cancel'" class="first-letter-uppercase" />
							</v-btn>
							<v-btn
								flat
								color="primary"
								@click="$refs.menuTimeEnd.save(
									timeEnd,
									mergeTempTimeEnd(timeEnd)
								)">
								<span v-t="'btn-save'" class="first-letter-uppercase" />
							</v-btn>
						</v-time-picker>
					</v-menu>
				</v-flex>
			</v-layout>
		</template>
	</event-setting--expand>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import debounce from '@/modules/debounce';
import EventSettingExpand from './EventSettingExpand.vue';
const initForm = () => ({
	name: {
		value: '',
		label: 'event-name',
		type: 'text',
		required: true,
		autofocus: true,
		errmsg: '',
	},
	description: {
		value: '',
		rows: 2,
		label: 'event-description',
		type: 'text',
		outline: true,
		errmsg: '',
	},
	code: {
		value: '',
		label: 'lb-event-code',
		type: 'text',
		prefix: '#',
		readonly: true,
		errmsg: '',
	},
	link: {
		value: '',
		append: 'file_copy',
		readonly: true,
		errmsg: '',
	},
	start_at: {
		labelDate: 'event-start-date',
		labelTime: 'event-start-time',
		date: null,
		time: null,
	},
	end_at: {
		labelDate: 'event-end-date',
		labelTime: 'event-end-time',
		date: null,
		time: null,
	},
});

export default {
	name: 'EventSettingInfo',
	components: {
		'event-setting--expand': EventSettingExpand,
	},
	props: {
		info: {
			type: Object,
			default: () => ({
				// ...
			}),
		},
	},
	data: () => ({
		basicExpand: {
			icon: 'info',
			title: 'event-setting-basic-title',
		},
		basicSettings: {
			form: initForm(),
		},
		menuDateStart: false,
		menuDateEnd: false,
		menuTimeStart: false,
		menuTimeEnd: false,
		timeStart: null,
		timeEnd: null,
	}),
	computed: {
		...mapGetters({
			eventInfo: 'admin/event/getEventInfo',
		}),
	},
	watch: {
		eventInfo(val) {
			if (val) {
				this.fillForm(val);
			}
		},
		'basicSettings.form.name.value': debounce(function d(val) {
			if (this.eventInfo.name !== val) {
				this.mergeTempSettings({
					name: val,
				});
			}
		}, 500),
		'basicSettings.form.description.value': debounce(function d(val) {
			if (this.eventInfo.description !== val) {
				this.mergeTempSettings({
					description: val,
				});
			}
		}, 500),
	},
	methods: {
		...mapMutations({
			mergeTempSettings: 'admin/event/MERGE_TEMP_SETTINGS',
		}),
		fillForm(val) {
			const { form } = this.basicSettings;
			const baseUrl = process.env.VUE_APP_BASE_URL;
			form.link.value = `${baseUrl}/guest/event/${val.code}`;
			for (const key of Object.keys(val)) {
				if (Object.prototype.hasOwnProperty.call(form, key)) {
					form[key].value = val[key];
				}
			}
			form.start_at.value = this.formatDate(val.start_at);
			form.end_at.value = this.formatDate(val.end_at);
			this.timeStart = this.formatTime(val.start_at);
			this.timeEnd = this.formatTime(val.end_at);
		},
		formatDate(date) {
			return new Date(date).toISOString().substr(0, 10);
		},
		formatTime(time) {
			return new Date(time).toTimeString().substr(0, 5);
		},
		cbCheckBiggerDateEnd(dateStart) {
			// this.menuTimeStart = true;
			const { form } = this.basicSettings;
			const start = new Date(dateStart).getTime();
			const end = new Date(form.end_at.value).getTime();
			if (start > end) {
				form.end_at.value = dateStart;
				this.mergeTempTimeStart(this.timeStart);
				return true;
			}
			return false;
		},
		cbDateEnd() {
			this.menuTimeEnd = true;
			this.mergeTempTimeEnd(this.timeEnd);
		},
		copyLink() {
			const markup = this.$refs.link;
			markup.focus();
			document.execCommand('selectAll', false, null);
			this.showNotify(this.$t('lb-event-link-copied'), 'success');
		},
		mergeTempTimeStart(time) {
			const parse = new Date(`${this.basicSettings.form.start_at.value}T${time}`).toISOString();
			this.mergeTempSettings({
				start_at: parse,
			});
		},
		mergeTempTimeEnd(time) {
			const parse = new Date(`${this.basicSettings.form.end_at.value}T${time}`).toISOString();
			this.mergeTempSettings({
				end_at: parse,
			});
		},
	},
};
</script>
