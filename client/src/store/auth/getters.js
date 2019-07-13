const user = state => state.userData;

/* -----------------------------------------------
@desc: auto fill username/pws after login
 ------------------------------------------------*/
const fillInfo = state => state.fillInfo;

export default {
	user,
	fillInfo,
};
