<template>
	<v-window
		class="content-setting scrollbar-primary"
		vertical>
		<v-window-item
			:reverse-transition="false"
			:transition="false">
			<event-setting-expand--info />
			<event-setting-expand--privacy />
			<event-setting-expand--question />
			<event-setting-expand--poll />
			<event-setting-expand--idea />
			<event-setting-expand--invite />
		</v-window-item>
	</v-window>
</template>

<script>
import EventSettingInfo from './EventSettingInfo.vue';
import EventSettingPrivacy from './EventSettingPrivacy.vue';
import EventSettingQuestion from './EventSettingQuestion.vue';
import EventSettingPoll from './EventSettingPoll.vue';
import EventSettingIdea from './EventSettingIdea.vue';
import EventSettingInviteAdmin from './EventSettingInviteAdmin.vue';

export default {
	name: 'EventSettingsContent',
	components: {
		'event-setting-expand--info': EventSettingInfo,
		'event-setting-expand--privacy': EventSettingPrivacy,
		'event-setting-expand--question': EventSettingQuestion,
		'event-setting-expand--poll': EventSettingPoll,
		'event-setting-expand--idea': EventSettingIdea,
		'event-setting-expand--invite': EventSettingInviteAdmin,
	},
};
</script>
