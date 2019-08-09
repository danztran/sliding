/* ------------------------------------
 @desc: get all poll-option in poll

 @param: pollOptions: [
	 {
		 poll_id: String,
		 options: [
			 {
				 content: '',
				 id: '',
				 ...,
			 }
		 ]
	 }
 ]

 @param: optionChoices: [
	 {
		 poll_id: String,
		 choices: [
			 option_id: String,
			 users: Array - list users ID(String) choice option
		 ]
	 }
 ]
------------------------------------*/

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
	pollOptions: [],
	optionChoices: [],
};

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations,
};
