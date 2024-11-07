<script>

import "flatpickr/dist/flatpickr.css";
import TableComponent from "@/components/table.vue";
import SelectHeader from "@/components/select-header.vue";
import Layout from "@/layouts/main.vue";
import Swal from "sweetalert2";
import axios from "axios";
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
                    title: 'Nama Paket',
                    key: 'name',
                    show: true,
                    order:true,
                },
                {
                    title: 'Deskripsi Paket',
                    key: 'description',
                    show: true,
                    order:true,
                },
                {
                    title: 'Masa Aktif Paket',
                    key: 'activePeriod',
                    show: true,
                    order:true,
                },
                {
                    title: 'Kuota User',
                    key: 'maxUsers',
                    show: true,
                    order:true,
                },
                {
                    title: 'Harga Paket',
                    key: 'price',
                    show: true,
                    order:true,
                },
                {
                    title: 'Status',
                    key: 'isActive',
                    show: true,
                    order:true,
                },
                {
                    title: 'Action',
                    key: 'action',
                    show: true,
                    order:false,
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
            deleteId: null,
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

        showModalDeleteMethod(id) {
            this.deleteId = id;
            this.showModalDelete = true;
        },

        hideModalDeleteMethod() {
            this.showModalDelete = false;
        },

        getSubscription() {
            axios.get(process.env.VUE_APP_API_URL + '/cms/v1/packages', { params: this.params })
                .then(response => {
                    this.data = response.data.data.items;
                    this.config.total_pages = response.data.data.meta.totalPages;
                    this.config.total_items = response.data.data.meta.totalItems;
                })
                .catch(error => {
                    console.error(error);
                });
        },

        deleteDataMethod() {
            axios.delete(process.env.VUE_APP_API_URL + '/cms/v1/packages/' + this.deleteId)
                .then(() => {
                    this.showModalDelete = false;
                    this.getSubscription();
                    Swal.fire("Berhasil!", "Berhasil menghapus data", "success");
                })
                .catch(error => {
                    console.error(error);
                    Swal.fire("Gagal!", "Gagal menghapus data", "error");
                });
        },
        sort(sortBy) {
            this.params.sortBy = `${sortBy}.desc`;
            this.getSubscription();
        },
        exportExcel() {
			axios.defaults.responseType = 'blob';
			axios.get(process.env.VUE_APP_API_URL+'/cms/v1/packages/export', {
                params:{
					sortBy:"id.asc",
				}
            }).then((res) => {
					const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', `Subscription Management.xlsx`);
					document.body.appendChild(link);
					link.click();
					axios.defaults.responseType = 'json'

				});
		},
    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        this.getSubscription();
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
                    <BButton variant="dark" class="me-4" @click="showModalDelete = false">Tidak</BButton>
                    <BButton variant="light" @click="deleteDataMethod">Ya</BButton>
                </div>
            </div>
        </BModal>
        <!-- //Modal Delete -->
        
        <HeaderPage title="Subscription Management" />

        <BRow>
            <BCol xl="12">
                <BCard no-body>
                    <!-- <BCardHeader>
                        
                    </BCardHeader> -->

                    <BCardBody>
                        <div class="d-flex flex-wrap justify-content-between py-lg-4">
                            <h4 class="card-title mb-0">Data Role</h4>

                            <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0    " style="white-space: nowrap;" @click="showSelectHeaderMethod">
                                    <i class="bx bx-dots-vertical-rounded"></i>
                                </BButton>
                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;">
                                    <img src="@/assets/icons/filter.svg" alt="filter" />
                                    Filter
                                </BButton>
                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportExcel">
                                    Download Data
                                </BButton>
                                

                                <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                    <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                        <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="params.search" @change="getSubscription">
                                        <i class="ri-search-line search-icon"></i>
                                    </div>

                                    <router-link :to="{ name: 'subscription-management-create' }">
                                        <BButton variant="primary" class="btn btn-md" style="white-space: nowrap;">
                                            Tambah Subscription
                                        </BButton>
                                    </router-link>
                                </div>
                            </div>

                        </div>
                        <div class="live-preview">
                            <table-component :headers="headers" :data="data" :action="action" @sort="sort($event.sortBy)">
                                <template #no="{ index }">
                                    {{ index + 1 }}
                                </template>
                                
                                <template #isActive="{ item }">   
                                    <span :class="item.isActive === true ? 'badge rounded-pill bg-success-subtle text-success' : 'badge rounded-pill bg-danger-subtle text-danger'">{{ (item.isActive) ? 'Aktif' : 'Tidak Aktif' }}</span>
                                </template>

                                <!-- Period -->
                                <template #activePeriod="{ item }">
                                    {{ item.activePeriod }} Hari
                                </template>

                                <!-- Price -->
                                <template #price="{ item }">
                                    {{ $filters.formatRupiah(item.price) }}
                                </template>


                                <template #action="{ item }">
                                    <BButton variant="link" class="link-dark fs-22" :to="`/subscription-management/edit/${item.id}`" size="sm">
                                        <img src="@/assets/icons/edit.svg" alt="pencil" />
                                    </BButton>
                                    <BButton variant="link" class="link-opacity-75 fs-22" @click="showModalDeleteMethod(item.id)" size="sm">
                                        <img src="@/assets/icons/delete.svg" alt="delete" />
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