<template>
	<v-dialog
		v-model="guestDialogProfile"
		max-width="500px">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-card>
			<v-card-title>
				<span
					class="pl-3 grey--text text--darken-1"
					v-t="'guest-profile-title-dialog'" />
				<v-spacer></v-spacer>
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
								v-html="'$vuetify.icons.close'">
							</v-icon>
						</v-btn>
					</template>
				</v-menu>
			</v-card-title>

			<v-container grid-list-xs class="pt-0">
				<v-layout wrap justify-center align-center>
					<v-flex id="dialog-avatar" xs12 sm8>
						<v-card-title>
							<v-avatar size="70" color="grey lighten-4">
								<v-icon size="30" v-html="'$vuetify.icons.person'"></v-icon>
							</v-avatar>
						</v-card-title>
					</v-flex>
					<v-flex xs12 sm8>
						<text-field :field="form.name" />
						<text-field :field="form.company" />
						<text-field :field="form.email" />
						<div class="layout wrap justify-center align-center">
							<v-btn
								round
								medium
								color="success"
								v-t="'btn-save'"/>
						</div>
					</v-flex>
				</v-layout>
			</v-container>

		</v-card>
	</v-dialog>
</template>

<script>
const initForm = () => ({
	name: {
		label: 'lb-name',
		value: '',
		type: 'text',
		prepend: 'person',
		autofocus: true,
		errmsg: ''
	},
	company: {
		label: 'lb-company',
		value: '',
		type: 'text',
		prepend: 'business',
		errmsg: ''
	},
	email: {
		label: 'lb-email',
		value: '',
		type: 'text',
		prepend: 'mail',
		errmsg: ''
	}
});

export default {
	name: 'ProfileDialog',
	data: () => ({
		guestDialogProfile: false,
		form: initForm()
	}),
	mounted() {
		this.$root.$on('guest-profile-dialog', () => {
			this.guestDialogProfile = true;
		});
	}
};
</script>

<style lang="css">
#dialog-avatar {
	display: flex;
	justify-content: center;
}
</style>
