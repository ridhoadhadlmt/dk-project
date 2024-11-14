<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
// import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";
import TableComponent from "@/components/table.vue";
import MultiSelect from "vue-multiselect";

export default {
    name: "program-maintenance-create",
    components: {
        Layout,
        HeaderPage,
        TableComponent,
        MultiSelect,
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
                    title: 'Judul',
                    key: 'title',
                    show: true,
                    order:true
                },
                {
                    title: 'Sub Total',
                    key: 'subtotal',
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
            form: {
                name: "",
                type: "",
                parameterDuration: "",
                parameterDurationNotification: "",
                users: [],
                activities: [],
            },
            types: [
                {label: 'Teknis', value: 'teknis'},
                {label: 'Non Teknis', value: 'nonteknis'},
            ],
            users: [
            ],
            data: [],
            params: {
                page: 1,
                limit: 10,
                search: '',
                sortBy: 'id.desc',
                maintenanceProgramId: '',
            },
            config:{
                total_pages: 0,
                total_item: 0,
            },
            valueUser: '',
            showModalActivity: false,
        }
    },
    watch: {
        params: {
            handler(){
                this.listData()
            },
            deep: true,
        }
    },
    methods: {
        showModalActivityMethod(){
            this.showModalActivity = true
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

        

        

        fetchData() {
            if(this.$route.params.id){
                axios.get(process.env.VUE_APP_API_URL + '/v1/maintenance-programs/' + this.$route.params.id,{
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCRFWEk1UmZ0U2FDOEFyZWN1NlE3ZXd1TG16c2lhUUdONmkyY0xaTFlTOVRTWGdtdHlNVld3NiIsImlhdCI6MTczMTQ2NjkyNiwiZXhwIjoxNzMxNjM5NzI2LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.Yuzcd1-YHSJVe2MXl5yGNnZGnzZ_aJEPg5-ptAZ_69mDdx_D-_uKk5ZLAK8e35rPQ8h2IFKCfbBwP4NecJjKRQ'
                    },
                }).then((response) => {
                    this.form = response.data.data
                }).catch((error) => {
                    console.log(error);
                });
            }
            this.params.maintenanceProgramId = this.$route.params.id
        },
        listData() {
            if(this.$route.params.id){
                axios.get(process.env.VUE_APP_API_URL + '/v1/maintenance-program-activities',{
                    params: this.params,
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCRFWEk1UmZ0U2FDOEFyZWN1NlE3ZXd1TG16c2lhUUdONmkyY0xaTFlTOVRTWGdtdHlNVld3NiIsImlhdCI6MTczMTQ2NjkyNiwiZXhwIjoxNzMxNjM5NzI2LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.Yuzcd1-YHSJVe2MXl5yGNnZGnzZ_aJEPg5-ptAZ_69mDdx_D-_uKk5ZLAK8e35rPQ8h2IFKCfbBwP4NecJjKRQ'
                    }, 
                }).then((response) => {
                    this.data = response.data.data.items
                    
                }).catch((error) => {
                    console.log(error);
                });
            }
            axios.get(process.env.VUE_APP_API_URL + '/v1/maintenance-program-activities',{
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCRFWEk1UmZ0U2FDOEFyZWN1NlE3ZXd1TG16c2lhUUdONmkyY0xaTFlTOVRTWGdtdHlNVld3NiIsImlhdCI6MTczMTQ2NjkyNiwiZXhwIjoxNzMxNjM5NzI2LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.Yuzcd1-YHSJVe2MXl5yGNnZGnzZ_aJEPg5-ptAZ_69mDdx_D-_uKk5ZLAK8e35rPQ8h2IFKCfbBwP4NecJjKRQ'
                },
            }).then((response) => {
                this.data = response.data.data.items
                
            }).catch((error) => {
                console.log(error);
            });
        },
        listDataUser() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/users',{
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCRFWEk1UmZ0U2FDOEFyZWN1NlE3ZXd1TG16c2lhUUdONmkyY0xaTFlTOVRTWGdtdHlNVld3NiIsImlhdCI6MTczMTQ2NjkyNiwiZXhwIjoxNzMxNjM5NzI2LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.Yuzcd1-YHSJVe2MXl5yGNnZGnzZ_aJEPg5-ptAZ_69mDdx_D-_uKk5ZLAK8e35rPQ8h2IFKCfbBwP4NecJjKRQ'
                },
            }).then((response) => {
                this.users = response.data.data.items
                
            }).catch((error) => {
                console.log(error);
            });
        },

    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        this.fetchData();
        this.listData();
        this.listDataUser();
    }

};
</script>

<template>
    <Layout>
        <HeaderPage title="Program Maintenance" pageTitle="Program Maintenance" />
        <BModal v-model="showModalActivity" hide-footer title="Tambah Aktifitas" centered  class="v-modal-custom" size="xl">
            <BForm>
                <BRow>
                <BCol md="12" class="mb-3">
                    <div>
                        <label for="">Judul <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" placeholder="Masukkan judul">
                    </div>
                </BCol>
                <BRow class="mb-3">
                    <BCol md="4">
                        <div>
                            <label for="" class="form-label">Start Date<span class="text-danger">*</span></label>
                            <div class="input-group">
                                <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.date" required>
                                <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                            </div>
                        </div>
                    </BCol>
                    <BCol md="4">
                        <div>
                            <label for="" class="form-label">Due Date<span class="text-danger">*</span></label>
                            <div class="input-group">
                                <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.date" required>
                                <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                            </div>
                        </div>
                    </BCol>
                    <BCol md="4">
                        <div>
                            <label for="" class="form-label">Actual Finish Date</label>
                            <div class="input-group">
                                <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.date" required>
                                <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                            </div>
                        </div>
                    </BCol>
                </BRow>
                <BCol md="12" class="mb-3">
                    <div>
                        <label for="">Note </label>
                        <input type="text" class="form-control" placeholder="Masukkan note">
                    </div>
                </BCol>
                <BRow class="mb-3">
                    <label for="" class="form-label">Line Items <span class="text-danger">*</span></label>
                    <BCol md="2">
                        <div>
                            <select id="" class="form-select" required>
                                <option selected>Part</option>
                            </select>
                        </div>
                    </BCol>
                    <BCol md="2">
                        <div>
                            <select id="" class="form-select" required>
                                <option selected>Sparepart</option>
                            </select>
                        </div>
                    </BCol>
                    <BCol md="2" class="pe-0">
                        <div>
                            <div class="input-group">
                                <input type="text" class="form-control" id="quantity" width="80%" placeholder="Quantity" required>
                                <select id="" class="form-select" required>
                                    <option selected>Pcs</option>
                                </select>
                            </div>
                        </div>
                    </BCol>
                    
                    <BCol md="6" class="p-0">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex align-items-center mx-2">
                                <i class="bx bx-x fs-22"></i>
                            </div>
                            <div>
                                <input type="text" class="form-control" placeholder="Rp0">
                            </div>
                            <div class="d-flex align-items-center mx-2">
                                <i class="las la-equals fs-22"></i>
                            </div>
                            <div>
                                <input type="text" class="form-control" disabled placeholder="Rp0">
                            </div>
                            <div class="d-flex align-items-center mx-2">
                                <BButton variant="link" class="p-1 rounded-circle"><i class="bx bxs-copy-alt fs-22"></i></BButton>
                            </div>
                            <div class="d-flex align-items-center mx-2">
                                <BButton variant="link" class="p-1 rounded-circle d-flex align-items-center bg-light"><i class="bx bx-x fs-22"></i></BButton>
                            </div>
                        </div>
                    </BCol>
                </BRow>
                <BCol md="12">
                    <div>
                        <label for="">Subtotal </label>
                        <input type="text" class="form-control" placeholder="Rp0" disabled>
                    </div>
                </BCol>
            </BRow>
            </BForm>
            <div class="cta">
                
                <div class="d-flex justify-content-end mt-4">
                    <BButton variant="light" class="me-2">Kembali</BButton>
                    <BButton variant="dark">Simpan</BButton>
                </div>
            </div>
        </BModal>
        <BRow>
            <BCol xl="12">
                <BCard no-body>
                    <!-- <BCardHeader>
                        
                    </BCardHeader> -->

                    <BCardBody>
                        <BForm>
                            <BRow class="gy-4">
                                <BCol md="6">
                                    <div>
                                        <label for="name" class="form-label">Nama Program<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="name" placeholder="Masukkan nama program" v-model="form.name" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="teknis" class="form-label">Teknis <span class="text-danger">*</span></label>
                                        <select id="teknis" class="form-select" v-model="form.type" required>
                                            <option v-for="type in types" :key="type.label" :value="form.type">{{ type.label }}</option>
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="duration" class="form-label">Durasi Parameter <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="duration" placeholder="0" v-model="form.parameterDuration" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="notification" class="form-label">Notifikasi Sebelum Parameter <span class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="0" v-model="form.parameterDurationNotification" aria-label="notification" aria-describedby="notification">
                                            <span class="input-group-text" id="notification">Jam</span>
                                        </div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="assignment" class="form-label">Penugasan <span class="text-danger">*</span></label>
                                        <MultiSelect v-model="valueUser" :options="users" label="fullName" track-by="fullName" placeholder="Pilih Penugasan" @select="selectOpt" :multiple="true"></MultiSelect>
                                    </div>
                                </BCol>
                            </BRow>
                           
                        </BForm>
                    </BCardBody>
                </BCard>
            </BCol>
            <BCol xl="12">
                <div class="p-0 bg-white rounded-4">
                    <div class="d-flex flex-wrap justify-content-between p-lg-4">
                        <h4 class="card-title mb-0">Aktivitas</h4>

                        <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                            
                            
                            

                            <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                    <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="params.search">
                                    <i class="ri-search-line search-icon"></i>
                                </div>

                                <BButton variant="primary" class="btn btn-md" @click="showModalActivityMethod()" style="white-space: nowrap;">
                                    Tambah Aktivitas
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
                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" :to="`/program-maintenance/view/${item.id}`">
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
                    <div class="cta p-lg-4">
                        <div class="d-flex justify-content-end">
                            <BButton variant="light" class="me-2">Kembali</BButton>
                            <BButton variant="dark">Simpan</BButton>
                        </div>
                    </div>
                </div>
            </BCol>
        </BRow>
    </Layout>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>