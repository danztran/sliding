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
	accent: '#8c9eff',
	error: '#832800',
	grey: '#777',
	yellow: '#f9cd8b',
	red: '#e54731'
};

// icons
const icons = {
	user: 'how_to_reg',
	person: 'person',
	setting: 'settings',
	search: 'search',
	event: 'event_available',
	more_vert: 'more_vert',
	web_slide_event: 'slideshow',
	mobile_slide_event: 'mobile_screen_share',
	arrow_left: 'keyboard_arrow_left',
	signout: 'exit_to_app',
	ideas: 'new_releases',
	analytics: 'poll',
	polls: 'sort',
	questions: 'question_answer',
	switch_event: 'compare_arrows',
	home: 'home',
	add: 'add',
	options_dot: 'more_horiz',
	archive_all: 'save_alt',
	approve: 'check_circle_outline',
	dismiss: 'highlight_off',
	star_border: 'star_border',
	highlight_question: 'adjust',
	filter: 'filter_list',
	like: 'thumb_up_alt',
	reply: 'reply',
	close: 'close',
	restore: 'replay',
	send: 'send',
	export: 'present_to_all',
	delete: 'delete_outline',
	edit: 'edit',
	question_mark: 'help_outline',
	loading_circle: 'cached',
	loading_success: 'done',
	loading_fail: 'error_outline',
	info: 'error_outline',
	privacy: 'security',
	multiple: 'add_to_photos',
	copy: 'file_copy'
};

// custom components
const components = {
	'text-field': TextField,
	'text-area': TextArea,
	'loading-linear': LoadingLinear,
	'bouncy-loader': BouncyBallLoader
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
				Scroll
			}
		});
	}
};
