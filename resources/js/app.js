/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import Auth from './Auth.js';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(require('vue-moment'));

import Pagination from './components/pagination.vue'
Vue.component('pagination', Pagination);

Vue.prototype.auth = Auth;
Vue.use(VueAxios, axios);
Vue.use(VueSweetalert2);

import App from './app.vue';
import router from './routes';

const app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
