/* -----------------------*
@desc: get info user
 * -----------------------*/
import cookies from '@/modules/vue-cookies-custom';

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

const user = cookies.get(process.env.VUE_APP_CK_USER);
if (user) {
	state.loggedIn = true;
	state.userData = user;
}

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
};
