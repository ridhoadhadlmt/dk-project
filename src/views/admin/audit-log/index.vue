<script>

import "flatpickr/dist/flatpickr.css";
import TableComponent from "@/components/table.vue";
import SelectHeader from "@/components/select-header.vue";
import Layout from "@/layouts/main.vue";
import ModalView from "@/views/admin/audit-log/view.vue";
import HeaderPage from "@/components/header-page.vue";

export default {
    components: {
        Layout,
        TableComponent,
        SelectHeader,
        ModalView,
        HeaderPage
    },
    data() {
        return {
            showModalView: false,
            headers: [
                {
                    title: 'No',
                    key: 'no',
                    show: true
                },
                {
                    title: 'Tanggal & waktu',
                    key: 'timestamp',
                    show: true
                },
                {
                    title: 'Aksi',
                    key: 'aksi',
                    show: true
                },
                {
                    title: 'Admin',
                    key: 'admin',
                    show: true
                },
                {
                    title: 'Menu',
                    key: 'menu',
                    show: true
                },
                {
                    title: 'Sebelum Perubahan',
                    key: 'before_change',
                    show: true
                },
                {
                    title: 'Setelah Perubahan',
                    key: 'after_change',
                    show: true
                },
                {
                    title: 'Action',
                    key: 'action',
                    show: true
                }
            ],
            data: [
                {
                    no: 1,
                    timestamp: '2022-01-01 10:00:00',
                    aksi: 'Create',
                    admin: 'Admin1',
                    menu: 'User Management',
                    before_change: '-',
                    after_change: 'Added new user',
                },
                {
                    no: 2,
                    timestamp: '2022-01-02 11:00:00',
                    aksi: 'Update',
                    admin: 'Admin2',
                    menu: 'Role Management',
                    before_change: 'Role: User',
                    after_change: 'Role: Admin',
                },
                {
                    no: 3,
                    timestamp: '2022-01-03 12:00:00',
                    aksi: 'Delete',
                    admin: 'Admin3',
                    menu: 'Client Management',
                    before_change: 'Client: ABC Corp',
                    after_change: '-',
                }

            ],
            showSelectHeader: false
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

        showModalViewMethod() {
            this.showModalView = true;
        },

        hideModalViewMethod() {
            this.showModalView = false;
        },
    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
    }

};
</script>

<template>
    <Layout>
        <SelectHeader :showModal="showSelectHeader" :headers="headers" @hideModal="hideSelectHeaderMethod" @selectHeader="selectHeaderMethod" />
        <ModalView :showModalView="showModalView" @hideModalView="hideModalViewMethod" />
        <HeaderPage title="Audit Log" />

        <BRow>
            <BCol xl="12">
                <BCard no-body>
                    <!-- <BCardHeader>
                        
                    </BCardHeader> -->

                    <BCardBody>
                        <div class="d-flex justify-content-between py-lg-4">
                            <h4 class="card-title mb-0">Data Role</h4>

                            <div class="d-flex align-items-center">
                                <BButton variant="light" class="btn btn-md me-2" style="white-space: nowrap;" @click="showSelectHeaderMethod">
                                    <i class="bx bx-dots-vertical-rounded"></i>
                                </BButton>
                                <BButton variant="light" class="btn btn-md me-2" style="white-space: nowrap;">
                                    <img src="@/assets/icons/filter.svg" alt="filter" />
                                    Filter
                                </BButton>
                                <BButton variant="light" class="btn btn-md me-2" style="white-space: nowrap;">
                                    Download Data
                                </BButton>
                                

                                <div class="input-group me-2">
                                    <button class="input-group-text"><i class="ri-search-line"></i></button>
                                    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                                </div>
                            </div>

                        </div>
                        <div class="live-preview">
                            <table-component :headers="headers" :data="data" :action="action">
                                <template #status="{ }">   
                                    <span class="badge rounded-pill bg-success-subtle text-success">Aktif</span>
                                </template>
                                <template #action="{ }">
                                    <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalViewMethod">
                                        <img src="@/assets/icons/view.svg" alt="eye" />
                                    </BButton>

                                </template>
                            </table-component>
                        </div>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>