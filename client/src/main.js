import Vue from 'vue';
import './modules/vuetify-custom';
import VueRouter from 'vue-router';
import router from './router';
import App from './App.vue';
import store from './store';

import { i18n } from './modules/vue-i18n-setup';
import _cm from './modules/common-methods';

Vue.config.productionTip = false;

// Plugins
Vue.use(VueRouter);

// Custom proptotype
Vue.prototype._cm = _cm;

new Vue({
	i18n,
	router,
	store,
	render: h => h(App)
}).$mount('#app');
