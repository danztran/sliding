<template>
	<v-dialog
		v-model="guestDialogProfile"
		max-width="500px">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-card>
			<loading-linear :loading="loading" />
			<v-card-title>
				<span
					v-t="'guest-profile-update-title-dialog'"
					class="pl-3 grey--text text--darken-1" />
				<v-spacer />
				<v-menu
					bottom
					left>
					<template v-slot:activator="{ on }">
						<v-btn
							small
							icon
							v-on="on"
							@click="guestDialogProfile=false">
							<v-icon
								color="grey lighten--2"
								size="20"
								v-text="'$vuetify.icons.close'" />
						</v-btn>
					</template>
				</v-menu>
			</v-card-title>

			<v-container grid-list-xs class="pt-0">
				<v-layout
					wrap
					justify-center
					align-center>
					<v-flex id="dialog-avatar" xs12 sm8>
						<v-card-title>
							<v-avatar size="70" color="grey lighten-4">
								<v-icon size="30" v-text="'$vuetify.icons.person'" />
							</v-avatar>
						</v-card-title>
					</v-flex>
					<v-flex xs12 sm8>
						<text-field :field="form.name" />
						<text-field :field="form.email" />
						<text-field :field="form.username" />
						<text-field :field="form.password" />
						<text-field :field="form.rePassword" />
						<div v-if="errMsg !== ''" class="error--text text-xs-center mt-2">
							{{ errMsg }}
						</div>
						<div class="layout wrap justify-center align-center">
							<v-btn
								v-t="'btn-save'"
								round
								medium
								color="success"
								@click="sendUpdate" />
						</div>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
const initForm = () => ({
	name: {
		label: 'lb-name',
		value: '',
		required: true,
		type: 'text',
		prepend: 'person',
		autofocus: true,
		errmsg: '',
	},
	email: {
		label: 'lb-email',
		value: '',
		required: true,
		type: 'text',
		prepend: 'alternate_email',
		errmsg: '',
	},
	username: {
		value: '',
		label: 'lb-username',
		required: true,
		prepend: 'person',
		errmsg: '',
	},
	password: {
		value: '',
		label: 'lb-password',
		required: true,
		type: 'password',
		prepend: 'lock',
		errmsg: '',
	},
	rePassword: {
		value: '',
		label: 'lb-re-password',
		required: true,
		type: 'password',
		prepend: 'lock',
		errmsg: '',
	},
});

export default {
	name: 'AnonyUpdateSignupDialog',
	data: () => ({
		guestDialogProfile: false,
		form: initForm(),
		errMsg: '',
		loading: false,
	}),
	computed: {
		...mapGetters({
			user: 'auth/user',
		}),
	},
	watch: {
		'form.password.value': function cpPwd(val) {
			const rePassword = this.form.rePassword.value;
			if (val !== '' && rePassword !== '') {
				if (rePassword !== val && val !== rePassword) {
					this.form.rePassword.errmsg = this.$t('password-not-match');
				}
				else {
					this.form.rePassword.errmsg = '';
				}
			}
		},
		'form.rePassword.value': function cpPwd(val) {
			if (val !== this.form.password.value) {
				this.form.rePassword.errmsg = this.$t('password-not-match');
			}
		},
		'form.email.value': function checkEmail(val) {
			const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!emailPattern.test(val)) {
				this.form.email.errmsg = this.$t('invalid-email');
			}
		},
	},
	mounted() {
		if (this.user) {
			this.form.name.value = this.user.name;
		}
		this.$root.$on('guest-signup-dialog', () => {
			this.guestDialogProfile = true;
		});
	},
	methods: {
		fieldValid() {
			for (const key of Object.keys(this.form)) {
				if (Object.prototype.hasOwnProperty.call(this.form, key)) {
					if (this.form[key].errmsg !== '' || this.form[key].value === '') {
						return false;
					}
				}
			}
			return true;
		},
		sendUpdate() {
			this.loading = true;
			if (!this.fieldValid()) {
				this.loading = false;
				this.errMsg = this.$t('err-some-field');
				setTimeout(() => {
					this.errMsg = '';
				}, 2000);
				return;
			}

			const { form } = this;
			const infoFormData = {
				name: form.name.value.trim(),
				email: form.email.value.trim(),
				username: form.username.value.trim(),
				password: form.password.value.trim(),
				rePassword: form.rePassword.value.trim(),
			};
			this.$axios
				.patch(this.$api.auth.updateQSignup, infoFormData)
				.then((res) => {
					const updateInfo = {
						...this.user,
						...infoFormData,
					};
					this.$socket.emit('update-authen');
					this.$store.dispatch('auth/setAuth', updateInfo);
					this.guestDialogProfile = false;
					this.showNotify(this.$t('anonymous-info-update-success'), 'success');
				})
				.catch(err => this.handleErrorMessages(err.messages))
				.then(() => {
					this.loading = false;
				});
		},
	},
};
</script>

<style lang="css">
#dialog-avatar {
	display: flex;
	justify-content: center;
}
</style>
