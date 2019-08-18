const getEventInfo = state => state.eventInfo;
const getRole = state => state.role;
const getAdmins = state => (state.eventInfo
	? state.eventInfo.admins
	: null);
const getTempSettings = state => state.tempSettings;

const getOnlineUsers = state => state.onlineUsers;

const onModeration = state => state.tempSettings.on_moderation;

export default {
	getEventInfo,
	getRole,
	getAdmins,
	getTempSettings,
	getOnlineUsers,
	onModeration,
};
