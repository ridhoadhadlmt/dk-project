<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import "@vueform/multiselect/themes/default.css";
import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";

export default {
    name: "administrator-management-create",
    components: {
        Layout,
        HeaderPage,
    },
    data() {
        return {
            form: {
                full_name: '',
                email: '',
                phone_number: '',
                whatsapp_number: '',
                role_id: '',
                password: '',
            },
            role: [],
            errors: [],
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
        getRole() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/roles',{params:{isActive:true}}).then((response) => {
                this.role = response.data.data.items;
            });
        },


        submitForm() {
            
            const body = {
                fullName: this.form.full_name,
                email: this.form.email,
                phoneNumber: this.form.phone_number,
                whatsappNumber: this.form.whatsapp_number,
                roleId: this.form.role_id,
                password: this.form.password,
            }


            if (this.$route.params.id) {
                axios.put(process.env.VUE_APP_API_URL + '/v1/users/' + this.$route.params.id, body).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'User berhasil diubah',
                    });

                    this.$router.push('/user-management');
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'User gagal diubah',
                    });
                });
            } else {
                axios.post(process.env.VUE_APP_API_URL + '/v1/users', body).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'User berhasil ditambahkan',
                    });

                    this.$router.push('/user-management');
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'User gagal ditambahkan',
                    });
                });
            }
        },

        getUser() {
            if(this.$route.params.id) {
                axios.get(process.env.VUE_APP_API_URL + '/v1/users/' + this.$route.params.id).then((response) => {
                    this.form.full_name = response.data.data.fullName;
                    this.form.email = response.data.data.email;
                    this.form.phone_number = response.data.data.phoneNumber;
                    this.form.whatsapp_number = response.data.data.whatsappNumber;
                    this.form.role_id = response.data.data.roleId;
                });
            }
        },

    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);  
        this.getRole();
        this.getUser();
    }

};
</script>

<template>
    <Layout>
        <HeaderPage :title="$route.meta.title" :description="$route.meta.description" />

        <BRow>
            <BCol xl="12">
                <BCard no-body>
                    <!-- <BCardHeader>
                        
                    </BCardHeader> -->

                    <BCardBody>
                        <form @submit.prevent="submitForm">
                            <!-- <BForm> -->
                            <BRow class="gy-4">
                                <BCol md="6">
                                    <div>
                                        <label for="name" class="form-label">Nama Lengkap <span
                                                class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="name" v-model="form.full_name" required
                                            placeholder="Masukan nama">
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="phone" class="form-label">Nomor Handphone <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="phone" v-model="form.phone_number" required placeholder="Masukan nomor handphone">
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="whatsapp" class="form-label">Nomor WhatsApp <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="whatsapp" v-model="form.whatsapp_number" required placeholder="Masukan nomor WhatsApp">
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                                        <input type="email" class="form-control" id="email" v-model="form.email" required placeholder="Masukan email">
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="role" class="form-label">Role <span class="text-danger">*</span></label>
                                        <select class="form-control" id="role" v-model="form.role_id" required>
                                            <option value="" disabled selected>Pilih role</option>
                                            <option v-for="item in role" :value="item.id" :key="item.id">{{ item.name }}</option>
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="password" class="form-label">Password <span class="text-danger">*</span></label>
                                        <input type="password" class="form-control" id="password" v-model="form.password" required placeholder="Masukan password">
                                    </div>
                                </BCol>
                                
                            </BRow>


                            <div class="d-flex justify-content-end mt-4">
                                <router-link to="/role-management">
                                    <BButton variant="light" class="me-2">Kembali</BButton>
                                </router-link>
                                <BButton type="submit" variant="primary">Submit</BButton>
                            </div>
                        </form>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>