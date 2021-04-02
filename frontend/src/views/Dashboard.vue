<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row mb-4">
        <div class="col-xl-12 col-lg-12">
          <div class="card">
            <div class="card-body">
              <div class="row align-items-center d-flex justify-content-center">
                <h1 class="text-center">Semua akun</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div v-for="item in akun" :key="item.id" class="col-xl-4 col-lg-6 my-1">
          <stats-card
            :title="item.name"
            :type="item.nominal > 0 ? 'gradient-green' : 'gradient-red'"
            :sub-title="reformatToRupiah(item.nominal)"
            :icon="item.nominal > 0 ? 'ni ni-bold-up' : 'ni ni-bold-down'"
            class="mb-4 mb-xl-0"
          >
            <!-- <template v-slot:footer>
              <span class="text-success mr-2">
                <i class="fa fa-arrow-up"></i> 3.48%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template> -->
          </stats-card>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <!--Charts-->
      <div class="row">
        <div class="col-xl-12 mb-5 mb-xl-0">
          <card header-classes="bg-transparent">
            <template v-slot:header>
              <div class="row align-items-center d-flex justify-content-center">
                <h1 class="text-center">Statik Tipe</h1>
              </div>
              <div class="row">
                <div
                  v-for="item in tipe"
                  :key="item.id"
                  class="col-xl-6 col-lg-6"
                >
                  <stats-card
                    :title="item.name"
                    :type="
                      item.is_minus == 0 ? 'gradient-green' : 'gradient-red'
                    "
                    :sub-title="
                      reformatToRupiah(
                        item.is_minus == 0 ? item.nominal : '-' + item.nominal
                      )
                    "
                    :icon="
                      item.is_minus == 0 ? 'ni ni-bold-up' : 'ni ni-bold-down'
                    "
                    class="mb-4 mb-xl-0"
                  >
                    <!-- <template v-slot:footer>
                      <span class="text-success mr-2">
                        <i class="fa fa-arrow-up"></i> 3.48%
                      </span>
                      <span class="text-nowrap">Since last month</span>
                    </template> -->
                  </stats-card>
                </div>
              </div>
            </template>
            <div class="chart-area">
              <apexchart
                type="area"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </div>
          </card>
        </div>
      </div>
      <!-- End charts-->

      <!--Tables-->
      <div class="row mt-5">
        <!-- <div class="col-xl-8 mb-5 mb-xl-0">
          <page-visits-table></page-visits-table>
        </div>
        <div class="col-xl-4">
          <social-traffic-table></social-traffic-table>
        </div> -->
      </div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
// Charts
import VueApexCharts from "vue3-apexcharts";
import * as moment from "moment";
import axios from "@/api";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    var self = this;
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
          // stacked: true,
        },
        xaxis: {
          type: "category",
          labels: {
            formatter: function (val) {
              return moment(val).format("MMM DD YYYY");
            },
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              var isMobile = /iPhone|iPad|iPod|Android/i.test(
                navigator.userAgent
              );
              if (isMobile) {
                return self.reformatCountToKNumber(val);
              } else {
                return self.reformatToRupiah(val);
              }
            },
          },
        },
        dataLabels: {
          formatter: function (val) {
            var isMobile = /iPhone|iPad|iPod|Android/i.test(
              navigator.userAgent
            );
            if (isMobile) {
              return self.reformatCountToKNumber(val);
            } else {
              return self.reformatToRupiah(val);
            }
          },
        },
        tooltip: {
          y: {
            formatter: function (value) {
              return self.reformatToRupiah(value);
            },
          },
        },
      },
      series: [],
      akun: [],
      tipe: [],
    };
  },
  created() {
    setTimeout(this.initialize, 500);
  },
  methods: {
    initialize() {
      axios({ url: "api/dashboard/type-nominal-monthly", method: "GET" }).then(
        (result) => {
          var array = [];
          result.data.data.forEach((element) => {
            try {
              var value = array.find((o, i) => {
                if (o.name === element.name) {
                  array[i].data.push([
                    new Date(element.date).getTime(),
                    element.nominal,
                  ]);
                  return true;
                }
              });
              if (!value) {
                array.push({
                  name: element.name,
                  data: [[new Date(element.date).getTime(), element.nominal]],
                });
              }
            } catch (e) {
              console.log(e);
            }
          });
          this.series = array;
          this.$store.commit("response_success");
        }
      );

      axios({
        url: "api/dashboard/account-nominal-this-month-only",
        method: "GET",
      }).then((result) => {
        this.akun = result.data.data;
        this.$store.commit("response_success");
      });

      axios({
        url: "api/dashboard/type-nominal-this-month-only",
        method: "GET",
      }).then((result) => {
        this.tipe = result.data.data;
        this.$store.commit("response_success");
      });
    },
  },
  mounted() {},
};
</script>
<style></style>
