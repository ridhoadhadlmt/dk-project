<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import HeaderPage from "@/components/header-page.vue";
import axios from "axios";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

export default {
    name: "program-maintenance-create",
    components: {
        Layout,
        HeaderPage,
        Multiselect
    },
    data() {
        return {
            id: this.$route.params.id,
            inspections: [],
            datas: null,
            showModalPhoto: false,
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

        getData() {
            axios.get(process.env.VUE_APP_API_URL + "/v1/issues/" + this.$route.params.id)
                .then(response => {
                    this.datas = response.data.data;
                    this.inspections = response.data.data.inspections.map(item => item.inspection);

                    this.datas.inspectionIds = response.data.data.inspections.map(item => item.inspection.id);

                })
                .catch(error => {
                    console.log(error);
                });
        },

        downloadDocument() {
            window.open(this.datas.document, '_blank');
        }
    },
    mounted() {
        this.getData();
        window.addEventListener("resize", this.resizerightcolumn);
    },
    computed: {
        finishDate() {
            return this.$filters.formatDate(this.datas.finishDate);
        }
    }

};
</script>

<template>
    <Layout>
        <HeaderPage title="Issue Report" pageTitle="Issue Report" />    

        <!-- Show Photo -->
        <BModal v-model="showModalPhoto" hide-footer hide-header-close centered  class="v-modal-custom" size="sm" no-body>
            <div class="text-center">
                <img :src="datas.photo" alt="photo" class="img-fluid" v-if="datas">
            </div>
        </BModal>

        <BRow v-if="datas">
            <BCol xl="12">
                <BCard>
                    <BCardBody>
                        <BRow>
                            <BCol md="6" class="mb-4">
                                <h5 class="text-muted mb-2">Kode Issue</h5>
                                <input type="text" class="form-control" :value="datas.issueCode" disabled />
                            </BCol>
                            <BCol md="6" class="mb-4">
                                <h5 class="text-muted mb-2">Kode Fleet</h5>
                                <input type="text" class="form-control" :value="datas.fleet?.code" disabled />
                            </BCol>
                            <BCol md="6" class="mb-4">
                                <h5>Referensi Form Inspeksi</h5>
                                <Multiselect 
                                    :options="inspections" value-prop="id" label="fullName" v-model="datas.inspectionIds" mode="tags" :disabled="true"></Multiselect>
                            </BCol>
                            <BCol md="6" class="mb-4">  
                                <h5 class="text-muted mb-2">Parameter Keluhan</h5>
                                <input type="text" class="form-control" :value="datas.complaintParameter" disabled />
                            </BCol>

                            <BCol md="6" class="mb-4">  
                                <h5 class="text-muted mb-2">Judul Keluhan</h5>
                                <input type="text" class="form-control" :value="datas.complaintTitle" disabled />
                            </BCol>

                            <BCol md="6" class="mb-4">  
                                <h5 class="text-muted mb-2">Prioritas</h5>
                                <input type="text" class="form-control" :value="datas.priority" disabled />
                            </BCol>

                            <BCol md="6" class="mb-4">  
                                <h5 class="text-muted mb-2">Tanggal & Jam keluhan</h5>
                                <input type="text" class="form-control" :value="datas.date + ' ' + datas.time" disabled />
                            </BCol>

                            <BCol md="6" class="mb-4">  
                                <h5 class="text-muted mb-2">Operator Pelapor</h5>
                                <input type="text" class="form-control" :value="datas.operator.fullName" disabled />
                            </BCol>
                            <BCol md="6" class="mb-4">  
                                <h5 class="text-muted mb-2">Lokasi Info Awal Keluhan</h5>
                                <input type="text" class="form-control" :value="datas.location" disabled />
                            </BCol>
                            <BCol md="6" class="mb-4">  
                                <h5 class="text-muted mb-2">Deskripsi</h5>
                                <input type="text" class="form-control" :value="datas.location" disabled />
                            </BCol>
                            <BCol md="6" class="mb-4">  
                                <h5 class="text-muted mb-2">Tanggal Harus Diselesaikan</h5>
                                <input type="text" class="form-control" :value="finishDate" disabled />
                            </BCol>

                            <BCol md="6" class="mb-4">  
                                <h5 class="text-muted mb-2">Foto</h5>
                                <button class="btn btn-primary btn-sm" @click="showModalPhoto = true">Lihat Foto</button>
                            </BCol>
                            <BCol md="6" class="mb-4">  
                                <h5 class="text-muted mb-2">Dokumen</h5>
                                <button class="btn btn-primary btn-sm" @click="downloadDocument">Download Dokumen</button>
                            </BCol>

                            <BCol md="6" class="mb-4">  
                                <h5 class="text-muted mb-2">Label Bebas</h5>
                                <Multiselect :options="datas.tags" :label="tags" v-model="datas.tags" multiple mode="tags" :disabled="true"></Multiselect>
                            </BCol>

                            <BCol md="6" class="mb-4">  
                                <h5 class="text-muted mb-2">Alasan Reject</h5>
                                <input type="text" class="form-control" :value="datas.rejectReason" disabled />
                            </BCol>
                        </BRow>
                    </BCardBody>

                    <BCardFooter>   
                        <div class="d-flex justify-content-end">
                            <a :href="`/issue-report/edit/${id}`" class="btn btn-light">Edit</a>
                        </div>
                    </BCardFooter>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>