<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import Swal from "sweetalert2";
import axios from "axios";
import HeaderPage from "@/components/header-page.vue";

export default {
    components: {
        Layout,
        HeaderPage
    },
    data() {
        return {
            dataUser: JSON.parse(localStorage.getItem('userdata')),
            showTab: 'ringkasan',
            imageUrl:'',
            showPasswordOld: false,
            showPasswordNew: false,
            showPasswordRenew: false,
            form: {
                fullName: '',
                phoneNumber: '',
                whatsappNumber: '',
                email: '',
                role: '',
            },
            
            formChangePassword: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            }
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

        hideModalDeleteMethod() {
            this.showModalDelete = false;
        },

        togglePasswordOld() {
            this.showPasswordOld = !this.showPasswordOld;
        },

        togglePasswordNew() {
            this.showPasswordNew = !this.showPasswordNew;
        },

        togglePasswordRenew() {
            this.showPasswordRenew = !this.showPasswordRenew;
        },


        submit() {
            axios.put(process.env.VUE_APP_API_URL + '/cms/v1/me', this.form).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Profile berhasil diubah',
                })
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Profile gagal diubah',
                })
            })
        },

        submitChangePassword(){
            axios.put(process.env.VUE_APP_API_URL + '/cms/v1/me/change-password', this.formChangePassword).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Password berhasil diubah',
                })
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                })
            })
        }

    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        this.form.fullName = this.dataUser.fullName;
        this.form.phoneNumber = this.dataUser.phoneNumber;
        this.form.whatsappNumber = this.dataUser.whatsappNumber;
        this.form.email = this.dataUser.email;
        this.form.role = this.dataUser.role;

    }

};
</script>

<template>
    <Layout>

        <HeaderPage title="Subscription Management" />

        <BRow>
            <BCol xl="12">
                <BCard no-body>
                    <BCardBody>
                        <BRow>
                            <BCol xl="2">
                                <img src="@/assets/images/users/avatar-1.jpg" alt="user-img"
                                    class="img-thumbnail rounded-circle" height="150" width="150" />
                            </BCol>
                            <BCol xl="6" v-if="dataUser">
                                <h3>{{ dataUser.fullName }}</h3>
                                <h5 class="text-muted"><i class="ri-mail-line"></i> {{ dataUser.email }}</h5>

                                <!-- Labels Example -->
                                <div class="d-flex align-items-spa justify-content-between mt-4 mb-0">
                                    <p class="text-muted fs-14">Penyelesaian Profile</p>
                                    <b class="">25%</b>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar bg-success" role="progressbar" style="width: 25%;"
                                        aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </BCol>
                            <BCol xl="4">   
                                <BCard class="bg-light">

                                    <BCardBody >
                                        <h5 class="">My Subscription</h5>
                                        <div class="d-flex justify-content-between">
                                            <h6>Valid Sampai</h6>
                                            <h6>2024-12-31</h6>
                                        </div>
                                    </BCardBody>
                                </BCard>
                            </BCol>
                        </BRow>
                    </BCardBody>
                    <BCardFooter>
                        <BButton variant="link" class="btn btn-link" @click="showTab = 'ringkasan'">Ringkasan</BButton>
                        <!-- <BButton variant="link" class="btn btn-link" @click="showTab = 'pengaturan'">Pengaturan
                        </BButton> -->
                        <BButton variant="link" class="btn btn-link" @click="showTab = 'keamanan'">Keamanan</BButton>
                    </BCardFooter>
                </BCard>
            </BCol>
        </BRow>

        <BRow>
            <BCol xl="12" v-if="showTab == 'ringkasan'">
                <BCard no-body>
                    <BCardHeader>
                        <h4>Profile Lengkap</h4>
                    </BCardHeader>
                    <BCardBody>
                        <table class="table table-borderless w-50">
                            <tbody>
                                <tr>
                                    <td>
                                        <h5 class="text-muted">Nama Lengkap</h5>
                                    </td>
                                    <td>
                                        <h5>{{ dataUser.fullName }}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5 class="text-muted">Nomor Telpon</h5>
                                    </td>
                                    <td>
                                        <h5>{{ dataUser.phoneNumber }}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5 class="text-muted">Nomor Whatsapp</h5>
                                    </td>
                                    <td>
                                        <h5>{{ dataUser.whatsappNumber }}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5 class="text-muted">Email</h5>
                                    </td>
                                    <td>
                                        <h5>{{ dataUser.email }}</h5>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <h5 class="text-muted">Role</h5>
                                    </td>
                                    <!-- TODO -->
                                    <td>
                                        <h5>{{ dataUser.email }}</h5>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </BCardBody>
                </BCard>
            </BCol>

            <BCol xl="12" v-if="showTab == 'pengaturan'">
                <BCard no-body>
                    <form @submit.prevent="submit">
                        <BCardHeader>
                            <h4>Ubah Profile</h4>
                        </BCardHeader>
                        <BCardBody>


                            <BRow>
                                <BCol md="4">
                                    <h4>Ubah Profile</h4>
                                </BCol>
                                <BCol md="8">
                                    <div class="">
                                        <div class="profile-user position-relative d-inline-block mx-auto mb-0">
                                            <img src="@/assets/images/users/avatar-1.jpg"
                                                class=" avatar-xl img-thumbnail user-profile-image"
                                                alt="user-profile-image" />
                                            <div class="avatar-xs p-0 profile-photo-edit">
                                                <input id="profile-img-file-input" type="file"
                                                    class="profile-img-file-input" @change="onFilePicked"/>
                                                <label for="profile-img-file-input"
                                                    class="profile-photo-edit avatar-xs">
                                                    <span class="avatar-title  bg-light text-body">
                                                        <i class="ri-camera-fill"></i>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <p><span class="text-muted mb-0">Ekstensi file yang diizinkan: jpg, jpeg,
                                                png</span></p>
                                    </div>
                                </BCol>
                            </BRow>

                            <BRow class="mt-3">
                                <BCol md="4">
                                    <h4>Nama Lengkap <span class="text-danger">*</span></h4>
                                </BCol>
                                <BCol md="8">
                                    <input type="text" class="form-control" placeholder="Nama Lengkap"
                                        v-model="form.fullName" />
                                </BCol>
                            </BRow>

                            <BRow class="mt-3">

                                <BCol md="4">
                                    <h4>Nomor Telepon <span class="text-danger">*</span></h4>
                                </BCol>
                                <BCol md="8">
                                    <input type="number" class="form-control" placeholder="Nomor Telepon"
                                        v-model="form.phoneNumber" />
                                </BCol>
                            </BRow>

                            <BRow class="mt-3">

                                <BCol md="4">
                                    <h4>Nomor Whatsapp <span class="text-danger">*</span></h4>
                                </BCol>
                                <BCol md="8">
                                    <input type="number" class="form-control" placeholder="Nomor Whatsapp"
                                        v-model="form.whatsappNumber" />
                                </BCol>
                            </BRow>

                            <BRow class="mt-3">

                                <BCol md="4">
                                    <h4>Email <span class="text-danger">*</span></h4>
                                </BCol>
                                <BCol md="8">
                                    <input type="text" class="form-control" placeholder="Email" v-model="form.email" />
                                </BCol>
                            </BRow>

                            <BRow class="mt-3">
                                <BCol md="4">
                                    <h4>Role <span class="text-danger">*</span></h4>
                                </BCol>
                                <BCol md="8">
                                    <input type="text" class="form-control" placeholder="Role" v-model="form.role"
                                        disabled />
                                </BCol>
                            </BRow>


                        </BCardBody>

                        <BCardFooter class="d-flex justify-content-end">
                            <BButton variant="light" class="me-2" size="lg">Batal</BButton>
                            <BButton variant="primary" size="lg" type="submit">Simpan</BButton>
                        </BCardFooter>

                    </form>

                </BCard>
            </BCol>

            <BCol xl="12" v-if="showTab == 'keamanan'">
                <BCard no-body>
                    <form @submit.prevent="submitChangePassword">
                        <BCardHeader>
                            <h4>Ubah Password</h4>
                        </BCardHeader>
                        <BCardBody>
                            <BRow>
                                <BCol md="4">
                                    <div data-mdb-input-init class="form-outline mb-4">
                                        <label class="form-label" for="form2Example28">Password Lama <span class="text-danger"></span></label>
                                        <div class="form-outline mb-4 position-relative">
                                            <input :type="showPasswordOld ? 'text' : 'password'" v-model="formChangePassword.oldPassword"
                                                id="form2Example28" class="form-control form-control-lg" />

                                            <!-- Eye Icon -->
                                            <i :class="showPasswordOld ? 'ri-eye-line' : 'ri-eye-off-line'" @click="togglePasswordOld"
                                                style="position: absolute; right: 15px; top: 15px; cursor: pointer;"></i>
                                        </div>
                                    </div>
                                </BCol>

                                <BCol md="4">
                                    <div data-mdb-input-init class="form-outline mb-4">
                                        <label class="form-label" for="form2Example28">Password Baru <span class="text-danger"></span></label>
                                        <div class="form-outline mb-4 position-relative">
                                            <input :type="showPasswordNew ? 'text' : 'password'" v-model="formChangePassword.newPassword"
                                                id="form2Example28" class="form-control form-control-lg" />

                                            <!-- Eye Icon -->
                                            <i :class="showPasswordNew ? 'ri-eye-line' : 'ri-eye-off-line'" @click="togglePasswordNew"
                                                style="position: absolute; right: 15px; top: 15px; cursor: pointer;"></i>
                                        </div>
                                    </div>
                                </BCol>

                                <BCol md="4">
                                    <div data-mdb-input-init class="form-outline mb-4">
                                        <label class="form-label" for="form2Example28">Konfirmasi Password Baru <span class="text-danger"></span></label>
                                        <div class="form-outline mb-4 position-relative">
                                            <input :type="showPasswordRenew ? 'text' : 'password'" v-model="formChangePassword.confirmPassword"
                                                id="form2Example28" class="form-control form-control-lg" />

                                            <!-- Eye Icon -->
                                            <i :class="showPasswordRenew ? 'ri-eye-line' : 'ri-eye-off-line'" @click="togglePasswordRenew"
                                                style="position: absolute; right: 15px; top: 15px; cursor: pointer;"></i>
                                        </div>
                                    </div>
                                </BCol>
                            </BRow>
                        </BCardBody>

                        <BCardFooter class="d-flex justify-content-end">
                            <BButton variant="primary" size="lg" type="submit">Update Password</BButton>
                        </BCardFooter>

                    </form>

                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>