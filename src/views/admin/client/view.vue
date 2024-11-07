<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import TableComponent from "@/components/table.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
    name: "administrator-management-create",
    components: {
        Layout,
        TableComponent,
    },
    data() {
        return {
            headers: [
                {
                    title: "No",
                    key: "no",
                    show: true
                },
                {
                    title: "Nama Lengkap",
                    key: "fullName",
                    show: true
                },
                {
                    title: "Email",
                    key: "email",
                    show: true
                },
                {
                    title: "Nomor (WA)",
                    key: "whatsappNumber",
                    show: true
                },
                {
                    title: "Harga Subscription",
                    key: "subscription_price", //TODO
                    show: true
                },
                {
                    title: "Start and End",
                    key: "start_end",
                    show: true
                },
                {
                    title: "User Role",
                    key: "user_role", //TODO
                    show: true
                },
                {
                    title: "Status Akun",
                    key: "status",
                    show: true
                }
            ],
            form: {
                fullName: '',
                email: '',
                phoneNumber: '',
                address: '',
                whatsappNumber: '',
                userRole: '',
                password: '',
                accountStatus: '',
                status: 'active',
                sendEmail: false
            },
            params: {
                page: 1,
                limit: 10,
                search: '',
                sortBy: 'id.desc',
                client_id: this.$route.params.id,
            },
            config:{
                total_pages: 0,
                total_items: 0,
            },
            data: null,
            userDatas : [],
            showSelectHeader: false,
            modalFormUser: false,
        };
    },
    watch: {
        headers: {
            handler(newVal) {
                this.headers = newVal;
            },
            deep: true
        }
    },
    methods: {
        showSelectHeaderMethod() {
            this.showSelectHeader = true;
        },

        hideSelectHeaderMethod() {
            this.showSelectHeader = false;
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

        getData() {
            axios.get(process.env.VUE_APP_API_URL + "/cms/v1/clients/" + this.$route.params.id)
                .then(response => {
                    this.data = response.data.data;

                })
                .catch(error => {
                    console.log(error);
                });
        },
        getUserDatas() {
            axios.get(process.env.VUE_APP_API_URL + "/cms/v1/clients/users", { params: this.params })
                .then(response => {
                    this.userDatas = response.data.data.items;
                    this.config.total_pages = response.data.data.meta.totalPages;
                    this.config.total_items = response.data.data.meta.totalItems;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        saveUser(sendEmail = false) {
            const body = {
                clientId: this.$route.params.id,
                fullName: this.form.fullName,
                email: this.form.email,
                phoneNumber: this.form.phoneNumber,
                whatsappNumber: this.form.whatsappNumber,
                password: this.form.password,
                status: this.form.accountStatus,
                address: this.form.address,
                sendEmail: sendEmail,
                roleId:"58ff00b3-9bdf-4649-86f8-9213a4085cd0"
            }
            axios.post(process.env.VUE_APP_API_URL + "/cms/v1/clients/user", body)
                .then(() => {
                    this.modalFormUser = false;
                    this.getUserDatas();
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'User berhasil ditambahkan',
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.getData();
        this.getUserDatas();
        window.addEventListener("resize", this.resizerightcolumn);
    }

};
</script>

<template>
    <Layout>
        <BModal v-model="modalFormUser" hide-footer hide-header-close centered title="Tambah User" class="v-modal-custom" size="lg">
            <form @submit.prevent="saveUser">
                <BRow class="gy-4">
                    <BCol  md="6">
                        <BFormGroup label="Nama Lengkap" label-for="fullName">
                            <BFormInput id="fullName" placeholder="Masukkan Nama Lengkap" v-model="form.fullName" />
                        </BFormGroup>
                    </BCol>
                    <BCol  md="6">
                        <BFormGroup label="Nomor Telepon" label-for="phoneNumber">
                            <BFormInput id="phoneNumber" placeholder="Masukkan Nomor Telepon" v-model="form.phoneNumber" />
                        </BFormGroup>
                    </BCol>
                    <BCol  md="6">
                        <BFormGroup label="Email" label-for="email">
                            <BFormInput id="email" placeholder="Masukkan Email" v-model="form.email" />
                        </BFormGroup>
                    </BCol>
                    <BCol  md="6">
                        <BFormGroup label="Nomor Whatsapp" label-for="whatsappNumber">
                            <BFormInput id="whatsappNumber" placeholder="Masukkan Nomor Whatsapp" v-model="form.whatsappNumber" />
                        </BFormGroup>
                    </BCol>
                    <BCol  md="6">
                        <BFormGroup label="User Role" label-for="userRole">
                            <BFormInput id="userRole" placeholder="Masukkan User Role" v-model="form.userRole" />
                        </BFormGroup>
                    </BCol>
                    <BCol  md="6">
                        <BFormGroup label="Password" label-for="password">
                            <BFormInput id="password" type="password" placeholder="Masukkan Password" v-model="form.password" />
                        </BFormGroup>
                    </BCol>
                    <BCol  md="6">
                        <BFormGroup label="Status Akun" label-for="accountStatus">
                            <BFormSelect id="accountStatus" v-model="form.accountStatus">
                                <BFormSelectOption value="active">Aktif</BFormSelectOption>
                                <BFormSelectOption value="inactive">Tidak Aktif</BFormSelectOption>
                            </BFormSelect>
                        </BFormGroup>
                    </BCol>
                    <BCol  md="12">
                        <BFormGroup label="Alamat" label-for="address">
                            <BFormTextarea id="address" placeholder="Masukkan Alamat" v-model="form.address" />
                        </BFormGroup>
                    </BCol>
                </BRow>

                <div class="d-flex justify-content-center mt-4 gap-2">    
                    <BButton variant="light" class="btn btn-md" style="white-space: nowrap;" @click="modalFormUser = false">Kembali</BButton>
                    <BButton variant="dark" class="btn btn-md" style="white-space: nowrap;" @click="saveUser(true)">Simpan Dan Kirim Email</BButton>
                    <BButton variant="dark" class="btn btn-md" style="white-space: nowrap;" @click="saveUser(false)">Simpan</BButton>
                </div>
            </form>
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

        <BRow v-if="data">
            <BCol xl="12">
                <BCard>
                    <BCardBody>
                        <div class="">
                            <h3 class="mr-3">{{ data.name }} | {{ data.phoneNumber }}</h3>
                        </div>

                        <div class="mt-3 d-flex gap-2">
                            <div class="d-flex align-items-bottom gap-2">
                                <i class="mdi mdi-phone fs-14 text-muted"></i>
                                <p class="fs-14 text-muted">{{ data.phoneNumber || "-" }}</p>
                            </div>

                            
                            <div class="d-flex align-items-bottom gap-2">
                                <i class="mdi mdi-whatsapp fs-14 text-muted"></i>
                                <p class="fs-14 text-muted">{{ data.whatsappNumber || "-" }}</p>
                            </div>

                            <div class="d-flex align-items-bottom gap-2">
                                <i class="mdi mdi-email fs-14 text-muted"></i>
                                <p class="fs-14 text-muted">{{ data.fax || "-" }}</p>
                            </div>
                        </div>
                    </BCardBody>

                    <BCardFooter>   
                        <div class="d-flex gap-4">
                            <div>
                               <h5> <span class="text-muted">NPWP</span> : {{ data.npwp || "-" }}</h5>
                            </div>
                            <div>
                                <h5> <span class="text-muted">Sector Usaha</span> : {{ data.sector.name || "-" }}</h5>
                            </div>
                            <div>
                                <!-- <h5> <span class="text-muted">Harga Subcribe</span> : //TODO</h5> -->
                            </div>
                            <div>
                                <!-- <h5> <span class="text-muted">Kuota</span> : //TODO</h5> -->
                            </div>
                            <div>
                                <!-- <h5> <span class="text-muted">Sisa Kredit</span> : //TODO</h5> -->
                            </div>
                        </div>
                    </BCardFooter>
                </BCard>
            </BCol>
        </BRow>

        <BRow v-if="userDatas">
            <BCol xl="12">
                <BCard no-body>
                    <BCardBody>
                        <div class="d-flex justify-content-between py-lg-4">
                            <h4 class="card-title mb-0">User Management</h4>

                            <div class="d-flex align-items-center">
                                <BButton variant="light" class="btn btn-md me-2" style="white-space: nowrap;" @click="showSelectHeaderMethod">
                                    <i class="bx bx-dots-vertical-rounded"></i>
                                </BButton>

                                <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                    <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                        <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="params.search" @keyup="getUserDatas">
                                        <i class="ri-search-line search-icon"></i>
                                    </div>

                                    <BButton variant="primary" class="btn btn-md" style="white-space: nowrap;" @click="modalFormUser = true">
                                            Tambah User
                                        </BButton>
                                </div>
                            </div>

                        </div>
                        <div class="live-preview">
                            <table-component :headers="headers" :data="userDatas" :action="action">
                                <template #no="{ index }">
                                    {{ index + 1 }}
                                </template>

                                <template #start_date="{ item }">  
                                    <!-- //TODO -->
                                    {{ $filters.formatDate(item.start_date) }} - <br> {{ $filters.formatDate(item.end_date) }} 
                                </template>

                                <!-- Status -->
                                <template #status="{ item }">
                                    <span :class="item.status == 'active' ? 'badge rounded-pill bg-success-subtle text-success' : 'badge rounded-pill bg-danger-subtle text-danger'">{{item.status}}</span>
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