import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vSelect from 'vue-select';
import axios from 'axios';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vSelect,
  axios,
  render: (h) => h(App),
}).$mount("#app");
