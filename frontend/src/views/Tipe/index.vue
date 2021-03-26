<template>
  <DataTable
    :value="tableData"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 50]"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    :globalFilterFields="['name', 'deskripsi']"
    v-model:filters="filter"
  >
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-6">
          <router-link to="/tipe-transaksi/create">
            <base-button type="primary" size="md">Tambah</base-button>
          </router-link>
        </div>
        <div class="col-12 col-sm-12 col-md-6">
          <div class="p-d-flex p-jc-between text-right">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="filter['global'].value"
                placeholder="Keyword Search"
              />
            </span>
          </div>
        </div>
      </div>
    </template>
    <template #empty> No Data found. </template>
    <template #loading> Loading data. Please wait. </template>
    <Column field="name" header="Name" sortable="true"></Column>
    <Column field="description" header="Deskripsi" sortable="true"></Column>
    <Column field="is_minus" header="Status" sortable="true">
      <template #body="row">
        <span v-if="row.data.is_minus == 0" class="badge badge-success"
          >Bertamba</span
        >
        <span v-else class="badge badge-danger">Berkurang</span>
      </template>
    </Column>
    <Column field="action" header="Aksi">
      <template #body="row">
        <router-link :to="`/tipe-transaksi/edit/${encrypter(row.data.id)}`">
          <base-button class="mx-2 my-2" type="warning" size="sm"
            >Edit</base-button
          >
        </router-link>
        <base-button
          class="mx-2 my-2"
          @click="deleteRow(row.data)"
          type="danger"
          size="sm"
          >Delete</base-button
        >
      </template>
    </Column>
  </DataTable>
</template>
<script>
import axios from "@/api";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
// import Button from 'primevue/button';
import InputText from "primevue/inputtext";
import { FilterMatchMode } from "primevue/api";

export default {
  name: "projects-table",
  components: {
    DataTable,
    Column,
    //  Button,
    InputText,
  },
  data() {
    return {
      filter: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      tableData: [],
    };
  },
  created() {
    setTimeout(this.initialize, 500);
  },
  methods: {
    initialize() {
      this.$store.commit("response_request");
      axios({ url: "api/type", method: "GET" })
        .then((result) => {
          this.tableData = result.data.data;
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
    deleteRow(value) {
      this.$swal({
        text: "Apakah kamu yakin ?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      }).then((result) => {
        if (result.value) {
          this.$store.commit("response_request");
          axios({ url: "api/type", data: value, method: "DELETE" })
            .then((result) => {
              this.$swal({
                icon: "success",
                title: "Sukses",
                text: result.statusText,
                showConfirmButton: false,
              });
              setTimeout(this.initialize, 500);
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
