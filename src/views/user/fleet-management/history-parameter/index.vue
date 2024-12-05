<script>
import TableComponent from "@/components/table.vue";
import SelectHeader from "@/components/select-header.vue";
import axios from "axios";

export default {
    name: 'history-parameter',
    components: {
        TableComponent,
        SelectHeader
    },
    data(){
        return{
            parameterHistoryHeaders: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order:false
                },
                {
                    title: 'Foto',
                    key: 'photo',
                    show: true,
                    order:true
                },
                {
                    title: 'Tanggal',
                    key: 'date',
                    show: true,
                    order:true
                },
                {
                    title: 'Parameter',
                    key: 'parameterValue',
                    show: true,
                    order:true
                },
                {
                    title: 'Source',
                    key: 'source',
                    show: true,
                    order:true
                },
                {
                    title: 'User',
                    key: '',
                    show: false,
                    order:true
                },
                {
                    title: 'Keterangan',
                    key: 'notes',
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
            parameterHistories: [],
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
            modalHeaderParameter: false,
        }
    },
    watch:{

    },
    methods: {
        hideHeaderParameter() {
            this.modalHeaderParameter = false;
        },
        showHeaderParameter() {
            this.modalHeaderParameter = true;
        },
        listDataHistoryParameter() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/fleet-parameters', {
                params: this.params,
            }).then((response) => {
                this.parameterHistories = response.data.data.items
                console.log(this.parameterHistories)
                this.config.total_items = response.data.data.meta.totalItems
                this.config.total_pages = response.data.data.meta.totalPages
            }).catch((error) => {
                console.log(error);
            });
        },
    },
    mounted(){
        this.listDataHistoryParameter()
    }
}
</script>
<template>
    <div>
        <SelectHeader :showModal="modalHeaderParameter" :headers="parameterHistoryHeaders" @hideModal="hideHeaderParameter" @selectHeader="showHeaderParameter" />
        <div class="d-flex flex-wrap justify-content-between py-lg-4">
            <h4 class="card-title mb-0">Histori Parameter</h4>

            <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showHeaderParameter">
                    <i class="bx bx-dots-vertical-rounded"></i>
                </BButton>
                <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                    <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                        <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="search" @input="searchHandler($event, 'parameter')">
                        <i class="ri-search-line search-icon"></i>
                    </div>
                    <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportParameter">
                        Export CSV
                    </BButton>
                    <router-link :to="{ name: 'fleet-management-parameter-history-create'}">
                        <BButton variant="primary" class="btn btn-md" style="white-space: nowrap;">
                            Tambah Histori
                        </BButton>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="live-preview">
            <table-component :headers="parameterHistoryHeaders" :data="parameterHistories" :action="action" v-if="parameterHistories.length > 0" @sort="sort($event.sortBy)">
                <template #no="{ index }">
                    {{ index + 1 }}
                </template>
                <template #photo="{ item }">   
                    <img :src="item.photo " width="20" height="20">
                </template>
                <template #action="{ item }">
                    <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/fleet-management/parameter-history/edit/${item.id}`">
                        <img src="@/assets/icons/edit.svg" alt="pencil" />
                    </BButton>
                    <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDelete(item.id, 'parameter')">
                        <img src="@/assets/icons/delete.svg" alt="delete" />
                    </BButton>
                    <BButton variant="link" class="link-opacity-75 bg-success rounded-2" size="sm" @click="showModalApproveParameter(item.id)">
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