<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import TableComponent from "@/components/table.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
    name: "inventory-management-create",
    components: {
        Layout,
        TableComponent,

    },
    data() {
        return {
            detail: {},
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
                    key: 'mutationType',
                    show: true,
                    order:true
                },
                {
                    title: 'Lokasi Penyimpanan',
                    key: 'in.location',
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
                    title: 'Status',
                    key: 'status',
                    show: true,
                    order:true
                },
                {
                    title: 'Created Date',
                    key: 'createdAt',
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
                inventoryId: this.$route.params.id,
            },
            config:{
                total_pages: 0,
                total_items: 0,
            },
            showModalDelete: false,
            mutationId: '',
            
            
        };
    },
    watch: {
        params: {
            handler() {
                this.listData({inventoryId: this.$route.params.id});
            },
            deep: true
        },
        
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
            axios.get(process.env.VUE_APP_API_URL + "/v1/inventories/" + this.$route.params.id,{
                headers: {
                        'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCRMenJTVHBKbm1vL3FsS0tKcURIemouNDguMEhCZmlwMnlFaHphSjZsc0duQk1iaTBYRTdEcSIsImlhdCI6MTczMTI4NzY3NSwiZXhwIjoxNzMxNDYwNDc1LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.zev9CiJjt4a9vpI0RIQBpcV2CiCcmpXz6nskNsRqwKHdtdLyMTpEwc7wtP4c1SaL8g7lyEacf9gf8QfVsiHr2g'
                    },
                }
            )
                .then(response => {
                    this.detail = response.data.data;
                    this.inventoryId = response.data.data.id;

                })
                .catch(error => {
                    console.log(error);
                });
        },
        
        listData(){
            axios.get(process.env.VUE_APP_API_URL + "/v1/inventory-mutations",{
            params: this.params,
            headers: {
                    'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCRMenJTVHBKbm1vL3FsS0tKcURIemouNDguMEhCZmlwMnlFaHphSjZsc0duQk1iaTBYRTdEcSIsImlhdCI6MTczMTI4NzY3NSwiZXhwIjoxNzMxNDYwNDc1LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.zev9CiJjt4a9vpI0RIQBpcV2CiCcmpXz6nskNsRqwKHdtdLyMTpEwc7wtP4c1SaL8g7lyEacf9gf8QfVsiHr2g'
                },
            })
            .then(response => {
                this.data = response.data.data.items;
                this.mutationId = this.data.id;
                this.config.total_pages = response.data.data.meta.totalPages;
                this.config.total_items = response.data.data.meta.totalItems;
            
            })
            .catch(error => {
                console.log(error);
            });
        },
        showModalDeleteMethod(id) {
            this.mutationId = id;
            this.showModalDelete = true;
        },
        deleteData() {
            axios.delete(process.env.VUE_APP_API_URL + '/v1/inventory-mutations/' + this.mutationId, {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCRMenJTVHBKbm1vL3FsS0tKcURIemouNDguMEhCZmlwMnlFaHphSjZsc0duQk1iaTBYRTdEcSIsImlhdCI6MTczMTI4NzY3NSwiZXhwIjoxNzMxNDYwNDc1LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.zev9CiJjt4a9vpI0RIQBpcV2CiCcmpXz6nskNsRqwKHdtdLyMTpEwc7wtP4c1SaL8g7lyEacf9gf8QfVsiHr2g'
                },
            }).then(() => {
                this.listData();
                this.mutationId = null;
                this.showModalDelete = false;

                Swal.fire("Berhasil!", "Berhasil menghapus data", "success");
            }).catch((error) => {
                console.log(error);
            });
        },
    },

    mounted() {
        this.getData();
        this.listData();
        window.addEventListener("resize", this.resizerightcolumn);
    }

};
</script>

<template>
    <Layout>
        <BModal v-model="showModalDelete" hide-footer hide-header-close centered  class="v-modal-custom" size="sm">
            
            <div class="text-center">
                <b class="fs-14">Apakah anda yakin menghapus data ini?</b>
                <div class="d-flex justify-content-center mt-4">
                    <BButton variant="dark" class="me-2" @click="showModalDelete = false">Tidak</BButton>
                    <BButton variant="light" @click="deleteData">Ya</BButton>
                </div>
            </div>
        </BModal>
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
                                <img :src="detail.photo" class="rounded-4 w-75" alt="">
                            </div>
                        </BCol>
                        <BCol xl="10">
                            
                            <div class="">
                                <h3>{{ detail.name }}</h3>
                                <h3>Rp.{{ detail.price }} <span class="fs-16 text-black-50">Harga/Unit</span></h3>
                                <div class="d-flex">
                                    <h5 class="text-black-50">Merk : <span class="text-black">{{ detail.merk }}</span></h5>
                                    <h5 class="ps-4 text-black-50">Unit Ukuran : <span class="text-black">{{ detail.minStock }}</span></h5>
                                    <h5 class="ps-4 text-black-50">Dokumen : Dokumen 1</h5>
                                </div>
                                <h5 class="text-black-50">{{ detail.description }}
                                </h5>
                                
                            </div>
                        </BCol>
                    </BRow>
                    <BRow xl="12">
                        <div class="d-flex border-top border-bottom align-items-center py-3 mb-3">
                            <div class="m-0 text-black-50 fs-16">UPC : <span class="text-black"> {{ detail.upc }} </span></div>
                            <div class="m-0 text-black-50 fs-16 ps-4">Jumlah : <span class="text-black"> {{detail.minStock }} </span></div>
                        </div>
                        <div class="py-4 fs-16">Kode Inventaris : <BBadge variant="light" class="fs-16">{{ detail.partNumber }}</BBadge></div>
                        <div class="py-4 fs-16">Vendor : <BBadge variant="light" class="fs-16">PT Jaya Abadi</BBadge></div>
                        <div class="py-4 fs-16">Label Bebas : <BBadge variant="light" class="fs-16 ms-2" v-for="detail in detail.tags" :key="detail">{{ detail }}</BBadge></div>
                        <div class="py-4 fs-16">Lokasi Penyimpanan : <span>Bandung</span></div>
                    </BRow>
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
                                    <router-link :to="'/inventory-management/'+ this.$route.params.id + '/mutation-create'" class="text-white">
                                    Tambah Mutasi Inventory
                                    </router-link>
                                </BButton>
                                
                            </div>
                        </div>
                    </div>
                    <div class="live-preview p-4">
                        <table  width="100%" class="text-center" v-if="!data.length">
                            <tbody>
                                <tr>
                                    <td >Belum ada data mutasi pada inventory</td>
                                </tr>
                            </tbody>
                        </table>
                        <table-component :headers="headers" :data="data" :action="action" v-if="data.length > 0" @sort="sort($event.sortBy)">
                            <!-- NO -->
                            <template #no="{ index }">
                                {{ index + 1 }}
                            </template>
                            <!-- //Status -->
                            <template #status="{ item }">
                                <BBadge :variant="`${item.status === 'done' ? 'success' : 'warning'}`">{{ (item.status === 'done') ? 'Sudah Dikembalikan' : 'Belum Dikembalikan' }}</BBadge>
                            </template>
                            <template #action="{ item }">
                                <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/inventory-management/${item.id}/mutation-edit`">
                                    <img src="@/assets/icons/edit.svg" alt="pencil" />
                                </BButton>
                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDeleteMethod(item.id)">
                                    <img src="@/assets/icons/delete.svg" alt="delete" />
                                </BButton>
                                
                            </template>

                            <template #pagination>  

                                <div class="d-flex justify-content-between mt-3 p-3" v-if="config.total_items >= 1">
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