<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="
        min-height: 600px;
        background-size: cover;
        background-position: center top;
      "
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Hello {{ profileUser.name }}</h1>
            <p class="text-white mt-0 mb-5">
              Aplikasi ini dibuat khusus untuk membantumu dalam mengelola
              keuangan, enjoy :)
            </p>
            <!-- <a href="#!" class="btn btn-info">Edit profile</a> -->
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <!-- <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img
                      src="img/theme/team-4-800x800.jpg"
                      class="rounded-circle"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div
              class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
            >
              <div class="d-flex justify-content-between">
                <base-button size="sm" type="info" class="mr-4"
                  >Connect</base-button
                >
                <base-button size="sm" type="default" class="float-right"
                  >Message</base-button
                >
              </div>
            </div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div
                    class="card-profile-stats d-flex justify-content-center mt-md-5"
                  >
                    <div>
                      <span class="heading">22</span>
                      <span class="description">Friends</span>
                    </div>
                    <div>
                      <span class="heading">10</span>
                      <span class="description">Photos</span>
                    </div>
                    <div>
                      <span class="heading">89</span>
                      <span class="description">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h3>
                  Jessica Jones<span class="font-weight-light">, 27</span>
                </h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>Bucharest, Romania
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Solution Manager
                  - Creative Tim Officer
                </div>
                <div>
                  <i class="ni education_hat mr-2"></i>University of Computer
                  Science
                </div>
                <hr class="my-4" />
                <p>
                  Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick
                  Murphy — writes, performs and records all of his own music.
                </p>
                <a href="#">Show more</a>
              </div>
            </div>
          </div>
        </div> -->

        <div class="col-xl-12 order-xl-1">
          <card shadow>
            <!-- <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Akun ku</h3>
                  </div>
                  <div class="col-4 text-right">
                  </div>
                </div>
              </div>
            </template> -->

            <form>
              <h6 class="heading-small text-muted mb-4">User information</h6>
              <div class="pl-lg-4">
                <Form @submit="onSubmit" ref="myForm">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <Field
                          name="name"
                          rules="required"
                          v-slot="{ field, errorMessage }"
                        >
                          <label for="validationCustom01">Nama</label>
                          <input
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': !!errorMessage }"
                            id="validationCustom03"
                            v-bind="field"
                            placeholder="Nama"
                          />
                          <div class="invalid-feedback">
                            {{ errorMessage }}
                          </div>
                        </Field>
                      </div>

                      <div class="col-md-6 mb-3">
                        <Field
                          name="username"
                          rules="required"
                          v-slot="{ field, errorMessage }"
                        >
                          <label for="validationCustom01">Username</label>
                          <input
                            type="text"
                            disabled
                            class="form-control"
                            :class="{ 'is-invalid': !!errorMessage }"
                            id="validationCustom03"
                            v-bind="field"
                            placeholder="Username"
                          />
                          <div class="invalid-feedback">
                            {{ errorMessage }}
                          </div>
                        </Field>
                      </div>

                      <div class="col-md-6 mb-3">
                        <Field
                          name="email"
                          rules="required"
                          v-slot="{ field, errorMessage }"
                        >
                          <label for="validationCustom01">Email</label>
                          <input
                            type="text"
                            disabled
                            class="form-control"
                            :class="{ 'is-invalid': !!errorMessage }"
                            id="validationCustom03"
                            v-bind="field"
                            placeholder="Email"
                          />
                          <div class="invalid-feedback">
                            {{ errorMessage }}
                          </div>
                        </Field>
                      </div>

                      <div class="col-md-6 mb-3">
                        <label for="validationCustom01">Foto</label>
                        <input
                          type="file"
                          class="form-control"
                          id="validationCustom03"
                          ref="myFiles"
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end border-0">
                    <!-- <button @click="$router.go(-1)" type="button" class="btn btn-secondary">
                    Kembali
                  </button> -->
                    <button type="submit" class="btn btn-primary">
                      Simpan
                    </button>
                  </div>
                </Form>
              </div>
              <!-- <hr class="my-4" /> -->
            </form>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Field, Form } from "vee-validate";
import axios from "@/api";

export default {
  name: "user-profile",
  components: {
    Form,
    Field,
    // ErrorMessage,
  },
  data() {
    return {
      img: "",
    };
  },
  computed: {
    profileUser: function () {
      return this.$store.getters.dataProfileUser;
    },
  },
  created() {
    setTimeout(this.initialize, 500);
  },
  methods: {
    initialize() {
      axios({ url: "api/auth/me", method: "POST" })
        .then((result) => {
          // this.tableData = ;
          this.$refs.myForm.setValues(result.data.data);
          this.img = result.data.data["foto"];
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
    async onSubmit(values) {
      //eksekusi ini kalo berhasil
      var image = this.img;
      this.$swal({
        text: "Apakah kamu yakin ?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      }).then(async (result) => {
        if (result.value) {
          const myPromise = new Promise((resolve, reject) => {
            if (this.$refs.myFiles.files[0]) {
              var formData = new FormData();
              this.$store.commit("response_request");
              formData.append("filetoupload", this.$refs.myFiles.files[0]);
              axios({
                url: "api/upload",
                method: "POST",
                data: formData,
              })
                .then((result) => {
                  this.$store.commit("response_success");
                  resolve(result);
                })
                .catch((err) => {
                  this.$store.commit("response_error");
                  reject(err);
                });
            } else {
              reject("");
            }
          });

          var dataSend = values;
          await myPromise
            .then((value) => {
              dataSend.foto = value.data.data[0];
            })
            .catch(function () {
              dataSend.foto = image;
            });

          dataSend.id = this.$store.getters.dataProfileUser.id;
          this.$store.commit("response_request");
          axios({
            url: "api/auth/changeprofile",
            data: dataSend,
            method: "put",
          })
            .then((result) => {
              this.$swal({
                icon: "success",
                title: "Sukses",
                text: result.statusText,
                showConfirmButton: false,
              });
              //   this.isEdit = false;

              //   setTimeout(this.initialize, 500);
              this.$store.dispatch("getUser");
              // this.$router.push("/transaksi");
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
        }
      });
    },
  },
};
</script>
<style></style>
