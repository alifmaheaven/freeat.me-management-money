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

          <!-- <div class="col-md-6 mb-3">
            <Field
              name="nominal"
              rules="required"
              v-slot="{ field, errorMessage }"
            >
              <label for="validationCustom01">Nominal batas</label>
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
              v-slot="{ field }"
              name="set_nominal"
              type="checkbox"
              :value="true"
            >
              <base-checkbox v-bind="field" class="custom-control-alternative">
                <span class="text-muted"
                  >Centang jika ingin menambahkan batas atas dari uang mu!</span
                >
              </base-checkbox>
            </Field>
          </div> -->
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
  created() {
    setTimeout(this.initialize, 500);
  },
  methods: {
    submit: function () {
      this.$refs.submit.click();
    },
    initialize() {
      this.$refs.myForm.setValues({
        name: "",
        description: "",
        nominal: 0,
        set_nominal: 0,
      });
    },
    onSubmit(values) {
      console.log(values);
      //eksekusi ini kalo berhasil
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
          var dataSend = values;
          this.$store.commit("response_request");
          axios({ url: "api/account", data: dataSend, method: "POST" })
            .then((result) => {
              this.$swal({
                icon: "success",
                title: "Sukses",
                text: result.statusText,
                showConfirmButton: false,
              });
              //   this.isEdit = false;

              //   setTimeout(this.initialize, 500);
              this.$router.push("/akun-transaksi");

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
