<script>
import TableComponent from "@/components/table.vue";
import SelectHeader from "@/components/select-header.vue";
import Swal from "sweetalert2";
import axios from "axios";

export default {
    name: 'issues',
    components: {
        TableComponent,
        SelectHeader
    },
    data(){
        return{
            issueHeaders: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order:false
                },
                {
                    title: 'Action',
                    key: 'action',
                    show: true,
                    order:false
                },
                {
                    title: 'Kode Issue',
                    key: 'issueCode',
                    show: true,
                    order:false
                },
                {
                    title: 'Kode Fleet',
                    key: 'fleet.code',
                    show: true,
                    order:true
                },
                {
                    title: 'Judul Keluhan',
                    key: 'complaintTitle',
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
                    title: 'Status Issue',
                    key: 'status',
                    show: true,
                    order:true
                },
                
            ],
            issues: [],
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
            modalHeaderIssue: false,
            modalDelete: false,
            modalFilter: false,
            issueId: ''
        }
    },
    methods: {
        hideHeaderIssue() {
            this.modalHeaderIssue = false;
        },
        showHeaderIssue() {
            this.modalHeaderIssue = true;
        },
        listDataIssue(){
            axios.get(process.env.VUE_APP_API_URL + '/v1/issues', {
                params: this.params
            }).then((response) => {
                this.issues = response.data.data.items
                this.issueId = response.data.data.items.id
                this.config.total_items = response.data.data.meta.totalItems
                this.config.total_pages = response.data.data.meta.totalPages
            }).catch((error) => {
                console.log(error);
            });
        },
        showModalDelete(id){
            this.issueId = id
            this.modalDelete = true;
        },
        showModalFilter() {
            this.modalFilter = true;
        },
        deleteData(){
            axios.delete(process.env.VUE_APP_API_URL + '/v1/issues' + this.issueId).then(() => {
                Swal.fire("Berhasil!", "Berhasil menghapus data", "success");
            }).catch((error) => {
                console.log(error);
            });
        },
    },
    mounted(){
        this.listDataIssue()
    }
    
}
</script>
<template>
    <SelectHeader :showModal="modalHeaderIssue" :headers="issueHeaders" @hideModal="hideHeaderIssue" @selectHeader="showHeaderIssue" />
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
                <label for="">Prioritas</label>
                <BFormSelect
                >
                    <template #first>
                        <BFormSelectOption value="" disabled>Pilih Prioritas</BFormSelectOption>
                    </template>
                </BFormSelect>
            </BCol>
            <BCol md="12">
                <label for="">Tanggal Keluhan</label>
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
                <label for="">Tanggal Harus Diselesaikan</label>
                <div>
                    <BFormInput type="date">
                    </BFormInput>
                </div>
            </BCol>
            <BCol md="12">
                <label for="">Status Keterlambatan</label>
                <BFormSelect
                >
                    <template #first>
                        <BFormSelectOption value="" disabled>Pilih Status</BFormSelectOption>
                    </template>
                </BFormSelect>
            </BCol>
            <BCol md="12">
                <label for="">Status Issue</label>
                <BFormSelect
                >
                    <template #first>
                        <BFormSelectOption value="" disabled>Pilih Status</BFormSelectOption>
                    </template>
                </BFormSelect>
            </BCol>
            <BCol md="12">
                <label for="">Label Bebas</label>
                <BFormSelect
                >
                    <template #first>
                        <BFormSelectOption value="" disabled>Pilih label bebas</BFormSelectOption>
                    </template>
                </BFormSelect>
            </BCol>
            <div class="d-flex justify-content-end mt-4">
                <BButton variant="light" class="me-2">Reset</BButton>
                <BButton variant="dark" @click="FilterDataIssue">Terapkan</BButton>
            </div>
        </BRow>
    </BModal>
    <div class="issues border shadow-sm rounded-4">
        <div class="d-flex justify-content-between align-items-center border-bottom">
            <div class="p-4 d-flex align-items-center">
                <h4>Issue </h4>
            </div>
            <div>
                <BButton variant="link">
                    <i class="bx bx-chevron-down fs-22"></i>
                </BButton>
            </div>
        </div>
        <div class="d-flex flex-wrap justify-content-between p-lg-4">
            <div>
                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showHeaderIssue">
                    <i class="bx bx-dots-vertical-rounded"></i>
                </BButton>
                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showModalFilter">
                    <img src="@/assets/icons/filter.svg" alt="filter" />
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
            <table-component :headers="issueHeaders" :data="issues" :action="action" v-if="issues.length > 0" @sort="sort($event.sortBy)">
                <template #no="{ index }">
                    {{ index + 1 }}
                </template>
                <template #status="{ item }">
                    <BBadge v-if="item.status ==='open'" variant="success" pill>
                        Terbuka
                    </BBadge>
                    <BBadge v-else-if="item.status ==='rejected'" variant="danger" pill>
                        Ditolak
                    </BBadge>
                    <BBadge v-else-if="item.status ==='approved'" variant="info" pill>
                        Diterima
                    </BBadge>
                    <BBadge v-else variant="danger" pill>
                        Tertutup
                    </BBadge>
                </template>
                <template #action="{ item }">
                    <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/issue-report/edit/${item.id}`">
                        <img src="@/assets/icons/edit.svg" alt="pencil" />
                    </BButton>
                    <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDelete(item.id)">
                        <img src="@/assets/icons/delete.svg" alt="delete" />
                    </BButton>
                    <BButton variant="link" class="link-opacity-75" size="sm" :to="`/issue-report/view/${item.id}`">
                        <img src="@/assets/icons/view.svg" alt="eye" />
                    </BButton> 
                    <BButton variant="success" class="rounded-circle mx-3" size="sm" squared="true" v-if="item.status !== 'rejected' && item.status !== 'approved'" @click="showModalApproveIssue(item.id)">
                        <img src="@/assets/icons/check.svg" width="10" height="10" alt="check" />
                    </BButton>
                    <BButton variant="danger" class="rounded-circle" size="sm" squared="true" v-if="item.status !== 'rejected' && item.status !== 'approved'" @click="showModalRejectIssue(item.id)">
                        <img src="@/assets/icons/cancel.svg" width="10" height="10" alt="cancel" />
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