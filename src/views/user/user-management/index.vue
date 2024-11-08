<script>

import "flatpickr/dist/flatpickr.css";
import TableComponent from "@/components/table.vue";
import SelectHeader from "@/components/select-header.vue";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";


export default {
    components: {
        Layout,
        TableComponent,
        SelectHeader,
        HeaderPage
    },
    data() {
        return {
            headers: [
                {
                    title: 'No',
                    key: 'no',
                    show: true,
                    order: false
                },
                {
                    title: 'Nama Lengkap',
                    key: 'fullName',
                    show: true,
                    order: true
                },
                {
                    title: 'Email',
                    key: 'email',
                    show: true,
                    order: true
                },
                {
                    title: 'Nomor Handphone',
                    key: 'phoneNumber',
                    show: true,
                    order: true
                },
                {
                    title: 'Nomor Whatsapp',
                    key: 'whatsappNumber',
                    show: true,
                    order: true
                },
                //Role
                {
                    title: 'Role',
                    key: 'role.name',
                    show: true,
                    order: true
                },
                //Status
                {
                    title: 'Status',
                    key: 'status',
                    show: true,
                    order: true
                },
                //Action
                {
                    title: 'Action',
                    key: 'action',
                    show: true,
                    order: false
                }
            ],
            data: [
            ],
            params: {
                page: 1,
                limit: 10,
                search: '',
                sortBy: 'id.desc',
            },
            config: {
                total_pages: 0,
                total_items: 0,
            },
            summary: {
                total: 0,
                active: 0,
            },

            deleteId: null,
            showSelectHeader: false,
            showModalDelete: false,
            showModalCheck: false,
            showModalReject: false,
        };
    },
    watch: {
        headers: {
            handler(newVal) {
                this.headers = newVal;
            },
            deep: true
        },
        params: {
            handler() {
                this.getData();
            },
            deep: true
        }
    },
    methods: {
        getData() {
            axios.get(process.env.VUE_APP_API_URL + "/v1/users", {
                params: this.params
            })
                .then((response) => {
                    this.data = response.data.data.items;
                    this.config.total_pages = response.data.data.meta.totalPages;
                    this.config.total_items = response.data.data.meta.totalItems;
                })
                .catch((error) => {
                    console.log(error);
                });

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

        showSelectHeaderMethod() {
            this.showSelectHeader = true;
        },

        hideSelectHeaderMethod() {
            this.showSelectHeader = false;
        },

        showModalDeleteMethod(id) {
            this.deleteId = id;
            this.showModalDelete = true;
        },
        showModalCheckMethod(id) {
            this.deleteId = id;
            this.showModalCheck = true;
        },
        showModalRejectMethod(id) {
            this.deleteId = id;
            this.showModalReject = true;
        },

        deleteDataMethod() {
            // this.showModalDelete = false
            axios.delete(process.env.VUE_APP_API_URL + '/cms/v1/admins/' + this.deleteId).then(() => {
                this.getData();
                this.deleteId = null;
                this.showModalDelete = false;

                Swal.fire("Berhasil!", "Berhasil menghapus data", "success");
            }).catch((error) => {
                console.log(error);
            });
        },
        changePage(pageNumber) {
            console.log("Change Page", pageNumber);

            this.params.page = pageNumber;
        },
        sort(sortBy) {
            this.params.sortBy = `${sortBy}.desc`;
            this.getData();
        },
        exportExcel() {
            axios.defaults.responseType = 'blob';
            axios.get(process.env.VUE_APP_API_URL + '/v1/users/export', {
                params: {
                    sortBy: "fullName.asc",
                }
            }).then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `Program Maintenance.xlsx`);
                document.body.appendChild(link);
                link.click();
                axios.defaults.responseType = 'json'

            });
        },
        getSummary() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/users/summary')
                .then((response) => {
                    this.summary.total = response.data.data.total;
                    this.summary.active = response.data.data.active;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.getData();
        this.getSummary();
        window.addEventListener("resize", this.resizerightcolumn);
    }

};
</script>

<template>
    <Layout>


        <SelectHeader :showModal="showSelectHeader" :headers="headers" @hideModal="hideSelectHeaderMethod"
            @selectHeader="selectHeaderMethod" />


        <HeaderPage title="Role Management" pageTitle="Role Management" />

        <BRow>
            <BCol xl="6" md="12">
                <BCard no-body class="card-animate">
                    <BCardBody class="p-4">
                        <div class="d-flex align-items-center">
                            <div class="flex-grow-1">
                                <img src="@/assets/icons/abstract.svg" alt="abstraction" />
                                <h5 class="text-muted mt-3 fs-14">
                                    Total User Terdaftar
                                </h5>
                            </div>
                            <div class="flex-shrink-0">
                                <h5 class="fs-36 mb-0">
                                    {{ summary.total }}
                                </h5>
                            </div>
                        </div>
                    </BCardBody>

                </BCard>

            </BCol>

            <!-- Jumlah user aktif -->
            <BCol xl="6" md="12">
                <BCard no-body class="card-animate">
                    <BCardBody class="p-4">
                        <div class="d-flex align-items-center">
                            <div class="flex-grow-1">
                                <img src="@/assets/icons/abstract2.svg" alt="abstraction" />
                                <h5 class="text-muted mt-3 fs-14">
                                    Total User Aktif
                                </h5>
                            </div>
                            <div class="flex-shrink-0">
                                <h5 class="fs-36 mb-0">
                                    {{ summary.active }} / <span class="text-muted fs-24">{{ summary.total - summary.active }}</span>
                                </h5>
                            </div>
                        </div>
                    </BCardBody>

                </BCard>

            </BCol>
        </BRow>


        <BRow>
            <BCol xl="12">
                <BCard no-body>
                    <!-- <BCardHeader>
                        
                    </BCardHeader> -->

                    <BCardBody>
                        <div class="d-flex flex-wrap justify-content-between py-lg-4">
                            <h4 class="card-title mb-0"></h4>

                            <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                                <!-- <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="showSelectHeaderMethod">
                                    <i class="bx bx-dots-vertical-rounded"></i>
                                </BButton>
                               
                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" >
                                    <img src="@/assets/icons/filter.svg" alt="filter" />
                                    Filter
                                </BButton>

                                <BButton variant="light" class="btn btn-md me-2 mb-2 mb-lg-0" style="white-space: nowrap;" @click="exportExcel">
                                    Download Data
                                </BButton> -->

                                <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0"
                                    style="flex-grow: 1;">
                                    <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                        <input type="text" class="form-control" placeholder="Search..."
                                            style="width: 100%;" v-model="params.search">
                                        <i class="ri-search-line search-icon"></i>
                                    </div>

                                    <router-link :to="{ name: 'user-management-create' }">
                                        <BButton variant="primary" class="btn btn-md" style="white-space: nowrap;">
                                            Tambah User
                                        </BButton>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="live-preview">
                            <table-component :headers="headers" :data="data" :action="action" v-if="data.length > 0"
                                @sort="sort($event.sortBy)">
                                <!-- NO -->
                                <template #no="{ index }">
                                    {{ index + 1 }}
                                </template>
                                <!-- //Status -->
                                <template #status="{ item }">
                                    <!-- Span Badge success -->
                                    <span class="badge rounded-pill bg-success-subtle text-success fs-12"
                                        v-if="item.status == 'active'">Aktif</span>
                                    <!-- Span Badge danger -->
                                    <span class="badge rounded-pill bg-danger-subtle text-danger fs-12" v-else>Tidak
                                        Aktif</span>
                                </template>
                                <template #action="{ item }">
                                    <BButton variant="link" class="link-dark" size="sm"
                                        :to="`/user-management/edit/${item.id}`">
                                        <img src="@/assets/icons/edit.svg" alt="pencil" />
                                    </BButton>
                                </template>

                                <template #pagination>

                                    <div class="d-flex justify-content-between mt-3" v-if="config.total_items >= 1">
                                        <div class="d-flex align-items-center">
                                            <!-- <label for="perPageSelect" class="me-2">Items per page:</label> -->
                                            <select id="perPageSelect" v-model="params.limit" class="form-select">
                                                <option v-for="option in [10, 20, 30, 50]" :key="option"
                                                    :value="option">{{ option }}</option>
                                            </select>
                                        </div>
                                        <div class="pagination-wrap hstack gap-2">
                                            <BButton class="page-item pagination-prev" variant="light"
                                                :disabled="params.page <= 1" @click="params.page--">
                                                <i class="ri-arrow-left-s-line"></i>
                                            </BButton>
                                            <ul class="pagination listjs-pagination mb-0">
                                                <li :class="{ active: pageNumber == params.page, disabled: pageNumber == '...' }"
                                                    v-for="(pageNumber, index) in config.total_pages" :key="index"
                                                    @click="changePage(pageNumber)">
                                                    <BButton class="page">{{ pageNumber }}</BButton>
                                                </li>
                                            </ul>
                                            <BButton class="page-item pagination-next" variant="light"
                                                :disabled="params.page >= config.total_pages" @click="params.page++">
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