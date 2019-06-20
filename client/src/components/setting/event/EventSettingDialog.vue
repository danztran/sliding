<template>
	<v-dialog
		v-model="settingDialog"
		width="800">
		<v-card id="my-event-setting">
			<v-layout>
				<v-flex xs3>
					<v-card-title
						v-t="'event-setting-title'"
						class="subheading font-weight-light grey--text py-4" />
					<v-item-group
						v-model="expand"
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

				<v-flex xs9 column>
					<v-card-title class="pa-2">
						<v-spacer />
						<v-btn icon @click="settingDialog=false">
							<v-icon
								color="grey lighten-1"
								:size="icon.sm"
								v-text="'$vuetify.icons.close'" />
						</v-btn>
					</v-card-title>

					<v-window
						id="content-setting"
						v-model="expand"
						vertical>
						<window-general />
						<window-features />
						<window-access />
					</v-window>

					<v-card-actions>
						<v-spacer />
						<v-btn
							v-t="'btn-save'"
							color="primary"
							flat
							@click="saveSetting" />
					</v-card-actions>
				</v-flex>
			</v-layout>
		</v-card>
	</v-dialog>
</template>

<script>
import SettingGeneral from './SettingGeneral.vue';
import SettingFeatures from './SettingFeatures.vue';
import SettingAccess from './SettingAccess.vue';

export default {
	name: 'EventSettingDialog',
	components: {
		'window-general': SettingGeneral,
		'window-features': SettingFeatures,
		'window-access': SettingAccess
	},
	data: () => ({
		settingDialog: false,
		expand: 0,
		icon: {
			sm: 20
		}
	}),
	mounted() {
		this.$root.$on('toggle-event-setting', () => {
			this.settingDialog = true;
		});
	},
	methods: {
		saveSetting() {}
	}
};
</script>

<style lang="scss">
$primary-color: #3da4b5;
$grey: #f3f3f3;
#my-event-setting {
	#content-setting {
		height: 70vh;
		overflow-y: scroll;
		overflow: auto;
	}

	.v-expansion-panel {
		box-shadow: none;
		border-bottom: 1px solid $grey;

		.v-card__text {
			padding-top: 0;
			padding-left: 18%;
		}
	}
	.v-expansion-panel__header {
		padding-left: 0;
	}

	.v-window__container {
		padding: 0 15%;
	}

	.item-active {
		background-color: $grey !important;
	}
}
</style>
