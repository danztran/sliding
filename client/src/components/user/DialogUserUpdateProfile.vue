<template>
	<v-dialog
		v-model="dialog"
		max-width="450px"
		:transition="false"
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
				</v-card-title>

				<v-card-actions>
					<v-layout wrap>
						<v-flex xs12>
							<v-list two-line dense>
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
											:class="{'primary white--text': !editName, 'primary--text': editName}"
											v-text="'$vuetify.icons.faces'" />
									</v-list-tile-avatar>
									<v-list-tile-content>
										<template v-if="editName">
											<text-field class="pt-4 w-100" :field="form.name" />
										</template>
										<template v-else>
											<div v-t="'lb-name'" class="caption grey--text" />
											<div class="subheading" v-text="form.name.value" />
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
															v-text="editName
																? '$vuetify.icons.cancel'
																: '$vuetify.icons.edit'" />
													</span>
												</template>
												<span v-t="editName
													? 'btn-cancel'
													: 'btn-edit'" />
											</v-tooltip>
										</v-btn>
									</v-list-tile-action>
								</v-list-tile>

								<!-- *Edit password -->
								<v-list-tile
									v-if="!editPassword"
									transition="slide-y-reverse-transition"
									@click="editPassword=true">
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
											<text-field class="pt-4 w-100" :field="form.newPassword" />
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
											<text-field class="pt-4 w-100" :field="form.reNewPassword" />
										</v-list-tile-content>
									</v-list-tile>
								</v-list>
							</v-list>
						</v-flex>
					</v-layout>
				</v-card-actions>

				<!-- *Cancel/Save -->
				<v-card-actions>
					<v-spacer />
					<v-btn
						flat
						medium
						@click="cancelEdit">
						<span v-t="'btn-cancel'" class="first-letter-uppercase" />
					</v-btn>
					<v-btn
						flat
						medium
						color="primary"
						:disabled="loading"
						@click="sendUpdate">
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
		errmsg: '',
	},
	newPassword: {
		value: '',
		label: 'lb-new-password',
		type: 'password',
		errmsg: '',
	},
	reNewPassword: {
		value: '',
		label: 'lb-re-new-password',
		type: 'password',
		errmsg: '',
	},
});

export default {
	name: 'DialogUserUpdateProfile',
	data: () => ({
		dialog: false,
		form: initForm(),
		loading: false,
		editName: false,
		editPassword: false,
	}),
	computed: {
		...mapGetters({
			user: 'auth/user',
		}),
	},
	mounted() {
		this.$root.$on('dialog-user-update-profile', () => {
			this.dialog = true;
		});
		if (this.user) {
			this.fillForm();
		}
	},
	methods: {
		fillForm() {
			for (const key of Object.keys(this.user)) {
				if (Object.prototype.hasOwnProperty.call(this.form, key)) {
					this.form[key].value = this.user[key];
				}
			}
		},
		cancelEdit() {
			this.dialog = false;
			this.editName = false;
			this.editPassword = false;
			this.fillForm();
		},
		handleEditName() {
			if (this.editName) {
				this.form.name.value = this.user.name;
				this.editName = false;
			}
			else {
				this.editName = true;
			}
		},
		handleEditPwd() {
			if (this.editPassword) {
				this.editPassword = false;
				const resetKeys = ['curPassword', 'newPassword', 'reNewPassword'];
				for (const key of resetKeys) {
					if (Object.prototype.hasOwnProperty.call(this.form, resetKeys)) {
						this.form[key].value = '';
					}
				}
			}
			else {
				this.editPassword = true;
			}
		},
		sendUpdate() {
			this.loading = true;
			const { form } = this;
			const newInfo = {
				id: this.user.id,
				name: form.name.value.trim(),
			};
			this.$axios
				.patch(this.$api.auth.update, newInfo)
				.then((res) => {
					this.loading = false;
					console.warn(res);
				})
				.catch((err) => {
					this.loading = false;
					console.warn(err);
				});
		},
	},
};
</script>

<style lang="css" scoped>
</style>
