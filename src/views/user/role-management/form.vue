<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";

export default {
    name: "administrator-management-create",
    components: {
        Layout,
        Multiselect,
        HeaderPage,
    },
    data() {
        return {
            form: {
                name: "",
                value: [],
                isActive: true,
                menus: [],
            },
            menu: [],
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

        getMenu() {
            axios.get(process.env.VUE_APP_API_URL + '/misc/menus',{
                params: {
                    type: 'user',
                }
            }).then((response) => {
                this.menu = response.data.data;
                this.menu.forEach(menu => {
                    this.form.menus[menu.id] = {
                        menuId: menu.id,
                        permission: [],
                    };
                });
            }).finally(() => {
                console.log('done', this.form.menus);
                this.getRole(this.$route.params.id);
            }).catch((error) => {
                console.log(error);
            });
        },
        validateForm() {
            // this.errors = this.form.menus.map((menu) => {
            //     return menu.permission.length === 0; // Set to true if empty
            // });

            // if (!this.errors.includes(true)) {
                // Jika tidak ada error, submit form
                this.submit();
            // }
        },

        submit() {
            
            const body = {
                name: this.form.name,
                isActive: this.form.isActive,
                menus: this.form.menus.map(menu => {
                    return {
                        menuId: menu.menuId,
                        permissions: menu.permission,
                    }
                }).filter(menu => menu.permissions && menu.permissions.length > 0),
            }


            if (this.$route.params.id) {
                axios.put(process.env.VUE_APP_API_URL + '/v1/roles/' + this.$route.params.id, body).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Role berhasil diubah',
                    });

                    this.$router.push('/role-management');
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Role gagal diubah',
                    });
                });
            } 
        },
        getRole(id) {
            if (this.$route.params.id) {
                axios.get(process.env.VUE_APP_API_URL + '/v1/roles/' + id).then((response) => {
                    this.form.name = response.data.data.name;
                    this.form.isActive = response.data.data.isActive;
                    
                    response.data.data.menus.forEach(menu => {
                        if(this.form.menus[menu.menuId]) {
                            this.form.menus[menu.menuId].permission = menu.permission;
                        }
                    });
                }).catch((error) => {
                    console.log(error);
                });
            }


        },

    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        this.getMenu();
        // this.getRole(this.$route.params.id);
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
                        <form @submit.prevent="validateForm">
                            <!-- <BForm> -->
                            <BRow class="gy-4">
                                <BCol md="6">
                                    <div>
                                        <label for="name" class="form-label">Nama Role <span
                                                class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="name" v-model="form.name" require
                                            placeholder="Masukan nama">
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="status" class="form-label">Status</label>
                                    <BFormCheckbox id="customSwitchsizelg" switch checked class="form-switch-lg me-2"
                                        v-model="form.isActive"></BFormCheckbox>
                                </BCol>
                            </BRow>
                            <hr>

                            <BRow class="gy-4" v-if="menu.length > 0">
                                <h5 class="mb-0 ">Permission</h5>

                                <BCol md="6" v-for="(menu, idx) in menu" :key="menu.id">
                                    <div>
                                        <label for="dashboard" class="form-label">{{ menu.name }} <span
                                                class="text-danger">*</span></label>
                                        <div v-if="form.menus[menu.id]">
                                            <Multiselect v-model="form.menus[menu.id].permission" mode="tags"
                                            :close-on-select="false" :searchable="true" :create-option="true"
                                            :options="menu.permissions"/>
                                        </div>


                                        <span v-if="errors[idx]" class="text-danger">
                                            {{ menu.name }} permissions are required.
                                        </span>
                                    </div>

                                </BCol>
                            </BRow>



                            <div class="d-flex justify-content-end mt-4">
                                <router-link to="/role-management">
                                    <BButton variant="light" class="me-2">Kembali</BButton>
                                </router-link>
                                <BButton type="submit" variant="primary">Submit</BButton>
                            </div>
                            <!-- </BForm> -->
                        </form>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>