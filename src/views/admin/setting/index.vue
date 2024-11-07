<script>

import "flatpickr/dist/flatpickr.css";

import Layout from "@/layouts/main.vue";
import HeaderPage from "@/components/header-page.vue";
import axios from "axios";

export default {
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
                    show: true
                },
                {
                    title: 'Nama Paket',
                    key: 'package_name',
                    show: true
                },
                {
                    title: 'Deskripsi Paket',
                    key: 'package_description',
                    show: true
                },
                {
                    title: 'Masa Aktif Paket',
                    key: 'package_duration',
                    show: true
                },
                {
                    title: 'Kuota User',
                    key: 'user_quota',
                    show: true
                },
                {
                    title: 'Harga Paket',
                    key: 'package_price',
                    show: true
                },
                {
                    title: 'Status',
                    key: 'status',
                    show: true
                },
                {
                    title: 'Action',
                    key: 'action',
                    show: true
                }
            ],
            data: [

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
        getSetting(){
            axios.get(process.env.VUE_APP_API_URL + '/cms/v1/settings').then(() => {

            }).catch((error) => {
                console.log(error);
            });
        }
    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
    }

};
</script>

<template>
    <Layout>
        <SelectHeader :showModal="showSelectHeader" :headers="headers" @hideModal="hideSelectHeaderMethod" @selectHeader="selectHeaderMethod" />
        
        <HeaderPage title="Setting" />

        <BRow>
            <BCol xl="12">
                <BCard>
                    <p class="text-muted mb-0">
                        <i>Setting diterapkan untuk client secara global</i>
                    </p>

                    <BRow class="mt-3">
                        <BCol md="6">
                            <label for="status" class="form-label">OTP Via Email</label>
                            <BFormCheckbox id="customSwitchsizelg" switch checked class="form-switch-lg me-2"></BFormCheckbox>
                        </BCol>

                        <BCol md="6">
                            <label for="status" class="form-label">OTP Via Whatsapp</label>
                            <BFormCheckbox id="customSwitchsizelg" switch checked class="form-switch-lg me-2"></BFormCheckbox>
                        </BCol>
                    </BRow>
                    <div class="d-flex justify-content-end mt-4">
                        <BButton type="submit" variant="primary">Submit</BButton>
                    </div>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>