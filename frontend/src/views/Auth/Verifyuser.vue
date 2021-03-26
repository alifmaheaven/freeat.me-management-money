<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small
              >Silahkan tekan tombol dibawah untuk verifikasi akun anda!</small
            >
          </div>
          <div class="btn-wrapper text-center">
            <a @click="verify()" class="btn btn-neutral btn-icon">
              <span class="btn-inner--text">Klik disini!</span>
            </a>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#/requestforget" class="text-light"
            ><small>Forgot password?</small></a
          >
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light"
            ><small>Create new account</small></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/api";

export default {
  name: "login",
  components: {
    // Form,
    // Field,
    // ErrorMessage,
  },
  data() {
    return {};
  },
  methods: {
    verify() {
      var token = this.$route.params.token;
      this.$store.commit("response_request");
      axios({
        url: "api/auth/varifyuser",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((result) => {
          this.$swal({
            icon: "success",
            title: "Berhasil",
            text: result.data.message,
            showConfirmButton: false,
          });
          this.$router.push("/login");
          this.$store.commit("response_success");
        })
        .catch((err) => {
          this.$swal({
            icon: "error",
            title: "Maaf",
            text: err.response.data.message,
            showConfirmButton: false,
          });
          this.$store.commit("response_error");
        });
    },
  },
};
</script>
<style></style>
