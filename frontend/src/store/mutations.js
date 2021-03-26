export default {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, { token }) {
    state.status = "success";
    state.token = token;
  },
  auth_error(state) {
    state.status = "error";
  },
  auth_setuser(state, user) {
    state.user = user;
  },
  logout(state) {
    state.status = "";
    state.token = "";
    state.user = {};
  },
  response_request(state) {
    state.status = "loading";
  },
  response_success(state) {
    state.status = "success";
  },
  response_error(state) {
    state.status = "error";
  },
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarOpened ? false : "responsive";
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarClosed ? true : "responsive";
  },
  set(state, [variable, value]) {
    state[variable] = value;
  },
};
