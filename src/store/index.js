import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import auth from "./modules/auth";
import menu from "./modules/menu";
import history from "./modules/history";

const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
});
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    history,
    menu,
    auth,
  },
  plugins: [vuexLocalStorage.plugin],
});