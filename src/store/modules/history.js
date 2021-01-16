import Axios from "axios";
import store from "../index";

const history = {
  state: {
    history: null,
  },
  getters: {
    dataHistory: (state) => {
      for (const key in state.history) {
        let date = new Date(state.history[key].createdAt);
        state.history[key].createdAt = date.toLocaleDateString("en-GB", {
          timeZone: "UTC",
        });
      }
      return state.history;
    },
  },
  actions: {
    getHistory({ commit }) {
      Axios({
        method: "GET",
        url: process.env.VUE_APP_URL + "history",
        headers: {
          authtoken: store.getters.dataToken.token,
        },
      })
        .then((res) => {
            commit("getHistory", res.data.result);
        })
        .catch((err) => {
            store.dispatch("delToken");
            console.log(err);
        });
    },
    addHistory(_, data) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "POST",
          url: process.env.VUE_APP_URL + "history",
          headers: {
            "Content-Type": "application/json",
            authtoken: store.getters.dataToken.token,
          },
          data: data,
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err)
            console.log(err)
          });
      });
    },
  },
  mutations: {
    getHistory(state, data) {
      state.history = data;
    },
    delHistory(state) {
      state.history = null;
    },
  },
};
export default history;