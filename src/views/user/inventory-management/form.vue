<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";

export default {
    name: "inventory-management-create",
    components: {
        Layout,
        HeaderPage
    },
    data() {
        return {
            form: {
                name: "",
                description: "",
                photo: null,
                document: null,
                merk: "",
                partNumber: "",
                upc: "",
                unit: "",
                price: "",
                stock: "",

            },
            types: [
                {text : 'Tools', value: 'tools'},
                {text : 'Spare Part', value: 'sparepart'},
            ],
            formSelected: 'tools',
            successAddModal: false,
        };
    },
    watch: {
    },
    methods: {
        saveAndAdd(){
            axios.post(process.env.VUE_APP_API_URL, + '/v1/inventories', this.form, {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCQwVk1ONUR4QllYallDb0xERG9Udm9PeDl2L2NiZDBxcnZzSDBML090bTdtN2NMR3BpYjQxNiIsImlhdCI6MTczMDk0NzA1NSwiZXhwIjoxNzMxMTE5ODU1LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.9r5YorohwZjTHK9_rZHhAk9bwe7Q8FZB_BH9hHXHI0ryPMIcLGZADqGfdQDXN1FMl1Q1YtGKifQBvq28sHkxiw'
                }
            }).then(()=> {
                this.successAddModal = true
                Swal.fire("Berhasil!", "Berhasil menambah data", "success");
                this.$router.push('/inventory-management');
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal menambah data", "error");
                console.log(err)
            })
        },
        saveData(){
            axios.post(process.env.VUE_APP_API_URL, + '/v1/inventories', {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCQwVk1ONUR4QllYallDb0xERG9Udm9PeDl2L2NiZDBxcnZzSDBML090bTdtN2NMR3BpYjQxNiIsImlhdCI6MTczMDk0NzA1NSwiZXhwIjoxNzMxMTE5ODU1LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.9r5YorohwZjTHK9_rZHhAk9bwe7Q8FZB_BH9hHXHI0ryPMIcLGZADqGfdQDXN1FMl1Q1YtGKifQBvq28sHkxiw'
                }
            }, this.form).then(()=> {
                Swal.fire("Berhasil!", "Berhasil menambah data", "success");
                this.$router.push('/inventory-management');
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal menambah data", "error");
                console.log(err)
            })
            
        },
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


        fetchData() {
            if(this.$route.params.id) {
               
                axios.get(process.env.VUE_APP_API_URL + '/v1/inventories/' + this.$route.params.id).then((response) => {
                    this.form.type = response.data.data.type;
                    this.form.name = response.data.data.name;
                    this.form.description = response.data.data.description;
                    this.form.merk = response.data.data.merk;
                    this.form.partNumber = response.data.data.partNumber;
                    this.form.upc = response.data.data.upc;
                    this.form.unit = response.data.data.unit;
                    this.form.price = response.data.data.price;
                    
                }).catch((error) => {
                    console.log(error);
                });
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
        <HeaderPage title="Inventory" pageTitle="Management" />
        <BModal v-model="successAddModal" hide-footer hide-header-close centered  class="v-modal-custom" size="200">
            <div class="text-center">
                <b class="fs-14">Data Inventory berhasil ditambahkan!</b>
                <div class="d-flex justify-content-center mt-4">
                    <BButton variant="dark" class="me-2" @click="successAddModal = false">Oke</BButton>
                </div>
            </div>
        </BModal>
        <BRow>
            <BCol xl="12">
                <BCard no-body>
                    <!-- <BCardHeader>
                        
                    </BCardHeader> -->

                    <BCardBody>
                        <div class="mb-4">
                            <label for="">Kategori</label>
                            <BFormRadioGroup
                            size="lg"
                            v-model="formSelected"
                            :options="types"
                            name="radio-options"
                            />
                        </div>
                        <!-- <BFormRadioGroup id="radio-group-2" v-model="formSelected" name="radio-sub-component">
                            <BFormRadio value="first">Tools</BFormRadio>
                            <BFormRadio value="second">Spare Part</BFormRadio>
                        </BFormRadioGroup> -->
                        <BForm @submit.prevent="saveData">
                            <BRow class="gy-4">
                                <BCol md="6">
                                    <div v-if="formSelected ==='tools'">
                                        <label for="name" class="form-label">Nama Perfleetan<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="name" placeholder="Masukkan nama perfleetan" v-model="form.name" required>
                                    </div>
                                    <div v-if="formSelected === 'sparepart'">
                                        <label for="name" class="form-label">Nama Sparepart<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="name" placeholder="Masukkan nama sparepart" v-model="form.name" required>
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div>
                                        <label for="deskripsi" class="form-label">Deskripsi <span v-if="formSelected === 'sparepart'" class="text-danger">*</span></label>
                                        <textarea name="" class="form-control" id="deskripsi" cols="10" rows="5" v-model="form.description" required></textarea>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="photo" class="form-label">Foto <span v-if="formSelected === 'sparepart'" class="text-danger">*</span></label>
                                        <input type="file" class="form-control" id="photo" placeholder="Upload foto" v-bind="form.photo">
                                        <!-- <div class="input-group">
                                            <input type="text" class="form-control" id="photo" placeholder="Upload foto" v-model="form.photo" required>
                                            <span class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/image.svg" width="20"></span>
                                        </div> -->
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="document" class="form-label">Dokumen <span v-if="formSelected === 'sparepart'" class="text-danger">*</span></label>
                                        <input type="file" class="form-control" id="photo" placeholder="Upload foto" v-bind="form.document``">
                                        <!-- <div class="input-group">
                                            <input type="text" class="form-control" id="document" placeholder="Upload Dokumen" v-model="form.document" required>
                                            <span class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/doc.svg" width="20"></span>
                                        </div> -->
                                    </div>
                                </BCol>
                                
                                <BCol md="6">
                                    <div>
                                        <label for="merk" class="form-label">Merk <span v-if="formSelected === 'sparepart'" class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="merk" placeholder="Masukkan merk" v-model="form.merk" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="part-number" class="form-label">Part Number <span v-if="formSelected === 'sparepart'" class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="part-number" placeholder="Masukkan part number" v-model="form.partNumber" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="upc" class="form-label">UPC <span v-if="formSelected === 'sparepart'" class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="upc" placeholder="Masukkan UPC" v-model="form.upc" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="unitSize" class="form-label">Unit Ukuran <span v-if="formSelected === 'sparepart'" class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="unitSize" placeholder="Masukkan unit ukuran" v-model="form.unit" required>
                                </BCol>
                                <BCol md="6" v-if="formSelected != 'sparepart'">
                                    <label for="unitPrice" class="form-label">Harga/Unit <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="unitPrice" placeholder="Rp 0" v-model="form.price" required>
                                </BCol>
                                <BCol md="6">
                                    <label for="label" class="form-label">Label Bebas <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="label" placeholder="Masukkan label bebas" v-model="form.tags" required>
                                </BCol>
                                <BCol md="6">
                                    <label for="remember" class="form-label">Ingatkan jika persediaan mencapai <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="remember" placeholder="0 Unit" v-model="form.remember" required>
                                </BCol>
                            </BRow>
                            <div class="d-flex justify-content-between mt-4">
                                <router-link to="/inventory-management">
                                    <BButton variant="light">Batalkan</BButton>
                                </router-link>
                                <div class="cta-right">
                                    <BButton type="submit"  variant="primary" class="me-2">Simpan</BButton>
                                    <BButton type="submit" variant="light" @click="saveAndAdd()">Simpan dan Tambah Lagi</BButton>

                                </div>
                            </div>
                        </BForm>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>