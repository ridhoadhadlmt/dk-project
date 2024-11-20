<script>

import "flatpickr/dist/flatpickr.css";
import TableComponent from "@/components/table.vue";
import SelectHeader from "@/components/select-header.vue";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";
import store from "@/state/store";
import flatPickr from 'vue-flatpickr-component';
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";


export default {
    components: {
        Layout,
        TableComponent,
        SelectHeader,
        HeaderPage,
        flatPickr,
        Multiselect
    },
    data() {
        return {
            permissions: [],
            headers: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order:false
                },
                {
                    title: 'Kode Issue',
                    key: 'issueCode',
                    show: true,
                    order:true
                },
                {
                    title: 'Kode Fleet',
                    key: 'fleet.code',
                    show: true,
                    order:true
                },
                {
                    title: 'Judul',
                    key: 'complaintTitle',
                    show: true,
                    order:true
                },
                {
                    title: 'Prioritas',
                    key: 'priority',
                    show: true,
                    order:true
                },
                {
                    title: 'Status',
                    key: 'status',
                    show: true,
                    order:true
                },

                {
                    title: 'Action',
                    key: 'action',
                    show: true,
                    order:false
                }
            ],
            data: [
                {id: 1, code_issue: 'IS/01/2024', code_fleet: '001', title: 'Keluhan A',priority: 'High', status: 'open' },
            ],
            params: {
                page: 1,
                limit: 10,
                search: '',
                sortBy: 'id.desc',
                priority: null,
                startDate: null,
                endDate: null,
                finishDate: null,
                tags: null,
                status: null,
            },
            config:{
                total_pages: 0,
                total_items: 0,
            },
            
            deleteId: null,
            showSelectHeader: false,
            showModalDelete: false,
            showModalCheck: false,
            showModalReject: false,
            showModalFilter: false,
            reason: null,
        };
    },
    watch: {
        headers: {
            handler(newVal) {
                this.headers = newVal;
            },
            deep: true
        }
    },
    methods: {
        getData() {
            axios.get(process.env.VUE_APP_API_URL + "/v1/issues", {
                params: this.params
            })
                .then((response) => {
                    this.data = response.data.data.items;
                    this.config.total_pages = response.data.data.meta.totalPages;
                    this.config.total_items = response.data.data.meta.totalItems;
                })
                .catch((error) => {
                    console.log(error);
                });

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
        },

        showSelectHeaderMethod() {
            this.showSelectHeader = true;
        },

        hideSelectHeaderMethod() {
            this.showSelectHeader = false;
        },

        showModalDeleteMethod(id) {
            this.deleteId = id;
            this.showModalDelete = true;
        },
        showModalCheckMethod(id) {
            this.deleteId = id;
            this.showModalCheck = true;
        },
        showModalRejectMethod(id) {
            this.deleteId = id;
            this.showModalReject = true;
        },

        deleteDataMethod() {
            // this.showModalDelete = false
            axios.delete(process.env.VUE_APP_API_URL + '/v1/issues/' + this.deleteId).then(() => {
                this.getData();
                this.deleteId = null;
                this.showModalDelete = false;

                Swal.fire("Berhasil!", "Berhasil menghapus data", "success");
            }).catch((error) => {
                console.log(error);
            });
        },
        changePage(pageNumber) {
            console.log("Change Page", pageNumber);
            
            this.params.page = pageNumber;
        },
        sort(sortBy) {
            this.params.sortBy = `${sortBy}.desc`;
            this.getData();
        },
        exportExcel() {
			axios.defaults.responseType = 'blob';
			axios.get(process.env.VUE_APP_API_URL+'/cms/v1/admins/export', {
                params:{
					sortBy:"fullName.asc",
				}
            }).then((res) => {
					const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', `Program Maintenance.xlsx`);
					document.body.appendChild(link);
					link.click();
					axios.defaults.responseType = 'json'

				});
		},
        filterData() {
            this.showModalFilter = false;
            this.params.page = 1;
            this.getData();
        },
        resetFilter() {
            this.params = {
                page: 1,
                limit: 10,
                search: '',
                priority: null,
                startDate: null,
                endDate: null,
                finishDate: null,
                tags: null,
                status: null,
            };
            this.getData();
            this.showModalFilter = false;
        },

        changeStatus(status) {
            const body = {
                status: status,
                rejectReason: this.reason ? this.reason : '-'
            };

            axios.put(process.env.VUE_APP_API_URL + '/v1/issues/' + this.deleteId + '/status', body).then(() => {
                this.getData();
            });
        }
    },
    mounted() {
        this.permissions = store.getters["auth/permission"];
        this.getData();
        window.addEventListener("resize", this.resizerightcolumn);
    }

};
</script>

<template>
    <Layout>

        
        <SelectHeader :showModal="showSelectHeader" :headers="headers" @hideModal="hideSelectHeaderMethod" @selectHeader="selectHeaderMethod" />
        
        <!-- Modal Delete -->
        <BModal v-model="showModalDelete" hide-footer hide-header-close centered  class="v-modal-custom" size="sm">
            <div class="text-center">
                <b class="fs-14">Apakah anda yakin menghapus data ini?</b>
                <div class="d-flex justify-content-center mt-4">
                    <BButton variant="dark" class="me-2" @click="showModalDelete = false">Tidak</BButton>
                    <BButton variant="light" @click="deleteDataMethod">Ya</BButton>
                </div>
            </div>
        </BModal>
        <BModal v-model="showModalCheck" hide-footer hide-header-close centered  class="v-modal-custom" width="200">
            <div class="text-center">
                <b class="fs-14">Apakah anda yakin mengkonfirmasi data ini?</b>
                <div class="d-flex justify-content-center mt-4">
                    <BButton variant="dark" class="me-2" @click="showModalCheck = false">Kembali</BButton>
                    <BButton variant="light" @click="changeStatus('approved')">Ya</BButton>
                </div>
            </div>
        </BModal>
        <BModal v-model="showModalReject" hide-footer centered title="Reject"  class="v-modal-custom" width="300">
            
            <div class="">
                <p class="fs-14 mb-3">Silahkan tuliskan alasan menolak backlog ini</p>
                <div>
                    <label for="">Alasan</label>
                    <input type="text" class="form-control" placeholder="Tuliskan alasan" v-model="reason"/>
                </div>
                <div class="d-flex justify-content-end mt-4">
                    <BButton variant="dark" class="me-2" @click="changeStatus('rejected')">Kirim</BButton>
                </div>
            </div>
        </BModal>
        <!-- //Modal Delete -->


        <!-- Modal Filter -->
        <BModal v-model="showModalFilter" hide-footer hide-header-close centered  class="v-modal-custom" size="md" title="Filter">
            <BForm @submit.prevent="filterData">
                <BFormGroup label="Prioritas" class="mb-3">
                    <Multiselect v-model="params.priority" :options="['critical', 'high', 'medium', 'low', 'none']" class="form-control" />
                </BFormGroup>

                <BFormGroup label="Tanggal Keluhan" class="mb-3">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="input-group">
                                <flat-pickr v-model="params.startDate" :config="rangeDateconfig" class="form-control"
                                    id="complaint-datepicker-start" alt-input="asd">
                                </flat-pickr>
                                <span class="input-group-text"><i class="ri-calendar-event-line"></i></span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="input-group mt-2 mt-md-0">
                                <flat-pickr v-model="params.endDate" :config="rangeDateconfig" class="form-control"
                                    id="complaint-datepicker-end">
                                </flat-pickr>
                                <span class="input-group-text"><i class="ri-calendar-event-line"></i></span>
                            </div>
                        </div>
                    </div>
                </BFormGroup>

                <BFormGroup label="Tanggal Harus Diselesaikan" class="mb-3">
                    <div class="input-group">
                        <flat-pickr v-model="params.finishDate" class="form-control" id="due-datepicker">
                        </flat-pickr>
                        <span class="input-group-text"><i class="ri-calendar-event-line"></i></span>
                    </div>
                </BFormGroup>

                <BFormGroup label="Status Keterlambatan" class="mb-3">
                    <Multiselect v-model="params.status" :options="['On Time', 'Delayed']" class="form-control" />
                </BFormGroup>

                <BFormGroup label="Status Issue" class="mb-3">
                    <Multiselect v-model="params.status" :options="['Open', 'Closed']" class="form-control" />
                </BFormGroup>

                <div class="d-flex justify-content-end">
                    <BButton variant="light" class="me-2 mt-4" @click="resetFilter">Reset</BButton>
                    <BButton variant="primary" class="mt-4" @click="filterData">Terapkan</BButton>
                </div>
            </BForm>
        </BModal>

        <!-- //Modal Filter -->

        <HeaderPage title="Administrator" pageTitle="Admin" />

        <BRow>
            <BCol xl="12">
                <BCard no-body>
                    <!-- <BCardHeader>
                        
                    </BCardHeader> -->

                    <BCardBody>
                        <div class="d-flex flex-wrap justify-content-between py-lg-4">
                            <h4 class="card-title mb-0"></h4>

                            <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showSelectHeaderMethod">
                                    <i class="bx bx-dots-vertical-rounded"></i>
                                </BButton>
                               
                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showModalFilter = true">
                                    <img src="@/assets/icons/filter.svg" alt="filter" />
                                    Filter
                                </BButton>

                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportExcel" v-if="permissions.includes('download')">
                                    Download Data
                                </BButton>

                                <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                    <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                        <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="params.search" @keyup.enter="getData">
                                        <i class="ri-search-line search-icon"></i>
                                    </div>

                                    <router-link :to="{ name: 'issue-report-create' }" v-if="permissions.includes('create')">
                                        <BButton variant="primary" class="btn btn-md" style="white-space: nowrap;">
                                            Tambah Issue
                                        </BButton>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="live-preview">
                            <table-component :headers="headers" :data="data" :action="action" v-if="data.length > 0" @sort="sort($event.sortBy)">
                                <!-- NO -->
                                <template #no="{ index }">
                                    {{ index + 1 }}
                                </template>
                                <!-- //Status -->
                                <template #status="{ item }">   
                                    <span :class="item.status == 'open' ? 'badge rounded-pill bg-success-subtle text-success fs-12' : 'badge rounded-pill bg-danger-subtle text-danger fs-12'">{{ (item.status) ? 'Terbuka' : 'Tertutup' }}</span>
                                </template>
                                <template #action="{ item }">
                                    <BButton variant="link" class="link-dark" size="sm" :to="`/issue-report/edit/${item.id}`" v-if="permissions.includes('update')">
                                        <img src="@/assets/icons/edit.svg" alt="pencil" />
                                    </BButton>
                                    <BButton variant="link" class="link-opacity-75" size="sm" @click="showModalDeleteMethod(item.id)" v-if="permissions.includes('delete')">
                                        <img src="@/assets/icons/delete.svg" alt="delete" />
                                    </BButton>
                                    <BButton variant="link" class="link-opacity-75" size="sm" :to="`/issue-report/view/${item.id}`">
                                        <img src="@/assets/icons/view.svg" alt="eye" />
                                    </BButton>  
                                    <BButton variant="link" class="link-opacity-75 bg-success p-1 mx-1 rounded-2" size="sm" @click="showModalCheckMethod(item.id)" v-if="permissions.includes('approve')">
                                        <img src="@/assets/icons/check.svg" width="20" alt="check" />
                                    </BButton>
                                    <BButton variant="link" class="link-opacity-75 bg-danger rounded-circle p-1 mx-1" size="sm" @click="showModalRejectMethod(item.id)" v-if="permissions.includes('approve')">
                                        <img src="@/assets/icons/cancel.svg" width="16" alt="cancel" />
                                    </BButton>
                                </template>

                                <template #pagination>  

                                    <div class="d-flex justify-content-between mt-3" v-if="config.total_items >= 1">
                                        <div class="d-flex align-items-center">
                                            <!-- <label for="perPageSelect" class="me-2">Items per page:</label> -->
                                            <select id="perPageSelect" v-model="params.limit" class="form-select" >
                                                <option v-for="option in [10, 20, 30, 50]" :key="option" :value="option">{{ option }}</option>
                                            </select>
                                        </div>
                                        <div class="pagination-wrap hstack gap-2">
                                            <BButton class="page-item pagination-prev" variant="light"  :disabled="params.page <= 1" @click="params.page--">
                                                <i class="ri-arrow-left-s-line"></i>
                                            </BButton>
                                            <ul class="pagination listjs-pagination mb-0">
                                                <li :class="{active: pageNumber == params.page, disabled: pageNumber == '...'}" v-for="(pageNumber, index) in config.total_pages" :key="index" @click="changePage(pageNumber)">
                                                <BButton class="page" >{{ pageNumber }}</BButton>
                                                </li>
                                            </ul>
                                            <BButton class="page-item pagination-next" variant="light"  :disabled="params.page >= config.total_pages" @click="params.page++">
                                                <i class="ri-arrow-right-s-line"></i>
                                            </BButton>
                                        </div>
                                    </div>
                                </template>
                            </table-component>
                        </div>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>