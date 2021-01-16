import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import History from '../views/History.vue'
import Catalog from '../views/Catalog.vue'
import Login from "../views/Login.vue";
import store from "../store";

Vue.use(VueRouter)

let router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: "/history",
      name: "History",
      component: History,
      meta: { requiresAuth: true },
    },
    {
      path: "/catalog",
      name: "Catalog",
      component: Catalog,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: "Login",
      });
    } else {
      next();
    }
  } else if (
    store.getters.loggedIn &&
    to.matched.some((record) => record.name == "Login")
  ) {
    next(router.replace(from));
  } else {
    next();
  }
});

export default router
