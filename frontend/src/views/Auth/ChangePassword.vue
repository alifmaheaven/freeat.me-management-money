<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Forget password</small>
          </div>
          <Form @submit="onSubmit">
            <Field
              name="Password"
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
              name="Confirmation Password"
              rules="required|confirmed:Password"
              v-slot="{ field, errorMessage, meta }"
            >
              <base-input
                formClasses="input-group-alternative mb-3"
                placeholder="Confirmation Password"
                type="password"
                addon-left-icon="ni ni-lock-circle-open"
                name="password"
                v-bind="field"
                :valid="!!errorMessage ? false : meta.touched ? true : null"
                :error="errorMessage"
              >
              </base-input>
            </Field>

            <!-- <div class="text-muted font-italic">
              <small
                >password strength:
                <span class="text-success font-weight-700">strong</span></small
              >
            </div> -->

            <div class="text-center">
              <base-button nativeType="submit" type="primary" class="my-4"
                >Submit</base-button
              >
            </div>
          </Form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#/requestforget" class="text-light">
            <small>Forgot password?</small>
          </a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/login" class="text-light">
            <small>Login into your account</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Field, Form } from "vee-validate";
import axios from "@/api";

export default {
  name: "register",
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
      var token = this.$route.params.token;
      let password = values["Password"];
      let password_confirmation = values["Confirmation Password"];
      this.$store.commit("response_request");
      axios({
        url: "api/auth/changepassword",
        method: "POST",
        data: {
          password,
          password_confirmation,
        },
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
          console.log(err);
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
