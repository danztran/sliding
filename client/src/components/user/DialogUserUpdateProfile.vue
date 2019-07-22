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
				<!-- *Input -->
				<v-card-actions>
					<v-layout wrap>
						<v-flex xs12>
							<text-field :field="form.name" />
							<text-field :field="form.email" />
							<text-field :field="form.username" />
							<text-field :field="form.curPassword" />
							<text-field :field="form.newPassword" />
							<text-field :field="form.reNewPassword" />
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
		prepend: 'tag_faces',
		errmsg: '',
	},
	email: {
		value: '',
		label: 'lb-email',
		readonly: true,
		type: 'email',
		prepend: 'alternate_email',
		errmsg: '',
	},
	username: {
		value: '',
		label: 'lb-username',
		type: 'text',
		readonly: true,
		prepend: 'person',
		errmsg: '',
	},
	curPassword: {
		value: '',
		label: 'lb-current-password',
		type: 'password',
		prepend: 'lock',
		errmsg: '',
	},
	newPassword: {
		value: '',
		label: 'lb-new-password',
		type: 'password',
		prepend: 'lock',
		errmsg: '',
	},
	reNewPassword: {
		value: '',
		label: 'lb-re-new-password',
		type: 'password',
		prepend: 'lock',
		errmsg: '',
	},
});

export default {
	name: 'DialogUserUpdateProfile',
	data: () => ({
		dialog: false,
		form: initForm(),
		loading: false,
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
			this.fillForm();
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
