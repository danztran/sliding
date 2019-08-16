<template>
	<v-dialog
		v-model="settingDialog"
		width="800"
		no-click-animation
		:fullscreen="isSMnXS">
		<v-card id="my-event-setting">
			<v-layout>
				<!-- *type settings left panel -->
				<v-flex
					v-if="!isSMnXS"
					md3>
					<v-card-title
						v-t="'event-setting-title'"
						class="subheading font-weight-light grey--text py-4" />
					<v-item-group
						v-model="window"
						mandatory
						tag="v-flex">
						<v-item
							active-class="primary--text font-weight-medium item-active"
							class="font-weight-light text-capitalize">
							<div slot-scope="{ active, toggle }">
								<v-card-text
									v-t="'event-setting-general'"
									:input-value="active"
									@click="toggle" />
							</div>
						</v-item>

						<v-item
							active-class="primary--text font-weight-medium item-active"
							class="font-weight-light text-capitalize">
							<div slot-scope="{ active, toggle }">
								<v-card-text
									v-t="'event-setting-features'"
									:input-value="active"
									@click="toggle" />
							</div>
						</v-item>

						<v-item
							active-class="primary--text font-weight-medium item-active"
							class="font-weight-light text-capitalize">
							<div slot-scope="{ active, toggle }">
								<v-card-text
									v-t="'event-setting-access'"
									:input-value="active"
									@click="toggle" />
							</div>
						</v-item>
					</v-item-group>
				</v-flex>

				<v-flex
					:md9="!isSMnXS"
					column>
					<!-- @desc: header - close, save-->
					<v-card-title class="pa-2">
						<!-- small divice: close btn, title -->
						<template v-if="isSMnXS">
							<v-btn
								icon
								@click="settingDialog=false">
								<v-icon
									:size="icon.sm"
									v-text="'$vuetify.icons.arrow_left'" />
							</v-btn>
							<span
								v-t="'event-setting-title'"
								class="subheading font-weight-medium" />
						</template>
						<v-spacer />

						<!-- small divice: save setting - hide: close btn -->
						<v-btn
							v-if="isSMnXS"
							color="primary"
							round
							:disabled="loadingState !== ''"
							:loading="loadingState !== ''"
							@click="saveSettings">
							<span v-t="'btn-save'" class="first-letter-uppercase" />
							<template v-slot:loader>
								<icon-loading-circle :state.sync="loadingState" />
							</template>
						</v-btn>
						<v-btn
							v-else
							icon
							@click="settingDialog=false">
							<v-icon
								color="grey lighten-1"
								:size="icon.sm"
								v-text="'$vuetify.icons.close'" />
						</v-btn>
					</v-card-title>

					<!-- @desc: settings content -->
					<setting--content :window="window" />

					<!-- @desc: footer save setting btn -->
					<v-card-actions v-if="!isSMnXS" class="pr-3">
						<v-spacer />
						<v-btn
							color="success"
							round
							:disabled="loadingState !== ''"
							:loading="loadingState !== ''"
							@click="saveSettings">
							<span v-t="'btn-save'" class="first-letter-uppercase" />
							<template v-slot:loader>
								<loading--icon-circle :state.sync="loadingState" />
							</template>
						</v-btn>
					</v-card-actions>
				</v-flex>
			</v-layout>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import EventSettingsContent from './EventSettingsContent.vue';
import LoadingIconCircle from '@/components/pieces/LoadingIconCircle.vue';

export default {
	name: 'EventSettingDialog',
	components: {
		'loading--icon-circle': LoadingIconCircle,
		'setting--content': EventSettingsContent,
	},
	data: () => ({
		icon: {
			sm: 20,
		},
		settingDialog: false,
		loadingState: '',
		window: 0,
	}),
	computed: {
		...mapGetters({
			eventInfo: 'admin/event/getEventInfo',
			tempSettings: 'admin/event/getTempSettings',
		}),
	},
	watch: {
		isSMnXS(val) {
			if (val) {
				this.window = 0;
			}
		},
	},
	mounted() {
		this.$root.$on('save-settings', () => {
			this.saveSettings();
		});
		this.$root.$on('toggle-event-setting', () => {
			this.settingDialog = true;
		});
	},
	methods: {
		...mapMutations({
			mergeEventInfo: 'admin/event/MERGE_CURRENT_EVENT',
			mergeTempSettings: 'admin/event/MERGE_TEMP_SETTINGS',
		}),
		compareTime() {
			let start = new Date(this.eventInfo.start_at);
			let end = new Date(this.eventInfo.end_at);
			const limitTime = 14 * 60000; // 14 mins
			if (this.tempSettings.start_at) {
				start = new Date(this.tempSettings.start_at);
			}
			if (this.tempSettings.end_at) {
				end = new Date(this.tempSettings.end_at);
			}
			start = start.getTime();
			end = end.getTime();
			if ((end - start) < limitTime || start >= end) {
				this.showNotify(this.$t('err-event-time'), 'danger');
				return false;
			}
			return true;
		},
		saveSettings() {
			this.loadingState = 'loading';
			// check temp settings
			for (const setting in this.tempSettings) {
				if (this.eventInfo[setting] === this.tempSettings[setting]) {
					delete this.tempSettings[setting];
				}
			}

			// check event name not empty
			if (this.tempSettings.name === '') {
				this.loadingState = '';
				this.showNotify(this.$t('err-event-name-empty'), 'danger');
				return;
			}

			// check time event valid
			if (this.tempSettings.start_at
				|| this.tempSettings.end_at) {
				if (!this.compareTime()) {
					this.loadingState = '';
					return;
				}
			}

			// emit edit event to server
			this.$socket.emit('edit-event', this.tempSettings, ({ errmsg, event }) => {
				if (errmsg) {
					this.loadingState = 'fail';
					this.showNotify(errmsg, 'danger');
					// turn back to origin settings
					this.mergeTempSettings(this.eventInfo);
					return;
				}
				this.loadingState = 'success';
				this.showNotify(this.$t('event-setting-success'), 'success');
				this.mergeEventInfo(event);
			});
		},
	},
};
</script>

<style lang="scss">
$primary-color: var(--v-primary-base);
$grey: #f3f3f3;
#my-event-setting {
	.content-setting {
		height: 70vh;
		overflow-y: scroll;
		overflow: auto;
		scroll-behavior: smooth;
	}

	.v-expansion-panel {
		box-shadow: none;
		border-bottom: 1px solid $grey;

		.v-list__tile__sub-title {
			white-space: unset;
		}

		.v-expansion-panel__container--active .v-list__tile__sub-title.hide-subtitle {
			opacity: 0;
			display: none;
		}

		.v-list--dense .v-list__tile {
			height: 8vh;
		}

		.input-code input[type="text"] {
			text-transform: uppercase;
		}
	}
	.v-expansion-panel__header {
		padding-left: 0;
	}

	.v-window__container {
		padding: 0 10%;
	}

	.item-active {
		background-color: $grey !important;
	}

	@media only screen and (max-width: 960px) {
		.content-setting {
			height: calc(100vh - 65px);
		}

		.v-window__container {
			padding: 0;
		}

		.v-expansion-panel {
			.v-list--dense .v-list__tile {
				height: 10vh;
			}
		}

		.v-expansion-panel__container--active .v-list__tile__sub-title.hide-subtitle {
			opacity: 0;
			display: none;
		}
	}
}
</style>
