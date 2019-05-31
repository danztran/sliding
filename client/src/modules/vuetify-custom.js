import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import 'vuetify/dist/vuetify.min.css';

const theme = {
	primary: '#3595BE',
	secondary: '#5282BD',
	accent: '#8c9eff',
	error: '#832800',
	grey: '#efefef'
};

const icons = {
	user: 'how_to_reg',
	setting: 'settings'
};

Vue.use(Vuetify, {
	iconfont: 'md',
	size: 20,
	theme,
	icons
});
