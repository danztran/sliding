/* ------------------ *
 *	Event Module
 * ------------------ */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
	events: [],
	currentEvent: {}
};

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
};
