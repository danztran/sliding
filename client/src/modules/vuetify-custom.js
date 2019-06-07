import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import '@/assets/style/vuetify-override.scss';

import TextField from '@/components/pieces/TextField.vue';
import TextArea from '@/components/pieces/TextArea.vue';
import LoadingLinear from '@/components/pieces/LoadingLinear.vue';
import BouncyBallLoader from '@/components/pieces/BouncyBallLoader.vue';

// theme
const theme = {
	primary: '#3da4b5',
	secondary: '#5282BD',
	accent: '#8c9eff',
	error: '#832800'
};

// icons
const icons = {
	user: 'how_to_reg',
	anonymous: 'person',
	setting: 'settings',
	search: 'search',
	event: 'event_available',
	'web-slide-event': 'slideshow',
	'mobile-slide-event': 'mobile_screen_share',
	'more-vert': 'more_vert'
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
			icons
		});
	}
};
