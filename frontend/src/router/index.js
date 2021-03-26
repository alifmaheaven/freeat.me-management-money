import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store/index";

import DashboardLayout from "@/layout/DashboardLayout";
import BaseLayout from "@/layout/BaseLayout";
import AuthLayout from "@/layout/AuthLayout";

import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/UserProfile.vue";

// tipe
import TablesTipe from "../views/Tipe/index.vue";
import CreateTipe from "../views/Tipe/create.vue";
import EditTipe from "../views/Tipe/edit.vue";

// akun
import TablesAkun from "../views/Akun/index.vue";
import CreateAkun from "../views/Akun/create.vue";
import EditAkun from "../views/Akun/edit.vue";

// transaksi
import TablesTransaksi from "../views/Transaksi/index.vue";
import CreateTransaksi from "../views/Transaksi/create.vue";
import EditTransaksi from "../views/Transaksi/edit.vue";

// authontikasi
import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";
import Verifyuser from "../views/Auth/Verifyuser.vue";
import Requestforget from "../views/Auth/Requestemail.vue";
import ChangePassword from "../views/Auth/ChangePassword.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          requiresAuth: true,
        },
        components: { default: Dashboard },
      },
      {
        path: "/tipe-transaksi",
        name: "Tipe Transaksi",
        meta: {
          requiresAuth: true,
        },
        component: BaseLayout,
        children: [
          {
            path: "",
            name: "List Tipe",
            components: { default: TablesTipe },
            meta: {
              // breadcrumb: 'Pengguna'
            },
          },
          {
            path: "create",
            name: "Buat Tipe",
            components: { default: CreateTipe },
            meta: {
              // breadcrumb: 'Pengguna'
            },
          },
          {
            path: "edit/:id",
            name: "Edit Tipe",
            components: { default: EditTipe },
            meta: {
              // breadcrumb: 'Pengguna'
            },
          },
        ],
      },
      {
        path: "/akun-transaksi",
        name: "Akun Transaksi",
        meta: {
          requiresAuth: true,
        },
        component: BaseLayout,
        children: [
          {
            path: "",
            name: "List Akun",
            components: { default: TablesAkun },
            meta: {
              // breadcrumb: 'Pengguna'
            },
          },
          {
            path: "create",
            name: "Buat Akun",
            components: { default: CreateAkun },
            meta: {
              // breadcrumb: 'Pengguna'
            },
          },
          {
            path: "edit/:id",
            name: "Edit Akun",
            components: { default: EditAkun },
            meta: {
              // breadcrumb: 'Pengguna'
            },
          },
        ],
      },
      {
        path: "/transaksi",
        name: "Transaksi",
        meta: {
          requiresAuth: true,
        },
        component: BaseLayout,
        children: [
          {
            path: "",
            name: "List Transaksi",
            components: { default: TablesTransaksi },
            meta: {
              // breadcrumb: 'Pengguna'
            },
          },
          {
            path: "create",
            name: "Buat Transaksi",
            components: { default: CreateTransaksi },
            meta: {
              // breadcrumb: 'Pengguna'
            },
          },
          {
            path: "edit/:id",
            name: "Edit Transaksi",
            components: { default: EditTransaksi },
            meta: {
              // breadcrumb: 'Pengguna'
            },
          },
        ],
      },
      {
        path: "/profile",
        name: "profile",
        meta: {
          requiresAuth: true,
        },
        components: { default: Profile },
      },
    ],
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: "/login",
        name: "login",
        components: { default: Login },
      },
      {
        path: "/register",
        name: "register",
        components: { default: Register },
      },
      {
        path: "/verifyuser/:token",
        name: "verify user",
        components: { default: Verifyuser },
      },
      {
        path: "/requestforget",
        name: "request forget email",
        components: { default: Requestforget },
      },
      {
        path: "/changeforget/:token",
        name: "change password",
        components: { default: ChangePassword },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  var needAuth = to.matched.some((route) => route.meta.requiresAuth);
  if (needAuth) {
    if (store.getters.isLoggedIn) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    if (!store.getters.isLoggedIn) {
      next();
    } else {
      next({ path: "/" });
    }
  }
});

export default router;
