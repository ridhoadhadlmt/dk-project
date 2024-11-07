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
                duration: "",
                notification: "",
                assignment: "",
                isActive: true,
                roleId: null
            },
            options: [
                {text: 'Yes', value: 'yes'},
                {text: 'No', value: 'no'},
            ],
            duplicates: [
                {text: 'Yes', value: 'yes'},
                {text: 'No', value: 'no'},
            ],  
            assignments: [
                {text: 'Fleet', value: 'fleet'},
                {text: 'User', value: 'user'},
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
                                <BCol md="12">
                                    <div>
                                        <label for="title" class="form-label">Judul<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="title" placeholder="Masukkan nama " v-model="form.title" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="teknis" class="form-label">Duplikat dari inspection template lain <span class="text-danger">*</span></label>
                                        <BFormRadioGroup
                                        size="lg"
                                        
                                        v-model="formSelected"
                                        :options="duplicates"
                                        name="radio-options"
                                        />
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div>
                                        <label for="" class="form-label">Inspection dari template lain <span class="text-danger">*</span></label>
                                        <select id="" class="form-select"  required>
                                            <option selected>Pilih inspection template</option>
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div>
                                        <label for="notification" class="form-label">Deskripsi <span class="text-danger">*</span></label>
                                        <textarea name="" id="" class="form-control" cols="30" rows="10"></textarea>
                                    </div>
                                </BCol>
                                <hr>
                                <h4>Pertanyaan</h4>

                                <BCol md="12" class="mb-3">
                                    <div class="bg-light p-3 rounded-4">
                                        <BRow>
                                            <BCol md="1">
                                                <BButton variant="link" v-b-toggle.collapse-1><i class="bx bxs-down-arrow"></i></BButton>
                                            </BCol>
                                            <BCol md="10">
                                                <div>
                                                    <input type="text" class="form-control" id="title" placeholder="Masukkan judul pertanyaan " v-model="form.title" required>
                                                </div>
                                            </BCol>
                                            <BCol md="1">
                                                <BButton variant="light" class="rounded-circle" size="sm">
                                                    <img src="@/assets/icons/cancel.svg" width="12" alt="cancel" />
                                                </BButton>
                                            </BCol>
                                            <BCollapse id="collapse-1" class="mt-3">
                                                <BCol md="10" class="offset-1">
                                                    <BRow>
                                                        
                                                        <BCol md="6" class="mb-3">
                                                            <label for="">Jenis Jawaban</label>
                                                            <select id="" class="form-select"  required>
                                                                <option selected>Yes/No</option>
                                                            </select>
                                                        </BCol>
                                                        <BCol md="6" class="mb-3">
                                                            <label for="">Required</label>
                                                            <BFormRadioGroup
                                                            size="lg"
                                                            v-model="formSelected"
                                                            :options="options"
                                                            name="radio-options"
                                                            />
                                                        </BCol>
                                                        <BCol md="6" class="mb-3">
                                                            <label for="">Komen</label>
                                                            <BFormRadioGroup
                                                            size="lg"
                                                            v-model="formSelected"
                                                            :options="options"
                                                            name="radio-options"
                                                            />
                                                        </BCol>
                                                        <BCol md="6">
                                                            <label for="">Expected Jawaban</label>
                                                            <BFormRadioGroup
                                                            size="lg"
                                                            v-model="formSelected"
                                                            :options="options"
                                                            name="radio-options"
                                                            />
                                                        </BCol>
                                                        <BCol md="6">
                                                            <label for="">Raise Issue</label>
                                                            <BFormRadioGroup
                                                            size="lg"
                                                            v-model="formSelected"
                                                            :options="options"
                                                            name="radio-options"
                                                            />
                                                        </BCol>
                                                    </BRow>
                                                </BCol>
                                                
                                            </BCollapse>
                                        </BRow>
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div class="bg-light p-3 rounded-4">
                                        <BRow>
                                            <BCol md="1">
                                                <BButton variant="link" v-b-toggle.collapse-2><i class="bx bxs-down-arrow"></i></BButton>
                                            </BCol>
                                            <BCol md="10">
                                                <div>
                                                    <input type="text" class="form-control" id="title" placeholder="Masukkan judul pertanyaan " v-model="form.title" required>
                                                </div>
                                            </BCol>
                                            <BCollapse id="collapse-2" class="mt-3">
                                                <BCol md="10" class="offset-1">
                                                    <BRow>
                                                        
                                                        <BCol md="6" class="mb-3">
                                                            <label for="">Jenis Jawaban</label>
                                                            <select id="" class="form-select"  required>
                                                                <option selected>Free Text Number</option>
                                                            </select>
                                                        </BCol>
                                                        <BCol md="6" class="mb-3">
                                                            <label for="">Required</label>
                                                            <BFormRadioGroup
                                                            size="lg"
                                                            v-model="formSelected"
                                                            :options="options"
                                                            name="radio-options"
                                                            />
                                                        </BCol>
                                                        
                                                    </BRow>
                                                </BCol>
                                            </BCollapse>
                                            <BCol md="1">
                                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm">
                                                    <img src="@/assets/icons/cancel.svg" alt="cancel" />
                                                </BButton>
                                            </BCol>
                                        </BRow>
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div class="bg-light p-3 rounded-4">
                                        <BRow>
                                            <BCol md="1">
                                                <BButton variant="link" v-b-toggle.collapse-3><i class="bx bxs-down-arrow"></i></BButton>
                                            </BCol>
                                            <BCol md="10">
                                                <div>
                                                    <input type="text" class="form-control" id="title" placeholder="Masukkan judul pertanyaan " v-model="form.title" required>
                                                </div>
                                            </BCol>
                                            <BCollapse id="collapse-3" class="mt-3">
                                                <BCol md="10" class="offset-1">
                                                    <BRow>
                                                        <BCol md="6" class="mb-3">
                                                            <label for="">Jenis Jawaban</label>
                                                            <select id="" class="form-select"  required>
                                                                <option selected>Free Text</option>
                                                            </select>
                                                        </BCol>
                                                        <BCol md="6" class="mb-3">
                                                            <label for="">Required</label>
                                                            <BFormRadioGroup
                                                            size="lg"
                                                            v-model="formSelected"
                                                            :options="options"
                                                            name="radio-options"
                                                            />
                                                        </BCol>
                                                        
                                                    </BRow>
                                                </BCol>
                                            </BCollapse>
                                            <BCol md="1">
                                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm">
                                                    <img src="@/assets/icons/cancel.svg" alt="cancel" />
                                                </BButton>
                                            </BCol>
                                        </BRow>
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div class="bg-light p-3 rounded-4">
                                        <BRow>
                                            <BCol md="1">
                                                <BButton variant="link" v-b-toggle.collapse-4><i class="bx bxs-down-arrow"></i></BButton>
                                            </BCol>
                                            <BCol md="10">
                                                <div>
                                                    <input type="text" class="form-control" id="title" placeholder="Masukkan judul pertanyaan " v-model="form.title" required>
                                                </div>
                                            </BCol>
                                            <BCollapse id="collapse-4" class="mt-3">
                                                <BCol md="10" class="offset-1">
                                                    <BRow>
                                                        <BCol md="6" class="mb-3">
                                                            <label for="">Jenis Jawaban</label>
                                                            <select id="" class="form-select"  required>
                                                                <option selected>Multiple Select</option>
                                                            </select>
                                                        </BCol>
                                                        <BCol md="6" class="mb-3">
                                                            <label for="">Required</label>
                                                            <BFormRadioGroup
                                                            size="lg"
                                                            v-model="formSelected"
                                                            :options="options"
                                                            name="radio-options"
                                                            />
                                                        </BCol>
                                                        <BRow>
                                                            <BCol md="11" class="mb-3">
                                                                <div>
                                                                    <input type="text" class="form-control" id="title" placeholder="Masukkan jawaban" v-model="form.title" required>
                                                                </div>
                                                            </BCol>
                                                            <BCol md="1">
    
                                                            </BCol>
                                                        </BRow>
                                                        <BRow>
                                                            <BCol md="11" class="mb-3">
                                                                <div>
                                                                    <input type="text" class="form-control" id="title" placeholder="Masukkan jawaban" v-model="form.title" required>
                                                                </div>
                                                            </BCol>
                                                            <BCol md="1">
    
                                                            </BCol>
                                                        </BRow>
                                                    </BRow>
                                                </BCol>
                                            </BCollapse>
                                            <BCol md="1">
                                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm">
                                                    <img src="@/assets/icons/cancel.svg" alt="cancel" />
                                                </BButton>
                                            </BCol>
                                        </BRow>
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div class="bg-light p-3 rounded-4">
                                        <BRow>
                                            <BCol md="1">
                                                <BButton variant="link" v-b-toggle.collapse-5><i class="bx bxs-down-arrow"></i></BButton>
                                            </BCol>
                                            <BCol md="10">
                                                <div>
                                                    <input type="text" class="form-control" id="title" placeholder="Masukkan judul pertanyaan " v-model="form.title" required>
                                                </div>
                                            </BCol>
                                            <BCollapse id="collapse-5" class="mt-3">
                                                <BCol md="10" class="offset-1">
                                                    <BRow>
                                                        <BCol md="6" class="mb-3">
                                                            <label for="">Jenis Jawaban</label>
                                                            <select id="" class="form-select"  required>
                                                                <option selected>Single Choice</option>
                                                            </select>
                                                        </BCol>
                                                        <BCol md="6" class="mb-3">
                                                            <label for="">Required</label>
                                                            <BFormRadioGroup
                                                            size="lg"
                                                            v-model="formSelected"
                                                            :options="options"
                                                            name="radio-options"
                                                            />
                                                        </BCol>
                                                        <BRow>
                                                            <BCol md="11" class="mb-3">
                                                                <div>
                                                                    <input type="text" class="form-control" id="title" placeholder="Masukkan jawaban" v-model="form.title" required>
                                                                </div>
                                                            </BCol>
                                                            <BCol md="1">
    
                                                            </BCol>
                                                        </BRow>
                                                        <BRow>
                                                            <BCol md="11" class="mb-3">
                                                                <div>
                                                                    <input type="text" class="form-control" id="title" placeholder="Masukkan jawaban" v-model="form.title" required>
                                                                </div>
                                                            </BCol>
                                                            <BCol md="1">
    
                                                            </BCol>
                                                        </BRow>
                                                    </BRow>
                                                </BCol>
                                            </BCollapse>
                                            <BCol md="1">
                                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm">
                                                    <img src="@/assets/icons/cancel.svg" alt="cancel" />
                                                </BButton>
                                            </BCol>
                                        </BRow>
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div class="bg-light p-3 rounded-4">
                                        <BRow>
                                            <BCol md="1">
                                                <BButton variant="link" v-b-toggle.collapse-6><i class="bx bxs-down-arrow"></i></BButton>
                                            </BCol>
                                            <BCol md="10">
                                                <div>
                                                    <input type="text" class="form-control" id="title" placeholder="Masukkan judul pertanyaan " v-model="form.title" required>
                                                </div>
                                            </BCol>
                                            <BCollapse id="collapse-6" class="mt-3">
                                                <BCol md="10" class="offset-1">
                                                    <BRow>
                                                        <BCol md="6" class="mb-3">
                                                            <label for="">Jenis Jawaban</label>
                                                            <select id="" class="form-select"  required>
                                                                <option selected>Upload Foto</option>
                                                            </select>
                                                        </BCol>
                                                        <BCol md="6" class="mb-3">
                                                            <label for="">Required</label>
                                                            <BFormRadioGroup
                                                            size="lg"
                                                            v-model="formSelected"
                                                            :options="options"
                                                            name="radio-options"
                                                            />
                                                        </BCol>
                                                        
                                                    </BRow>
                                                </BCol>
                                            </BCollapse>
                                            <BCol md="1">
                                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm">
                                                    <img src="@/assets/icons/cancel.svg" alt="cancel" />
                                                </BButton>
                                            </BCol>
                                        </BRow>
                                    </div>
                                </BCol>
                                <h4>Penugasan</h4>
                                <BFormRadioGroup
                                size="lg"
                                v-model="formSelected"
                                :options="assignments"
                                name="radio-options"
                                />
                                <BCol md="6">
                                    <div>
                                        <label for="" class="form-label">Fleet</label>
                                        <select id="" class="form-select"  required>
                                            <option selected>Pilih fleet</option>
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="" class="form-label">Operator</label>
                                        <input type="text" class="form-control" name disabled placeholder="-">
                                    </div>
                                </BCol>
                                <h4 class="mb-3">Periode</h4>
                                <BRow>
                                    <BCol md="6">
                                        <div>
                                            <label for="" class="form-label">Periode<span class="text-danger">*</span></label>
                                            <select id="" class="form-select"  required>
                                                <option selected>Pilih periode</option>
                                            </select>
                                        </div>
                                    </BCol>
                                </BRow>
                                <BCol md="6">
                                    <label for="" class="form-label">Tanggal Mulai<span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.date" required>
                                        <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="" class="form-label">Tanggal Selesai<span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.date" required>
                                        <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
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