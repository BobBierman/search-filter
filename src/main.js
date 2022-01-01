import Vue from 'vue';
import vmodal from 'vue-js-modal';
import Auth from '@aws-amplify/auth';
import API from '@aws-amplify/api';
import AuthConfig from '@/aws-exports';
import Alert from '@/templates/auth/Alert.vue';
import VueSimpleAccordion from 'vue-simple-accordion';
import 'vue-simple-accordion/dist/vue-simple-accordion.css';
import VueProgress from 'vue-progress-path';
import 'vue-progress-path/dist/vue-progress-path.css';
import axiosInterceptors from './store/modules/api/axios-interceptors';

import router from './router';
import store from './store';

import App from './App.vue';

Auth.configure(AuthConfig);
API.configure(AuthConfig);

Vue.config.productionTip = false;

Vue.use(vmodal, {
  dialog: true,
});

Vue.use(VueSimpleAccordion, {
});

Vue.use(VueProgress);

Vue.component('v-alert', Alert);

new Vue({
  mounted() {
    axiosInterceptors();
  },
  render: (h) => h(App),
  router,
  store,
  vmodal,
}).$mount('#app');
