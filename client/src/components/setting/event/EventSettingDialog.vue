<template>
	<v-dialog
		v-model="settingDialog"
		width="800"
		:transition="false"
		:fullscreen="isSMnXS">
		<v-card id="my-event-setting">
			<v-layout>
				<!-- type settings -->
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
							@click="saveSetting" />
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
							<v-expansion-panel id="basic" expand>
								<v-expansion-panel-content>
									<!-- header expand -->
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

									<!-- field info -->
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

							<!-- @desc: Privacy -->
							<v-expansion-panel expand>
								<v-expansion-panel-content>
									<!-- header expand -->
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
													<v-list-tile-sub-title v-t="'event-setting-privacy-subtitle'" />
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
															v-model="allowSearch"
															class="right"
															color="primary" />
													</v-flex>
												</div>

												<!-- auth require -->
												<div class="d-flex w-100 mt-3">
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

							<!-- @desc: Questions -->
							<v-expansion-panel id="feature" expand>
								<v-expansion-panel-content>
									<!-- header expand -->
									<template v-slot:header>
										<v-list dense>
											<v-list-tile class="grow">
												<v-list-tile-avatar>
													<v-icon
														color="primary"
														size="20"
														v-text="'$vuetify.icons.questions'" />
												</v-list-tile-avatar>

												<v-list-tile-content class="primary--text body-2  font-weight-medium w-100">
													<v-list-tile-title v-t="'questions'" />
													<v-list-tile-sub-title v-t="'event-setting-questions-des'" />
												</v-list-tile-content>
												<v-switch
													v-model="questionExpand.questions"
													class="right"
													color="primary" />
											</v-list-tile>
										</v-list>
									</template>
									<!-- arrow -->
									<template v-slot:actions>
										<v-icon color="primary" v-text="'keyboard_arrow_down'" />
									</template>

									<!-- *option: questions, moderator review, dislike, replies,
															guest question, close questions -->
									<v-card flat>
										<v-card-text flat>
											<v-layout wrap justify-center align-center>
												<!-- moderation review Q-->
												<div class="d-flex w-100">
													<v-flex xs8>
														<div
															v-t="'moderator-view-stt'"
															class="body-1" />
														<div
															v-t="'event-moderation-des'"
															class="body-1 grey--text" />
													</v-flex>
													<v-flex xs4>
														<v-switch
															v-model="questionExpand.moderator"
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
															v-model="questionExpand.dislikes"
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
															v-model="questionExpand.replies"
															class="right"
															color="primary" />
													</v-flex>
												</div>

												<!-- uest Q -->
												<div class="d-flex w-100 mt-3">
													<v-flex xs8>
														<div
															v-t="'event-setting-guest'"
															class="body-1" />
														<div
															v-t="'event-guest-des'"
															class="body-1 grey--text" />
													</v-flex>
													<v-flex xs4>
														<v-switch
															v-model="questionExpand.anonymousQ"
															class="right"
															color="primary" />
													</v-flex>
												</div>

												<!-- close Q -->
												<div class="d-flex w-100 mt-3">
													<v-flex xs8>
														<div
															v-t="'event-setting-closeQ'"
															class="body-1" />
														<div
															v-t="'event-closeQ-des'"
															class="body-1 grey--text" />
													</v-flex>
													<v-flex xs4>
														<v-switch
															v-model="questionExpand.closeQ"
															class="right"
															color="primary" />
													</v-flex>
												</div>
											</v-layout>
										</v-card-text>
									</v-card>
								</v-expansion-panel-content>
							</v-expansion-panel>

							<!-- @desc: Polls -->
							<v-expansion-panel expand>
								<v-expansion-panel-content>
									<!-- header expand -->
									<template v-slot:header>
										<v-list dense>
											<v-list-tile class="grow">
												<v-list-tile-avatar>
													<v-icon
														color="primary"
														size="20"
														v-text="'$vuetify.icons.polls'" />
												</v-list-tile-avatar>

												<v-list-tile-content class="primary--text body-2  font-weight-medium w-100">
													<v-list-tile-title v-t="'polls'" />
													<v-list-tile-sub-title v-t="'event-setting-polls-des'" />
												</v-list-tile-content>
												<v-switch
													v-model="pollExpand.polls"
													class="right"
													color="primary" />
											</v-list-tile>
										</v-list>
									</template>
									<!-- arrow -->
									<template v-slot:actions>
										<v-icon color="primary" v-text="'keyboard_arrow_down'" />
									</template>

									<!-- *option: polls, counter, result -->
									<v-card flat>
										<v-card-text flat>
											<v-layout wrap justify-center align-center>
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
															v-model="pollExpand.pollCounter"
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
															v-model="pollExpand.pollResult"
															class="right"
															color="primary" />
													</v-flex>
												</div>
											</v-layout>
										</v-card-text>
									</v-card>
								</v-expansion-panel-content>
							</v-expansion-panel>

							<!-- @desc: Ideas -->
							<v-expansion-panel expand>
								<v-expansion-panel-content>
									<!-- header expand -->
									<template v-slot:header>
										<v-list dense>
											<v-list-tile class="grow">
												<v-list-tile-avatar>
													<v-icon
														color="primary"
														size="20"
														v-text="'$vuetify.icons.ideas'" />
												</v-list-tile-avatar>

												<v-list-tile-content class="primary--text body-2  font-weight-medium w-100">
													<v-list-tile-title v-t="'ideas'" />
													<v-list-tile-sub-title v-t="'event-setting-ideas-des'" />
												</v-list-tile-content>
												<v-switch
													v-model="ideaExpand.ideas"
													class="right"
													color="primary" />
											</v-list-tile>
										</v-list>
									</template>
									<!-- arrow -->
									<template v-slot:actions>
										<v-icon color="primary" v-text="'keyboard_arrow_down'" />
									</template>

									<!-- *option: ideas, dislike, replies, access guess ideas -->
									<v-card flat>
										<v-card-text flat>
											<v-layout wrap justify-center align-center>
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
															v-model="pollExpand.pollCounter"
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
															v-model="pollExpand.pollResult"
															class="right"
															color="primary" />
													</v-flex>
												</div>
											</v-layout>
										</v-card-text>
									</v-card>
								</v-expansion-panel-content>
							</v-expansion-panel>

							<!-- @desc: Share admin access -->
							<v-expansion-panel id="admin" expand>
								<v-expansion-panel-content>
									<!-- header expand -->
									<template v-slot:header>
										<v-list dense>
											<v-list-tile class="grow">
												<v-list-tile-avatar>
													<v-icon
														color="primary"
														size="20"
														v-text="'$vuetify.icons.group_people'" />
												</v-list-tile-avatar>

												<v-list-tile-content class="primary--text body-2  font-weight-medium w-100">
													<v-list-tile-title v-t="'event-setting-share-access'" />
													<v-list-tile-sub-title v-t="'event-setting-share-access-des'" />
												</v-list-tile-content>
											</v-list-tile>
										</v-list>
									</template>
									<!-- arrow -->
									<template v-slot:actions>
										<v-icon color="primary" v-text="'keyboard_arrow_down'" />
									</template>

									<!-- *option: ideas, dislike, replies, access guess ideas -->
									<v-card flat>
										<v-card-text flat>
											<v-layout wrap justify-center align-center>
												<!-- moderation review Q-->
												<div class="d-flex w-100">
													<text-field :field="form.adminAccess" />
													<v-btn
														v-t="'btn-invite'"
														color="primary"
														small
														round
														class="ml-2 mt-3"
														@click="submitInvite" />
												</div>
											</v-layout>
										</v-card-text>
									</v-card>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-window-item>
					</v-window>

					<!-- actions: save setting btn -->
					<v-card-actions v-if="!isSMnXS">
						<v-spacer />
						<v-btn
							v-t="'btn-save'"
							color="success"
							flat
							@click="saveSetting" />
					</v-card-actions>
				</v-flex>
			</v-layout>
		</v-card>
	</v-dialog>
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
	},
	adminAccess: {
		value: '',
		type: 'text',
		label: 'lb-admin-access-mail',
		prepend: 'person',
		errmsg: ''
	}
});

export default {
	name: 'EventSettingDialog',
	data: () => ({
		settingDialog: false,
		expand: 0,
		icon: {
			sm: 20
		},
		form: initForm(),
		questionExpand: {
			questions: true,
			moderator: false,
			dislikes: false,
			replies: true,
			anonymousQ: true,
			closeQ: false
		},
		pollExpand: {
			polls: true,
			pollCounter: true,
			pollResult: false
		},
		ideaExpand: {
			ideas: false,
			dislikes: false,
			replies: false,
			anonymousIdea: true
		}
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
		},
		isSMnXS() {
			return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
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
	},
	mounted() {
		this.$root.$on('toggle-event-setting', () => {
			this.settingDialog = true;
		});
	},
	methods: {
		submitInvite() {},
		saveSetting() {}
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
			padding-left: 18%;
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

		.v-expansion-panel__container--active .v-list__tile__sub-title {
			opacity: 0;
			display: none;
		}
	}
}
</style>
