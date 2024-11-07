<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";

export default {
    name: "administrator-management-create",
    components: {
        Layout,
    },
    data() {
        return {
            form: {
                nama_usaha: "",
                kode_perusahaan: "",
                alamat_usaha: "",
                nomor_telepon_usaha: "",
                nomor_whatsapp_usaha: "",
                nomor_fax_usaha: "",
                nomor_npwp: "",
                link_situs: "",
                sektor_usaha: "",
                jenis_usaha: "",
                nama_sales: "",
                nama_pic: "",
                job_title_pic: "",
                status: true
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

    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
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
                        <BForm>
                            <BRow class="gy-4">
                                <BCol md="6">
                                    <div>
                                        <label for="nama_usaha" class="form-label">Nama Usaha <i>*</i></label>
                                        <input type="text" class="form-control" id="nama_usaha">
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="status">Opsi Paket</label>
                                    <div class="d-flex gap-2">
                                        <BFormGroup class="mb-2">
                                            <BFormRadio v-model="radio1" size="lg" value="ckecked" name="flexRadioDefault" id="flexRadioDefault1" class="form-check-input-lg">Baru</BFormRadio>
                                        </BFormGroup>
                                        <BFormGroup class="mb-2">
                                            <BFormRadio v-model="radio1" size="lg" value="default" name="flexRadioDefault" id="flexRadioDefault2" class="form-check-input-lg">Ganti Paket</BFormRadio>
                                        </BFormGroup>
                                        <BFormGroup class="mb-2">
                                            <BFormRadio v-model="radio1" size="lg" value="default" name="flexRadioDefault" id="flexRadioDefault3" class="form-check-input-lg">Add Member</BFormRadio>
                                        </BFormGroup>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="nama_paket" class="form-label">Nama Paket <i>*</i></label>
                                        <input type="text" class="form-control" id="nama_paket">
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="masa_aktif" class="form-label">Masa Aktif <i>*</i></label>
                                        <input type="text" class="form-control" id="masa_aktif">
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="tanggal_transaksi" class="form-label">Tanggal Transaksi <i>*</i></label>
                                        <input type="date" class="form-control" id="tanggal_transaksi">
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="harga" class="form-label">Harga <i>*</i></label>
                                        <input type="number" class="form-control" id="harga">
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="status">Status Pembayaran</label>
                                    <div class="d-flex gap-2">
                                        <BFormGroup class="mb-2">
                                            <BFormRadio v-model="radio1" value="ckecked" size="lg" name="flexRadioDefault" id="flexRadioDefault1" class="form-check-input-lg">Menunggu Persetujuan</BFormRadio>
                                        </BFormGroup>
                                        <BFormGroup class="mb-2">
                                            <BFormRadio v-model="radio1" size="lg" value="default" name="flexRadioDefault" id="flexRadioDefault2" class="form-check-input-lg">Menunggu Pemabyaaran</BFormRadio>
                                        </BFormGroup>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="bukti_pembayaran" class="form-label">Bukti Pembayaran <i>*</i></label>
                                        <input type="file" class="form-control" id="bukti_pembayaran">
                                    </div>
                                </BCol>
                            </BRow>



                            <div class="d-flex justify-content-end mt-4">
                                <router-link to="/transaction-report">
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