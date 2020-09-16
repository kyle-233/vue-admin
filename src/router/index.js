/*
 * @Author: your name
 * @Date: 2020-09-13 16:47:49
 * @LastEditTime: 2020-09-15 19:48:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Team from "../views/Team.vue";
import SignIn from "../views/SignInFlow/SignIn";
import Request from "../views/SignInFlow/Request";
import Recover from "../views/SignInFlow/Recover";
// import * as netlifyIdentityWidget from "netlify-identity-widget";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/team",
    name: "Team",
    component: Team,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/request",
    name: "Request",
    component: Request,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/recover",
    name: "Recover",
    component: Recover,
    meta: {
      requiresAuth: false
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === '/signin') {
    next();
  } else {
    if (!sessionStorage.getItem('accessToken') && to.meta.requiresAuth) {
      next({
        path: '/signin'
      })
    } else {
      next();
    }
  }
})

export default router;
