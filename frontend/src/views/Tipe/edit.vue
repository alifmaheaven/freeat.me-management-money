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
            <label for="validationCustom01">Deskripsi</label>
            <Field
              name="description"
              rules="required"
              v-slot="{ field, errorMessage }"
            >
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
              v-slot="{ field }"
              name="is_minus"
              type="checkbox"
              :value="true"
            >
              <base-checkbox v-bind="field" class="custom-control-alternative">
                <span class="text-muted"
                  >Centang kalau tipe ini mengurangi uang kamu!</span
                >
              </base-checkbox>
            </Field>
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
    initialize() {
      var id = this.decrypter(this.$route.params.id);
      axios({ url: "api/type/" + id, method: "GET" })
        .then((result) => {
          // this.tableData = ;
          this.$refs.myForm.setValues(result.data.data);
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
    onSubmit(values) {
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
          dataSend.id = this.decrypter(this.$route.params.id);
          this.$store.commit("response_request");
          axios({ url: "api/type", data: dataSend, method: "put" })
            .then((result) => {
              this.$swal({
                icon: "success",
                title: "Sukses",
                text: result.statusText,
                showConfirmButton: false,
              });
              //   this.isEdit = false;

              //   setTimeout(this.initialize, 500);
              this.$router.push("/tipe-transaksi");
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
