/* ------------------------------------
 @desc: get all question in event
 ------------------------------------*/

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
	questions: [],
};

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations,
};
