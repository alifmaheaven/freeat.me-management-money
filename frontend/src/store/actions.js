import axios from "@/api";
// import router from "@/router";

export default {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios({ url: "api/auth/login", data: user, method: "POST" })
        .then((resp) => {
          const token = resp.data.data.access_token;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          commit("auth_success", { token });
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error", err);
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  loginGoogle({ commit }, token) {
    return new Promise((resolve, reject) => {
      commit("auth_request");
      axios({ url: "api/auth/loginGoogle", data: token, method: "POST" })
        .then((resp) => {
          const token = resp.data.data.access_token;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          commit("auth_success", { token });
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error", err);
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("response_request");
      axios({ url: "api/auth/register", data: user, method: "POST" })
        .then((resp) => {
          commit("response_success");
          resolve(resp);
        })
        .catch((err) => {
          commit("response_error", err);
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  confirmationuser({ commit }, token) {
    return new Promise((resolve, reject) => {
      commit("response_request");
      axios({ url: "/api/user/verifyuser", data: token, method: "POST" })
        .then((resp) => {
          commit("response_success");
          resolve(resp);
        })
        .catch((err) => {
          commit("response_error", err);
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit("response_success");
      commit("logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  },
  getUser({ commit }) {
    return new Promise((resolve, reject) => {
      commit("response_request");
      axios({ url: "api/auth/me", method: "POST" })
        .then((resp) => {
          commit("response_success");
          const user = resp.data.data;
          commit("auth_setuser", user);
          resolve(resp);
        })
        .catch((err) => {
          commit("response_error", err);
          commit("logout");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  accessLog({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("response_request");
      axios({ url: "api/user/accesslog", data: data, method: "POST" })
        .then((resp) => {
          commit("response_success");
          resolve(resp);
        })
        .catch((err) => {
          commit("response_error", err);
          commit("logout");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
};
