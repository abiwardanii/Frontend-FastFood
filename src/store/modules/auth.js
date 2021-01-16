import Axios from "axios";
import router from "../../router";

const auth = {
  state: {
    token: null,
    role: null,
    email: "",
    username: "",
  },
  mutations: {
    getToken(state, data) {
      state.token = data.token;
      state.role = data.role;
    },
    delToken(state) {
      (state.token = null), (state.role = null);
    },
  },
  actions: {
    getToken({commit}, auth) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "post",
          url: process.env.VUE_APP_URL + "auth",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.parse(JSON.stringify(auth)),
        })
          .then((res) => {
            if (res.data.result[0] === undefined) {
              reject(res.data.result[0].msg);
            }
            const data = res.data.result[0];
            commit("getToken", data);
            resolve(res.data.result[0])
          })
          .catch((err) => {
            alert(err);
          });
      });
    },
    delToken({commit}) {
      commit("delToken");
      commit("delMenu");
      commit("delHistory");
      router.replace({ name: "Login" });
    },
    createUser(_, form) {
      return new Promise((resolve, reject) => {
        Axios({
          method: "post",
          url: process.env.VUE_APP_URL + "user",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.parse(JSON.stringify(form)),
        })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            console.log(err)
            reject(err);
          });
      });
    },
  },
  getters: {
    loggedIn(state) {
      return state.token != null;
    },
    dataToken(state) {
      if (state.token != null && state.role != null) {
        return state;
      }
    },
  },
};
export default auth;