import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import 'vuetify/dist/vuetify.min.css';

const theme = {
	primary: '#3595BE',
	secondary: '#5282BD',
	accent: '#8c9eff',
	error: '#832800'
};

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

Vue.use(Vuetify, {
	iconfont: 'md',
	size: 20,
	theme,
	icons
});
