import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faList,
  faCheckCircle,
  faSearch,
  faMinusCircle,
  faPlusCircle,
  faShoppingCart,
  faAddressCard,
  faSignOutAlt,
  faEnvelopeSquare,
  faLock,
  faPlus,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPlusSquare,
  faMinusSquare,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { BootstrapVue } from "bootstrap-vue";

library.add(
  faList,
  faCheckCircle,
  faSearch,
  faMinusCircle,
  faPlusCircle,
  faShoppingCart,
  faAddressCard,
  faSignOutAlt,
  faEnvelopeSquare,
  faLock,
  faPlus,
  faPlusSquare,
  faMinusSquare,
  faEdit,
  faTrash,
);

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");
