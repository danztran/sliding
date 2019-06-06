import Vue from 'vue';
import Vuex from 'vuex';

import authModule from './auth';
import eventModule from './event';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth: authModule,
		event: eventModule
	},
	actions: {
		resetAll({ commit }) {
			commit('auth/RESET');
			commit('event/RESET');
		}
	}
});
