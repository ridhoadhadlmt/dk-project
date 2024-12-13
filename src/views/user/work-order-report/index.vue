<script>

import "flatpickr/dist/flatpickr.css";
import TableComponent from "@/components/table.vue";
import SelectHeader from "@/components/select-header.vue";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";
import FilterCard from "./filter-card.vue";


export default {
    components: {
        Layout,
        TableComponent,
        SelectHeader,
        HeaderPage,
        FilterCard
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
                    title: 'Kode',
                    key: 'code',
                    show: true,
                    order:true
                },
                {
                    title: 'Jumlah Backlog',
                    key: 'backlogCount',
                    show: true,
                    order:true
                },
                {
                    title: 'Judul',
                    key: 'title',
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
                    title: 'Tanggal Mulai',
                    key: 'startedAt',
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
                {id: 1, code: 'W0/01/2024', qty: 2, title: 'Lorem Ipsum', priority: 'Critical', start_date: '11 Des 2023', status: 'completed' },
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
            
            deleteId: null,
            showSelectHeader: false,
            showModalDelete: false,
            showModalFilter: false
        };
    },
    watch: {
        headers: {
            handler(newVal) {
                this.headers = newVal;
            },
            deep: true
        },
    },
    methods: {
        getData() {
            axios.get(process.env.VUE_APP_API_URL + "/v1/work-orders", {
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

        deleteDataMethod() {
            // this.showModalDelete = false
            axios.delete(process.env.VUE_APP_API_URL + '/v1/work-orders/' + this.deleteId).then(() => {
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
			axios.get(process.env.VUE_APP_API_URL+'/v1/work-orders/export', {
                params:{
					sortBy:"id.asc",
				}
            }).then((res) => {
					const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', `Work Order.xlsx`);
					document.body.appendChild(link);
					link.click();
					axios.defaults.responseType = 'json'

				});
		},
        setFilterData(params) {
            this.params = {
                ...this.params,
                ...params
            };
            this.getData();
        },
        hideModalFilter(newVal) {
            this.showModalFilter = newVal;
        },
        resetFilter() {
            this.params = {
                page: 1,
                limit: 10,
                search: '',
                sortBy: 'id.desc',
            };
            this.getData();
        }
    },
    mounted() {
        this.getData();
        window.addEventListener("resize", this.resizerightcolumn);
    }

};
</script>

<template>
    <Layout>
        
        <FilterCard 
            :showModal="showModalFilter" 
            @hideModalFilter="hideModalFilter" 
            @setFilterData="setFilterData"
            @resetFilter="resetFilter"
        />
        
        <SelectHeader 
            :showModal="showSelectHeader" 
            :headers="headers" 
            @hideModal="hideSelectHeaderMethod" 
            @selectHeader="selectHeaderMethod" 
        />
        
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

        <HeaderPage title="Work Order" pageTitle="Work Order" />

        <BRow>
            <BCol xl="12">
                <BCard no-body>
                    <!-- <BCardHeader>
                        
                    </BCardHeader> -->

                    <BCardBody>
                        <div class="d-flex flex-wrap justify-content-between py-lg-4">
                            <h4 class="card-title mb-0">Data Work Order</h4>

                            <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showSelectHeaderMethod">
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
                                        <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="params.search" @input="getData">
                                        <i class="ri-search-line search-icon"></i>
                                    </div>

                                    <router-link :to="{ name: 'work-order-report-create' }">
                                        <BButton variant="primary" class="btn btn-md" style="white-space: nowrap;">
                                            Tambah Work Order
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
                                <template #startedAt="{ item }">
                                    {{ $filters.formatDate(item.startedAt) }}
                                </template>
                                
                                <!-- //Status -->
                                <template #qty="{ item }">   
                                    <div class="p-2 d-flex align-items-center justify-content-center rounded-pill bg-warning text-white fs-22'" style="width: 30px;height:30px;">{{ item.qty }}</div>
                                </template>

                                <template #status="{ item }"> 
                                     <span v-if="item.status === 'completed'" class="badge rounded-pill bg-success-subtle text-success fs-12">Completed</span>
                                     <span v-if="item.status === 'draft'" class="badge rounded-pill bg-secondary-subtle text-secondary fs-12">Draft</span>
                                     <span v-if="item.status === 'pending'" class="badge rounded-pill bg-warning-subtle text-warning fs-12">Pending</span>
                                     <span v-if="item.status === 'in_progress'" class="badge rounded-pill bg-info-subtle text-info fs-12">In Progress</span>
                                </template>
                                <template #action="{ item }">
                                    <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/work-order/edit/${item.id}`">
                                        <img src="@/assets/icons/edit.svg" alt="pencil" />
                                    </BButton>
                                    <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDeleteMethod(item.id)">
                                        <img src="@/assets/icons/delete.svg" alt="delete" />
                                    </BButton>
                                    <BButton variant="link" class="link-opacity-75 fs-22" size="sm" :to="`/work-order/view/${item.id}`">
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