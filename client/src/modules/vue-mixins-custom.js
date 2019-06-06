import handleMessages from '@/mixins/handleMessages';

const mixins = [handleMessages];

export default {
	install(Vue, options) {
		for (const mixin of mixins) {
			Vue.mixin(mixin);
		}
	}
};
