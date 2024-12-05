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
            timesheetHistoryHeaders: [
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
                    title: 'Nama Operator',
                    key: 'operator.fullName',
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
                    title: 'Jam Kerja',
                    key: 'workHour',
                    show: true,
                    order:true
                },
                {
                    title: 'Keterangan',
                    key: 'note',
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
            timesheetHistories: [],
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
            modalHeaderTimesheet: false,

        }
    },
    watch:{

    },
    methods: {
        listDataHistoryTimesheet() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/fleet-timesheets', {
                params: this.params,
            }).then((response) => {
                this.timesheetHistories = response.data.data.items
                this.operatorName = this.timesheetHistories.operator.fullName
                console.log(this.timesheetHistories)
                this.config.total_items = response.data.data.meta.totalItems
                this.config.total_pages = response.data.data.meta.totalPages
            }).catch((error) => {
                console.log(error);
            });
        },
    },
    mounted(){
        this.listDataHistoryTimesheet()
    }
}
</script>
<template>
    <div>
        <SelectHeader :showModal="modalHeaderTimesheet" :headers="timesheetHistoryHeaders" @hideModal="hideHeaderTimesheet" @selectHeader="hideHeaderTimesheet" />
        <div class="d-flex flex-wrap justify-content-between py-lg-4">
            <h4 class="card-title mb-0">Histori Timesheet</h4>

            <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showHeaderTimesheet">
                    <i class="bx bx-dots-vertical-rounded"></i>
                </BButton>
                <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                    <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                        <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="search" @input="searchHandler($event, 'timesheet')">
                        <i class="ri-search-line search-icon"></i>
                    </div>
                    <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportTimesheet">
                        Export CSV
                    </BButton>
                    <router-link :to="{ name: 'fleet-management-timesheet-history-create' }">
                        <BButton variant="primary" class="btn btn-md" style="white-space: nowrap;">
                            Tambah Histori
                        </BButton>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="live-preview">
            <table-component :headers="timesheetHistoryHeaders" :data="timesheetHistories" :action="action" v-if="timesheetHistories.length > 0" @sort="sort($event.sortBy)">
                <template #no="{ index }">
                    {{ index + 1 }}
                </template>
                <template #photo="{ item }">   
                    <img :src="item.photo " width="20" height="20">

                </template>
                <template #action="{ item }">
                    <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/fleet-management/timesheet-history/edit/${item.id}`">
                        <img src="@/assets/icons/edit.svg" alt="pencil" />
                    </BButton>
                    <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDelete(item.id, 'timesheet')">
                        <img src="@/assets/icons/delete.svg" alt="delete" />
                    </BButton>
                    <BButton variant="link" class="link-opacity-75 bg-success mx-1 rounded-2" size="sm" @click="showModalApproveTimesheet(item.id)">
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