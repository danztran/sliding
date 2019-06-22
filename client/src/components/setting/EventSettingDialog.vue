<template>
	<v-dialog
		v-model="settingDialog"
		width="800"
		:transition="false"
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

				<!-- *main contain -->
				<v-flex
					:md9="!isSMnXS"
					column>
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
							v-t="'btn-save'"
							color="primary"
							round
							@click="saveSettings" />
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

					<!-- content settings -->
					<v-window
						class="content-setting scrollbar-primary"
						vertical>
						<v-window-item
							:reverse-transition="false"
							:transition="false">
							<!-- @desc: Basic infomation -->
							<event-setting--expand :info="basic">
								<template slot="subtitle-text">
									<v-list-tile-sub-title class="text-uppercase">
										• #{{ eventInfo ? eventInfo.code : '...' }}
									</v-list-tile-sub-title>
								</template>

								<template slot="switch-on-title">
									<v-switch
										v-model="privacy.requireLogin"
										class="right"
										color="primary" />
								</template>

								<template slot="content">
									<v-flex xs12>
										<text-field
											:field="basic.form.name" />
										<text-area
											class="pt-2"
											:field="basic.form.description" />
										<text-field
											class="input-code"
											:field="basic.form.code" />
										<text-field
											:field="basic.form.link" />
									</v-flex>
								</template>
							</event-setting--expand>

							<!-- @desc: Privacy -->
							<event-setting--expand :info="privacy">
								<template slot="content">
									<!-- allow search -->
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
												v-model="privacy.allow_search"
												class="right"
												color="primary" />
										</v-flex>
									</div>

									<!-- auth require -->
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
												:input-value="privacy.require_passcode"
												class="right"
												color="primary"
												@change="toggleEnblePasscode" />
										</v-flex>
									</div>

									<div class="d-flex w-100 mr-5">
										<text-field
											v-show="privacy.require_passcode"
											:field="basic.form.passcode" />
									</div>

									<!-- guest(anonymous) Q -->
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
												v-model="privacy.requireLogin"
												class="right"
												color="primary" />
										</v-flex>
									</div>
								</template>
							</event-setting--expand>

							<!-- @desc: Questions -->
							<event-setting--expand :info="question">
								<template slot="switch-on-title">
									<v-switch
										v-model="question.allow_question"
										class="right"
										color="primary" />
								</template>

								<template slot="content">
									<!-- moderation review Q-->
									<div class="d-flex w-100">
										<v-flex xs8>
											<div
												v-t="'moderation-view-stt'"
												class="body-1" />
											<div
												v-t="'event-moderation-des'"
												class="body-1 grey--text" />
										</v-flex>
										<v-flex xs4>
											<v-switch
												v-model="question.on_moderation"
												class="right"
												color="primary" />
										</v-flex>
									</div>

									<!-- dislikes Q -->
									<div class="d-flex w-100 mt-3">
										<v-flex xs8>
											<div
												v-t="'event-setting-dislikes'"
												class="body-1" />
											<div
												v-t="'event-dislikes-des'"
												class="body-1 grey--text" />
										</v-flex>
										<v-flex xs4>
											<v-switch
												v-model="question.dislikes"
												class="right"
												color="primary" />
										</v-flex>
									</div>

									<!-- replies Q -->
									<div class="d-flex w-100 mt-3">
										<v-flex xs8>
											<div
												v-t="'event-setting-replies'"
												class="body-1" />
											<div
												v-t="'event-replies-des'"
												class="body-1 grey--text" />
										</v-flex>
										<v-flex xs4>
											<v-switch
												v-model="question.allow_question_reply"
												class="right"
												color="primary" />
										</v-flex>
									</div>
								</template>
							</event-setting--expand>

							<!-- @desc: Polls -->
							<event-setting--expand :info="poll">
								<template slot="switch-on-title">
									<v-switch
										v-model="poll.allow_poll"
										class="right"
										color="primary" />
								</template>

								<template slot="content">
									<!-- moderation review Q-->
									<div class="d-flex w-100">
										<v-flex xs8>
											<div
												v-t="'event-setting-poll-counter'"
												class="body-1" />
											<div
												v-t="'event-setting-poll-counter-des'"
												class="body-1 grey--text" />
										</v-flex>
										<v-flex xs4>
											<v-switch
												v-model="poll.pollCounter"
												class="right"
												color="primary" />
										</v-flex>
									</div>

									<!-- dislikes Q -->
									<div class="d-flex w-100 mt-3">
										<v-flex xs8>
											<div
												v-t="'event-setting-poll-result'"
												class="body-1" />
											<div
												v-t="'event-setting-poll-result-des'"
												class="body-1 grey--text" />
										</v-flex>
										<v-flex xs4>
											<v-switch
												v-model="poll.pollResult"
												class="right"
												color="primary" />
										</v-flex>
									</div>
								</template>
							</event-setting--expand>

							<!-- @desc: Ideas -->
							<event-setting--expand :info="idea">
								<template slot="switch-on-title">
									<v-switch
										v-model="idea.allow_idea"
										class="right"
										color="primary" />
								</template>

								<template slot="content">
									<!-- ideas dislike-->
									<div class="d-flex w-100">
										<v-flex xs8>
											<div
												v-t="'event-setting-dislikes'"
												class="body-1" />
											<div
												v-t="'event-setting-idea-dislike-des'"
												class="body-1 grey--text" />
										</v-flex>
										<v-flex xs4>
											<v-switch
												v-model="idea.dislikes"
												class="right"
												color="primary" />
										</v-flex>
									</div>

									<!-- replies -->
									<div class="d-flex w-100 mt-3">
										<v-flex xs8>
											<div
												v-t="'event-setting-replies'"
												class="body-1" />
											<div
												v-t="'event-setting-idea-replies-des'"
												class="body-1 grey--text" />
										</v-flex>
										<v-flex xs4>
											<v-switch
												v-model="idea.allowReply"
												class="right"
												color="primary" />
										</v-flex>
									</div>

									<!-- anonymous ideas -->
									<div class="d-flex w-100 mt-3">
										<v-flex xs8>
											<div
												v-t="'event-setting-idea-guest'"
												class="body-1" />
											<div
												v-t="'event-setting-idea-guest-des'"
												class="body-1 grey--text" />
										</v-flex>
										<v-flex xs4>
											<v-switch
												v-model="idea.anonymousIdea"
												class="right"
												color="primary" />
										</v-flex>
									</div>
								</template>
							</event-setting--expand>

							<!-- @desc: Admin -->
							<event-setting--expand :info="admin">
								<template slot="content">
									<div class="d-flex w-100">
										<text-field :field="basic.form.adminInvite" />
										<v-btn
											v-t="'btn-invite'"
											color="primary"
											small
											round
											class="ml-2 mt-3"
											@click="submitInvite" />
									</div>
								</template>
							</event-setting--expand>
						</v-window-item>
					</v-window>

					<!-- actions: save setting btn -->
					<v-card-actions v-if="!isSMnXS">
						<v-spacer />
						<v-btn
							v-t="'btn-save'"
							color="success"
							flat
							@click="saveSettings" />
					</v-card-actions>
				</v-flex>
			</v-layout>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
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
	},
	passcode: {
		value: '',
		label: 'lb-event-passcode',
		type: 'text',
		prepend: 'lock',
		required: true,
		errmsg: ''
	},
	adminInvite: {
		value: '',
		type: 'text',
		label: 'lb-admin-access-mail',
		prepend: 'person',
		errmsg: ''
	}
});

export default {
	name: 'EventSettingDialog',
	components: {
		'event-setting--expand': EventSettingExpand
	},
	data: () => ({
		icon: {
			sm: 20
		},
		basicExpand: {
			icon: 'info',
			title: 'event-setting-basic-title'
		},
		privacyExpand: {
			icon: 'privacy',
			title: 'event-setting-privacy-title',
			subtitle: 'event-setting-privacy-subtitle'
		},
		questionExpand: {
			icon: 'questions',
			title: 'questions',
			subtitle: 'event-setting-questions-des'
		},
		settingDialog: false,
		settingTimeDialogs: {
			dateStart: false,
			dateEnd: false,
			timeStart: false,
			timeEnd: false
		},
		basic: {
			icon: 'info',
			title: 'event-setting-basic-title',
			form: initForm(),
			start_at: null,
			end_at: null
		},
		privacy: {
			icon: 'privacy',
			title: 'event-setting-privacy-title',
			subtitle: 'event-setting-privacy-subtitle',
			allow_search: false,
			require_passcode: false,
			passcode: null,
			require_login: false
		},
		question: {
			icon: 'questions',
			title: 'questions',
			subtitle: 'event-setting-questions-des',
			allow_question: false,
			on_moderation: false,
			allow_question_reply: true,
			dislikes: false
		},
		poll: {
			icon: 'polls',
			title: 'polls',
			subtitle: 'event-setting-polls-des',
			allow_poll: false,
			poll_counter: true,
			poll_result: false
		},
		idea: {
			icon: 'ideas',
			title: 'ideas',
			subtitle: 'event-setting-ideas-des',
			allow_idea: false,
			dislikes: false,
			allow_reply: false,
			anonymous_idea: true
		},
		admin: {
			icon: 'group_people',
			title: 'event-setting-share-access',
			subtitle: 'event-setting-share-access-des'
		},
		tempSettings: {}
	}),
	computed: {
		...mapGetters({
			eventInfo: 'admin/event/infoEvent'
		}),
		isSMnXS() {
			return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
		}
	},
	watch: {
		eventInfo(val) {
			if (this._cm.notEmpty(val)) {
				const { eventInfo, basic, privacy, question } = this;
				const baseUrl = process.env.VUE_APP_BASE_URL;

				// *basic settings
				basic.form.name.value = eventInfo.name;
				basic.form.description.value = eventInfo.description;
				basic.form.code.value = eventInfo.code;
				basic.form.link.value = `${baseUrl}/guest/event/${eventInfo.code}`;
				basic.start_at = eventInfo.start_at;
				basic.end_at = eventInfo.end_at;

				// *privacy settings
				privacy.allow_search = eventInfo.allow_search;
				privacy.require_passcode = eventInfo.require_passcode;
				privacy.passcode = eventInfo.passcode;

				// *question settings
				question.allow_question = eventInfo.allow_question;
				question.on_moderation = eventInfo.on_moderation;
				question.allow_question_reply = eventInfo.allow_question_reply;
			}
		}
	},
	mounted() {
		this.$root.$on('toggle-event-setting', () => {
			this.settingDialog = true;
		});
		this.$root.$on('toggle-mode-moderation', () => {
			this.tempSettings.on_moderation = !this.eventInfo.on_moderation;
			this.saveSettings();
		});
	},
	methods: {
		...mapMutations({
			mergeEventInfo: 'admin/event/MERGE_CURRENT_EVENT'
		}),
		toggleEnblePasscode() {
			this.privacy.require_passcode = !this.privacy.require_passcode;
		},
		submitInvite() {},
		saveSettings() {
			// check temp settings
			for (const setting in this.tempSettings) {
				if (this.eventInfo[setting] === this.tempSettings[setting]) {
					delete this.tempSettings[setting];
				}
			}
			// emit edit event to server
			this.$socket.emit('edit-event', this.tempSettings, ({ errmsg, event }) => {
				if (errmsg) {
					// handle error
					return;
				}
				this.mergeEventInfo(event);
				this.tempSettings = {};
			});
		}
	}
};
</script>

<style lang="scss">
$primary-color: #3da4b5;
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

		.v-expansion-panel__container--active .v-list__tile__sub-title {
			opacity: 0;
			display: none;
		}

		.v-list--dense .v-list__tile {
			height: 8vh;
		}

		.v-card__text {
			padding-top: 0;
			padding-left: 15%;
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

			.v-card__text {
				padding-left: 20%;
			}
		}

		.v-expansion-panel__container--active .v-list__tile__sub-title {
			opacity: 0;
			display: none;
		}
	}
}
</style>
