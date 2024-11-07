<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";

export default {
    name: "inspection-template-create",
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
                    title: 'Kode Template',
                    key: 'code_template',
                    show: true,
                    order:true
                },
                {
                    title: 'Kode Inspection',
                    key: 'code_inspection',
                    show: true,
                    order:true
                },
                {
                    title: 'Penugasan',
                    key: 'assignment',
                    show: true,
                    order:true
                },
                {
                    title: 'Fleet',
                    key: 'fleet',
                    show: true,
                    order:true
                },
                {
                    title: 'Periode',
                    key: 'period',
                    show: true,
                    order:true
                },
                {
                    title: 'Tanggal Penugasan',
                    key: 'date_assignment',
                    show: true,
                    order:true
                },
                {
                    title: 'Status',
                    key: 'status',
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
                {label: 'Teknis', value: 'teknis'},
                {label: 'Non Teknis', value: 'nonteknis'},
            ],
            answers: [
                {text: 'Yes', value: 'yes'},
                {text: 'No', value: 'no'},
            ],
            uses: [
                {text: 'Minggu Lalu', value: 'last_week'},
                {text: 'Bulan Lalu', value: 'last_month'},
                {text: 'Tahun Lalu', value: 'last_year'},
                {text: 'Tidak Pernah', value: 'never'},
            ],
            services: [
                {item: 'Layanan A', name: 'Layanan A'},
                {item: 'Layanan B', name: 'Layanan B'},
                {item: 'Layanan C', name: 'Layanan C'},
                {item: 'Layanan D', name: 'Layanan D'},
            ],
            data: [
                { id: 1, title: 'Lorem Ipsum', code_template: "INS001", assignment: 'Lorem ipsum',fleet: 'Lorem ipsum', periode: 'Harian', date_assignment: '01 Juni 2024',status: 'Sudah Dikerjakan'}
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
                    this.$router.push('/inspection-response');
                }).catch((error) => {
                    Swal.fire("Gagal!", "Gagal mengubah data", "error");
                    console.log(error);
                });
            } else {
                axios.post(process.env.VUE_APP_API_URL + '/cms/v1/admins', this.form).then(() => {
                    Swal.fire("Berhasil!", "Berhasil menambahkan data", "success");
                    this.$router.push('/inspection-response');
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
        <HeaderPage title="Inspection Response" pageTitle="Inspection Response" />

        <BRow>
            <BCol xl="12">
                <BCard no-body title="Kuesioner">
                    <!-- <BCardHeader>
                        
                    </BCardHeader> -->

                    <BCardBody>
                        <BCardSubtitle>K1</BCardSubtitle>
                        <BCardTitle>Kuesioner 1</BCardTitle>
                        <BCardText>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione velit placeat itaque expedita fugiat optio amet reiciendis quibusdam dignissimos consectetur assumenda earum temporibus eligendi nihil tempore, deleniti facere odio ab.</BCardText>
                    </BCardBody>
                </BCard>
            </BCol>
            <BCol xl="12">
                <BCard>
                    <BCardTitle>Pertanyaan</BCardTitle>
                    <BCardBody>
                        <BForm>
                            <BCol md="12" class="mb-3">
                                <div class="bg-light p-3 rounded-4">
                                    <label for="" class="mb-3">Apakah anda puas dengan layanan kami?</label>
                                    <BFormRadioGroup
                                        size="lg"
                                        v-model="answerSelected"
                                        :options="answers"
                                        name="radio-options"/>
                                </div>
                            </BCol>
                            <BCol md="12" class="mb-3">
                                <div class="bg-light p-3 rounded-4">
                                    <label for="" class="mb-3">Bagaimana pendapat anda tentang layanan kami? <span class="text-danger">*</span></label>
                                    <textarea name="" class="form-control" id="" cols="30" rows="4">Tuliskan jawaban anda</textarea>
                                </div>
                            </BCol>
                            <BCol md="12" class="mb-3">
                                <div class="bg-light p-3 rounded-4">
                                    <label for="" class="mb-3">Dari 1-10 berapa anda menilai layanan kami? <span class="text-danger">*</span></label>
                                    <textarea name="" class="form-control" id="" cols="30" rows="4">Tuliskan jawaban anda</textarea>
                                </div>
                            </BCol>
                            <BCol md="12" class="mb-3">
                                <div class="bg-light p-3 rounded-4">
                                    <label for="" class="mb-3">Layanan apa yang paling anda sukai? <span class="text-danger">*</span></label>
                                    <BFormCheckboxGroup
                                        v-model="serviceSelected"
                                        :options="services"
                                        value-field="item"
                                        text-field="name"
                                        disabled-field="notEnabled"
                                    />
                                </div>

                            </BCol>
                            <BCol md="12" class="mb-3">
                                <div class="bg-light p-3 rounded-4">
                                    <label for="" class="mb-3">Kapan terakhir kali anda menggunakan layanan kami? <span class="text-danger">*</span></label>
                                    <BFormRadioGroup
                                        size="lg"
                                        v-model="useSelected"
                                        :options="uses"
                                        name="radio-options"/>
                                </div>
                            </BCol>
                            <BCol md="12">
                                <div class="bg-light p-3 rounded-4">
                                    <label for="" class="mb-3">Silahkan upload foto kendaraan anda? <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="date" placeholder="Upload Dokumen" v-model="form.date" required>
                                        <span class="input-group-text bg-white fs-22"><img src="@/assets/icons/doc.svg" width="20"></span>
                                    </div>
                                </div>

                            </BCol>
                            <div class="d-flex justify-content-end mt-4">
                                <router-link to="/inspection-response">
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