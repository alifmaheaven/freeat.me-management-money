<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign up with</small>
          </div>
          <div class="btn-wrapper text-center">
            <!-- <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="img/icons/common/github.svg"
              /></span>
              <span class="btn-inner--text">Github</span>
            </a> -->
            <a @click="GooglesignIn()" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img :src="env+'img/icons/common/google.svg'"
              /></span>
              <span class="btn-inner--text">Google</span>
            </a>
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Or sign up with credentials</small>
          </div>
          <Form @submit="onSubmit">
            <Field
              name="Name"
              rules="required"
              v-slot="{ field, errorMessage, meta }"
            >
              <base-input
                formClasses="input-group-alternative mb-3"
                placeholder="Name"
                addon-left-icon="ni ni-email-83"
                v-bind="field"
                :valid="!!errorMessage ? false : meta.touched ? true : null"
                :error="errorMessage"
              >
              </base-input>
            </Field>

            <Field
              name="Username"
              rules="required"
              v-slot="{ field, errorMessage, meta }"
            >
              <base-input
                formClasses="input-group-alternative mb-3"
                placeholder="Username"
                addon-left-icon="ni ni-email-83"
                v-bind="field"
                :valid="!!errorMessage ? false : meta.touched ? true : null"
                :error="errorMessage"
              >
              </base-input>
            </Field>

            <Field
              name="Email"
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

            <div class="row my-4">
              <div class="col-12">
                <base-checkbox class="custom-control-alternative">
                  <span class="text-muted"
                    >I agree with the <a href="#!">Privacy Policy</a></span
                  >
                </base-checkbox>
              </div>
            </div>
            <div class="text-center">
              <base-button nativeType="submit" type="primary" class="my-4"
                >Create account</base-button
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
export default {
  name: "register",
  components: {
    Form,
    Field,
    // ErrorMessage,
  },
  data() {
    return {
      model: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit(values) {
      let name = values["Name"];
      let email = values["Email"];
      let username = values["Username"];
      let password = values["Password"];
      let password_confirmation = values["Confirmation Password"];
      this.$store
        .dispatch("register", {
          name,
          username,
          email,
          password,
          password_confirmation,
        })
        .then((resp) => {
          this.$swal({
            icon: "success",
            title: "Berhasil!",
            text: resp.data.message,
            showConfirmButton: false,
          });
          // if (resp.data.first_login != 1) {
          this.$router.push("/login");
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
