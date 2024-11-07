<script>
import getChartColorsArray from "@/common/getChartColorsArray";

import { Autoplay, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/mousewheel";

import "flatpickr/dist/flatpickr.css";

import Layout from "@/layouts/main.vue";

export default {
  components: {
    Layout,

  },
  data() {
    return {
      date: "2022-01-01 to 2022-01-31",
      config: {
        mode: "range",
      },
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        labels: ["Direct", "Social", "Email", "Other", "Referrals"],
        chart: {
          height: 333,
          type: "donut",
        },
        legend: {
          position: "bottom",
        },
        stroke: {
          show: false,
        },
        dataLabels: {
          dropShadow: {
            enabled: false,
          },
        },
        colors: getChartColorsArray('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'),
      },
      Autoplay, Mousewheel,
      dismissibleAlert: true,
      showAll: false,
    };
  },
  methods: {
    showFilter(){
      this.showAll = true
    },
    hideFilter(){
      this.showAll = false
    },
    rightcolumn() {
      if (document.querySelector('.layout-rightside-col').classList.contains('d-block')) {
        document.querySelector('.layout-rightside-col').classList.remove('d-block');
        document.querySelector('.layout-rightside-col').classList.add('d-none');
      } else {
        document.querySelector('.layout-rightside-col').classList.remove('d-none');
        document.querySelector('.layout-rightside-col').classList.add('d-block');
      }
    },

    resizerightcolumn() {
      const element = document.querySelector('.layout-rightside-col');

      if (element) {
        if (window.outerWidth < 1699) {
          element.classList.remove("d-block");
          element.classList.add("d-none");
        } else {
          element.classList.add("d-block");
          element.classList.remove("d-none");
        }
      }

      if (document.documentElement.getAttribute("data-layout") === "semibox") {
        element.classList.remove("d-block");
        element.classList.add("d-none");
      }
    },

    hiderightcolumn() {
      const element = document.querySelector('.layout-rightside-col');
      if (element.classList.contains('d-block')) {
        element.classList.remove("d-block");
        element.classList.add("d-none");
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.resizerightcolumn);
  }

};
</script>

<template>
  <Layout>
    <BRow>
      <BCol>
        <div class="h-100">
          <BRow class="mb-3 pb-1">
            <BCol cols="12">
              <div class="d-flex align-items-lg-center flex-lg-row flex-column mb-2">
                <div class="flex-grow-1">
                  <h4 class="fs-16 mb-1">Dashboard</h4>
                  <p class="text-muted">
                    Sorotan info paling penting.
                  </p>
                </div>

              </div>
              <BAlert :model-value="true" variant="warning" class="p-4 border-warning-2" v-model="dismissibleAlert" dismissible>
                
                <h5 class="mb-0"> <img src="@/assets/icons/alert.svg" class="" width="24" alt="alert" /> <strong>Warning: Sparepart A hanya tersisa 3 lagi</strong></h5>
                
              </BAlert>
            </BCol>
            <BCol cols="12">
              <div class="rounded-4 shadow-sm bg-white p-4">
                
                <ul class="nav" id="tab" role="tablist">
                  <li class="nav-item" role="tab">
                    <button class="nav-link active" id="todolist-tab" data-bs-toggle="tab" data-bs-target="#todolist-tab-pane" type="button" role="tab" aria-controls="todolist-tab-pane" aria-selected="true">To-do-list <i class="bx bxs-info-circle fs-227"></i></button>
                  </li>
                  <li class="nav-item" role="tab">
                    <button class="nav-link" id="analytics-tab" data-bs-toggle="tab" data-bs-target="#analytics-tab-pane" type="button" role="tab" aria-controls="analytics-tab-pane" aria-selected="false">Analitycs <i class="bx bxs-info-circle fs-227"></i></button>
                  </li>
                </ul>
                <div class="tab-content py-3" id="myTabContent">
                
                  <div class="tab-pane fade show active" id="todolist-tab-pane" role="tabpanel" aria-labelledby="todolist-tab" tabindex="0">
                    <BRow class="mb-4">
                    <BCol cols="6">
                      <div class="p-0 bg-white rounded-4 shadow-sm border">
                        <div class="p-4 d-flex align-items-center">
                          <h4>Update Parameter </h4><BBadge class="fs-16 d-flex align-items-center justify-content-center rounded-circle ms-2" variant="danger">2</BBadge> <i class="bx bxs-info-circle fs-22 ms-2"></i>
                        </div>
                        <div class="table-responsive">
                          <table class="table">
                            <thead class="">
                              <tr>
                                <th>No</th>
                                <th>Kode Fleet</th>
                                <th>Keterangan</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody class="tbody overflow-y-auto">
                              <tr>
                                <td>1</td>
                                <td>P001</td>
                                <td><BButton size="sm" variant="danger">Overdue</BButton></td>
                                <td><BButton size="sm" variant="primary">Kerjakan</BButton></td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>SP001</td>
                                <td><BButton size="sm" variant="warning">Due Now</BButton></td>
                                <td><BButton size="sm" variant="primary">Kerjakan</BButton></td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>SP002</td>
                                <td><BButton size="sm" variant="success">Completed</BButton></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>P002</td>
                                <td><BButton size="sm" variant="success">Completed</BButton></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>5</td>
                                <td>P003</td>
                                <td><BButton size="sm" variant="success">Completed</BButton></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>6</td>
                                <td>SP003</td>
                                <td><BButton size="sm" variant="success">Completed</BButton></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>7</td>
                                <td>SP004</td>
                                <td><BButton size="sm" variant="success">Completed</BButton></td>
                                <td></td>
                                
                              </tr>
                            </tbody>
                          </table> 
                        </div>
                      </div>
                    </BCol>
                    <BCol cols="6">
                      <div class="p-0 bg-white rounded-4 shadow-sm border">
                        <div class="p-4 d-flex align-items-center">
                          <h4>Lainnya </h4><BBadge class="fs-16 d-flex align-items-center justify-content-center rounded-circle ms-2" variant="danger">2</BBadge> <i class="bx bxs-info-circle fs-22 ms-2"></i>
                        </div>
                        <div class="table-responsive">
                          <table class="table" >
                            <thead class="">
                              <tr>
                                <th>No</th>
                                <th>Tugas</th>
                                <th>Keterangan</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody class="tbody overflow-y-auto">
                              <tr>
                                <td>1</td>
                                <td>Pembaruan Status Perfleetan[P001]</td>
                                <td><BButton size="sm" variant="danger">Overdue</BButton></td>
                                <td><BButton size="sm" variant="primary">Kerjakan</BButton></td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>Pembaruan Meteran Terakhir [P002]</td>
                                <td><BButton size="sm" variant="warning">Due Now</BButton></td>
                                <td><BButton size="sm" variant="primary">Kerjakan</BButton></td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>Pembaruan Meteran Terakhir [P003]</td>
                                <td><BButton size="sm" variant="success">Completed</BButton></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>Pembaruan Status Perfleetan[P002]</td>
                                <td><BButton size="sm" variant="success">Completed</BButton></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>5</td>
                                <td>Pembaruan Status Perfleetan[P003]</td>
                                <td><BButton size="sm" variant="success">Completed</BButton></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>6</td>
                                <td>Pembaruan Status Perfleetan[P004]</td>
                                <td><BButton size="sm" variant="success">Completed</BButton></td>
                                <td></td>
                              </tr>
                              <tr>
                                <td>7</td>
                                <td>Pembaruan Status Perfleetan[P005]</td>
                                <td><BButton size="sm" variant="success">Completed</BButton></td>
                                <td></td>
                              </tr>
                            </tbody>
                          </table> 
                        </div>
                      </div>
                    </BCol>
                  </BRow>
                  <BRow>
                    <BCols cols="12">
                      <BCard class="shadow-sm rounded-4 items-center border py-5">
                        <BCardBody class="text-center">
                          <img src="" alt="">
                          <BCardTitle>Pekerjaan Sudah Selesai!</BCardTitle>
                          <BCardText>List pekerjaan akan muncul disini jika ada pekerjaan yang baru diselesaikan.</BCardText>
                        </BCardBody>
                      </BCard>
                    </BCols>
                  </BRow>
                  <BRow>
                    <BCol cols="12">
                      <BCard class="p-4 shadow-sm rounded-4 m-0 border">
                        <BCardTitle class="py-4 d-flex justify-content-between">
                          <strong>Quick Access  <i class="bx bxs-info-circle fs-22 ms-2"></i></strong>
      
                          <i class="bx bx-chevron-down fs-22"></i>
                        </BCardTitle>
                        
                        <BRow>
                          <BCol cols="4">
                            <BCard text-variant="white" class="rounded-4" style="background-color: #2884EF">
                              <BCardBody>
                                <img src="" alt="">
                                <BCardTitle class="text-white">Pembaruan Biaya Lainnya</BCardTitle>
                                <BCardText>Lihat Detail ></BCardText>
                              </BCardBody>
                            </BCard>
                          </BCol>
                          <BCol cols="4">
                            <BCard text-variant="white" class="rounded-4" style="background-color: #47BE7D">
                              <BCardBody>
                                <img src="" alt="">
                                <BCardTitle class="text-white">Pembaruan BBM</BCardTitle>
                                <BCardText>Lihat Detail ></BCardText>
                              </BCardBody>
                            </BCard>
                          </BCol>
                          <BCol cols="4">
                            <BCard text-variant="white" class="rounded-4" style="background-color: #7239EA">
                              <BCardBody>
                                <img src="" alt="">
                                <BCardTitle class="text-white">Pembaruan Lokasi Kendaraan</BCardTitle>
                                <BCardText>Lihat Detail ></BCardText>
                              </BCardBody>
                            </BCard>
                          </BCol>
                        </BRow>
                      </BCard>
                    </BCol>
                  </BRow>
                  </div>
                  <div class="tab-pane fade " id="analytics-tab-pane" role="tabpanel" aria-labelledby="analytics-tab" tabindex="0">
      
                    <BRow class="mb-4">
                      <div class="d-flex justify-content-end">
                        <div v-if="showAll == true">
                          <button class="btn btn-light rounded-2"><i class="bx bx-chevron-left fs-24"></i></button>
                          <button class="btn btn-light rounded-2"><i class="bx bx-chevron-right fs-24"></i></button>
                          <button class="btn btn-light rounded-2" @click="hideFilter()">Show All</button>
                        </div>
                        <div v-if="showAll == false">
                          <button class="btn btn-light rounded-2" @click="showFilter()">Show Less</button>
                        </div>
                        <i class="btn bx bx-chevron-down fs-22"></i>
                      </div>
                      <BCol cols="4">
                        <div class="shadow-sm rounded-4 p-4 bg-white border">
                          <div class="d-flex justify-content-between">
                            <h1>188</h1>
                            <div class="dropdown">
                              <button class="btn btn-sm btn-light py-1 px-2 rounded-4" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bx bx-dots-horizontal-rounded"></i>
                              </button>
                              <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">Hari Ini</a></li>
                              <li><a class="dropdown-item" href="#">Kemarin</a></li>
                              <li><a class="dropdown-item" href="#">7 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">30 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Ini</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Lalu</a></li>
                            </ul>
                            </div>
                          </div>
                          <p>Penambah Hour Meter Semua Fleet</p>
                        </div>
                      </BCol>
                      <BCol cols="4">
                        <div class="shadow-sm rounded-4 p-4 bg-white border">
                          <div class="d-flex justify-content-between">
                            <h1>324</h1>
                            <div class="dropdown">
                              <button class="btn btn-sm btn-light py-1 px-2 rounded-4" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bx bx-dots-horizontal-rounded"></i>
                              </button>
                              <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">Hari Ini</a></li>
                              <li><a class="dropdown-item" href="#">Kemarin</a></li>
                              <li><a class="dropdown-item" href="#">7 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">30 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Ini</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Lalu</a></li>
                            </ul>
                            </div>
                          </div>
                          <p>Total Work Order</p>
                        </div>
                      </BCol>
                      <BCol cols="4">
                        <div class="shadow-sm rounded-4 p-4 bg-white border">
                          <div class="d-flex justify-content-between">
                            <h1>196</h1>
                            <div class="dropdown">
                              <button class="btn btn-sm btn-light py-1 px-2 rounded-4" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bx bx-dots-horizontal-rounded"></i>
                              </button>
                              <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">Hari Ini</a></li>
                              <li><a class="dropdown-item" href="#">Kemarin</a></li>
                              <li><a class="dropdown-item" href="#">7 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">30 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Ini</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Lalu</a></li>
                            </ul>
                            </div>
                          </div>
                          <p>Liter Pemakaian BBM (Semua Fleet)</p>
                        </div>
                      </BCol>
                      <BCol cols="4">
                        <div class="shadow-sm rounded-4 p-4 bg-white border">
                          <div class="d-flex justify-content-between">
                            <h1>240,3 Juta</h1>
                            <div class="dropdown">
                              <button class="btn btn-sm btn-light py-1 px-2 rounded-4" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bx bx-dots-horizontal-rounded"></i>
                              </button>
                              <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">Hari Ini</a></li>
                              <li><a class="dropdown-item" href="#">Kemarin</a></li>
                              <li><a class="dropdown-item" href="#">7 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">30 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Ini</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Lalu</a></li>
                            </ul>
                            </div>
                          </div>
                          <p>Rupiah Total Work Order Cost</p>
                        </div>
                      </BCol>
                      <BCol cols="4">
                        <div class="shadow-sm rounded-4 p-4 bg-white border">
                          <div class="d-flex justify-content-between">
                            <h1>180,2 Juta</h1>
                            <div class="dropdown">
                              <button class="btn btn-sm btn-light py-1 px-2 rounded-4" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bx bx-dots-horizontal-rounded"></i>
                              </button>
                              <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">Hari Ini</a></li>
                              <li><a class="dropdown-item" href="#">Kemarin</a></li>
                              <li><a class="dropdown-item" href="#">7 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">30 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Ini</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Lalu</a></li>
                            </ul>
                            </div>
                          </div>
                          <p>Rupiah Total Cost Non-Teknis</p>
                        </div>
                      </BCol>
                      <BCol cols="4">
                        <div class="shadow-sm rounded-4 p-4 bg-white border">
                          <div class="d-flex justify-content-between">
                            <h1>72</h1>
                            <div class="dropdown">
                              <button class="btn btn-sm btn-light py-1 px-2 rounded-4" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bx bx-dots-horizontal-rounded"></i>
                              </button>
                              <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">Hari Ini</a></li>
                              <li><a class="dropdown-item" href="#">Kemarin</a></li>
                              <li><a class="dropdown-item" href="#">7 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">30 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Ini</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Lalu</a></li>
                            </ul>
                            </div>
                          </div>
                          <p>Liter Pemakaian BBM (Semua Fleet)</p>
                        </div>
                      </BCol>
                      
                      <BCol cols="4">
                        <div class="shadow-sm rounded-4 p-4 bg-white border">
                          <div class="d-flex justify-content-between">
                            <h1>84</h1>
                            <div class="dropdown">
                              <button class="btn btn-sm btn-light py-1 px-2 rounded-4" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bx bx-dots-horizontal-rounded"></i>
                              </button>
                              <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">Hari Ini</a></li>
                              <li><a class="dropdown-item" href="#">Kemarin</a></li>
                              <li><a class="dropdown-item" href="#">7 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">30 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Ini</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Lalu</a></li>
                            </ul>
                            </div>
                          </div>
                          <p>Total Timeline Issue (Response Rate)</p>
                        </div>
                      </BCol>
                      <BCol cols="4">
                        <div class="shadow-sm rounded-4 p-4 bg-white border">
                          <div class="d-flex justify-content-between">
                            <h1>193</h1>
                            <div class="dropdown">
                              <button class="btn btn-sm btn-light py-1 px-2 rounded-4" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bx bx-dots-horizontal-rounded"></i>
                              </button>
                              <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">Hari Ini</a></li>
                              <li><a class="dropdown-item" href="#">Kemarin</a></li>
                              <li><a class="dropdown-item" href="#">7 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">30 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Ini</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Lalu</a></li>
                            </ul>
                            </div>
                          </div>
                          <p>Timeline WO (Late From Deadline)</p>
                        </div>
                      </BCol>
                      <BCol cols="4">
                        <div class="shadow-sm rounded-4 p-4 bg-white border">
                          <div class="d-flex justify-content-between">
                            <h1>185</h1>
                            <div class="dropdown">
                              <button class="btn btn-sm btn-light py-1 px-2 rounded-4" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bx bx-dots-horizontal-rounded"></i>
                              </button>
                              <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">Hari Ini</a></li>
                              <li><a class="dropdown-item" href="#">Kemarin</a></li>
                              <li><a class="dropdown-item" href="#">7 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">30 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Ini</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Lalu</a></li>
                            </ul>
                            </div>
                          </div>
                          <p>Overdue Inspection</p>
                        </div>
                      </BCol>
                      <BCol cols="4">
                        <div class="shadow-sm rounded-4 p-4 bg-white border">
                          <div class="d-flex justify-content-between">
                            <h1>Issue</h1>
                            <div class="dropdown">
                              <button class="btn btn-sm btn-light py-1 px-2 rounded-4" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bx bx-dots-horizontal-rounded"></i>
                              </button>
                              <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">Hari Ini</a></li>
                              <li><a class="dropdown-item" href="#">Kemarin</a></li>
                              <li><a class="dropdown-item" href="#">7 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">30 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Ini</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Lalu</a></li>
                            </ul>
                            </div>
                          </div>
                          <p>Inspection Summary for Vehicles</p>
                        </div>
                      </BCol>
                      <BCol cols="4">
                        <div class="shadow-sm rounded-4 p-4 bg-white border">
                          <div class="d-flex justify-content-between">
                            <h1>179</h1>
                            <div class="dropdown">
                              <button class="btn btn-sm btn-light py-1 px-2 rounded-4" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bx bx-dots-horizontal-rounded"></i>
                              </button>
                              <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">Hari Ini</a></li>
                              <li><a class="dropdown-item" href="#">Kemarin</a></li>
                              <li><a class="dropdown-item" href="#">7 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">30 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Ini</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Lalu</a></li>
                            </ul>
                            </div>
                          </div>
                          <p>WO Berdasarkan Label Bebas</p>
                        </div>
                      </BCol>
                      <BCol cols="4">
                        <div class="shadow-sm rounded-4 p-4 bg-white border">
                          <div class="d-flex justify-content-between">
                            <h1>187</h1>
                            <div class="dropdown">
                              <button class="btn btn-sm btn-light py-1 px-2 rounded-4" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bx bx-dots-horizontal-rounded"></i>
                              </button>
                              <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">Hari Ini</a></li>
                              <li><a class="dropdown-item" href="#">Kemarin</a></li>
                              <li><a class="dropdown-item" href="#">7 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">30 Hari Terakhir</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Ini</a></li>
                              <li><a class="dropdown-item" href="#">Bulan Lalu</a></li>
                            </ul>
                            </div>
                          </div>
                          <p>Issue Berdasarkan Label Bebas</p>
                        </div>
                      </BCol>
                    </BRow>
                  </div>
                </div>
              </div>
            </BCol>
          </BRow>
          

        </div>
      </BCol>
    </BRow>
  </Layout>
</template>

<style scoped>
.badge{
  width: 30px;
  height: 30px;
}
.table{
  display:grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  height: 300px;
}
.tbody{
  height: 100%;
}
.tbody::-webkit-scrollbar-track
{
	border-radius: 10px;
	background-color: #F6F7F9;
}

.tbody::-webkit-scrollbar
{
	width: 8px;
	background-color: #F6F7F9;
}

.tbody::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	background-color: #A1A5B7;
}
th,td{
  padding: 1.5rem;
}
tr{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style>