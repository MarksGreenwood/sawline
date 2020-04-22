import Vue from 'vue';

//MomentJS
import moment from 'moment';
window.moment = moment;

// Vue paginate
Vue.component('pagination', require('laravel-vue-pagination'));

/* Vue progressbar */
import VueProgressBar from 'vue-progressbar'
const options = {
      color: '#2176bd',
      failedColor: '#e3342f',
      thickness: '5px',
      transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'top', 
    inverse: false
  }
  
  Vue.use(VueProgressBar, options)

// Lodash
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
 
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })

// SweetAlert
import swal from 'sweetalert2';
window.swal = swal
const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
window.toast = toast;
window.Fire = new Vue();  