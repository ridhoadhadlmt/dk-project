<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import HeaderPage from "@/components/header-page.vue";
import TableComponent from "@/components/table.vue";
import MultiSelect from "vue-multiselect";

export default {
    name: "program-maintenance-view",
    components: {
        Layout,
        HeaderPage,
        TableComponent,
        MultiSelect
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
            users: [],
            dataActivity: [],
            params: {
                page: 1,
                limit: 10,
                search: '',
                sortBy: 'id.desc',
                maintenanceProgramId: '',
            },
            search: '',
            config:{
                total_pages: 0,
                total_item: 0,
            },
        }
    },
    watch: {
        search: {
            handler(){
                if(this.search.length === 0 || this.search.length > 1){
                    this.params.search = this.search
                    if(this.timeout) clearTimeout(this.timeout)
                    this.timeout = setTimeout(() => {
                        this.listDataActivity()
                    }, 500)
                }
            }
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


        fetchData() {
            if(this.$route.params.id){
                this.params.maintenanceProgramId = this.$route.params.id

                axios.get(process.env.VUE_APP_API_URL + '/v1/maintenance-programs/' + this.$route.params.id).then((response) => {
                    this.form = response.data.data
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        listDataUser() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/users').then((response) => {
                this.users = response.data.data.items
                
            }).catch((error) => {
                console.log(error);
            });
        },
        listDataActivity() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/maintenance-program-activities' ,{
                params: this.params
            }).then((response) => {
                this.dataActivity = response.data.data.items
                this.config.total_item = response.data.data.meta.totalItems
                this.config.total_pages = response.data.data.meta.totalPages
                
            }).catch((error) => {
                console.log(error);
            });
        },

    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        this.fetchData();
        this.listDataUser();
        this.listDataActivity()
    }

};
</script>

<template>
    <Layout>
        <HeaderPage title="Program Maintenance" pageTitle="Program Maintenance" />
        
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
                                        <label for="name" class="form-label">Kode Program</label>
                                        <input type="text" class="form-control" id="code" disabled placeholder="Masukkan kode program" v-model="form.code" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="name" class="form-label">Nama Program</label>
                                        <input type="text" class="form-control" id="name" disabled placeholder="Masukkan nama program" v-model="form.name" required>
                                    </div>
                                </BCol>
                                
                                <BCol md="6">
                                    <div>
                                        <label for="duration" class="form-label">Tipe Program </label>
                                        <input type="text" class="form-control" id="type" disabled placeholder="0" v-model="form.type" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="duration" class="form-label">Durasi Parameter </label>
                                        <input type="text" class="form-control" id="duration" disabled placeholder="0" v-model="form.parameterDuration" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="duration" class="form-label">Notifikasi Sebelum Parameter </label>
                                        <input type="text" class="form-control" id="duration" disabled placeholder="0" v-model="form.parameterDurationNotification" required>
                                    </div>
                                </BCol>
                                
                                <BCol md="6">
                                    <div>
                                        <label for="assignment" class="form-label">Penugasan <span class="text-danger">*</span></label>
                                        <MultiSelect v-model="form.users" :options="users" label="fullName" track-by="fullName"></MultiSelect>
                                    </div>
                                </BCol>
                            </BRow>
                            <div class="d-flex justify-content-end mt-4">
                                <BButton variant="light" class="me-2">Edit</BButton>
                            </div>
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
                                    <input type="text" class="form-control" placeholder="Search..." v-model="search" style="width: 100%;">
                                    <i class="ri-search-line search-icon"></i>
                                </div>

                                
                                
                            </div>
                        </div>
                    </div>
                    <div class="live-preview">
                        <table-component :headers="headers" :data="dataActivity" :action="action" v-if="dataActivity.length > 0" @sort="sort($event.sortBy)">
                            <!-- NO -->
                            <template #no="{ index }">
                                {{ index + 1 }}
                            </template>
                            <!-- //Status -->
                            
                            <template #action="{ item }">
                                <BButton variant="link" class="link-dark fs-22" size="sm" :to="`/maintenance-programs/edit/${item.id}`">
                                    <img src="@/assets/icons/edit.svg" alt="pencil" />
                                </BButton>
                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDeleteMethod(item.id)">
                                    <img src="@/assets/icons/delete.svg" alt="delete" />
                                </BButton>
                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" :to="`/maintenance-programs/activity/view/${item.id}`">
                                    <img src="@/assets/icons/view.svg" alt="eye" />
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
                    <div class="cta p-lg-4">
                        <div class="d-flex justify-content-end">
                            <BButton variant="light" class="me-2">
                                <router-link to="/maintenance-programs">Kembali</router-link>
                            </BButton>
                        </div>
                    </div>
                </div>
            </BCol>
        </BRow>
    </Layout>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>