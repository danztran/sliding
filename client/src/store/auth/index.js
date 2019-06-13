/* -----------------------*
@desc: get info user
 * -----------------------*/

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
	loggedIn: false,
	userData: null,
	fillInfo: {
		username: '',
		password: ''
	}
};

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
};
