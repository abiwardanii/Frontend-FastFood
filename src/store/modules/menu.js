import Axios from "axios";
import store from "../index";
import router from "../../router";

const menu = {
  state: {
    menu: null,
  },
  getters: {
    dataMenu: (state) => {
      return state.menu;
    },
  },
  actions: {
    getMenu({ commit }) {
      Axios({
        method: "GET",
        url: process.env.VUE_APP_URL + "product",
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
          commit("getMenu", res.data.result);
        })
        .catch((err) => {
          alert(`Token has expired: ${err.msg}`);
          store.dispatch("delToken");
          router.resolve("/");
        });
    },
    getLowPrice({ commit }) {
      Axios({
        method: "GET",
        url: `${process.env.VUE_APP_URL}product/lowprice`,
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
          commit("getMenu", res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHighPrice({ commit }) {
      Axios({
        method: "GET",
        url: `${process.env.VUE_APP_URL}product/highprice`,
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
          commit("getMenu", res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getNewProd({ commit }) {
      Axios({
        method: "GET",
        url: process.env.VUE_APP_URL + "product/menu",
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
          commit("getMenu", res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDrink({ commit }) {
      Axios({
        method: "GET",
        url: process.env.VUE_APP_URL + "product/drink",
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
          commit("getMenu", res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFood({ commit }) {
      Axios({
        method: "GET",
        url: process.env.VUE_APP_URL + "product/food",
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
          commit("getMenu", res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchMenu({ commit }, value) {
      Axios({
        method: "GET",
        url: `${process.env.VUE_APP_URL}product/search?product_name=${value}`,
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
          commit("getMenu", res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addMenu(_, data) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "POST",
          url: process.env.VUE_APP_URL + "product",
          headers: {
            "Content-Type": "multipart/form-data",
            authtoken: store.getters.dataToken.token,
          },
          data: data,
        })
          .then((res) => {
            resolve(res)
            console.log(res.data.result);
          })
          .catch((err) => {
            reject(err);
            console.log(err);
          });
      });
    },
    updateMenu(_, data) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "PUT",
          url: process.env.VUE_APP_URL + "product",
          headers: {
            "Content-Type": "multipart/form-data",
            authtoken: store.getters.dataToken.token,
          },
          data: data,
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    delMenu(_, data) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "DELETE",
          url: process.env.VUE_APP_URL + "product/?id=" + data,
          headers: {
            authtoken: store.getters.dataToken.token,
          },
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  mutations: {
    getMenu(state, data) {
      state.menu = data;
    },
    delMenu(state) {
      state.menu = null;
    },
  },
};
export default menu;