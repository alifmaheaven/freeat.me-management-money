<template>
  <div class="card shadow">
    <Form @submit="onSubmit" ref="myForm">
      <!-- <div class="card-header border-0">
            <h1>Buat tipe</h1>
        </div> -->
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
              name="description"
              rules="required"
              v-slot="{ field, errorMessage }"
            >
              <label for="validationCustom01">Deskripsi</label>
              <textarea
                class="form-control"
                :class="{ 'is-invalid': !!errorMessage }"
                id="exampleFormControlTextarea1"
                v-bind="field"
                placeholder="Deskripsi"
                rows="3"
              ></textarea>
              <div class="invalid-feedback">
                {{ errorMessage }}
              </div>
            </Field>
          </div>

          <div class="col-md-6 mb-3">
            <Field
              name="nominal"
              rules="required"
              v-slot="{ field, errorMessage }"
            >
              <label for="validationCustom01">Nominal</label>
              <input
                type="number"
                class="form-control"
                :class="{ 'is-invalid': !!errorMessage }"
                id="validationCustom03"
                v-bind="field"
                placeholder="Nominal"
              />
              <div class="invalid-feedback">
                {{ errorMessage }}
              </div>
            </Field>
          </div>
          <div class="col-md-6 mb-3">
            <Field
              name="date"
              rules="required"
              v-slot="{ field, errorMessage }"
            >
              <label for="validationCustom01">Tanggal</label>
              <input
                type="date"
                class="form-control"
                :class="{ 'is-invalid': !!errorMessage }"
                id="validationCustom03"
                v-bind="field"
                placeholder="Nominal"
              />
              <div class="invalid-feedback">
                {{ errorMessage }}
              </div>
            </Field>
          </div>

          <div class="col-md-6 mb-3">
            <Field
              name="account_id"
              rules="required"
              v-slot="{ field, errorMessage }"
            >
              <label for="validationCustom01">Akun</label>
              <select
                class="custom-select"
                :class="{ 'is-invalid': !!errorMessage }"
                v-bind="field"
              >
                <option value="">Pilih akun yang ingin dipilih</option>
                <option v-for="item in account" :key="item.id" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
              <div class="invalid-feedback">
                {{ errorMessage }}
              </div>
            </Field>
          </div>

          <div class="col-md-6 mb-3">
            <Field
              name="type_id"
              rules="required"
              v-slot="{ field, errorMessage }"
            >
              <label for="validationCustom01">Tipe</label>
              <select
                class="custom-select"
                :class="{ 'is-invalid': !!errorMessage }"
                v-bind="field"
              >
                <option value="">Pilih tipe yang ingin dipilih</option>
                <option v-for="item in type" :key="item.id" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
              <div class="invalid-feedback">
                {{ errorMessage }}
              </div>
            </Field>
          </div>
          <div class="col-md-6 mb-3">
            <Field
              v-slot="{ field }"
              name="is_internal"
              type="checkbox"
              :value="true"
            >
              <base-checkbox v-bind="field" class="custom-control-alternative">
                <span class="text-muted">apakah ini arus kas internal?</span>
              </base-checkbox>
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
      <div class="card-footer d-flex justify-content-end border-0">
        <button @click="$router.go(-1)" type="button" class="btn btn-secondary">
          Kembali
        </button>
        <button type="submit" class="btn btn-primary">Simpan</button>
      </div>
    </Form>
  </div>
</template>

<script>
import { Field, Form } from "vee-validate";
import axios from "@/api";
import waterfall from "async-waterfall";

export default {
  name: "login",
  components: {
    Form,
    Field,
    // ErrorMessage,
  },
  data() {
    return {
      type: [],
      account: [],
      img: "",
    };
  },
  created() {
    setTimeout(this.initialize, 500);
  },
  methods: {
    initialize() {
      var self = this;
      waterfall(
        [
          function (callback) {
            self.$store.commit("response_request");
            axios({ url: "api/account", method: "GET" }).then((result) => {
              self.account = result.data.data;
              self.$store.commit("response_success");
              callback(null);
            });
          },
          function (callback) {
            self.$store.commit("response_request");
            axios({ url: "api/type", method: "GET" }).then((result) => {
              self.type = result.data.data;
              self.$store.commit("response_success");
              callback(null);
            });
          },
          function (callback) {
            var id = self.decrypter(self.$route.params.id);
            self.$store.commit("response_request");
            axios({ url: "api/transaction/" + id, method: "GET" })
              .then((result) => {
                // self.tableData = ;
                self.$refs.myForm.setValues(result.data.data);
                self.img = result.data.data["foto"];
                self.$store.commit("response_success");
                callback(null);
              })
              .catch((err) => {
                self.$swal({
                  icon: "error",
                  title: "Maaf",
                  text: err.response.data.message,
                  showConfirmButton: false,
                });
                self.$store.commit("response_error");
              });
          },
        ],
        function () {
          // console.log(err);
          // result now equals 'done'
        }
      );
    },
    onSubmit(values) {
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

          dataSend.id = this.decrypter(this.$route.params.id);
          this.$store.commit("response_request");
          axios({ url: "api/transaction", data: dataSend, method: "put" })
            .then((result) => {
              this.$swal({
                icon: "success",
                title: "Sukses",
                text: result.statusText,
                showConfirmButton: false,
              });
              //   this.isEdit = false;

              //   setTimeout(this.initialize, 500);
              this.$router.push("/transaksi");
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
