<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
    name: "administrator-management-create",
    components: {
        Layout,
    },
    data() {
        return {
            id: this.$route.params.id || null,
            form: {
                name: "",
                maxUsers: "",
                price: "",
                description: "",
                activePeriod: "",
                isActive: true

            },
        };
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
            if(this.$route.params.id) {
                const body = {
                    name: this.form.name,
                    maxUsers: this.form.maxUsers,
                    price: this.form.price,
                    description: this.form.description,
                    activePeriod: this.form.activePeriod,
                    isActive: this.form.isActive
                }
                axios.put(process.env.VUE_APP_API_URL + '/cms/v1/packages/' + this.$route.params.id, body).then(() => {
                    Swal.fire("Berhasil!", "Berhasil mengubah data", "success");
                    this.$router.push('/subscription-management');
                }).catch((error) => {
                    Swal.fire("Gagal!", "Gagal mengubah data", "error");
                    console.log(error);
                });
            } else {
                axios.post(process.env.VUE_APP_API_URL + '/cms/v1/packages', this.form).then(() => {
                    Swal.fire("Berhasil!", "Berhasil menambahkan data", "success");
                    this.$router.push('/subscription-management');
                }).catch(error => {
                    Swal.fire("Gagal!", "Gagal menambahkan data", "error");
                    console.log(error);
                });
            }
        },

        fetchData() {
            if(this.$route.params.id) {
                axios.get(process.env.VUE_APP_API_URL + '/cms/v1/packages/' + this.$route.params.id).then((response) => {
                    this.form = response.data.data;
                }).catch((error) => {
                    console.log(error);
                });
            }
        },

    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        this.fetchData();
    }

};
</script>

<template>
    <Layout>
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
                                        <label for="nama_paket" class="form-label">Nama Paket <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="nama_paket" v-model="form.name">
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="kuota_user" class="form-label">Kuota User <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" id="kuota_user" v-model="form.maxUsers">
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="harga_paket" class="form-label">Harga Paket <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" id="harga_paket" v-model="form.price">
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div>
                                        <label for="deskripsi_paket" class="form-label">Deskripsi Paket <span class="text-danger">*</span></label>
                                        <textarea class="form-control" id="deskripsi_paket" v-model="form.description"></textarea>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="masa_aktif_paket" class="form-label">Masa Aktif Paket <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" id="masa_aktif_paket" v-model="form.activePeriod">
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="status" class="form-label">Status</label>
                                    <BFormCheckbox id="customSwitchsizelg" switch checked class="form-switch-lg me-2" v-model="form.isActive"></BFormCheckbox>
                                </BCol>
                            </BRow>



                            <div class="d-flex justify-content-end mt-4">
                                <router-link to="/subscription-management">
                                    <BButton variant="light" class="me-2">Kembali</BButton>
                                </router-link>
                                <BButton type="submit" variant="primary">Submit</BButton>
                            </div>
                        </BForm>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>