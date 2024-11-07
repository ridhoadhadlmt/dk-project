<script>

import "flatpickr/dist/flatpickr.css";
import TableComponent from "@/components/table.vue";
import SelectHeader from "@/components/select-header.vue";
import Layout from "@/layouts/main.vue";
import ModalDelete from "@/components/modal-delete.vue";

import axios from "axios";

export default {
    components: {
        Layout,
        TableComponent,
        SelectHeader,
        ModalDelete
    },
    data() {
        return {
            headers: [
                {
                    title: 'No',
                    key: 'no',
                    show: true
                },
                {
                    title: 'Nama Usaha',
                    key: 'clientDetail.name',
                    show: true
                },
                {
                    title: 'Nama Paket',
                    key: 'package.name',
                    show: true
                },
                {
                    title: 'Harga',
                    key: 'grandTotal',
                    show: true
                },
                {
                    title: 'Status Pembayaran',
                    key: 'paymentStatus',
                    show: true
                },
                {
                    title: 'Action',
                    key: 'action',
                    show: true
                }
            ],
            data: [],
            params: {
                page: 1,
                limit: 10,
                search: '',
                sortBy: 'id.desc',
            },
            config:{
                total_pages: 0,
                total_items: 0,
            },
            showSelectHeader: false,
            showModalDelete: false
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
        showModalDeleteMethod() {
            this.showModalDelete = true;
        },

        hideModalDeleteMethod() {
            this.showModalDelete = false;
        },
        getData() {
            axios.get(process.env.VUE_APP_API_URL + '/cms/v1/transactions').then((response) => {
                this.data = response.data.data.items;
                this.config.total_pages = response.data.data.meta.totalPages;
                    this.config.total_items = response.data.data.meta.totalItems;
            }).catch((error) => {
                console.log(error);
            });
        },
        exportExcel() {
			axios.defaults.responseType = 'blob';
			axios.get(process.env.VUE_APP_API_URL+'/cms/v1/clients/export', {
                params:{
					sortBy:"id.asc",
				}
            }).then((res) => {
					const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', `Client Management.xlsx`);
					document.body.appendChild(link);
					link.click();
					axios.defaults.responseType = 'json'

				});
		},
    },
    mounted() {
        this.getData();
        window.addEventListener("resize", this.resizerightcolumn);
    }

};
</script>

<template>
    <Layout>
        <SelectHeader :showModal="showSelectHeader" :headers="headers" @hideModal="hideSelectHeaderMethod" @selectHeader="selectHeaderMethod" />
        <ModalDelete :showModalDelete="showModalDelete" @hideModalDelete="hideModalDeleteMethod" />
        <BRow>
            <BCol>
                <div class="h-100">
                    <BRow class="mb-3 pb-1">
                        <BCol cols="12">
                            <div class="d-flex align-items-lg-center flex-lg-row flex-column">
                                <div class="flex-grow-1">
                                    <h4 class="fs-16 mb-1">Role Managament</h4>
                                    <p class="text-muted mb-0">
                                        The most important info highlights
                                    </p>
                                </div>

                            </div>
                        </BCol>
                    </BRow>

                </div>
            </BCol>
        </BRow>

        <BRow>
            <BCol xl="12">
                <BCard no-body>

                    <BCardBody>
                        <div class="d-flex flex-wrap justify-content-between py-lg-4">
                            <h4 class="card-title mb-0">Data Admin</h4>

                            <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showSelectHeaderMethod">
                                    <i class="bx bx-dots-vertical-rounded"></i>
                                </BButton>
                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;">
                                    Download Data
                                </BButton>
                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;">
                                    Filter
                                </BButton>

                                <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                    <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                        <input type="text" class="form-control" placeholder="Search..." style="width: 100%;">
                                        <i class="ri-search-line search-icon"></i>
                                    </div>

                                    <router-link to="/transaction-report/create">
                                        <BButton variant="primary" class="btn btn-md" style="white-space: nowrap;">
                                            Tambah Transaksi
                                        </BButton>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="live-preview">
                            <table-component :headers="headers" :data="data" :action="action">
                                <!-- NO -->
                                <template #no="{ index }">
                                    {{ index + 1 }}
                                </template>

                                <!-- Grand Total -->
                                <template #grandTotal="{ item }">
                                    {{ $filters.formatRupiah(item.grandTotal) }}
                                </template>

                                <!-- Status Pembayaran -->
                                <template #paymentStatus="{ item }">   
                                    <span v-if="item.paymentStatus === 'waiting_payment'" class="badge bg-warning">Waiting Payment</span>
                                    <span v-else-if="item.paymentStatus === 'paid'" class="badge bg-success">Lunas</span>
                                    <span v-else class="badge bg-danger">Canceled</span>
                                </template>


                                <template #action="{ }">
                                    <BButton variant="link" class="link-dark fs-22" to="/transaction-report/create" size="sm"><i
                                            class="mdi mdi-pencil-box" ></i></BButton>

                                    <BButton variant="link" class="link-opacity-75 fs-22" @click="showModalDeleteMethod" size="sm"><i
                                            class="mdi mdi-delete"></i></BButton>

                                    <BButton variant="link" to="/transaction-report/view/1" class="link-opacity-75 fs-22" size="sm"><i
                                        class="mdi mdi-eye text-warning" ></i></BButton>
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