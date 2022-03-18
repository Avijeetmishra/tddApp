// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate';
import App from './App'
import { store } from './_store';
import { router } from './router';
import './../node_modules/Bulma/CSS/bulma.css';

Vue.config.productionTip = false
Vue.use(VeeValidate);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
