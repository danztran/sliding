import Vue from 'vue';
import VueRouter from 'vue-router';
import io from 'socket.io-client';
import VueSocketio from 'vue-socket.io-extended';
import router from './router';
import App from './App.vue';
import store from './store';

import { i18n } from './modules/vue-i18n-setup';
import cookies from './modules/vue-cookies-custom';
import _cm from './modules/common-methods';
import axios from './modules/axios-custom';
import api from './api';
import Vuetify from './modules/vuetify-custom';
import VueMixins from './modules/vue-mixins-custom';
import './assets/style/main.scss';


Vue.config.productionTip = true;

// Plugins
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VueMixins);
Vue.use(VueSocketio, io(process.env.VUE_APP_BASE_URL_SOCKET, { autoConnect: false }));

// Custom proptotype
Vue.prototype.$env = process.env;
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.prototype.$cookies = cookies;
Vue.prototype._cm = _cm;

new Vue({
	i18n,
	router,
	store,
	render: h => h(App)
}).$mount('#app');
