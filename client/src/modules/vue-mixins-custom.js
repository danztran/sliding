import handleMessages from '@/mixins/handleMessages';
import handleBreakpoint from '@/mixins/handleBreakpoint';

const mixins = [handleMessages, handleBreakpoint];

export default {
	install(Vue, options) {
		for (const mixin of mixins) {
			Vue.mixin(mixin);
		}
	}
};
