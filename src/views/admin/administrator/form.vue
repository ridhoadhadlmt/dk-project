<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";

export default {
    name: "administrator-management-create",
    components: {
        Layout,
        HeaderPage
    },
    data() {
        return {
            form: {
                fullName: "",
                email: "",
                phoneNumber: "",
                whatsappNumber: "",
                password: "",
                confirmPassword: "",
                profilePicture: "abc.jpg",
                isActive: true,
                roleId: null
            },
            roles: []
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
            if(this.form.password !== this.form.confirmPassword) {
                Swal.fire("Gagal!", "Password dan Konfirmasi Password tidak sama", "error");
                return;
            }

            if(this.$route.params.id) {
                axios.put(process.env.VUE_APP_API_URL + '/cms/v1/admins/' + this.$route.params.id, this.form).then(() => {
                    Swal.fire("Berhasil!", "Berhasil mengubah data", "success");
                    this.$router.push('/administrator-management');
                }).catch((error) => {
                    Swal.fire("Gagal!", "Gagal mengubah data", "error");
                    console.log(error);
                });
            } else {
                axios.post(process.env.VUE_APP_API_URL + '/cms/v1/admins', this.form).then(() => {
                    Swal.fire("Berhasil!", "Berhasil menambahkan data", "success");
                    this.$router.push('/administrator-management');
                }).catch((error) => {
                    Swal.fire("Gagal!", "Gagal menambahkan data", "error");
                    console.log(error);
                });
            }
        },

        fetchRoles() {
            axios.get(process.env.VUE_APP_API_URL + '/cms/v1/roles').then((response) => {
                this.roles = response.data.data.items;
            }).catch((error) => {
                console.log(error);
            });
        },

        fetchData() {
            if(this.$route.params.id) {
                axios.get(process.env.VUE_APP_API_URL + '/cms/v1/admins/' + this.$route.params.id).then((response) => {
                    this.form.fullName = response.data.data.fullName;
                    this.form.email = response.data.data.email;
                    this.form.phoneNumber = response.data.data.phoneNumber;
                    this.form.whatsappNumber = response.data.data.whatsappNumber;
                    this.form.password = '';
                    this.form.confirmPassword = '';
                    this.form.roleId = response.data.data.roleId;
                    this.form.isActive = response.data.data.isActive;
                }).catch((error) => {
                    console.log(error);
                });
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
        <HeaderPage title="Administrator" pageTitle="Admin" />

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
                                        <label for="name" class="form-label">Nama <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="name" v-model="form.fullName" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="nomor-telepon" class="form-label">Nomor Telepon <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="nomor-telepon" v-model="form.phoneNumber" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="nomor-whatsapp" class="form-label">Nomor Whatsapp <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="nomor-whatsapp" v-model="form.whatsappNumber" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                                        <input type="email" class="form-control" id="email" v-model="form.email" required>
                                    </div>
                                </BCol>
                                
                                <BCol md="6">
                                    <div>
                                        <label for="password" class="form-label">Password <span class="text-danger">*</span></label>
                                        <input type="password" class="form-control" id="password" v-model="form.password" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="confirm-password" class="form-label">Konfirmasi Password <span class="text-danger">*</span></label>
                                        <input type="password" class="form-control" id="confirm-password" v-model="form.confirmPassword" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="role" class="form-label">Role <span class="text-danger">*</span></label>
                                        <select id="role" class="form-select" v-model="form.roleId" required>
                                            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="status" class="form-label">Status <span class="text-danger">*</span></label>
                                    <BFormCheckbox id="customSwitchsizelg" switch checked class="form-switch-lg me-2" v-model="form.isActive" required></BFormCheckbox>
                                </BCol>
                            </BRow>
                            <div class="d-flex justify-content-end mt-4">
                                <router-link to="/administrator-management">
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