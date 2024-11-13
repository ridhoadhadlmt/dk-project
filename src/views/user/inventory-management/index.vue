<script>

import "flatpickr/dist/flatpickr.css";
import TableComponent from "@/components/table.vue";
import SelectHeader from "@/components/select-header.vue";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";
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
                    order:false
                },
                {
                    title: 'Nama',
                    key: 'name',
                    show: true,
                    order:true
                },
                {
                    title: 'Kode Inventaris',
                    key: 'upc',
                    show: true,
                    order:true
                },
                {
                    title: 'Kategori',
                    key: 'type',
                    show: true,
                    order:true
                },
                {
                    title: 'Jumlah',
                    key: 'minStock',
                    show: true,
                    order:true
                },
                {
                    title: 'Harga/Unit',
                    key: 'price',
                    show: false,
                    order:true
                },
                {
                    title: 'Lokasi Penyimpanan',
                    key: 'storageLocation',
                    show: true,
                    order:true
                },
                {
                    title: 'Pengguna Aktif',
                    key: 'activeUser',
                    show: false,
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
            search: '',
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
        },
        params: {
            handler() {
                this.getData();
            },
            deep: true
        },
        search: {
            handler(){
                this.getData({ search: this.search})
            }
        }
    },
    methods: {
        getData() {
            axios.get(process.env.VUE_APP_API_URL + "/v1/inventories", {
                params: this.params,
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCRFWEk1UmZ0U2FDOEFyZWN1NlE3ZXd1TG16c2lhUUdONmkyY0xaTFlTOVRTWGdtdHlNVld3NiIsImlhdCI6MTczMTQ2NjkyNiwiZXhwIjoxNzMxNjM5NzI2LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.Yuzcd1-YHSJVe2MXl5yGNnZGnzZ_aJEPg5-ptAZ_69mDdx_D-_uKk5ZLAK8e35rPQ8h2IFKCfbBwP4NecJjKRQ'
                },
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

        deleteDataMethod() {
            // this.showModalDelete = false
            axios.delete(process.env.VUE_APP_API_URL + '/v1/inventories/' + this.deleteId, {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCRFWEk1UmZ0U2FDOEFyZWN1NlE3ZXd1TG16c2lhUUdONmkyY0xaTFlTOVRTWGdtdHlNVld3NiIsImlhdCI6MTczMTQ2NjkyNiwiZXhwIjoxNzMxNjM5NzI2LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.Yuzcd1-YHSJVe2MXl5yGNnZGnzZ_aJEPg5-ptAZ_69mDdx_D-_uKk5ZLAK8e35rPQ8h2IFKCfbBwP4NecJjKRQ'
                },
            }).then(() => {
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
					link.setAttribute('download', `Inventory Management.xlsx`);
					document.body.appendChild(link);
					link.click();
					axios.defaults.responseType = 'json'

				});
		},
    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        this.getData();
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
        <!-- //Modal Delete -->

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
                               
                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;">
                                    <img src="@/assets/icons/filter.svg" alt="filter" />
                                    Filter
                                </BButton>

                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportExcel">
                                    Download Data
                                </BButton>

                                <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                    <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                        <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="search">
                                        <i class="ri-search-line search-icon"></i>
                                    </div>

                                    <router-link :to="{ name: 'inventory-management-create' }">
                                        <BButton variant="primary" class="btn btn-md" style="white-space: nowrap;">
                                            Tambah Inventory
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
                                    <span :class="item.isActive === true ? 'badge rounded-pill bg-success-subtle text-success fs-12' : 'badge rounded-pill bg-danger-subtle text-danger fs-12'">{{ (item.isActive) ? 'Aktif' : 'Tidak Aktif' }}</span>
                                </template>
                                <template #action="{ item }">
                                    <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/inventory-management/edit/${item.id}`">
                                        <img src="@/assets/icons/edit.svg" alt="pencil" />
                                    </BButton>
                                    <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDeleteMethod(item.id)">
                                        <img src="@/assets/icons/delete.svg" alt="delete" />
                                    </BButton>
                                    <BButton variant="link" class="link-opacity-75 fs-22" size="sm" :to="`/inventory-management/view/${item.id}`">
                                        <img src="@/assets/icons/view.svg" alt="eye" />
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