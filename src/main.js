import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import auth from './middleware/auth.js';

import axios from 'axios';

require ('@/filters');
require ('@/plugins');

/* CSS Imports */
import '@/assets/css/bootstrap-4.3.1-dist/css/bootstrap.css';
import '@/assets/css/fontawesome-free/css/all.min.css';
import '@/assets/scss/style.scss';
import '@/assets/scss/sidebar.scss';

/* JS Imports */
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

window.$ = window.jQuery = require('jquery');

/* Axios */
require('@/store/subscriber')
axios.defaults.baseURL = 'http://lc.pulse.com.au/api';

Vue.config.productionTip = false

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() =>{
    new Vue({
        router,
        store,
        render: h => h(App),
        methods: {
        }
    }).$mount('#app')
})