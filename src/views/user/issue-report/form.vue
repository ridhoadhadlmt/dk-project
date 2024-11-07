<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";

export default {
    name: "program-maintenance-create",
    components: {
        Layout,
        HeaderPage
    },
    data() {
        return {
            
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
            priorities: [
                {label: 'Critical', value: 'critical'},
                {label: 'Hight', value: 'high'},
                {label: 'Medium', value: 'medium'},
                {label: 'Low', value: 'low'},
                {label: 'No Priority', value: 'nopriority'},
            ],
            data: [
                { id: 1, title: 'Lorem Ipsum', subtotal: "Rp.4.500.000"}
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
        }
    },
    watch: {
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
        <HeaderPage title="Program Maintenance" pageTitle="Program Maintenance" />

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
                                        <label for="referency" class="form-label">Referensi Form Inspeksi </label>
                                        <select id="referency" class="form-select" required>
                                            <option selected>Pilih refernsi form inspeksi</option>
                                            <!-- <option v-for=" in " :key="" :value="">{{  }}</option> -->
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="parameter" class="form-label">Parameter Keluhan <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="parameter" placeholder="Masukkan Parameter Keluhan" v-model="form.parameter" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="title" class="form-label">Judul Keluhan <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="title" placeholder="Masukkan Parameter Keluhan" v-model="form.title" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="priority" class="form-label">Prioritas <span class="text-danger">*</span></label>
                                        <select id="priority" class="form-select" required>
                                            <option selected>Pilih Prioritas</option>
                                            <option v-for="priority in priorities" :key="priority.label" :value="priority.value">{{ priority.label }}</option>
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="date" class="form-label">Tanggal & Jam Keluhan <span class="text-danger">*</span></label>
                                    <BRow>
                                        <BCol md="6">
                                            <input type="date" class="form-control">
                                        </BCol>
                                        <BCol md="6">
                                            <div class="input-group">
                                                <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Jam" v-model="form.date" required>
                                                <span class="input-group-text border-start-0 bg-transparent fs-22"><i class="bx bxs-time"></i></span>
                                            </div>
                                        </BCol>
                                    </BRow>
                                    <div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="priority" class="form-label">Operator Pelapor <span class="text-danger">*</span></label>
                                        <select id="priority" class="form-select" required>
                                            <option selected>Pilih operator pelapor</option>
                                            <!-- <option v-for=" in " :key="" :value="">{{  }}</option> -->
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="title" class="form-label">Lokasi Info Awal Keluhan <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="title" placeholder="Masukkan info awal keluhan" v-model="form.title" required>
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div>
                                        <label for="description" class="form-label">Deskripsi <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="description" placeholder="Masukkan deskripsi" v-model="form.description" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="date" class="form-label">Tanggal Harus Ditanggapi <span class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <input type="date" class="form-control" id="date" placeholder="Pilih tanggal" v-model="form.date" required>
                                            <!-- <input type="date" class="form-control border-end-0" id="date" placeholder="Pilih tanggal" v-model="form.date" required>
                                            <span class="input-group-text border-start-0 bg-transparent" id="date"><i class="bx bxs-calendar fs-22"></i></span> -->
                                        </div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="photo" class="form-label">Foto</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="photo" placeholder="Upload foto" v-model="form.photo" required>
                                            <span class="input-group-text bg-transparent" id="photo"><img src="@/assets/icons/image.svg" width="20"></span>
                                        </div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="document" class="form-label">Dokumen <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="date" placeholder="Upload Dokumen" v-model="form.date" required>
                                        <span class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/doc.svg" width="20"></span>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="priority" class="form-label">Label Bebas <span class="text-danger">*</span></label>

                                        <select id="priority" class="form-select" required>
                                            <option selected></option>
                                        </select>
                                    </div>
                                </BCol>
                            </BRow>
                            <div class="d-flex justify-content-end mt-4">
                                <router-link to="/program-maintenance">
                                    <BButton variant="light" class="me-2">Kembali</BButton>
                                </router-link>
                                <BButton type="submit" variant="primary">Simpan</BButton>
                            </div>
                        </BForm>
                    </BCardBody>
                </BCard>
            </BCol>
            
        </BRow>
    </Layout>
</template>