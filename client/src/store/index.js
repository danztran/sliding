import Vue from 'vue';
import Vuex from 'vuex';

import authModule from './auth';
import dashboardModule from './dashboard';

// Admin manage current event
import adminEvent from './admin/event';
import adminQuestions from './admin/questions';

// Guest manage current event
import guestEvent from './guest/event';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth: authModule,
		dashboard: dashboardModule,
		admin: {
			namespaced: true,
			modules: {
				event: adminEvent,
				questions: adminQuestions
			}
		},
		guest: {
			namespaced: true,
			modules: {
				event: guestEvent
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
