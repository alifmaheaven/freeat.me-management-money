<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Transaksi',
            icon: 'ni ni-money-coins text-primary',
            path: '/transaksi',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Akun transkasi',
            icon: 'ni ni-key-25 text-blue',
            path: '/akun-transaksi',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Tipe transaksi',
            icon: 'ni ni-ui-04 text-blue',
            path: '/tipe-transaksi',
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <!-- your content here -->
        <router-view></router-view>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  },
  created() {
    // if (this.isLoggedIn) {
    this.getUser();
    // }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    getUser() {
      this.$store.dispatch("getUser");
    },
  },
};
</script>
<style lang="scss"></style>
