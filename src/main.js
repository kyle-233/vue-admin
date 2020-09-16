/*
 * @Author: your name
 * @Date: 2020-09-13 16:47:49
 * @LastEditTime: 2020-09-15 19:47:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// import * as netlifyIdentityWidget from "netlify-identity-widget";

// Vue.use(ElementUI)

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api'

// Initialize Netlify Identity
// netlifyIdentityWidget.init();

// router.beforeEach((to, from, next) => {
//   if (to.path === '/signin') {
//     next();
//   } else {
//     if (!localStorage.getItem('accessToken') && to.meta.requiresAuth) {
//       next({
//         path: '/signin'
//       })
//     } else {
//       next();
//     }
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
