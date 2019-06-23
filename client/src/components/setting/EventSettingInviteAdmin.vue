<template>
	<!-- @desc: Admin invite moderator -->
	<event-setting--expand :info="adminExpand">
		<template #content>
			<div class="d-flex w-100">
				<text-field :field="form.email" />
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
	email: {
		value: '',
		type: 'text',
		label: 'lb-admin-access-mail',
		placeholderz: 'email@example.com',
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
		form: initForm()
	}),
	computed: {
		...mapGetters({
			tempSettings: 'admin/event/getTempSettings'
		})
	},
	watch: {
		tempSettings(val) {
			// ...
		}
	},
	methods: {
		submitInvite() {
			// ...
		}
	}
};
</script>
