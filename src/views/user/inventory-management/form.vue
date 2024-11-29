<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";
import multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
// import MultiSelect from 'vue-multiselect'

export default {
    name: "inventory-management-create",
    components: {
        Layout,
        HeaderPage,
        // MultiSelect,
        multiselect
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
                minStock: "",
                type: '',
                tags: [],
                

            },
            types: [
                {text : 'Tools', value: 'tools'},
                {text : 'Spare Part', value: 'sparepart'},
            ],
            labels: [{name: 'Baut', value: 'baut'}, {name: 'Ring', value: 'ring'}, {name: 'Body', value: 'body'}],
            dataTag: [],
            value: [],
            successAddModal: false,
            saveAndAdd: false,
            photo: null,
            photoUrl: '',
            document: null,
            documentUrl: '',
        };
    },
    watch: {
            
        },

    methods: {
        
        // selectOpt(option){
        //     const arrVal = []
        //     arrVal.push(option)
        //     arrVal.forEach(item => {
        //         this.form.tags.push(item.value)
        //     })
        // },
        uploadImage(event){
            this.photo = event.target.files[0]
            const formData = new FormData();
            formData.append('file', this.photo)
            axios.post(process.env.VUE_APP_API_URL + '/misc/upload', formData).then((res) => {
                this.form.photo = res.data.data.location
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal mengupload foto", "error");
                console.log((err));
            })
            console.log(this.photo)
        },
        uploadDocument(event){
            this.document = event.target.files[0]
            const formData = new FormData();
            formData.append('file', this.document)
            axios.post(process.env.VUE_APP_API_URL + '/misc/upload', formData).then((res) => {
                this.form.document = res.data.data.location
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal mengupload foto", "error");
                console.log((err));
            })
            console.log(this.document)
        },
        saveData(){
            if(this.saveAndAdd == true){
                axios.post(process.env.VUE_APP_API_URL + '/v1/inventories', this.form).then(()=> {
                    this.successAddModal = true
                    
                }).catch((err) => {
                    Swal.fire("Gagal!", "Gagal menambah data", "error");
                    console.log(err)
                })
                
            } else{
                axios.post(process.env.VUE_APP_API_URL + '/v1/inventories', this.form).then(()=> {
                    Swal.fire("Berhasil!", "Berhasil menambah data", "success");
                    this.$router.back()
                    
                }).catch((err) => {
                    Swal.fire("Gagal!", "Gagal menambah data", "error");
                    console.log(err)
                })

            }
            
        },
        updateData(){
            
            axios.put(process.env.VUE_APP_API_URL + '/v1/inventories/' + this.$route.params.id , this.form).then(()=> {
                Swal.fire("Berhasil!", "Berhasil mengubah data", "success");
                this.$router.push('/inventory-management');
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal mengubah data", "error");
                console.log(err)
            })
            
        },
        handleAction(saveAndAdd){
            this.saveAndAdd = saveAndAdd
            if(this.$route.params.id){
                this.updateData()
            }
            else{
                this.saveData()
            }

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
                    this.dataTag = response.data.data.tags;
                    console.log(this.dataTag)
                    this.form.tags = this.dataTag.map(item => item)
                    console.log(this.form.tags)
                    this.form.minStock = response.data.data.minStock;
                    this.form.photo = response.data.data.photo;
                    this.form.document = response.data.data.document;
                    
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        

    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        this.fetchData();
    },
    computed: {
        
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
                        <BForm>
                            <div class="mb-4">
                                <label for="">Kategori</label>
                                <BFormRadioGroup
                                size="lg"
                                v-model="form.type"
                                :options="types"
                                name="radio-options"
                                />
                            </div>
                            <BRow class="gy-4">
                                <BCol md="6">
                                    <div v-if="form.type ==='tools'">
                                        <label for="name" class="form-label">Nama Perfleetan<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="name" placeholder="Masukkan nama perfleetan" v-model="form.name">
                                    </div>
                                    <div v-if="form.type === 'sparepart'">
                                        <label for="name" class="form-label">Nama Sparepart<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="name" placeholder="Masukkan nama sparepart" v-model="form.name">
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div>
                                        <label for="deskripsi" class="form-label">Deskripsi <span v-if="form.type === 'sparepart'" class="text-danger">*</span></label>
                                        <textarea name="" class="form-control" id="deskripsi" cols="10" rows="5" v-model="form.description"></textarea>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="photo" class="form-label">Foto <span v-if="form.type === 'sparepart'" class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <BFormFile v-model="photo" @change="uploadImage"></BFormFile>
                                            <span class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/image.svg" width="20"></span>
                                        </div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="document" class="form-label">Dokumen <span v-if="form.type === 'sparepart'" class="text-danger">*</span></label>
                                         <div class="input-group">
                                            <BFormFile v-model="document" @change="uploadDocument"></BFormFile>
                                            <span class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/doc.svg" width="20"></span>
                                        </div>
                                    </div>
                                </BCol>
                                
                                <BCol md="6">
                                    <div>
                                        <label for="merk" class="form-label">Merk <span v-if="form.type === 'sparepart'" class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="merk" placeholder="Masukkan merk" v-model="form.merk">
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="part-number" class="form-label">Part Number <span v-if="form.type === 'sparepart'" class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="part-number" placeholder="Masukkan part number" v-model="form.partNumber">
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="upc" class="form-label">UPC <span v-if="form.type === 'sparepart'" class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="upc" placeholder="Masukkan UPC" v-model="form.upc">
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="unitSize" class="form-label">Unit Ukuran <span v-if="form.type === 'sparepart'" class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="unitSize" placeholder="Masukkan unit ukuran" v-model="form.unit">
                                </BCol>
                                <BCol md="6" v-if="form.type != 'sparepart'">
                                    <label for="unitPrice" class="form-label">Harga/Unit <span class="text-danger">*</span></label>
                                    <input type="number" class="form-control" id="unitPrice" placeholder="Rp 0" v-model="form.price">
                                </BCol>
                                <BCol md="6">
                                    <label for="label" class="form-label">Label Bebas <span class="text-danger">*</span></label>
                                    <!-- <MultiSelect maxHeight="100" v-model="value" label="name" track-by="name"  @select="selectOpt" :multiple="true" placeholder="Label Bebas" :options="labels"></MultiSelect> -->
                                    <multiselect v-model="form.tags" mode="tags" value-prop="value"
                                        label="name" :close-on-select="false" :searchable="true"
                                        :create-option="true" placeholder="Label Bebas" :options="labels">
                                        <template #singleLabel="{ option }"><strong>{{ option.name }}</strong></template>
                                    </multiselect>
                                </BCol>
                                <BCol md="6">
                                    <label for="stock" class="form-label">Ingatkan jika persediaan mencapai <span class="text-danger">*</span></label>
                                    <input type="number" class="form-control" id="stock" placeholder="0 Unit" v-model="form.minStock">
                                </BCol>
                            </BRow>
                            <div class="d-flex justify-content-between mt-4">
                                <router-link to="/inventory-management">
                                    <BButton variant="light">Batalkan</BButton>
                                </router-link>
                                <div class="cta-right">
                                    <BButton type="submit"  variant="primary" @click="handleAction(false)" class="me-2">Simpan</BButton>
                                    <BButton type="submit" variant="light" @click="handleAction(true)">Simpan dan Tambah Lagi</BButton>

                                </div>
                            </div>
                        </BForm>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
