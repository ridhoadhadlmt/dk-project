<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import TableComponent from "@/components/table.vue";
import axios from "axios";

export default {
    name: "inventory-management-create",
    components: {
        Layout,
        TableComponent,

    },
    data() {
        return {
            data: {},
            headers: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order:false
                },
                {
                    title: 'Kode Mutasi',
                    key: 'code',
                    show: true,
                    order:true
                },
                {
                    title: 'Jenis Mutasi',
                    key: 'type',
                    show: true,
                    order:true
                },
                {
                    title: 'Lokasi Penyimpanan',
                    key: 'location',
                    show: true,
                    order:true
                },
                {
                    title: 'Jumlah',
                    key: 'qty',
                    show: true,
                    order:true
                },
                {
                    title: 'Status Pengembalian',
                    key: 'status',
                    show: true,
                    order:true
                },
                {
                    title: 'Created Date',
                    key: 'created',
                    show: true,
                    order:true
                },
                {
                    title: 'Action',
                    key: 'action',
                    show: true,
                    order:true
                },
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
            
        };
    },
    watch: {
        params: {
            handler() {
                this.getData();
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

        getData() {
            axios.get(process.env.VUE_APP_API_URL + "/cms/v1/admins/" + this.$route.params.id)
                .then(response => {
                    this.data = response.data.data;
                })
                .catch(error => {
                    console.log(error);
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
        <BRow>
            <BCol>
                <div class="h-100">
                    <BRow class="mb-3 pb-1">
                        <BCol cols="12">
                            <div class="d-flex align-items-lg-center flex-lg-row flex-column">
                                <div class="flex-grow-1">
                                    <h4 class="fs-16 mb-1">{{$route.meta.title}}</h4>
                                    <p class="text-muted mb-0">
                                        {{$route.meta.description}}
                                    </p>
                                </div>

                            </div>
                        </BCol>
                    </BRow>

                </div>
            </BCol>
        </BRow>

        <BRow>
            <BCol xl="12" class="mb-3">
                <div class="p-4 rounded-4 shadow-sm bg-white">
                    <BRow class="mb-3">
                        <BCol xl="2">
                            <div class="">
                                <img src="@/assets/images/nft/img-01.jpg" class="rounded-4 w-75 h-75" alt="">
                            </div>
                        </BCol>
                        <BCol xl="10">
                            
                            <div class="">
                                <h3>Tools 1</h3>
                                <h3>Rp.2000 <span class="fs-16 text-secondary">Harga/Unit</span></h3>
                                <div class="d-flex">
                                    <h5>Merk : Merk 1</h5>
                                    <h5>Unit Ukuran : 20</h5>
                                    <h5>Dokumen : Dokumen 1</h5>
                                </div>
                                <h5>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam aliquam accusamus corrupti perferendis inventore, culpa delectus repudiandae quos doloremque amet ullam maiores sunt debitis dicta nisi. Distinctio harum ratione debitis?</h5>
                            </div>
                        </BCol>
                    </BRow>
                    <BRow xl="12">
                        <div class="d-flex border-top border-bottom align-items-center py-3 mb-3">
                            <div><h5 class="m-0">UPC : <span>UPC 1</span></h5></div>
                            <div><h5 class="m-0">Jumlah : <span>100</span></h5></div>
                        </div>
                        <h5>Kode Inventaris : <span>T1234</span></h5>
                        <h5>Vendor : <span>PT Jaya Abadi</span></h5>
                        <h5>Label Bebas : <span>Label 1</span></h5>
                        <h5>Lokasi Penyimpanan : <span>Bandung</span></h5>
                    </BRow>
                    <!-- <div class="d-flex justify-content-lg-start">
                        <div class="">
                            <img src="@/assets/images/nft/img-01.jpg" class="w-25" alt="">
                        </div>
                        <div class="">
                            <h3>Tools 1</h3>
                            <h3>Rp.2000 <span class="fs-16 text-secondary">Harga/Unit</span></h3>
                            <div class="d-flex">
                                <h5>Merk : Merk 1</h5>
                                <h5>Unit Ukuran : 20</h5>
                                <h5>Dokumen : Dokumen 1</h5>
                            </div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam aliquam accusamus corrupti perferendis inventore, culpa delectus repudiandae quos doloremque amet ullam maiores sunt debitis dicta nisi. Distinctio harum ratione debitis?</p>
                            <hr>
                                <div class="d-flex">
                                    <h5>UPC : <span>UPC 1</span></h5>
                                    <h5>Jumlah : <span>100</span></h5>
                                </div>
                            <hr>
                            <h5>Kode Inventaris : <span>T1234</span></h5>
                            <h5>Vendor : <span>PT Jaya Abadi</span></h5>
                            <h5>Label Bebas : <span>Label 1</span></h5>
                            <h5>Lokasi Penyimpanan : <span>Bandung</span></h5>
                        </div>
                    </div> -->
                </div>
                
            </BCol>
            <BCol xl="12">
                <div class="p-0 bg-white rounded-4">
                    <div class="d-flex flex-wrap justify-content-between p-lg-4">
                        <h4 class="card-title mb-0">Mutasi Inventory</h4>

                        <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                            
                            
                            

                            <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                    <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="params.search">
                                    <i class="ri-search-line search-icon"></i>
                                </div>

                                <BButton variant="primary" class="btn btn-md" style="white-space: nowrap;">
                                    Tambah Mutasi Inventory
                                </BButton>
                                
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
                            
                            <template #action="{ item }">
                                <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/program-maintenance/edit/${item.id}`">
                                    <img src="@/assets/icons/edit.svg" alt="pencil" />
                                </BButton>
                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDeleteMethod(item.id)">
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
                    
                </div>
            </BCol>
        </BRow>
    </Layout>
</template>