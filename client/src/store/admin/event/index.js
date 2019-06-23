/* ------------------------------------ *
  @desc: get current info event
 * ------------------------------------*/

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
	eventInfo: {},
	role: {},
	tempSettings: {}
};

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
};
