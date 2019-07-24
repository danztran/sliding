<template>
	<!-- @desc: Admin invite moderator -->
	<event-setting--expand :info="adminExpand">
		<template #content>
			<div class="d-flex w-100">
				<text-field
					:field="form.email"
					@keydown.native.enter.capture="handleInvite" />
				<v-btn
					id="invite-btn"
					color="primary"
					small
					round
					class="ml-2 mt-3"
					:disabled="loadingState !== ''"
					:loading="loadingState !== ''"
					@click="handleInvite">
					<span v-t="'btn-invite'" class="first-letter-uppercase" />
					<template v-slot:loader>
						<icon-loading-circle :state.sync="loadingState" />
					</template>
				</v-btn>
			</div>

			<!-- *list moderator -->
			<div class="d-flex w-100">
				<v-slide-y-transition group>
					<invite-card--info
						v-for="moderator in moderators"
						:key="moderator.user_id"
						:info="moderator"
						@remove-moderator="removeModerator(moderator)" />
				</v-slide-y-transition>
			</div>
		</template>
	</event-setting--expand>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import EventSettingExpand from './EventSettingExpand.vue';
import InviteInfoCard from './pieces/InviteInfoCard.vue';
import IconLoadingCircle from '@/components/pieces/IconLoadingCircle.vue';

const initForm = () => ({
	email: {
		value: '',
		type: 'text',
		label: 'lb-admin-access-mail',
		placeholderz: 'email@example.com',
		prepend: 'alternate_email',
		errmsg: '',
	},
});

export default {
	name: 'EventSettingInviteAdmin',
	components: {
		'event-setting--expand': EventSettingExpand,
		'invite-card--info': InviteInfoCard,
		'icon-loading-circle': IconLoadingCircle,
	},
	data: () => ({
		adminExpand: {
			icon: 'group_people',
			title: 'event-setting-share-access',
			subtitle: 'event-setting-share-access-des',
		},
		form: initForm(),
		loadingState: '',
		moderators: '',
	}),
	computed: {
		...mapGetters({
			eventInfo: 'admin/event/getEventInfo',
			tempSettings: 'admin/event/getTempSettings',
		}),
	},
	watch: {
		'eventInfo.admins': function getModerators(val) {
			if (val && val.length > 1) {
				this.moderators = val.filter(el => el.role === 'moderator');
			}
		},
	},
	methods: {
		...mapMutations({
			addModerator: 'admin/event/ADD_MODERATOR',
		}),
		handleInvite() {
			const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (this.form.email.value === '') {
				this.form.email.errmsg = this.$t('requireField');
				return;
			}
			if (!emailPattern.test(this.form.email.value)) {
				this.form.email.errmsg = this.$t('invalid-email');
				return;
			}
			this.sendInvite();
		},
		sendInvite() {
			this.loadingState = 'loading';
			const emiter = 'add-moderator';
			this.$socket.emit(emiter, { email: this.form.email.value }, ({ user, errmsg }) => {
				if (!user) {
					if (errmsg) {
						this.showNotify(errmsg, 'danger');
					}
					this.loadingState = 'fail';
					return;
				}
				this.loadingState = 'success';
				this.addModerator({
					...user,
					user_id: user.id,
					role: 'moderator',
				});
				this.form.email.value = '';
			});
		},
		removeModerator(info) {
			const emiter = 'remove-moderator';
			this.$socket.emit(emiter, { user_id: info.user_id }, (data) => {
				console.warn(data);
			});
		},
	},
};
</script>

<style lang="css" scoped>
#invite-btn {
	min-width: 50px;
	max-width: 85px;
}
</style>
