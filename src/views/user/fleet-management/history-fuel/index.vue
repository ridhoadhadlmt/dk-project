<script>
import TableComponent from "@/components/table.vue";
import SelectHeader from "@/components/select-header.vue";
import axios from "axios";

export default {
    name: 'history-fuel',
    components: {
        TableComponent,
        SelectHeader
    },
    data(){
        return{
            fuelHistoryHeaders: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order:false
                },
                {
                    title: 'Tanggal',
                    key: 'date',
                    show: true,
                    order:true
                },
                {
                    title: 'Berapa Liter',
                    key: 'qtyLiter',
                    show: true,
                    order:true
                },
                {
                    title: 'Harga/Liter',
                    key: 'price',
                    show: true,
                    order:true
                },
                {
                    title: 'Total Harga',
                    key: 'subtotal',
                    show: true,
                    order:true
                },
                {
                    title: 'Efisiensi BBM',
                    key: 'literPerParameter',
                    show: false,
                    order:true
                },
                {
                    title: 'Parameter Pembelian',
                    key: 'parameterValue',
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
            fuelHistories: [],
            config:{
                total_pages: 0,
                total_items: 0,
            },
            params: {
                page: 1,
                limit: 10,
                search: '',
                sortBy: 'id.desc',
                fleetId: this.$route.params.id,
            },

        }
    },
    watch:{

    },
    methods: {
        listDataHistoryFuel() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/fleet-fuels', {
                params: this.params,
            }).then((response) => {
                this.fuelHistories = response.data.data.items
                this.config.total_items = response.data.data.meta.totalItems
                this.config.total_pages = response.data.data.meta.totalPages
            }).catch((error) => {
                console.log(error);
            });
        },

    },
    mounted(){
        this.listDataHistoryFuel()
    }
}
</script>
<template>
    <div>
        <SelectHeader :showModal="modalHeaderFuel" :headers="fuelHistoryHeaders" @hideModal="hideHeaderFuel" @selectHeader="hideHeaderFuel" />
        <div class="d-flex flex-wrap justify-content-between py-lg-4">
            <div>
                <h4 class="card-title mb-3">Histori BBM</h4>
                <h5 class="card-subtitle mb-0">Rata-Rata Efisiensi BBM: </h5>
            </div>

            <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showHeaderFuel">
                    <i class="bx bx-dots-vertical-rounded"></i>
                </BButton>
            
                

                <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                    <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                        <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="search" @input="searchHandler($event, 'fuel')">
                        <i class="ri-search-line search-icon"></i>
                    </div>
                    <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportFuel">
                        Export CSV
                    </BButton>
                    <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showModalSettingTolerance">
                        Setting Toleransi
                    </BButton>
                    <router-link :to="{ name: 'fleet-management-fuel-history-create' }">
                        <BButton variant="primary" class="btn btn-md" style="white-space: nowrap;">
                            Tambah Histori
                        </BButton>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="live-preview">
            <table-component :headers="fuelHistoryHeaders" :data="fuelHistories" :action="action" v-if="fuelHistories.length > 0" @sort="sort($event.sortBy)">
                <template #no="{ index }">
                    {{ index + 1 }}
                </template>
                <template #photo="{ item }">   
                    <img :src="item.photo " width="20" height="20">

                </template>
                <template #action="{ item }">
                    <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/fleet-management/fuel-history/edit/${item.id}`">
                        <img src="@/assets/icons/edit.svg" alt="pencil" />
                    </BButton>
                    <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDelete(item.id, 'fuel')">
                        <img src="@/assets/icons/delete.svg" alt="delete" />
                    </BButton>
                    <BButton variant="link" class="link-opacity-75 bg-success mx-1 rounded-2" size="sm" @click="showModalApproveFuel(item.id)">
                        <img src="@/assets/icons/check.svg" width="12" alt="check" />
                    </BButton>
                </template>

                <template #pagination>  

                    <div class="d-flex justify-content-between mt-3" v-if="config.total_items >= 1">
                        <div class="d-flex align-items-center">
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
</template>