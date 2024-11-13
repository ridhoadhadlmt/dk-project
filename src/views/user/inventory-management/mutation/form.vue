<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";
export default {
    name: "inventory-mutation",
    components: {
        Layout,
    },
    data() {
        return {
            form: {
                inventoryId: this.$route.params.id,
                // refId: this.$route.params.id,
                // inventoryCode: '',
                mutationType: "in",
                category: "return",
                purchaseDate: "",
                price: 10000,
                vendor: "",
                note: "",
                items: [
                    {inventoryCode: "001", qty: 1},
                    {inventoryCode: "002", qty: 1},
                ],
                
            },
            types: [
                {text : 'In', value: 'in'},
                {text : 'Out', value: 'out'},
            ],
            reasonOut: [
                {text : 'Dipinjam', value: 'use'},
                {text : 'Hilang', value: 'lost'},
                
            ],
            reasonIn : [
                {text : 'Pengembalian', value: 'return'},
                {text : 'Pembelian', value: 'purchase'},
            ],
            data: [],
            inventoryCodes : [
                {upc: "001", qty: 1},
                {upc: "002", qty: 1},
            ],
            selectedInventoryCode: null,
            
        };
    },
    watch: {
            
        },

    methods: {
        
        
        saveData(){
            if(this.form.mutationType == 'in' && this.form.category == 'return'){
                const form = {}
                form.inventoryId = this.form.inventoryId
                form.refId = this.form.inventoryId
                form.mutationType = this.form.mutationType
                form.category = this.form.category
                form.inventoryCode = this.form.inventoryCode
                form.returnDate = this.form.returnDate
                form.location = this.form.location
                form.note = this.form.note
                axios.post(process.env.VUE_APP_API_URL + '/v1/inventory-mutations', form, {
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCRFWEk1UmZ0U2FDOEFyZWN1NlE3ZXd1TG16c2lhUUdONmkyY0xaTFlTOVRTWGdtdHlNVld3NiIsImlhdCI6MTczMTQ2NjkyNiwiZXhwIjoxNzMxNjM5NzI2LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.Yuzcd1-YHSJVe2MXl5yGNnZGnzZ_aJEPg5-ptAZ_69mDdx_D-_uKk5ZLAK8e35rPQ8h2IFKCfbBwP4NecJjKRQ'
                    },
                }).then(()=> {
                    Swal.fire("Berhasil!", "Berhasil menambah data", "success");
                    this.$router.push('/inventory-management');
                }).catch((err) => {
                    Swal.fire("Gagal!", "Gagal menambah data", "error");
                    console.log(err)
                })
            }
            if(this.form.mutationType == 'in' && this.form.category == 'purchase'){
                const form = {}
                form.inventoryId = this.form.inventoryId
                form.mutationType = this.form.mutationType
                form.category = this.form.category
                form.purchaseDate = this.form.purchaseDate
                form.price = this.form.price
                form.vendor = this.form.vendor
                form.note = this.form.note
                form.items = this.form.items
                axios.post(process.env.VUE_APP_API_URL + '/v1/inventory-mutations', form, {
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCRFWEk1UmZ0U2FDOEFyZWN1NlE3ZXd1TG16c2lhUUdONmkyY0xaTFlTOVRTWGdtdHlNVld3NiIsImlhdCI6MTczMTQ2NjkyNiwiZXhwIjoxNzMxNjM5NzI2LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.Yuzcd1-YHSJVe2MXl5yGNnZGnzZ_aJEPg5-ptAZ_69mDdx_D-_uKk5ZLAK8e35rPQ8h2IFKCfbBwP4NecJjKRQ'
                    },
                }).then(()=> {
                    Swal.fire("Berhasil!", "Berhasil menambah data", "success");
                    this.$router.push('/inventory-management');
                }).catch((err) => {
                    Swal.fire("Gagal!", "Gagal menambah data", "error");
                    console.log(err)
                })
            }
            if(this.form.mutationType == 'out' && this.form.category == 'use'){
                const form = {}
                form.inventoryId = this.form.inventoryId
                form.mutationType = this.form.mutationType
                form.category = this.form.category
                form.dateUse = this.form.dateUse
                form.dateReturnReminder = this.form.dateReturnReminder
                form.userId = this.form.userId
                form.note = this.form.note
                form.items = this.form.items
                axios.post(process.env.VUE_APP_API_URL + '/v1/inventory-mutations', form, {
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCRFWEk1UmZ0U2FDOEFyZWN1NlE3ZXd1TG16c2lhUUdONmkyY0xaTFlTOVRTWGdtdHlNVld3NiIsImlhdCI6MTczMTQ2NjkyNiwiZXhwIjoxNzMxNjM5NzI2LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.Yuzcd1-YHSJVe2MXl5yGNnZGnzZ_aJEPg5-ptAZ_69mDdx_D-_uKk5ZLAK8e35rPQ8h2IFKCfbBwP4NecJjKRQ'
                    },
                }).then(()=> {
                    Swal.fire("Berhasil!", "Berhasil menambah data", "success");
                    this.$router.push('/inventory-management');
                }).catch((err) => {
                    Swal.fire("Gagal!", "Gagal menambah data", "error");
                    console.log(err)
                })
            }
            if(this.form.mutationType == 'out' && this.form.category == 'lost'){
                const form = {}
                form.inventoryId = this.form.inventoryId
                form.mutationType = this.form.mutationType
                form.category = this.form.category
                form.dateLost = this.form.dateLost
                form.note = this.form.note
                form.items = this.form.items
                
                axios.post(process.env.VUE_APP_API_URL + '/v1/inventory-mutations', form, {
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCRFWEk1UmZ0U2FDOEFyZWN1NlE3ZXd1TG16c2lhUUdONmkyY0xaTFlTOVRTWGdtdHlNVld3NiIsImlhdCI6MTczMTQ2NjkyNiwiZXhwIjoxNzMxNjM5NzI2LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.Yuzcd1-YHSJVe2MXl5yGNnZGnzZ_aJEPg5-ptAZ_69mDdx_D-_uKk5ZLAK8e35rPQ8h2IFKCfbBwP4NecJjKRQ'
                    },
                }).then(()=> {
                    Swal.fire("Berhasil!", "Berhasil menambah data", "success");
                    this.$router.push('/inventory-management');
                }).catch((err) => {
                    Swal.fire("Gagal!", "Gagal menambah data", "error");
                    console.log(err)
                })
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
        selectInventory(){
            // this.form.items.push(event.id)
        },
        // listCodeInventory() {
        //     axios.get(process.env.VUE_APP_API_URL + "/v1/inventories", {
        //         params: this.params,
        //         headers: {
        //             'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCRFWEk1UmZ0U2FDOEFyZWN1NlE3ZXd1TG16c2lhUUdONmkyY0xaTFlTOVRTWGdtdHlNVld3NiIsImlhdCI6MTczMTQ2NjkyNiwiZXhwIjoxNzMxNjM5NzI2LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.Yuzcd1-YHSJVe2MXl5yGNnZGnzZ_aJEPg5-ptAZ_69mDdx_D-_uKk5ZLAK8e35rPQ8h2IFKCfbBwP4NecJjKRQ'
        //         },
        //     })
        //         .then((response) => {
        //             this.inventoryCodes = response.data.data.items;
        //             console.log(this.inventoryCodes)

        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });

        // },
        getPurchaseDate(event){
            console.log(event)
            console.log(this.form.purchaseDate)
        }
        
        // fetchData(){
        //     if(this.$route.params.id){
        //         axios.get(process.env.VUE_APP_API_URL + '/v1/inventory-mutations/' + this.$route.params.id, {
        //         headers: {
        //         'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlODc5NzBjLTNjYTUtNDA3Mi04OWE3LWVhMmUyNGE0ZDg0ZCIsImVtYWlsIjoiMDEzaWNoc2FubUBnbWFpbC5jb20iLCJhdWRpZW5jZSI6ImFjY2VzcyIsInNpZCI6IiQyYSQxMCRFWEk1UmZ0U2FDOEFyZWN1NlE3ZXd1TG16c2lhUUdONmkyY0xaTFlTOVRTWGdtdHlNVld3NiIsImlhdCI6MTczMTQ2NjkyNiwiZXhwIjoxNzMxNjM5NzI2LCJhdWQiOiIzNDRiN2E5ZDRiZTI5YmY2ZDc1YzI0ZWVmODMzZWU1YyIsImlzcyI6IlBVQkxJQyJ9.Yuzcd1-YHSJVe2MXl5yGNnZGnzZ_aJEPg5-ptAZ_69mDdx_D-_uKk5ZLAK8e35rPQ8h2IFKCfbBwP4NecJjKRQ'
        //         },
        //     }).then((response) => {
        //             this.form.mutationType = response.data.data.mutationType;
        //             this.form.category = response.data.data.in.category;
        //             this.form.note = response.data.data.in.note;
        //             this.form.purchaseDate = response.data.data.in.purchaseDate;
                
                
        //     }).catch((error) => {
        //         console.log(error);
        //     });
        //     }
        // }
        

    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        // this.fetchData();
        // this.listCodeInventory();
    },
    computed: {
        
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


                    <BCardBody>
                        <BForm>
                            <BRow class="gy-4">
                                <BCol md="12">
                                    <div class="mb-4">
                                        <label for="">Jenis Mutasi</label>
                                        <BFormRadioGroup
                                        size="lg"
                                        v-model="form.mutationType"
                                        :options="types"
                                        name="radio-mutation-type"
                                        />
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div class="mb-4">
                                        <label for="">Alasan</label>
                                        <BFormRadioGroup
                                        size="lg"
                                        v-model="form.category"
                                        
                                        :options="form.mutationType === 'out' && form.category === 'use' ? reasonOut : reasonIn "
                                        name="radio-category"
                                        />
                                    </div>
                                </BCol>
                                <BCol md="6" v-if="form.mutationType !== 'out' && form.category !== 'purchase'">
                                    <div>
                                        <label>Kode Inventory <span class="text-danger">*</span></label>
                                        <select v-model="form.inventoryCode" class="form-select" @change="selectInventory">
                                            <option v-for="inventoryCode in inventoryCodes" :key="inventoryCode.id" :value="inventoryCode.upc">{{ inventoryCode.upc }}</option>
                                        </select>
                                    </div>
                                </BCol>
                                
                                <BRow class="align-items-center" v-if="form.mutationType == 'in' && form.category == 'purchase' || form.mutationType == 'in' && form.category == 'purchase    '">
                                    <label>Kode Inventory</label>
                                    <BCol md="11">
                                        <div>
                                            <select v-model="form.items" class="form-select" @change="selectInventory">
                                                <option  v-for="inventoryCode in inventoryCodes" :key="inventoryCode.id">{{ inventoryCode.upc }}</option>
                                            </select>
                                        </div>
                                    </BCol>
                                    <BCol md="1">
                                        <div class="d-flex">
                                            <div class="mx-1">
                                                <BButton variant="light" class="rounded-circle" size="sm">
                                                    <img src="@/assets/icons/copy.svg" width="12" alt="cancel" />
                                                </BButton>
                                            </div>
                                            <div class="mx-1">
                                                <BButton variant="light" class="rounded-circle" size="sm">
                                                    <img src="@/assets/icons/cancel.svg" width="12" alt="cancel" />
                                                </BButton>
                                            </div>
                                        </div>
                                    </BCol>
                                </BRow>
                                <BCol md="6" v-if="form.mutationType == 'in' && form.category == 'purchase'">
                                    <label for="note" class="form-label">Harga/Unit <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="note" placeholder="Masukkan Vendor" v-model="form.price">
                                </BCol>
                                <BCol md="6" v-if="form.mutationType == 'in' && form.category == 'purchase'" >
                                    <label for="note" class="form-label">Tanggal Pembelian <span class="text-danger">*</span></label>
                                    <input type="date" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.purchaseDate" required>
                                    <!--<div class="input-group">
                                        <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.returnDate" required>
                                        <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                                    </div>
                                    -->
                                </BCol>
                                <BCol md="6" v-if="form.mutationType == 'in' && form.category == 'purchase'">
                                    <label for="note" class="form-label">Vendor <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="note" placeholder="Masukkan Vendor" v-model="form.vendor">
                                </BCol>
                                <BCol md="6" v-if="form.mutationType == 'in'">
                                    <label for="note" class="form-label">Lokasi Penyimpanan <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="note" placeholder="Masukkan Lokasi" v-model="form.location">
                                </BCol>
                                <BCol md="6" v-if="form.mutationType == 'out'">
                                    <label for="peminjam" class="form-label">Peminjam <span class="text-danger">*</span></label>
                                    <select class="form-select">
                                        <option selected>Masukkan Peminjam</option>
                                        
                                    </select>
                                </BCol>

                                <BCol md="6" v-if="form.mutationType == 'in' && form.category == 'return'">
                                    <label for="note" class="form-label">Tanggal Pengembalian <span class="text-danger">*</span></label>
                                    <input type="date" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.returnDate" required>
                                    <!--<div class="input-group">
                                        <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.returnDate" required>
                                        <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                                    </div>
                                    -->
                                </BCol>
                                <BCol md="6">
                                    <label for="note" class="form-label">Catatan</label>
                                    <input type="text" class="form-control" id="note" placeholder="Masukkan Catatan" v-model="form.note">
                                </BCol>
                                <BCol md="6" v-if="form.mutationType == 'out'">
                                    <label for="note" class="form-label">Tanggal Dipinjam <span class="text-danger">*</span></label>
                                    <input type="date" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.purchaseDate" equired>
                                    <!--<div class="input-group">
                                        <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.purchaseDate" required>
                                        <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                                    </div>
                                    -->
                                </BCol>
                                <BCol md="6" v-if="form.mutationType == 'out'">
                                    <label for="note" class="form-label">Tanggal Pengingat Balik <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" required>
                                        <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                                    </div>
                                </BCol>
                            </BRow>
                            <div class="d-flex justify-content-end mt-4">
                                <div class="cta-right">
                                    <BButton variant="light">
                                        <router-link to="/inventory-management">
                                            Kembali
                                        </router-link>
                                    </BButton>
                                    <BButton type="submit" variant="primary" @click="saveData()">Simpan</BButton>

                                </div>
                            </div>
                        </BForm>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>
