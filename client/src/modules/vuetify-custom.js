import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import '@/assets/style/vuetify-override.scss';
import { Scroll } from 'vuetify/lib/directives';

import TextField from '@/components/pieces/TextField.vue';
import TextArea from '@/components/pieces/TextArea.vue';
import LoadingLinear from '@/components/pieces/LoadingLinear.vue';
import BouncyBallLoader from '@/components/pieces/BouncyBallLoader.vue';

// theme
const theme = {
	primary: '#3da4b5',
	secondary: '#5282BD',
	error: '#832800',
	grey: '#777',
	yellow: '#f9cd8b',
	red: '#e54731',
};

// icons
const icons = {
	user: 'how_to_reg',
	person: 'person',
	group_people: 'group',
	setting: 'settings',
	search: 'search',
	event: 'calendar_today',
	more_vert: 'more_vert',
	web_slide_event: 'slideshow',
	mobile_slide_event: 'mobile_screen_share',
	arrow_left: 'keyboard_arrow_left',
	arrow_forward: 'arrow_forward',
	arrow_back: 'arrow_back',
	signout: 'exit_to_app',
	signup: 'person_add',
	dashboard: 'dashboard',
	ideas: 'new_releases',
	analytics: 'poll',
	polls: 'sort',
	ask_question: 'comment',
	questions: 'question_answer',
	highlight_question: 'adjust',
	reply: 'reply',
	guest_reply: 'chat_bubble_outline',
	question_mark: 'help_outline',
	privacy: 'security',
	switch_event: 'compare_arrows',
	home: 'home',
	add: 'add',
	send: 'send',
	close: 'close',
	export: 'present_to_all',
	delete: 'delete_outline',
	edit: 'edit',
	cancel: 'cancel',
	filter: 'filter_list',
	like: 'thumb_up_alt',
	dislike: 'thumb_down',
	restore: 'replay',
	options_dot: 'more_horiz',
	info: 'error_outline',
	copy: 'file_copy',
	lock: 'lock',
	unlock: 'lock_open',
	archive: 'archive',
	unarchive: 'unarchive',
	mark_answered: 'spellcheck',
	add_new: 'add_circle_outline',
	archive_all: 'save_alt',
	approve: 'check_circle_outline',
	check: 'check',
	dismiss: 'highlight_off',
	star_border: 'star_border',
	star: 'star',
	start_outline: 'play_circle_outline',
	loading_circle: 'cached',
	loading_success: 'done',
	loading_fail: 'error_outline',
	multiple: 'add_to_photos',
	multiple_choice: 'format_list_numbered',
	word_cloud: 'cloud_queue',
	pause_fill: 'pause_circle_filled',
	result_off: 'grid_off',
	access_invite: 'share',
	language: 'language',
	notice: 'notifications_active',
	no_notice: 'notifications_none',
	time_start: 'timer',
	time_end: 'timer_off',
	faces: 'tag_faces',
	mail: 'alternate_email',
};

// custom components
const components = {
	'text-field': TextField,
	'text-area': TextArea,
	'loading-linear': LoadingLinear,
	'bouncy-loader': BouncyBallLoader,
};

export default {
	install(Vue, options) {
		for (const cpnName of Object.keys(components)) {
			Vue.component(cpnName, components[cpnName]);
		}

		Vue.use(Vuetify, {
			iconfont: 'md',
			size: 20,
			theme,
			icons,
			directives: {
				Scroll,
			},
		});
	},
};
