<script>

import "flatpickr/dist/flatpickr.css";
import TableComponent from "@/components/table.vue";
import SelectHeader from "@/components/select-header.vue";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from 'sweetalert2';
import HeaderPage from "@/components/header-page.vue";

export default {
    components: {
        Layout,
        TableComponent,
        SelectHeader,
        HeaderPage
    },
    data() {
        return {
            headers: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order:false,
                },
                {
                    title: 'Company Code',
                    key: 'companyCode',
                    show: true,
                    order:true
                },
                {
                    title: 'Nama Usaha',
                    key: 'name',
                    show: true,
                    order:true
                },
                {
                    title: 'Subscription',
                    key: 'subscriptionName',
                        show: true,
                    order:true
                },
                {
                    title: 'Harga Subscription',
                    key: 'price',
                    show: true,
                    order:true
                },
                {
                    title: 'Start and End',
                    key: 'start_date',
                    show: true,
                    order:true
                },
                {
                    title: 'Active User/Plan',
                    key: 'activeUsers',
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
            
            data: [],
            showSelectHeader: false,
            showModalDelete: false,
            selectId: null,
            showModalFilter: false,
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
        changePage(pageNumber) {
            this.params.page = pageNumber;
            this.getClient();
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
            this.showModalDelete = true;
            this.selectId = id;
        },

        deleteDataMethod() {
            axios.delete(process.env.VUE_APP_API_URL + '/cms/v1/clients/' + this.selectId)
                .then(() => {
                    this.getClient();
                    this.showModalDelete = false;
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Data berhasil dihapus',
                    });
                })
                .catch(error => {
                    console.error(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Data gagal dihapus',
                    });
                });
            
        },

        getClient() {
            axios.get(process.env.VUE_APP_API_URL + '/cms/v1/clients', { params: this.params })
                .then(response => {
                    this.data = response.data.data.items;
                    this.config.total_pages = response.data.data.meta.totalPages;
                    this.config.total_items = response.data.data.meta.totalItems;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        sort(sortBy) {
            this.params.sortBy = `${sortBy}.desc`;
            this.getClient();
        },
        applyFilter() {
            this.getClient();
        },
        resetFilter() {
            this.params.status = '';
            this.getClient();
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
        window.addEventListener("resize", this.resizerightcolumn);
        this.getClient();
    }

};
</script>

<template>
    <Layout>
        <SelectHeader :showModal="showSelectHeader" :headers="headers" @hideModal="hideSelectHeaderMethod" @selectHeader="selectHeaderMethod" />
        
        
        <!-- Modal Delete -->
        <BModal v-model="showModalDelete" hide-footer hide-header-close centered  class="v-modal-custom" size="md">
            
            <div class="text-center">
                <b class="fs-14">Apakah anda yakin menghapus data ini?</b>
                <div class="d-flex justify-content-center mt-4">
                    <BButton variant="dark" class="me-2" @click="showModalDelete = false">Tidak</BButton>
                    <BButton variant="light" @click="deleteDataMethod">Ya</BButton>
                </div>
            </div>
        </BModal>
        <!-- //Modal Delete -->

        <!-- Modal Filter -->
        <BModal v-model="showModalFilter" hide-footer centered  class="v-modal-custom" size="sm" title="Filter">
            <form @submit.prevent="applyFilter">
                <div>
                    <label for="status-select" class="form-label">Status</label>
                    <BFormSelect id="status-select" v-model="params.status">
                        <option value="">Pilih Status</option>
                        <option value="active">Aktif</option>
                        <option value="inactive">Tidak Aktif</option>
                    </BFormSelect>
                </div>
                <div class="d-flex justify-content-end mt-3">
                    <BButton variant="light" class="me-2" @click="resetFilter">Reset</BButton>
                    <BButton variant="dark" @click="applyFilter">Terapkan</BButton>
                    
                </div>
            </form>
        </BModal>
        <!-- //Modal Filter -->
        
        <HeaderPage title="Client Management" />

        <BRow>
            <BCol xl="12">
                <BCard no-body>
                    <BCardBody>
                        <div class="d-flex flex-wrap justify-content-between py-lg-4">
                            <h4 class="card-title mb-0">Data Client</h4>

                            <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0    " style="white-space: nowrap;" @click="showSelectHeaderMethod">
                                    <i class="bx bx-dots-vertical-rounded"></i>
                                </BButton>
                                
                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showModalFilter = true">
                                    <img src="@/assets/icons/filter.svg" alt="filter" />
                                    Filter
                                </BButton>
                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportExcel">
                                    Download Data
                                </BButton>
                                <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                    <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                        <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="params.search" @keyup="getClient">
                                        <i class="ri-search-line search-icon"></i>
                                    </div>

                                    <router-link to="/client-management/create">
                                        <BButton variant="primary" class="btn btn-md" style="white-space: nowrap;">
                                            Tambah Client
                                        </BButton>
                                    </router-link>
                                </div>
                            </div>

                        </div>
                        <div class="live-preview">
                            <table-component :headers="headers" :data="data" :action="action" @sort="sort($event.sortBy)">
                                <template #status="{ }">   
                                    <span class="badge rounded-pill bg-success-subtle text-success">Aktif</span>
                                </template>

                                <template #no="{ index }">
                                    {{ index + 1 }}
                                </template>

                                <template #price="{item }">
                                    {{ $filters.formatRupiah(item.price) }}
                                </template>

                                <template #start_date="{item }">
                                    {{ $filters.formatDate(item.start_date) }} - <br> {{ $filters.formatDate(item.end_date) }}
                                </template>

                                <template #action="{ item}">
                                    <router-link :to="`/client-management/edit/${item.id}`">
                                        <BButton variant="link" class="link-dark fs-22" size="sm">
                                            <img src="@/assets/icons/edit.svg" alt="pencil" />
                                        </BButton>
                                    </router-link>

                                    <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDeleteMethod(item.id)">
                                        <img src="@/assets/icons/delete.svg" alt="delete" />
                                    </BButton>

                                    <router-link :to="`/client-management/view/${item.id}`">
                                        <BButton variant="link" class="link-opacity-75 fs-22" size="sm">
                                            <img src="@/assets/icons/view.svg" alt="eye" />
                                        </BButton>
                                    </router-link>

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