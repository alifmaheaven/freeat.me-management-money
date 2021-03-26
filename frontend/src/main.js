/*!

=========================================================
* Vue Argon Dashboard - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-argon-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/vue-argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import Axios from '@/api'
import store from "./store/index";
import mixin from "./mixin";
import VueSweetalert2 from "vue-sweetalert2";
import PrimeVue from "primevue/config";
import ArgonDashboard from "./plugins/argon-dashboard";
import "element-plus/lib/theme-chalk/index.css";

// google autentication
import gAuthPlugin from "vue3-google-oauth2";
let gauthClientId =
  "426101614494-a6e5n5q42dv4r690i9hvo7lmfmhhiii0.apps.googleusercontent.com";

// CSS
import "sweetalert2/dist/sweetalert2.min.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

// validation
import "./validate/vee-validate";

const appInstance = createApp(App);
// appInstance.use(Axios);
appInstance.use(VueSweetalert2);
// login google
appInstance.use(gAuthPlugin, {
  clientId: gauthClientId,
  scope: "profile email",
  prompt: "select_account",
  fetch_basic_profile: true,
});

appInstance.use(PrimeVue, { ripple: true });

appInstance.use(router);
appInstance.use(store);
appInstance.use(ArgonDashboard);
appInstance.mixin(mixin);
appInstance.mount("#app");
