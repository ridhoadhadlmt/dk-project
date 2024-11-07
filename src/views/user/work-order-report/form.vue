<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";
import TableComponent from "@/components/table.vue";

export default {
    name: "work-order-report-create",
    components: {
        Layout,
        HeaderPage,
        TableComponent
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
                    title: 'Start Date',
                    key: 'start_date',
                    show: true,
                    order:true
                },
                {
                    title: 'End Date',
                    key: 'end_date',
                    show: true,
                    order:true
                },
                {
                    title: 'Actual Finish Date',
                    key: 'actual',
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
                duration: "",
                notification: "",
                assignment: "",
                isActive: true,
                roleId: null
            },
            options: [
                {label: 'Teknis', value: 'teknis'},
                {label: 'Non Teknis', value: 'nonteknis'},
            ],
            users: [
                {id: 1, name: 'User1'},
                {id: 2, name: 'User2'},
            ],
            data: [
                { id: 1, title: 'Lorem Ipsum', start_date: '11 Desember 2023', end_date: '23 April 2024', actual: '22 April 2024', subtotal: "Rp.4.500.000"}
            ],
            periodics: [
                {text: 'Short Term'},
                {text: 'Long Term'},
            ],
            params: {
                page: 1,
                limit: 10,
                search: '',
                sortBy: 'id.desc',
            },
            config:{
                total_pages: 0,
                total_item: 0,
            },
            showModalActivity: false,
        }
    },
    watch: {
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

        submit() {
            if(this.form.password !== this.form.confirmPassword) {
                Swal.fire("Gagal!", "Password dan Konfirmasi Password tidak sama", "error");
                return;
            }

            if(this.$route.params.id) {
                axios.put(process.env.VUE_APP_API_URL + '/cms/v1/admins/' + this.$route.params.id, this.form).then(() => {
                    Swal.fire("Berhasil!", "Berhasil mengubah data", "success");
                    this.$router.push('/program-maintenance');
                }).catch((error) => {
                    Swal.fire("Gagal!", "Gagal mengubah data", "error");
                    console.log(error);
                });
            } else {
                axios.post(process.env.VUE_APP_API_URL + '/cms/v1/admins', this.form).then(() => {
                    Swal.fire("Berhasil!", "Berhasil menambahkan data", "success");
                    this.$router.push('/program-maintenance');
                }).catch((error) => {
                    Swal.fire("Gagal!", "Gagal menambahkan data", "error");
                    console.log(error);
                });
            }
        },

        fetchRoles() {
            // axios.get(process.env.VUE_APP_API_URL + '/cms/v1/roles').then((response) => {
            //     this.roles = response.data.data.items;
            // }).catch((error) => {
            //     console.log(error);
            // });
        },

        fetchData() {
            if(this.$route.params.id) {
                // axios.get(process.env.VUE_APP_API_URL + '/cms/v1/admins/' + this.$route.params.id).then((response) => {
                //     this.form.fullName = response.data.data.fullName;
                //     this.form.email = response.data.data.email;
                //     this.form.phoneNumber = response.data.data.phoneNumber;
                //     this.form.whatsappNumber = response.data.data.whatsappNumber;
                //     this.form.password = '';
                //     this.form.confirmPassword = '';
                //     this.form.roleId = response.data.data.roleId;
                //     this.form.isActive = response.data.data.isActive;
                // }).catch((error) => {
                //     console.log(error);
                // });
            }
        },

    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        this.fetchRoles();
        this.fetchData();
    }

};
</script>

<template>
    <Layout>
        <HeaderPage title="Work Order Report" pageTitle="Work Order Report" />
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
                        <BForm @submit.prevent="submit">
                            <BRow class="gy-4">
                                <BCol md="6">
                                    <div>
                                        <label for="code-fleet" class="form-label">Kode Fleet<span class="text-danger">*</span></label>
                                        <select id="code-fleet" class="form-select" required>
                                            <option selected>Pilih kode fleet</option>
                                            <!-- <option v-for=" in " :key="" :value="">{{  }}</option> -->
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="type-fleet" class="form-label">Tipe Fleet <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="type-fleet" disabled placeholder="Fleet" v-model="form.type_fleet" required>
                                        
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="duration" class="form-label">Referensi Issue <span class="text-danger">*</span></label>
                                        <select id="code-fleet" class="form-select" required>
                                            <option selected>Pilih kode fleet</option>
                                            <!-- <option v-for=" in " :key="" :value="">{{  }}</option> -->
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="notification" class="form-label">Referensi Reminder <span class="text-danger">*</span></label>
                                        <select id="code-fleet" class="form-select" required>
                                            <option selected></option>
                                            <!-- <option v-for=" in " :key="" :value="">{{  }}</option> -->
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="title" class="form-label">Judul WO <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="title" placeholder="Masukkan judul wo" v-model="form.type_fleet" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="notification" class="form-label">Jenis WO <span class="text-danger">*</span></label>
                                        <select id="code-fleet" class="form-select" required>
                                            <option selected>Pilih jenis WO</option>
                                            <!-- <option v-for=" in " :key="" :value="">{{  }}</option> -->
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="notification" class="form-label">Periodic WO <span class="text-danger">*</span></label>
                                        <BFormRadioGroup
                                        size="lg"
                                        
                                        v-model="formSelected"
                                        :options="periodics"
                                        name="radio-options"
                                        />
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="notification" class="form-label">Prioritas<span class="text-danger">*</span></label>
                                        <select id="code-fleet" class="form-select" required>
                                            <option selected>Pilih prioritas</option>
                                            <!-- <option v-for=" in " :key="" :value="">{{  }}</option> -->
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="start-date" class="form-label">Tanggal Mulai <span class="text-danger">*</span></label>
                                    <BRow>
                                        <BCol md="6">
                                            <div class="input-group">
                                                <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.date" required>
                                                <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                                            </div>
                                        </BCol>
                                        <BCol md="6">
                                            <div class="input-group">
                                                <input type="text" class="form-control border-end-0" id="date" placeholder="Masukkan Jam" v-model="form.date" required>
                                                <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/clock.svg" width="20"></span>
                                            </div>
                                        </BCol>
                                    </BRow>
                                </BCol>
                                <BCol md="6">
                                    <label for="target" class="form-label">Target <span class="text-danger">*</span></label>
                                    <BRow>
                                        <BCol md="6">
                                            <div class="input-group">
                                                <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.date" required>
                                                <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                                            </div>
                                        </BCol>
                                        <BCol md="6">
                                            <div class="input-group">
                                                <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Jam" v-model="form.date" required>
                                                <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/clock.svg" width="20"></span>
                                            </div>
                                        </BCol>
                                    </BRow>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="notification" class="form-label">PIC Mekanik<span class="text-danger">*</span></label>
                                        <select id="code-fleet" class="form-select" required>
                                            <option selected>Pilih PIC mekanik</option>
                                            <!-- <option v-for=" in " :key="" :value="">{{  }}</option> -->
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="photo" class="form-label">Foto <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="photo" placeholder="Upload Foto" v-model="form.photo" required>
                                        <span class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/image.svg" width="20"></span>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="document" class="form-label">Dokumen <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="date" placeholder="Upload Dokumen" v-model="form.date" required>
                                        <span class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/doc.svg" width="20"></span>
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div>
                                        <label for="title" class="form-label">Komen</label>
                                        <textarea name="" id="" cols="30" class="form-control" rows="10">Masukkan komen</textarea>
                                    </div>
                                </BCol>
                                <BCol md="3">
                                    <div>
                                        <label for="title" class="form-label">Parameter Dimulai <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="title" placeholder="0" v-model="form.type_fleet" required>
                                    </div>
                                </BCol>
                                <BCol md="3">
                                    <div>
                                        <label for="title" class="form-label">Estimasi Biaya <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="title" placeholder="0" v-model="form.type_fleet" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="notification" class="form-label">Label Bebas<span class="text-danger">*</span></label>
                                        <select id="code-fleet" class="form-select" required>
                                            <option selected></option>
                                            <!-- <option v-for=" in " :key="" :value="">{{  }}</option> -->
                                        </select>
                                    </div>
                                </BCol>
                            </BRow>
                            
                        </BForm>
                    </BCardBody>
                </BCard>
            </BCol>
            <BCol xl="12">
                <div class="p-4 bg-white rounded-4">
                    <div class="d-flex flex-wrap justify-content-between py-lg-4">
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
                </div>
            </BCol>
        </BRow>
    </Layout>
</template>