<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";

export default {
    name: "fleet-management-create",
    components: {
        Layout,
        HeaderPage
    },
    data() {
        return {
            form: {
                photo: "",
                email: "",
                phoneNumber: "",
                whatsappNumber: "",
                password: "",
                confirmPassword: "",
                profilePicture: "abc.jpg",
                isActive: true,
                roleId: null
            },
            roles: [],
            ownerships : [
                {text: 'Milik Sendiri', value: ''},
                {text: 'Financing', value: ''},
            ],
            bbm_types : [
                {text: 'Solar', value: 'solar'},
                {text: 'Bensin', value: 'bensin'},
            ],
            fleet_types : [
                {label: 'Fleet 1', value: 'fleet1'},
                {label: 'Fleet 2', value: 'fleet2'},
            ],
            parameters: [
                {label: 'Odometer', value: 'odometer'}
            ],
            operators: [
                {label: 'Operator 1', value: 'operator1'},
                {label: 'Operator 2', value: 'operator2'},

            ],
            programs: [
                {label: 'Program 1', value: 'program1'},
                {label: 'Program 2', value: 'program2'},

            ],
            bbmTypeSelected: false,
            ownershipSelected: false,
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
                    this.$router.push('/fleet-management');
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
            // axios.get(process.env.VUE_APP_API_URL + '/cms/v1/roles').then((response) => {
            //     this.roles = response.data.data.items;
            // }).catch((error) => {
            //     console.log(error);
            // });
        },

        fetchData() {
            // if(this.$route.params.id) {
            //     axios.get(process.env.VUE_APP_API_URL + '/cms/v1/admins/' + this.$route.params.id).then((response) => {
            //         this.form.fullName = response.data.data.fullName;
            //         this.form.email = response.data.data.email;
            //         this.form.phoneNumber = response.data.data.phoneNumber;
            //         this.form.whatsappNumber = response.data.data.whatsappNumber;
            //         this.form.password = '';
            //         this.form.confirmPassword = '';
            //         this.form.roleId = response.data.data.roleId;
            //         this.form.isActive = response.data.data.isActive;
            //     }).catch((error) => {
            //         console.log(error);
            //     });
            // }
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
        <HeaderPage title="Fleet Management" pageTitle="Fleet Management" />

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
                                        <label for="name" class="form-label">Foto Profil <span class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="photo" placeholder="Upload Foto" v-model="form.photo" required>
                                            <span class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/image.svg" width="20"></span>
                                        </div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="name_fleet" class="form-label">Nama Fleet <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="name_fleet" placeholder="Masukkan nama fleet" v-model="form.phoneNumber" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="type-fleet" class="form-label">Tipe Fleet <span class="text-danger">*</span></label>
                                        <select id="type-fleet" class="form-select" v-model="form.roleId" required>
                                            <option>Pilih tipe fleet</option>
                                            <option v-for="fleet_type in fleet_types" :key="fleet_type.label" :value="fleet_type.value">{{ fleet_type.name }}</option>
                                        </select>
                                    </div>
                                </BCol> 
                                <BCol md="6">
                                    <div>
                                        <label for="vin-sn" class="form-label">VIN/SN <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="vin-sn" placeholder="Masukkan VIN/SN" v-model="form.vinsn" required>
                                    </div>
                                </BCol>
                                
                                <BCol md="6">
                                    <div>
                                        <label for="code-fleet" class="form-label">Kode Fleet <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="code-fleet" placeholder="Masukkan kode fleet" v-model="form.code_fleet" required>
                                    </div>
                                </BCol>
                                
                                <BCol md="6">
                                    <div>
                                        <label for="status" class="form-label">Status <span class="text-danger">*</span></label>
                                        <select id="role" class="form-select" v-model="form.roleId" required>
                                            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                                        </select>
                                    </div>
                                </BCol>
                                
                                <BCol md="6">
                                    <div>
                                        <label for="year" class="form-label">Tahun <span class="text-danger">*</span></label>
                                        <select id="role" class="form-select" v-model="form.roleId" required>
                                            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="brand" class="form-label">Merek <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="brand" placeholder="Masukkan merek" v-model="form.code_fleet" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="brand" class="form-label">Parameter Terbaru <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="brand" placeholder="Masukkan merek" v-model="form.code_fleet" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="parameter" class="form-label">Parameter <span class="text-danger">*</span></label>
                                        <select id="parameter" class="form-select" v-model="form.parameter" required>
                                            <option v-for="parameter in parameters" :key="parameter.label" :value="parameter.value">{{ parameter.label }}</option>
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="capacity" class="form-label">Kapasitas Tangki <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="0" aria-label="capacity" aria-describedby="capacity">
                                        <span class="input-group-text" id="capacity">ltr</span>
                                    </div>
                                </BCol>
                                <hr>
                                

                                <h3>Umum</h3>
                                <BCol md="6">
                                    <BRow>
                                        <label for="dimensi" class="form-label">Dimensi </label>                                        <BCol md="4">
                                            <div>
                                                <div class="input-group">
                                                    <input type="text" class="form-control border-end-0" id="width" placeholder="Lebar" v-model="form.code_fleet" required>
                                                    <div class="input-group-text bg-transparent border-start-0">
                                                        <span>m</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </BCol>
                                        <BCol md="4">
                                            <div>
                                                <div class="input-group">
                                                    <input type="text" class="form-control border-end-0" id="width" placeholder="Lebar" v-model="form.code_fleet" required>
                                                    <div class="input-group-text bg-transparent border-start-0">
                                                        <span>m</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </BCol>
                                        <BCol md="4">
                                            <div>
                                                <div class="input-group">
                                                    <input type="text" class="form-control border-end-0" id="width" placeholder="Lebar" v-model="form.code_fleet" required>
                                                    <div class="input-group-text bg-transparent border-start-0">
                                                        <span>m</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </BCol>
                                    </BRow>
                                </BCol>

                                <BCol md="6">
                                    <div>
                                        <label for="width" class="form-label">Berat </label>
                                        <input type="text" class="form-control" id="width" placeholder="0 kg" v-model="form.code_fleet" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="efficiency" class="form-label">Efesiensi BBM (berdasarkan buku manual faktur) <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="0" aria-label="efficiency" aria-describedby="efficiency">
                                        <span class="input-group-text" id="efficiency">km/ltr</span>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="efficiency" class="form-label">Tipe BBM <span class="text-danger">*</span></label>
                                    <BFormRadioGroup
                                    size="lg"
                                    
                                    v-model="bbmTypeSelected"
                                    :options="bbm_types"
                                    name="radio-options"
                                    />
                                </BCol>
                                

                                <BCol md="6">
                                    <div>
                                        <label for="transmisi" class="form-label">Transmisi </label>
                                        <input type="text" class="form-control" id="transmisi" placeholder="Masukkan transmisi" v-model="form.code_fleet" required>
                                    </div>
                                </BCol>
                                <hr>
                                <BCol md="12">
                                    <div>
                                        <label for="transmisi" class="form-label">Spesifikasi tambahan </label>
                                        <textarea name="" id="" class="form-control" cols="30" rows="10"></textarea>
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div>
                                        <label for="notes" class="form-label">Notes</label>
                                        <textarea name="" id="" class="form-control" cols="30" rows="10"></textarea>
                                    </div>
                                </BCol>

                                <h3>Operasional</h3>
                                <BCol md="6">
                                    <div>
                                        <label for="operator" class="form-label">Operator <span class="text-danger">*</span></label>
                                        <select id="operator" class="form-select" v-model="form.roleId" required>
                                            <option v-for="operator in operators" :key="operator.label" :value="operator.value">{{ operator.label }}</option>
                                        </select>
                                    </div>
                                </BCol>

                                <BCol md="6">
                                    <div>
                                        <label for="role" class="form-label">Label Bebas <span class="text-danger">*</span></label>
                                        <select id="role" class="form-select" v-model="form.roleId" required>
                                            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                                        </select>
                                    </div>
                                </BCol>

                                <BCol md="6">
                                    <div>
                                        <label for="program-management" class="form-label">Program Maintenance <span class="text-danger">*</span></label>
                                        <div class="mb-3">
                                            <select id="program-management" class="form-select" required>
                                                <option v-for="program in programs" :key="program.label" :value="program.value">{{ program.label }}</option>
                                            </select>
                                        </div>
                                        <div>
                                            <select id="program-management" class="form-select" required>
                                                <option v-for="program in programs" :key="program.label" :value="program.value">{{ program.label }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="starting-point" class="form-label">Starting Point <span class="text-danger">*</span></label>
                                        <div class="d-flex justify-content-between mb-3">
                                            <input type="text" class="form-control" placeholder="0 km" aria-label="starting-point" aria-describedby="starting-point">
                                            <div class="d-flex align-items-center">
                                                <BButton variant="link"><i class="bx bxs-copy fs-22"></i></BButton>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <input type="text" class="form-control" placeholder="0 km" aria-label="starting-point" aria-describedby="starting-point">
                                            <div class="d-flex align-items-center">
                                                <BButton variant="link"><i class="bx bxs-copy fs-22"></i></BButton>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <BButton variant="link" class="p-1 d-flex align-items-center rounded-circle bg-light"><i class="bx bx-x fs-22"></i></BButton>
                                            </div>
                                        </div>
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div>
                                        <label for="attachment" class="form-label">Attachment <span class="text-danger">*</span></label>
                                        <div class="mb-3 d-flex justify-content-between">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="date" placeholder="Upload attachment" v-model="form.date" required>
                                                <span class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/doc.svg" width="20"></span>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <BButton variant="link"><i class="bx bxs-copy fs-22"></i></BButton>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <BButton variant="link" class="p-1 d-flex align-items-center rounded-circle bg-light"><i class="bx bx-x fs-22"></i></BButton>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="date" placeholder="Upload attachment" v-model="form.date" required>
                                                <span class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/doc.svg" width="20"></span>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <BButton variant="link"><i class="bx bxs-copy fs-22"></i></BButton>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <BButton variant="link" class="p-1 d-flex align-items-center rounded-circle bg-light"><i class="bx bx-x fs-22"></i></BButton>
                                            </div>
                                        </div>
                                        
                                        <!-- <div class="grid gap-3">
                                            <div class="g-col-12"><input type="file" class="form-control" id="attachment" required></div>
                                            <div class="g-col-12"><input type="file" class="form-control" id="attachment" required></div>
                                        </div> -->
                                        
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="project-location" class="form-label">Lokasi Proyek <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="project-location" placeholder="Masukkan lokasi proyek" required>
                                    </div>
                                </BCol>
                                <hr>
                                <h3>Finance</h3>
                                <BCol md="6">
                                    <div>
                                        <label for="attachment" class="form-label">Harga Pembelian <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="attachment" placeholder="Rp 0" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="efficiency" class="form-label">Kepemilikan <span class="text-danger">*</span></label>
                                    <BFormRadioGroup
                                    size="lg"
                                    
                                    v-model="ownershipSelected"
                                    :options="ownerships"
                                    name="radio-options"
                                    />
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="attachment" class="form-label">Uang Muka <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="attachment" placeholder="Rp 0" required>
                                    </div>
                                </BCol>
                                <BCol md="3">
                                    <div>
                                        <label for="first-payment-date" class="form-label">First Payment Date <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" id="first-payment-date" required>
                                    </div>
                                </BCol>
                                <BCol md="3">
                                    <div>
                                        <label for="end-payment-date" class="form-label">End Payment Date <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" id="end-payment-date" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="tenor" class="form-label">Tenor <span class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <input type="text" class="form-control w-75" placeholder="0 km" aria-label="tenor" aria-describedby="tenor">
                                            <select name="" id="" class="form-select">
                                                <option value="">Kali</option>
                                                <option value="">Bulan</option>
                                            </select>
                                        </div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="nominal" class="form-label">Nominal Pembayaran <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="nominal" placeholder="Rp 0" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="tenor" class="form-label">Tenor <span class="text-danger">*</span></label>
                                        <select name="" id="" class="form-select">
                                            <option value="">Kali</option>
                                            <option value="">Bulan</option>
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="payment-date" class="form-label">Payment Date <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" id="payment-date"  required>
                                    </div>
                                </BCol>
                                <BCol md="3">
                                    <div>
                                        <label for="payment-date" class="form-label">First Payment Date <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" id="payment-date" placeholder="Rp 0" required>
                                    </div>
                                </BCol>
                                <BCol md="3">
                                    <div>
                                        <label for="payment-date" class="form-label">End Payment Date <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" id="payment-date" placeholder="Rp 0" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="payment-date" class="form-label">Estimasi Umur <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="payment-date" placeholder="0" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="terminal-value" class="form-label">Terminal Value <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="terminal-value" placeholder="0" required>
                                    </div>
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