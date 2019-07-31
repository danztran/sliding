/* ------------------------------------
 @desc: get all poll-option in poll
 @pollOptions: [
	 {
		 poll_id: Number,
		 options: Array,
	 }
 ]
------------------------------------*/

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
	pollOptions: [],
};

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations,
};
