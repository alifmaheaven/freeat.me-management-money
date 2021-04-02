<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign in with</small>
          </div>
          <div class="btn-wrapper text-center">
            <!-- <a @click="handleClickGetAuthCode()" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="img/icons/common/github.svg"
              /></span>
              <span class="btn-inner--text">Github</span>
            </a> -->
            <a @click="GooglesignIn()" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img :src="env + 'img/icons/common/google.svg'"
              /></span>
              <span class="btn-inner--text">Google</span>
            </a>
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Or send forget password</small>
          </div>
          <Form @submit="onSubmit">
            <Field
              name="email"
              rules="email"
              v-slot="{ field, errorMessage, meta }"
            >
              <base-input
                formClasses="input-group-alternative mb-3"
                placeholder="Email"
                addon-left-icon="ni ni-email-83"
                v-bind="field"
                :valid="!!errorMessage ? false : meta.touched ? true : null"
                :error="errorMessage"
              >
              </base-input>
            </Field>
            <div class="text-center">
              <base-button nativeType="submit" type="primary" class="my-4"
                >Send Email!</base-button
              >
            </div>
          </Form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#/login" class="text-light"
            ><small>sign in with credentials</small></a
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
import { Field, Form } from "vee-validate";
import axios from "@/api";

export default {
  name: "login",
  components: {
    Form,
    Field,
    // ErrorMessage,
  },
  data() {
    return {};
  },
  methods: {
    onSubmit(values) {
      this.$store.commit("response_request");
      axios({
        url: "api/auth/requestforget",
        method: "POST",
        data: {
          email: values.email,
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
    async GooglesignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        var values = this.$gAuth.instance.currentUser.get().getAuthResponse();

        let token = values.access_token;

        this.$store
          .dispatch("loginGoogle", { token })
          .then((resp) => {
            this.$swal({
              icon: "success",
              title: "Berhasil!",
              text: resp.data.message,
              showConfirmButton: false,
            });

            this.$router.push("/");
          })
          .catch((err) => {
            this.$swal({
              icon: "error",
              title: "Maaf",
              text: err.response.data.message,
              showConfirmButton: false,
            });
          });
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
  },
};
</script>
<style></style>
