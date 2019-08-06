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
						<loading--icon-circle :state.sync="loadingState" />
					</template>
				</v-btn>
			</div>

			<!-- *list moderator -->
			<div class="d-flex w-100">
				<v-slide-y-transition group>
					<invite-card--info
						v-for="moderator in moderators"
						:key="moderator.updated_at"
						:info="moderator"
						:class="{ deleting }"
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
import LoadingIconCircle from '@/components/pieces/LoadingIconCircle.vue';

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
		'loading--icon-circle': LoadingIconCircle,
	},
	data: () => ({
		adminExpand: {
			icon: 'group_people',
			title: 'event-setting-share-access',
			subtitle: 'event-setting-share-access-des',
		},
		form: initForm(),
		loadingState: '',
		deleting: false,
	}),
	computed: {
		...mapGetters({
			user: 'auth/user',
			eventInfo: 'admin/event/getEventInfo',
			tempSettings: 'admin/event/getTempSettings',
		}),
		moderators() {
			return this.eventInfo ? this.eventInfo.admins.filter(e => e.role === 'moderator') : [];
		},
	},
	methods: {
		...mapMutations({
			addModerator: 'admin/event/ADD_MODERATOR',
			deleteModerator: 'admin/event/DELETE_MODERATOR',
		}),
		handleInvite() {
			const email = this.form.email.value;
			const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (email === '') {
				this.form.email.errmsg = this.$t('requireField');
				return;
			}
			if (email === this.user.email) {
				this.form.email.errmsg = this.$t('invite-yourself');
				return;
			}
			if (!emailPattern.test(email)) {
				this.form.email.errmsg = this.$t('invalid-email');
				return;
			}
			this.form.email.errmsg = '';
			this.sendInvite();
		},
		sendInvite() {
			this.loadingState = 'loading';
			const emiter = 'add-moderator';
			this.$socket.emit(emiter, { email: this.form.email.value }, ({ user, errmsg }) => {
				if (!user) {
					if (errmsg) {
						this.form.email.errmsg = errmsg;
					}
					this.loadingState = 'fail';
					return;
				}
				this.loadingState = 'success';
				const newModerator = {
					...user,
					user_id: user.id,
					role: 'moderator',
					updated_at: new Date().toISOString(),
					is_accepted: null,
				};
				this.addModerator(newModerator);
				this.form.email.value = '';
				this.showNotify(this.$t('invite-send'), 'success');
			});
		},
		removeModerator(info) {
			const emiter = 'remove-moderator';
			this.deleting = true;
			this.$socket.emit(emiter, { user_id: info.user_id }, (data) => {
				this.deleting = false;
				if (data === true) {
					this.deleteModerator(info.user_id);
					this.showNotify(this.$t('invite-removere-user', { user: info.email }), 'success');
				}
				else {
					this.showNotify(this.$t('err'), 'danger');
				}
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
.deleting {
	opacity: .4;
	cursor: not-allowed;
}
</style>
