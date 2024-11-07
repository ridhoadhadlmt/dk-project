<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: "administrator-management-create",
    components: {
        Layout,
    },
    data() {
        return {
            provinces: [],
            cities: [],
            districts: [],
            businessSectors: [],
            businessTypes: [],
            form: {
                name: "",
                companyCode: "",
                address: "",
                phoneNumber: "",
                whatsappNumber: "",
                fax: "",
                npwp: "",
                siteLink: "",
                businessTypeId: "",
                sectorId: "",
                salesName: "",
                picName: "",
                picJobTitle: "",
                provinceId: "",
                cityId: "",
                subdistrictId: "",
                villageId: 1,
                postcode: "",
                totalVehicle: "",
                status: "",
                trialExpired: null
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
        getProvince() {
            axios.get(process.env.VUE_APP_API_URL + '/misc/provinces').then((res) => {
                console.log(res.data.data);
                this.provinces = res.data.data;
            });
        },
        getCity(provinceId) {
            axios.get(process.env.VUE_APP_API_URL + '/misc/cities?provinceId=' + provinceId).then((res) => {
                this.cities = res.data.data;
            });
        },
        getDistrict(cityId) {
            axios.get(process.env.VUE_APP_API_URL + '/misc/districts?cityId=' + cityId).then((res) => {
                this.districts = res.data.data;
            });
        },

        getSector() {
            axios.get(process.env.VUE_APP_API_URL + '/misc/sectors').then((res) => {
                this.businessSectors = res.data.data;
            });
        },

        getBusinessType() {
            axios.get(process.env.VUE_APP_API_URL + '/misc/business-types').then((res) => {
                this.businessTypes = res.data.data;
            });
        },

        submit() {
            if(this.$route.params.id) {
                const body = {
                    name: this.form.name,
                    companyCode: this.form.companyCode,
                    address: this.form.address,
                    phoneNumber: this.form.phoneNumber,
                    whatsappNumber: this.form.whatsappNumber,
                    fax: this.form.fax,
                    npwp: this.form.npwp,
                    siteLink: this.form.siteLink,
                    businessTypeId: this.form.businessTypeId,
                    sectorId: this.form.sectorId,
                    salesName: this.form.salesName,
                    picName: this.form.picName,
                    picJobTitle: this.form.picJobTitle,
                    provinceId: this.form.provinceId,
                    cityId: this.form.cityId,
                    subdistrictId: this.form.subdistrictId,
                    villageId: this.form.villageId,
                    postcode: this.form.postcode,
                    totalVehicle: this.form.totalVehicle,
                    status: this.form.status,
                    trialExpired: this.form.trialExpired
                }
                
                axios.put(process.env.VUE_APP_API_URL + '/cms/v1/clients/' + this.$route.params.id, body).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Data berhasil diupdate',
                    });
                    this.$router.push('/client-management');
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Data gagal diupdate',
                    });
                });
            } else{
                axios.post(process.env.VUE_APP_API_URL + '/cms/v1/clients', this.form).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Data berhasil disimpan',
                    });
                    this.$router.push('/client-management');
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Data gagal disimpan',
                    });
                });
            }
        },

        getClient() {
            if(this.$route.params.id) {
                axios.get(process.env.VUE_APP_API_URL + '/cms/v1/clients/' + this.$route.params.id).then((res) => {
                    this.form = res.data.data;
                }).then(() => {
                    this.getProvince();
                    this.getCity(this.form.provinceId);
                    this.getDistrict(this.form.cityId);
                });
            }
        }

    },
    mounted() {
        this.getProvince();
        this.getBusinessType();
        this.getSector();
        this.getClient();
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
                        <form @submit.prevent="submit">
                            <!-- <BForm> -->
                                <BRow class="gy-4">
                                    <BCol md="6">
                                        <div>
                                            <label for="nama_usaha" class="form-label">Nama Usaha <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="nama_usaha" v-model="form.name">
                                        </div>
                                    </BCol>
                                    <BCol md="6">
                                        <div>
                                            <label for="kode_perusahaan" class="form-label">Kode Perusahaan <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="kode_perusahaan" v-model="form.companyCode">
                                        </div>
                                    </BCol>
                                    <BCol md="6">
                                        <div>
                                            <label for="alamat_usaha" class="form-label">Alamat Usaha <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="alamat_usaha" v-model="form.address">
                                        </div>
                                    </BCol>
                                    <BCol md="6">
                                        <div>
                                            <label for="nomor_telepon_usaha" class="form-label">Nomor Telepon Usaha <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="nomor_telepon_usaha" v-model="form.phoneNumber">
                                        </div>
                                    </BCol>
                                    <BCol md="6">
                                        <div>
                                            <label for="nomor_whatsapp_usaha" class="form-label">Nomor Whatsapp Usaha <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="nomor_whatsapp_usaha" v-model="form.whatsappNumber">
                                        </div>
                                    </BCol>
                                    <BCol md="6">
                                        <div>
                                            <label for="nomor_fax_usaha" class="form-label">Nomor Fax Usaha <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="nomor_fax_usaha" v-model="form.fax">
                                        </div>
                                    </BCol>
                                    <BCol md="6">
                                        <div>
                                            <label for="nomor_npwp" class="form-label">Nomor NPWP <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="nomor_npwp" v-model="form.npwp">
                                        </div>
                                    </BCol>
                                    <BCol md="6">
                                        <div>
                                            <label for="link_situs" class="form-label">Link Situs <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="link_situs" v-model="form.siteLink">
                                        </div>
                                    </BCol>
                                    <BCol md="6">
                                        <div>
                                            <label for="sektor_usaha" class="form-label">Sektor Usaha <span class="text-danger">*</span></label>
                                            <BFormSelect v-model="form.sectorId" class="mb-3" aria-label="Default select example">
                                                <BFormSelectOption :value="null">Select your Business Sector</BFormSelectOption>
                                                <BFormSelectOption v-for="sector in businessSectors" :key="sector.id" :value="sector.id">{{ sector.name }}</BFormSelectOption>
                                            </BFormSelect>
                                        </div>
                                    </BCol>
                                    <BCol md="6">
                                        <div>
                                            <label for="jenis_usaha" class="form-label">Jenis Usaha <span class="text-danger">*</span></label>
                                            <BFormSelect v-model="form.businessTypeId" class="mb-3" aria-label="Default select example">
                                                <BFormSelectOption :value="null">Select your Business Type</BFormSelectOption>
                                                <BFormSelectOption v-for="businessType in businessTypes" :key="businessType.id" :value="businessType.id">{{ businessType.name }}</BFormSelectOption>
                                            </BFormSelect>
                                        </div>
                                    </BCol>
                                    <BCol md="6">
                                        <div>
                                            <label for="nama_sales" class="form-label">Nama Sales <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="nama_sales" v-model="form.salesName">
                                        </div>
                                    </BCol>
                                    <BCol md="6">
                                        <div>
                                            <label for="nama_pic" class="form-label">Nama PIC <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="nama_pic" v-model="form.picName">
                                        </div>
                                    </BCol>
                                    <BCol md="6">
                                        <div>
                                            <label for="job_title_pic" class="form-label">Job Title PIC <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="job_title_pic" v-model="form.picJobTitle">
                                        </div>
                                    </BCol>

                                    <BCol md="6">
                                        <BRow>
                                            <BCol md="6"><div>
                                                    <label for="provinsi" class="form-label">Provinsi <span class="text-danger">*</span></label>
                                                    <BFormSelect v-model="form.provinceId" class="mb-3" aria-label="Default select example" @change="getCity(form.provinceId)">
                                                        <BFormSelectOption :value="null">Select your Province</BFormSelectOption>
                                                        <BFormSelectOption v-for="province in provinces" :key="province.id" :value="province.id">{{ province.name }}</BFormSelectOption>
                                                    </BFormSelect>
                                                </div>
                                            </BCol>

                                            <BCol md="6"><div>
                                                    <label for="kota" class="form-label">Kota/Kab <span class="text-danger">*</span></label>
                                                    <BFormSelect v-model="form.cityId" class="mb-3" aria-label="Default select example" @change="getDistrict(form.cityId)">
                                                        <BFormSelectOption :value="null">Select your City</BFormSelectOption>
                                                        <BFormSelectOption v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</BFormSelectOption>
                                                    </BFormSelect>
                                                </div>
                                            </BCol>
                                        </BRow>
                                    </BCol>

                                    <BCol md="6">
                                        <BRow>
                                            <BCol md="6"><div>
                                                    <label for="provinsi" class="form-label">Kec <span class="text-danger">*</span></label>
                                                    <BFormSelect v-model="form.subdistrictId" class="mb-3" aria-label="Default select example">
                                                        <BFormSelectOption :value="null">Select your District</BFormSelectOption>
                                                        <BFormSelectOption v-for="district in districts" :key="district.id" :value="district.id">{{ district.name }}</BFormSelectOption>
                                                    </BFormSelect>
                                                </div>
                                            </BCol>

                                            <BCol md="6"><div>
                                                    <label for="kota" class="form-label">Kode Pos <span class="text-danger">*</span></label>
                                                    <input type="text" class="form-control" id="kode_pos" v-model="form.postcode">
                                                </div>
                                            </BCol>
                                        </BRow>
                                    </BCol>

                                    <BCol md="6">
                                        <label for="status">Armada Yang Dimiliki</label>
                                        <div class="d-flex gap-2">
                                            <BFormGroup class="mb-2">
                                                <BFormRadio v-model="form.totalVehicle" value="1" name="flexRadioDefault" id="flexRadioDefault1" class="form-check-input-lg">1-10</BFormRadio>
                                            </BFormGroup>
                                            <BFormGroup class="mb-2">
                                                <BFormRadio v-model="form.totalVehicle" value="11" name="flexRadioDefault" id="flexRadioDefault2" class="form-check-input-lg">11-20</BFormRadio>
                                            </BFormGroup>
                                            <BFormGroup class="mb-2">
                                                <BFormRadio v-model="form.totalVehicle" value="20" name="flexRadioDefault" id="flexRadioDefault3" class="form-check-input-lg">>20</BFormRadio>
                                            </BFormGroup>
                                        </div>
                                    </BCol>

                                    <BCol md="6"><div>
                                            <label for="status_subcription" class="form-label">Status Subcription <span class="text-danger">*</span></label>
                                            <BFormSelect v-model="form.status" class="mb-3" aria-label="Default select example">
                                                <BFormSelectOption :value="null">Select your Status</BFormSelectOption>
                                                <BFormSelectOption value="active">active</BFormSelectOption>
                                                <BFormSelectOption value="suspend">Suspend</BFormSelectOption>
                                                <BFormSelectOption value="trial">Trial</BFormSelectOption>
                                            </BFormSelect>
                                        </div>
                                    </BCol>
                                </BRow>



                                <div class="d-flex justify-content-end mt-4">
                                    <router-link to="/client-management">
                                        <BButton variant="light" class="me-2">Kembali</BButton>
                                    </router-link>
                                    <BButton type="submit" variant="primary" >Submit</BButton>
                                </div>
                            <!-- </BForm> -->
                        </form>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>