import Vue from 'vue';
import Vuex from 'vuex';

import authModule from './auth';
import dashboardModule from './dashboard';

// Admin manage current event
import eventModule from './admin/events';
import questionModule from './admin/questions';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth: authModule,
		dashboard: dashboardModule,
		admin: {
			namespaced: true,
			modules: {
				event: eventModule,
				questions: questionModule
			}
		}
	},
	actions: {
		resetAll({ commit }) {
			commit('auth/RESET');
			commit('dashboard/RESET');
			commit('admin/event/RESET');
			commit('admin/questions/RESET');
		}
	}
});
