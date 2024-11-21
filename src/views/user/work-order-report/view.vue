<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import HeaderPage from "@/components/header-page.vue";
import axios from "axios";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import TableComponent from "@/components/table.vue";

export default {
    name: "program-maintenance-create",
    components: {
        Layout,
        HeaderPage,
        Multiselect,
        TableComponent,
    },
    data() {
        return {
            id: this.$route.params.id,
            datas: null,
            showModalPhoto: false,
            activities: [],
            params: {
                page: 1,
                limit: 10,
                search: '',
                sortBy: 'id.desc',
                workOrderId: this.$route.params.id
            },
            config:{
                total_pages: 0,
                total_items: 0,
            },
            headersActivity: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order: false
                },
                {
                    title: 'Judul',
                    key: 'title',
                    show: true,
                    order: true
                },
                {
                    title: 'Start Date',
                    key: 'startDate',
                    show: true,
                    order: true
                },
                {
                    title: 'Due Date',
                    key: 'endDate',
                    show: true,
                    order: true
                },
                {
                    title: 'Actual Finish Date',
                    key: 'actualFinishDate',
                    show: true,
                    order: true
                },
                {
                    title: 'Sub Total',
                    key: 'total',
                    show: true,
                    order: true
                },
                {
                    title: 'Action',
                    key: 'action',
                    show: true,
                    order: false
                }
            ],
        };
    },
    watch: {
    },
    methods: {
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

        getData() {
            axios.get(process.env.VUE_APP_API_URL + "/v1/work-orders/" + this.$route.params.id)
                .then(response => {
                    this.datas = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        fetchActivities() {
            axios.get(process.env.VUE_APP_API_URL + "/v1/work-order-activities/", {
                params: this.params
            })
                .then(response => {
                    this.activities = response.data.data.items;
                    this.config.total_pages = response.data.data.meta.totalPages;
                    this.config.total_items = response.data.data.meta.totalItems;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        downloadDocument() {
            window.open(this.datas.document, '_blank');
        }
    },
    computed: {
        type() {
            if (this.datas.type == '1') {
                return 'Perbaikan';
            } else if (this.datas.type == '2') {
                return 'Perawatan';
            } else if (this.datas.type == '3') {
                return 'Penambahan Nilai';
            } else {
                return 'Lainnya';
            }
        },
        periodicWO() {
            if (this.datas.periodic == 'short_term') {
                return 'Short Term';
            } else if (this.datas.periodic == 'long_term') {
                return 'Long Term';
            } else {
                return 'Lainnya';
            }
        }
    },
    mounted() {
        this.getData();
        this.fetchActivities();
        window.addEventListener("resize", this.resizerightcolumn);
    }

};
</script>

<template>
    <Layout>
        <HeaderPage title="Issue Report" pageTitle="Issue Report" />

        <!-- Show Photo -->
        <BModal v-model="showModalPhoto" hide-footer hide-header-close centered class="v-modal-custom" size="sm"
            no-body>
            <div class="text-center">
                <img :src="datas.photo" alt="photo" class="img-fluid" v-if="datas">
            </div>
        </BModal>

        <BRow v-if="datas">
            <BCol xl="12">
                <BCard>
                    <BCardBody>
                        <BRow>
                            <BCol md="6" class="mb-4">
                                <p class="text-muted mb-2 fs-14">Kode</p>
                                <input type="text" class="form-control" :value="datas.code" disabled />
                            </BCol>

                            <BCol md="6" class="mb-4">
                                <p class="text-muted mb-2 fs-14">Referensi Issues</p>
                                <!-- <input type="text" class="form-control" :value="datas.reference" disabled /> -->
                            </BCol>

                            <!-- Tipe Fleet -->
                            <BCol md="6" class="mb-4">
                                <p class="text-muted mb-2 fs-14">Tipe Fleet</p>
                                <!-- <input type="text" class="form-control" :value="datas.reference" disabled /> -->
                            </BCol>

                            <!-- Kode Fleet -->
                            <BCol md="6" class="mb-4">
                                <p class="text-muted mb-2 fs-14">Kode Fleet</p>
                                <!-- <input type="text" class="form-control" :value="datas.reference" disabled /> -->
                            </BCol>

                            <!-- Judul -->
                            <BCol md="6" class="mb-4">
                                <p class="text-muted mb-2 fs-14">Judul</p>
                                <input type="text" class="form-control" :value="datas.title" disabled />
                            </BCol>

                            <!-- Jenis -->
                            <BCol md="6" class="mb-4">
                                <p class="text-muted mb-2 fs-14">Jenis</p>
                                <input type="text" class="form-control" :value="type" disabled />
                            </BCol>

                            <!-- Periodic WO -->
                            <BCol md="6" class="mb-4">
                                <p class="text-muted mb-2 fs-14">Periodic WO</p>
                                <input type="text" class="form-control" :value="periodicWO" disabled />
                            </BCol>

                            <BCol md="6" class="mb-4">
                                <h5 class="text-muted mb-2 fs-14">Alasan Bebas</h5>
                                <Multiselect :options="datas.tags" :label="tags" v-model="datas.tags" multiple
                                    mode="tags" :disabled="true"></Multiselect>
                            </BCol>

                            <!-- Priority -->
                            <BCol md="6" class="mb-4">
                                <h5 class="text-muted mb-2 fs-14">Prioritas</h5>
                                <input type="text" class="form-control" :value="datas.priority" disabled />
                            </BCol>

                            <!-- Tanggal Dimulai -->
                            <BCol md="6" class="mb-4">
                                <h5 class="text-muted mb-2 fs-14">Tanggal Dimulai</h5>
                                <input type="text" class="form-control" :value="datas.startedAt" disabled />
                            </BCol>

                            <!-- Target -->
                            <BCol md="6" class="mb-4">
                                <h5 class="text-muted mb-2 fs-14">Target</h5>
                                <input type="text" class="form-control" :value="datas.targetedAt" disabled />
                            </BCol>

                            <!-- PIC Mekanik -->
                            <BCol md="6" class="mb-4">
                                <h5 class="text-muted mb-2 fs-14">PIC Mekanik</h5>
                                <input type="text" class="form-control" :value="datas.mechanic" disabled />
                            </BCol>

                            <!-- Photo -->
                            <BCol md="6" class="mb-4">
                                <h5 class="text-muted mb-2 fs-14">Foto</h5>
                                <button class="btn btn-primary btn-sm" @click="showModalPhoto = true">Lihat
                                    Foto</button>
                            </BCol>
                        </BRow>

                        <BRow>
                            <BCol md="6" class="mb-4">
                                <h5 class="text-muted mb-2 fs-14">Parameter Dimulai</h5>
                                <input type="text" class="form-control" :value="datas.startParameter + ' ' + 'Km/Hour'"
                                    disabled />
                            </BCol>

                            <!-- Parameter Selesai -->
                            <BCol md="6" class="mb-4">
                                <h5 class="text-muted mb-2 fs-14">Parameter Selesai</h5>
                                <input type="text" class="form-control" :value="datas.doneParameter + ' ' + 'Km/Hour'"
                                    disabled />
                            </BCol>

                            <!-- Estimasi Biaya WO -->
                            <BCol md="6" class="mb-4">
                                <h5 class="text-muted mb-2 fs-14">Estimasi Biaya WO</h5>
                                <input type="text" class="form-control" :value="datas.workOrderEstimation" disabled />
                            </BCol>

                            <!-- Biaya WO -->
                            <BCol md="6" class="mb-4">
                                <h5 class="text-muted mb-2 fs-14">Biaya WO</h5>
                                <!-- <input type="text" class="form-control" :value="datas.workOrderCost" disabled /> -->
                            </BCol>
                        </BRow>
                    </BCardBody>
                </BCard>

                <BCard>
                    <BCardHeader>
                        <div class="d-flex flex-wrap justify-content-between">
                            <h4 class="mb-0">Aktivitas</h4>

                            <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                                <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0"
                                    style="flex-grow: 1;">
                                    <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                        <input type="text" class="form-control" placeholder="Search..."
                                            style="width: 100%;" v-model="params.search" @input="fetchActivities">
                                        <i class="ri-search-line search-icon"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BCardHeader>
                    <BCardBody v-if="activities.length > 0">
                        <table-component :headers="headersActivity" :data="activities" :action="action"
                            @sort="sort($event.sortBy)">
                            <!-- No -->
                            <template #no="{ index }">
                                {{ index + 1 }}
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
                    </BCardBody>
                </BCard>
            </BCol>

            <!-- <BCardFooter>    -->
            <div class="d-flex justify-content-end">
                <a :href="`/work-order/edit/${id}`" class="btn btn-light">Edit</a>
            </div>
            <!-- </BCardFooter> -->
        </BRow>
    </Layout>
</template>