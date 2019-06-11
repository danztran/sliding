import Vue from 'vue';
import Vuex from 'vuex';

import authModule from './auth';
import dashboardModule from './dashboard';
import adminModule from './admin';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth: authModule,
		dashboard: dashboardModule,
		admin: adminModule
	},
	actions: {
		resetAll({ commit }) {
			commit('auth/RESET');
			commit('dashboard/RESET');
		}
	}
});
