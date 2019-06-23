<template>
	<!-- @desc: Admin invite moderator -->
	<event-setting--expand :info="adminExpand">
		<template slot="content">
			<div class="d-flex w-100">
				<text-field :field="inviteAdmin.form.invite" />
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
</template>

<script>
import { mapGetters } from 'vuex';
import EventSettingExpand from './EventSettingExpand.vue';
const initForm = () => ({
	invite: {
		value: '',
		type: 'text',
		label: 'lb-admin-access-mail',
		prepend: 'person',
		errmsg: ''
	}
});

export default {
	name: 'EventSettingInviteAdmin',
	components: {
		'event-setting--expand': EventSettingExpand
	},
	data: () => ({
		adminExpand: {
			icon: 'group_people',
			title: 'event-setting-share-access',
			subtitle: 'event-setting-share-access-des'
		},
		inviteAdmin: {
			form: initForm()
		}
	}),
	computed: {
		...mapGetters({
			eventInfo: 'admin/event/getEventInfo'
		})
	},
	watch: {
		eventInfo(val) {
			// ...
		}
	},
	methods: {
		submitInvite() {}
	}
};
</script>
