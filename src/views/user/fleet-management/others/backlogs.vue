<script>
import TableComponent from "@/components/table.vue";
import SelectHeader from "@/components/select-header.vue";
import Swal from "sweetalert2";
import axios from "axios";

export default {
    name: 'backlogs',
    components: {
        TableComponent,
        SelectHeader
    },
    data(){
        return{
            backlogHeaders: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order:false
                },
                {
                    title: 'No.Backlog Order',
                    key: 'backlogCode',
                    show: true,
                    order:false
                },
                {
                    title: 'Judul WO',
                    key: 'title',
                    show: true,
                    order:false
                },
                {
                    title: 'Prioritas',
                    key: 'priority',
                    show: true,
                    order:true
                },
                {
                    title: 'Tanggal & Jam WO',
                    key: 'createdAt',
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
                    order:true
                },
                
            ],
            backlogs: [],
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
            modalHeaderBacklog: false,
            modalDelete: false,
            modalFilter: false,
            backlogId: ''
        }
    },
    methods: {
        hideHeaderBacklog() {
            this.modalHeaderBacklog = false;
        },
        showHeaderBacklog(){
            this.modalHeaderBacklog = true
        },
        listDataBacklog(){
            axios.get(process.env.VUE_APP_API_URL + '/v1/backlogs', {
                params: this.params
            }).then((response) => {
                this.backlogs = response.data.data.items
                this.backlogId = response.data.data.items.id
                this.config.total_items = response.data.data.meta.totalItems
                this.config.total_pages = response.data.data.meta.totalPages
            }).catch((error) => {
                console.log(error);
            });
        },
        showModalDelete(id){
            this.backlogId = id
            this.modalDelete = true;
        },
        deleteData(){
            axios.delete(process.env.VUE_APP_API_URL + '/v1/backlogs' + this.backlogId).then(() => {
                Swal.fire("Berhasil!", "Berhasil menghapus data", "success");
            }).catch((error) => {
                console.log(error);
            });
        },

    },
    mounted(){
        this.listDataBacklog()
    }
    
}
</script>
<template>
    <SelectHeader :showModal="modalHeaderBacklog" :headers="backlogHeaders" @hideModal="hideHeaderBacklog" @selectHeader="hideHeaderBacklog" />
    <BModal v-model="modalDelete" hide-footer hide-header-close centered  class="v-modal-custom" size="sm">
        <div class="text-center">
            <b class="fs-14">Apakah anda yakin menghapus data ini?</b>
            <div class="d-flex justify-content-center mt-4">
                <BButton variant="dark" class="me-2" @click="modalDelete = false">Tidak</BButton>
                <BButton variant="light" @click="deleteData">Ya</BButton>
            </div>
        </div>
    </BModal>
    <BModal v-model="modalFilter" hide-footer title="Filter" centered  class="v-modal-custom" size="400">
        <BRow class="gy-4">
            <BCol md="12">
                <label for="">Tipe Fleet</label>
                <BFormSelect
                >
                    <template #first>
                        <BFormSelectOption value="" disabled>Pilih tipe</BFormSelectOption>
                    </template>
                </BFormSelect>
            </BCol>
            <BCol md="12">
                <label for="">Jenis WO</label>
                <BFormSelect
                >
                    <template #first>
                        <BFormSelectOption value="" disabled>Pilih jenis WO</BFormSelectOption>
                    </template>
                </BFormSelect>
            </BCol>
            <BCol md="12">
                <label for="">Periodic WO</label>
                <BFormSelect
                >
                    <template #first>
                        <BFormSelectOption value="" disabled>Pilih periodic WO</BFormSelectOption>
                    </template>
                </BFormSelect>
            </BCol>
            <BCol md="12">
                <label for="">Kategori Kerusakan</label>
                <BFormSelect
                >
                    <template #first>
                        <BFormSelectOption value="" disabled>Pilih kategori</BFormSelectOption>
                    </template>
                </BFormSelect>
            </BCol>
            <BCol md="12">
                <label for="">Prioritas</label>
                <BFormSelect
                >
                    <template #first>
                        <BFormSelectOption value="" disabled>Pilih prioritas</BFormSelectOption>
                    </template>
                </BFormSelect>
            </BCol>
            <BCol md="12">
                <label for="">Tanggal Mulai</label>
                <div class="d-flex align-items-center">
                    <div class="w-50">
                        <BFormInput type="date">
    
                        </BFormInput>
                    </div>
                    <div class="mx-2">
                        -
                    </div>
                    <div class="w-50">
                        <BFormInput type="date">
    
                        </BFormInput>
                    </div>
                </div>
            </BCol>
            <BCol md="12">
                <label for="">Tanggal Target Selesai</label>
                <div class="d-flex align-items-center">
                    <div class="w-50">
                        <BFormInput type="date">
    
                        </BFormInput>
                    </div>
                    <div class="mx-2">
                        -
                    </div>
                    <div class="w-50">
                        <BFormInput type="date">
    
                        </BFormInput>
                    </div>
                </div>
            </BCol>
            <BCol md="12">
                <label for="">Tanggal Aktual Selesai</label>
                <div class="d-flex align-items-center">
                    <div class="w-50">
                        <BFormInput type="date">
    
                        </BFormInput>
                    </div>
                    <div class="mx-2">
                        -
                    </div>
                    <div class="w-50">
                        <BFormInput type="date">
    
                        </BFormInput>
                    </div>
                </div>
            </BCol>
            
            <BCol md="12">
                <label for="">Status</label>
                <BFormSelect
                >
                    <template #first>
                        <BFormSelectOption value="" disabled>Pilih Status</BFormSelectOption>
                    </template>
                </BFormSelect>
            </BCol>
            <div class="d-flex justify-content-end mt-4">
                <BButton variant="light" class="me-2">Reset</BButton>
                <BButton variant="dark" @click="FilterData">Terapkan</BButton>
            </div>
        </BRow>
    </BModal>
    <div class="issues border shadow-sm rounded-4">
        <div class="d-flex justify-content-between align-items-center border-bottom">
            <div class="p-4 d-flex align-items-center">
                <h4>Backlog </h4>
            </div>
            <div>
                <BButton variant="link">
                    <i class="bx bx-chevron-down fs-22"></i>
                </BButton>
            </div>
        </div>
        <div class="d-flex flex-wrap justify-content-between p-lg-4">
            <div>
                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showSHeaderBacklog">
                    <i class="bx bx-dots-vertical-rounded"></i>
                </BButton>
                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showModalFilter">
                    <img src="@/assets/icons/filter.svg" alt="filter" />
                    Filter
                </BButton>
                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportBacklog">
                    <img src="@/assets/icons/filter.svg" alt="filter" />
                    Export CSV
                </BButton>
            </div>

            <div>
                <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                    <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="search">
                    <i class="ri-search-line search-icon"></i>
                </div>
            
            </div>
        </div>
        <div class="live-preview">
            <table-component :headers="backlogHeaders" :data="backlogs" :action="action" v-if="backlogs.length > 0" @sort="sort($event.sortBy)">
                <template #no="{ index }">
                    {{ index + 1 }}
                </template>
                <template #action="{ item }">
                    <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/backlog-report/edit/${item.id}`">
                        <img src="@/assets/icons/edit.svg" alt="pencil" />
                    </BButton>
                    <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDelete(item.id)">
                        <img src="@/assets/icons/delete.svg" alt="delete" />
                    </BButton>
                    <BButton variant="link" class="link-opacity-75" size="sm" :to="`/backlog-report/view/${item.id}`">
                        <img src="@/assets/icons/view.svg" alt="eye" />
                    </BButton>
                </template>
                <template #pagination>  
                    <div class="d-flex justify-content-between p-3 mt-3" v-if="config.total_items >= 1">
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