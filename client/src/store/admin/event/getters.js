const getEventInfo = state => state.eventInfo;
const getRole = state => state.role;
const getTempSettings = state => state.tempSettings;
const onModeration = state => state.tempSettings.on_moderation;

export default {
	getEventInfo,
	getRole,
	getTempSettings,
	onModeration
};
