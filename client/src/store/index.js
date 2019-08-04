import Vue from 'vue';
import Vuex from 'vuex';

import authModule from './auth';
import dashboardModule from './dashboard';

// Admin manage current event
import adminEvent from './admin/event';
import adminQuestions from './admin/questions';
import adminPolls from './admin/polls';
import adminPollOptions from './admin/pollOptions';

// Guest manage current event
import guestEvent from './guest/event';
import guestQuestions from './guest/questions';
import guestPolls from './guest/polls';
import guestPollOptions from './guest/pollOptions';


Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth: authModule,
		dashboard: dashboardModule,
		admin: {
			namespaced: true,
			modules: {
				event: adminEvent,
				questions: adminQuestions,
				polls: adminPolls,
				pollOptions: adminPollOptions,
			},
		},
		guest: {
			namespaced: true,
			modules: {
				event: guestEvent,
				questions: guestQuestions,
				polls: guestPolls,
				pollOptions: guestPollOptions,
			},
		},
	},
	actions: {
		resetAll({ commit }) {
			commit('auth/RESET');
			commit('dashboard/RESET');
			commit('admin/event/RESET');
			commit('admin/questions/RESET');
			commit('admin/polls/RESET');
			commit('admin/pollOptions/RESET');
			commit('guest/event/RESET');
			commit('guest/questions/RESET');
			commit('guest/polls/RESET');
			commit('guest/pollOptions/RESET');
		},
	},
});
