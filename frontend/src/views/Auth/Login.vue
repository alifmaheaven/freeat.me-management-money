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
                ><img src="img/icons/common/google.svg"
              /></span>
              <span class="btn-inner--text">Google</span>
            </a>
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Or sign in with credentials</small>
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

            <Field
              name="password"
              rules="required"
              v-slot="{ field, errorMessage, meta }"
            >
              <base-input
                formClasses="input-group-alternative mb-3"
                placeholder="Password"
                type="password"
                addon-left-icon="ni ni-lock-circle-open"
                name="password"
                v-bind="field"
                :valid="!!errorMessage ? false : meta.touched ? true : null"
                :error="errorMessage"
              >
              </base-input>
            </Field>
            <Field
              v-slot="{ field }"
              name="is_remember"
              type="checkbox"
              :value="true"
            >
              <base-checkbox v-bind="field" class="custom-control-alternative">
                <span class="text-muted">Remember me</span>
              </base-checkbox>
            </Field>
            <div class="text-center">
              <base-button nativeType="submit" type="primary" class="my-4"
                >Sign in</base-button
              >
            </div>
          </Form>
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
import { Field, Form } from "vee-validate";

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
      let username = values.email;
      let password = values.password;
      let is_remember = values.is_remember;
      this.$store
        .dispatch("login", { username, password, is_remember })
        .then((resp) => {
          this.$swal({
            icon: "success",
            title: "Berhasil!",
            text: resp.data.message,
            showConfirmButton: false,
          });
          // if (resp.data.first_login != 1) {
          this.$router.push("/");
          // } else {
          //   this.$router.push("/changepassword")
          // }
        })
        .catch((err) => {
          this.$swal({
            icon: "error",
            title: "Maaf",
            text: err.response.data.message,
            showConfirmButton: false,
          });
          //   this.username = '';
          //   this.password = '';
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
        this.$store.commit("response_request");
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
