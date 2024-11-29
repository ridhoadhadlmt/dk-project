<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
    name: "program-maintenance-create",
    components: {
        Layout,
        HeaderPage,
        Multiselect,
        flatPickr,
    },
    data() {
        return {
            submitted: false,
            changePhoto: false,
            changeDocument: false,
            form: {
                fleetId: null,
                inspectionIds: [],
                complaintParameter: null,
                complaintTitle: null,
                priority: null,
                date: null,
                time: null,
                operatorId: null,
                location: null,
                description: null,
                finishDate: null,
                photo: null,
                document: null,
                tags: [],
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
            preview: {
                photo: null,
                document: null,
            },
            fleets: [],
            inspections: [],
            tags: ['Teknis', 'Non Teknis'],
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

        async submit() {
            this.submitted = true;
            let validData = true;

            for(let key in this.form) {
                if(this.form[key] == null) {
                    validData = false;
                    break;
                }
            }
            
            if(this.submitted && validData) {
                //update file first 
                let photo = null;
                let document = null;

                if(this.changePhoto) {
                    photo = await this.uploadFile(this.form.photo, 'photo');
                }

                if(this.changeDocument) {
                    document = await this.uploadFile(this.form.document, 'document');
                }

                if (photo || document) {
                    this.form.photo = photo;
                    this.form.document = document;
                }

                if(this.$route.params.id) {
                    const body = {
                        fleetId: this.form.fleetId,
                        inspectionIds: this.form.inspectionIds,
                        complaintParameter: this.form.complaintParameter,
                        complaintTitle: this.form.complaintTitle,
                        priority: this.form.priority,
                        date: this.form.date,
                        time: this.form.time,
                        operatorId: this.form.operatorId,
                        location: this.form.location,
                        description: this.form.description,
                        finishDate: this.form.finishDate,
                        photo: this.form.photo,
                        document: this.form.document,
                        tags: this.form.tags,
                    }
                    axios.put(process.env.VUE_APP_API_URL + '/v1/issues/' + this.$route.params.id, body).then(() => {
                        Swal.fire("Berhasil!", "Berhasil mengubah data", "success");
                        this.$router.push('/issue-report');
                    }).catch((error) => {
                        Swal.fire("Gagal!", "Gagal mengubah data", "error");
                        console.log(error);
                    });
                } else {
                    axios.post(process.env.VUE_APP_API_URL + '/v1/issues', this.form).then(() => {
                            Swal.fire("Berhasil!", "Berhasil menambahkan data", "success");
                            this.$router.push('/issue-report');
                        }).catch((error) => {
                            Swal.fire("Gagal!", "Gagal menambahkan data", "error");
                            console.log(error);
                        });
                }
            }
        },

        async uploadFile(file) {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(process.env.VUE_APP_API_URL + '/misc/upload', formData).catch(() => {
                Swal.fire("Gagal!", "Gagal mengupload file", "error");
                return false;
            });

            return  response.data.data.location;
        },

        fetchFleet() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/fleets').then((response) => {
                this.fleets = response.data.data.items;
            }).catch((error) => {
                console.log(error);
            });
        },
        fetchInspection() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/users').then((response) => {
                this.inspections = response.data.data.items;

            }).catch((error) => {
                console.log(error);
            });
        },

        fetchData() {
            if(this.$route.params.id) {
                axios.get(process.env.VUE_APP_API_URL + '/v1/issues/' + this.$route.params.id).then((response) => {
                    this.form = response.data.data;
                    this.preview.photo = response.data.data.photo;
                    this.preview.document = response.data.data.document;

                    this.form.inspectionIds = response.data.data.inspections.map(item => item.inspection.id);
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        fetchTags() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/tags').then((response) => {
                this.tags = response.data.data.items;
            }).catch((error) => {
                console.log(error);
            });
        },
        handleFileChange(event,type) {
            if(type == 'photo')
                this.changePhoto = true;
            else if(type == 'document')
                this.changeDocument = true;
            
            this.form[type] = event.target.files[0];
            this.preview[type] = URL.createObjectURL(event.target.files[0]);
        }

    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        this.fetchFleet();
        this.fetchInspection();
        this.fetchData();
        this.fetchTags();
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
                        <BForm id="createIssueForm" autocomplete="off" class="needs-validation" novalidate>
                            <BRow class="gy-4">
                                <BCol md="6">
                                    <div>
                                        <label for="code-fleet" class="form-label">Kode Fleet<span class="text-danger">*</span></label>
                                        <multiselect v-model="form.fleetId" 
                                            deselect-label="Can't remove this value"
                                            value-prop="id" 
                                            label="name" 
                                            placeholder="Select one" :options="fleets"
                                            :searchable="false" 
                                            :allow-empty="false">
                                        </multiselect>
                                        <div class="text-danger" v-if="submitted && !form.fleetId">Please select a fleet.</div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="referency" class="form-label">Referensi Form Inspeksi </label>
                                        <multiselect v-model="form.inspectionIds" deselect-label="Can't remove this value" mode="tags"
                                            value-prop="id" label="fullName" placeholder="Select one" :options="inspections"
                                            :searchable="false" :allow-empty="false">
                                            <template #singleLabel="{ option }"><strong>{{ option.fullName }}</strong></template>
                                        </multiselect>
                                        <div class="text-danger" v-if="submitted && !form.inspectionIds.length">Please select a inspection.</div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="parameter" class="form-label">Parameter Keluhan <span class="text-danger">*</span></label>
                                        <!-- <input type="text" class="form-control" id="parameter" placeholder="Masukkan Parameter Keluhan" v-model="form.complaintParameter" required> -->
                                        <input type="text" id="parameter-field" class="form-control" placeholder="Enter job title"
                                            v-model="form.complaintParameter" :class="{ 'is-invalid': submitted && !form.complaintParameter }" />
                                        <div class="invalid-feedback">Please enter a parameter.</div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="title" class="form-label">Judul Keluhan <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="title" placeholder="Masukkan Judul Keluhan" v-model="form.complaintTitle" :class="{ 'is-invalid': submitted && !form.complaintTitle }" />
                                        <div class="invalid-feedback">Please enter a title.</div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="priority" class="form-label">Prioritas <span class="text-danger">*</span></label>
                                        <multiselect v-model="form.priority" deselect-label="Can't remove this value"
                                            value-prop="value" label="label" placeholder="Select one" :options="priorities"
                                            :searchable="false" :allow-empty="false">
                                            <template #singleLabel="{ option }"><strong>{{ option.label }}</strong></template>
                                        </multiselect>
                                        <div class="text-danger" v-if="submitted && !form.priority">Please select a priority.</div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="date" class="form-label">Tanggal & Jam Keluhan <span class="text-danger">*</span></label>
                                    <BRow>
                                        <BCol md="6">
                                            <flat-pickr v-model="form.date" class="form-control" id="date" placeholder="Pilih Tanggal" :class="{ 'is-invalid': submitted && !form.date }" />
                                            <div class="text-danger" v-if="submitted && !form.date">Please select a date.</div>
                                        </BCol>
                                        <BCol md="6">
                                            <!-- <div class="input"> -->
                                                <input type="time" class="form-control" id="date" placeholder="Pilih Jam" v-model="form.time" :class="{ 'is-invalid': submitted && !form.time }" />
                                                <div class="text-danger" v-if="submitted && !form.time">Please select a time.</div>
                                                <!-- <span class="input-group-text border-start-0 bg-transparent fs-22"><i class="bx bxs-time"></i></span> -->
                                            <!-- </div> -->
                                        </BCol>
                                    </BRow>
                                    <div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="operator" class="form-label">Operator Pelapor <span class="text-danger">*</span></label>
                                        <multiselect v-model="form.operatorId" deselect-label="Can't remove this value"
                                            value-prop="id" label="fullName" placeholder="Select one" :options="inspections"
                                            :searchable="false" :allow-empty="false">
                                            <template #singleLabel="{ option }"><strong>{{ option.fullName }}</strong></template>
                                        </multiselect>
                                        <div class="text-danger" v-if="submitted && !form.operatorId">Please select a operator.</div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="title" class="form-label">Lokasi Info Awal Keluhan <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="title" placeholder="Masukkan info awal keluhan" v-model="form.location" :class="{ 'is-invalid': submitted && !form.location }" />
                                        <div class="text-danger" v-if="submitted && !form.location">Please enter a location.</div>
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div>
                                        <label for="description" class="form-label">Deskripsi <span class="text-danger">*</span></label>
                                        <!-- <input type="text" class="form-control" id="description" placeholder="Masukkan deskripsi" v-model="form.description" required> -->
                                        <textarea class="form-control" id="description" placeholder="Masukkan deskripsi" v-model="form.description" :class="{ 'is-invalid': submitted && !form.description }"></textarea>
                                        <div class="text-danger" v-if="submitted && !form.description">Please enter a description.</div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="date" class="form-label">Tanggal Harus Ditanggapi <span class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <flat-pickr v-model="form.finishDate" class="form-control" id="date" placeholder="Pilih tanggal" :class="{ 'is-invalid': submitted && !form.finishDate }"></flat-pickr>
                                            
                                            <!-- <input type="date" class="form-control border-end-0" id="date" placeholder="Pilih tanggal" v-model="form.date" required>
                                            <span class="input-group-text border-start-0 bg-transparent" id="date"><i class="bx bxs-calendar fs-22"></i></span> -->
                                        </div>
                                        <div class="text-danger" v-if="submitted && !form.finishDate">Please select a date.</div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="photo" class="form-label">Foto <span class="text-danger">*</span></label>
                                         <div class="input-group">
                                            <BFormFile v-model="form.photo" @change="handleFileChange($event,'photo')"></BFormFile>
                                            <span class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/image.svg" width="20"></span>
                                        </div>
                                        <a :href="preview.photo" target="_blank" class="text-primary mt-2 text-decoration-underline" v-if="preview.photo">Lihat Foto</a>
                                        <div class="text-danger" v-if="submitted && !form.photo">Please select a photo.</div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="document" class="form-label">Dokumen <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <BFormFile v-model="form.document" @change="handleFileChange($event,'document')"></BFormFile>
                                        <span class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/doc.svg" width="20"></span>
                                    </div>
                                    <a :href="preview.document" target="_blank" class="text-primary mt-2 text-decoration-underline" v-if="preview.document">Lihat Dokumen</a>
                                    <div class="text-danger" v-if="submitted && !form.document">Please select a document.</div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="tags" class="form-label">Label Bebas <span class="text-danger">*</span></label>

                                        <Multiselect v-model="form.tags" mode="tags"
                                            :close-on-select="false" :searchable="true" :create-option="true" 
                                            :options="tags" value-prop="tag" label="tag"/>
                                        <div class="text-danger" v-if="submitted && !form.tags.length">Please select a tag.</div>
                                    </div>
                                </BCol>
                            </BRow>
                            <div class="d-flex justify-content-end mt-4">
                                <router-link to="/issue-report">
                                    <BButton variant="light" class="me-2">Kembali</BButton>
                                </router-link>
                                <BButton variant="primary" type="button" @click="submit">Simpan</BButton>
                            </div>
                        </BForm>
                    </BCardBody>
                </BCard>
            </BCol>
            
        </BRow>
    </Layout>
</template>