<template>
	<v-dialog
		id="my-dialog-profile"
		v-model="dialog"
		max-width="450px"
		no-click-animation
		:fullscreen="isSMnXS">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-card>
			<loading-linear :loading="loading" />
			<v-container class="pb-2">
				<v-card-title class="py-1 px-2" primary-title>
					<div
						v-t="'dialog-user-edit-info'"
						class="headline font-weight-light first-letter-uppercase" />
					<v-spacer />
					<!-- *Button close -->
					<v-btn
						icon
						@click="dialog=false">
						<v-icon
							size="20"
							v-text="'$vuetify.icons.close'" />
					</v-btn>
				</v-card-title>

				<v-layout wrap class="content">
					<v-flex xs12>
						<v-form ref="form">
							<v-list id="list-input" two-line dense>
								<!-- *Username read-only -->
								<v-list-tile>
									<v-list-tile-avatar size="35">
										<v-icon
											small
											class="primary white--text"
											v-text="'$vuetify.icons.person'" />
									</v-list-tile-avatar>
									<v-list-tile-content>
										<div v-t="'lb-username'" class="caption grey--text" />
										<div class="subheading" v-text="form.username.value" />
									</v-list-tile-content>
								</v-list-tile>

								<!-- *Email read-only -->
								<v-list-tile>
									<v-list-tile-avatar size="35">
										<v-icon
											small
											class="primary white--text"
											v-text="'$vuetify.icons.mail'" />
									</v-list-tile-avatar>
									<v-list-tile-content>
										<div v-t="'lb-email'" class="caption grey--text" />
										<div class="subheading" v-text="form.email.value" />
									</v-list-tile-content>
								</v-list-tile>

								<!-- *Edit name -->
								<v-list-tile>
									<v-list-tile-avatar size="35">
										<v-icon
											small
											:class="{'primary white--text': !openUName, 'primary--text': openUName}"
											v-text="'$vuetify.icons.faces'" />
									</v-list-tile-avatar>
									<v-list-tile-content>
										<template v-if="openUName">
											<text-field id="input-name" class="pt-4 w-100" :field="form.name" />
										</template>
										<template v-else>
											<div v-t="'lb-name'" class="caption grey--text" />
											<div class="subheading text-capitalize" v-text="form.name.value" />
										</template>
									</v-list-tile-content>
									<v-list-tile-action>
										<v-btn icon ripple @click="handleEditName">
											<v-tooltip bottom>
												<template v-slot:activator="{ on }">
													<span v-on="on">
														<v-icon
															small
															color="grey lighten-1"
															v-text="openUName
																? '$vuetify.icons.cancel'
																: '$vuetify.icons.edit'" />
													</span>
												</template>
												<span v-t="openUName
													? 'btn-cancel'
													: 'btn-edit'" />
											</v-tooltip>
										</v-btn>
									</v-list-tile-action>
								</v-list-tile>

								<!-- *Edit password -->
								<v-list-tile
									v-if="!openUPwd"
									transition="slide-y-reverse-transition"
									@click="openUPwd=true">
									<v-list-tile-avatar size="35">
										<v-icon
											small
											color="primary"
											v-text="'$vuetify.icons.edit'" />
									</v-list-tile-avatar>
									<v-list-tile-content>
										<div
											v-t="'btn-edit-password'"
											class="subheading primary--text first-letter-uppercase" />
									</v-list-tile-content>
								</v-list-tile>

								<v-list v-else>
									<v-form ref="form">
										<v-list-tile>
											<v-list-tile-avatar size="35">
												<v-icon
													small
													class="primary--text"
													v-text="'$vuetify.icons.lock'" />
											</v-list-tile-avatar>
											<v-list-tile-content>
												<text-field class="pt-4 w-100" :field="form.curPassword" />
											</v-list-tile-content>
										</v-list-tile>

										<v-list-tile>
											<v-list-tile-avatar size="35">
												<v-icon
													small
													class="primary--text"
													v-text="'$vuetify.icons.lock'" />
											</v-list-tile-avatar>
											<v-list-tile-content>
												<text-field class="pt-4 w-100" :field="form.password" />
											</v-list-tile-content>
										</v-list-tile>

										<v-list-tile>
											<v-list-tile-avatar size="35">
												<v-icon
													small
													class="primary--text"
													v-text="'$vuetify.icons.lock'" />
											</v-list-tile-avatar>
											<v-list-tile-content>
												<text-field class="pt-4 w-100" :field="form.reEnterPassword" />
											</v-list-tile-content>
										</v-list-tile>
									</v-form>
								</v-list>
							</v-list>
						</v-form>
					</v-flex>
				</v-layout>

				<div class="text-xs-center red--text" v-text="dialogErrMsg" />
				<!-- *Cancel/Save -->
				<v-card-actions>
					<v-spacer />
					<v-btn
						flat
						medium
						@click="formatForm">
						<span v-t="'btn-cancel'" class="first-letter-uppercase" />
					</v-btn>
					<v-btn
						flat
						medium
						color="primary"
						:disabled="loading"
						@click="submitUpdate">
						<span v-t="'btn-save'" class="first-letter-uppercase" />
					</v-btn>
				</v-card-actions>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
const initForm = () => ({
	name: {
		value: '',
		label: 'lb-name',
		type: 'text',
		autofocus: true,
		required: true,
		errmsg: '',
	},
	email: {
		value: '',
		errmsg: '',
	},
	username: {
		value: '',
		errmsg: '',
	},
	curPassword: {
		value: '',
		label: 'lb-current-password',
		type: 'password',
		autofocus: true,
		required: false,
		errmsg: '',
	},
	password: {
		value: '',
		label: 'lb-new-password',
		type: 'password',
		required: false,
		errmsg: '',
	},
	reEnterPassword: {
		value: '',
		label: 'lb-re-new-password',
		type: 'password',
		required: false,
		errmsg: '',
	},
});

export default {
	name: 'DialogUserUpdateProfile',
	data: () => ({
		dialog: false,
		dialogErrMsg: '',
		form: initForm(),
		loading: false,
		openUName: false,
		openUPwd: false,
	}),
	computed: {
		...mapGetters({
			user: 'auth/user',
		}),
	},
	created() {
		if (this.user) {
			this.fillForm();
		}
	},
	mounted() {
		this.$root.$on('dialog-user-update-profile', () => {
			this.dialog = true;
		});
	},
	methods: {
		fillForm() {
			for (const key of Object.keys(this.user)) {
				if (Object.prototype.hasOwnProperty.call(this.form, key)) {
					this.form[key].value = this.user[key];
				}
			}
		},
		formatForm() {
			this.dialog = false;
			this.openUName = false;
			this.fillForm();
			if (this.openUPwd) {
				this.$refs.form.reset();
				this.openUPwd = false;
			}
		},
		handleEditName() {
			if (this.openUName) {
				this.form.name.value = this.user.name;
				this.openUName = false;
			}
			else {
				this.openUName = true;
			}
		},
		hadFillPwd() {
			let count = 3;
			for (const key of ['curPassword', 'password', 'reEnterPassword']) {
				if (this.form[key].value === '') {
					count -= 1;
				}
			}
			return count;
		},
		submitUpdate() {
			const countPwdField = this.hadFillPwd();
			const newInfo = {};
			if (countPwdField === 0) {
				if (this.openUName && this.user.name !== this.form.name.value) {
					newInfo.name = this.form.name.value;
				}
			}
			else if (countPwdField === 1 || countPwdField === 2) {
				this.dialogErrMsg = 'nhap day du de doi pwd';
				return;
			}
			else {
				if (this.form.password.value !== this.form.reEnterPassword.value) {
					this.dialogErrMsg = 'pwd not matched';
					return;
				}
				if (this.openUName && this.user.name !== this.form.name.value) {
					newInfo.name = this.form.name.value;
				}
				newInfo.curPassword = this.form.curPassword.value;
				newInfo.password = this.form.password.value;
			}

			if (Object.keys(newInfo).length < 1) {
				return;
			}
			this.dialogErrMsg = '';
			this.loading = true;
			this.$axios
				.patch(this.$api.auth.update, newInfo)
				.then((res) => {
					this.loading = false;
					this.$store.dispatch('auth/setAuth', res.data.messages.newInfo);
					this.showNotify(res.data.messages['auth.update'], 'success');
					this.formatForm();
				})
				.catch((err) => {
					this.loading = false;
					this.handleErrorMessages(err.messages);
					console.warn(err);
				});
		},
	},
};
</script>

<style lang="css">
#input-name input {
	text-transform: capitalize !important;
}
#list-input .v-list__tile {
	height: 65px;
}
#list-input .v-list__tile__content {
	height: 80px;
}
@media only screen and (max-width: 960px) {
	.content {
		height: calc(100vh - 135px);
	}
}
</style>
