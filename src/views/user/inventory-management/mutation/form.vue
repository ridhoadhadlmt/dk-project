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
                refId: "",
                userId: "",
                inventoryCode: "",
                mutationType: "in",
                category: "",
                price: 10000,
                dateUse: "",
                dateLost: "",
                purchaseDate: "",
                returnDate: "",
                dateReturnReminder: "",
                vendor: "",
                note: "",
                items: [
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
            inventoryCodes : [],
            users : [],
            inventoryCode : '',
            params: {
                inventoryId: this.$route.params.id,
            },
            selectedInventoryCode: null,
            items : [
            ],

            
        };
    },
    watch: {
            
        },
    computed: {
        mutationType :{
            get(){
                return this.mutationType
            },
            set(){
                this.mutationType == 'in'
            }
        }
    },
    methods: {
        
        
        saveData(){
            if(this.form.mutationType == 'in' && this.form.category == 'return'){
                const form = {}
                form.inventoryId = this.form.inventoryId
                form.refId = this.form.refId
                form.mutationType = this.form.mutationType
                form.category = this.form.category
                form.inventoryCode = this.form.inventoryCode
                form.returnDate = this.form.returnDate
                form.location = this.form.location
                form.note = this.form.note
                axios.post(process.env.VUE_APP_API_URL + '/v1/inventory-mutations', form).then(()=> {
                    Swal.fire("Berhasil!", "Berhasil menambah data", "success");
                    this.$router.push('/inventory-management/view/' + this.$route.params.id);
                }).catch((err) => {
                    Swal.fire("Gagal!", "Gagal menambah data", "error");
                    console.log(err)
                    console.log(form)
                })
            }
            if(this.form.mutationType == 'in' && this.form.category == 'purchase'){
                const form = {
                    items: []
                }
                const obj = {
                    inventoryCode: this.inventoryCode,
                    qty: 1,
                }
                form.inventoryId = this.form.inventoryId
                form.mutationType = this.form.mutationType
                form.category = this.form.category
                form.purchaseDate = this.form.purchaseDate
                form.price = this.form.price
                form.vendor = this.form.vendor
                form.note = this.form.note
                form.items.push(obj)
                form.items.push(...this.form.items)
                axios.post(process.env.VUE_APP_API_URL + '/v1/inventory-mutations', form).then(()=> {
                    Swal.fire("Berhasil!", "Berhasil menambah data", "success");
                    this.$router.push('/inventory-management/view/' + this.$route.params.id);
                }).catch((err) => {
                    Swal.fire("Gagal!", "Gagal menambah data", "error");
                    console.log(err)
                })
            }
            if(this.form.mutationType == 'out' && this.form.category == 'use'){
                const form = {
                    items: [],
                }
                form.inventoryId = this.form.inventoryId
                form.mutationType = this.form.mutationType
                form.category = this.form.category
                form.dateUse = this.form.dateUse
                form.userId = this.form.userId
                form.dateReturnReminder = this.form.dateReturnReminder
                form.userId = this.form.userId
                form.note = this.form.note
                form.items.push(...this.form.items)
                axios.post(process.env.VUE_APP_API_URL + '/v1/inventory-mutations', form).then(()=> {
                    Swal.fire("Berhasil!", "Berhasil menambah data", "success");
                    this.$router.push('/inventory-management/view/' + this.$route.params.id);
                }).catch((err) => {
                    Swal.fire("Gagal!", "Gagal menambah data", "error");
                    console.log(err)
                })
            }
            if(this.form.mutationType == 'out' && this.form.category == 'lost'){
                const form = {
                    items: []
                }
                form.inventoryId = this.form.inventoryId
                form.mutationType = this.form.mutationType
                form.category = this.form.category
                form.dateLost = this.form.dateLost
                form.note = this.form.note
                form.items.push(...this.form.items)
                axios.post(process.env.VUE_APP_API_URL + '/v1/inventory-mutations', form).then(()=> {
                    Swal.fire("Berhasil!", "Berhasil menambah data", "success");
                    this.$router.push('/inventory-management/view/' + this.$route.params.id);
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
        inputInventory(){
            const obj = {
                inventoryCode: this.inventoryCode,
                qty: 1,
            }
            if(this.inventoryCode.length > 3){

                this.form.items.push(obj)
            }
        },
        selectInventory(){
            this.form.refId = this.inventoryCode.id
            this.form.inventoryCode = this.inventoryCode.code
            
            const obj = {
                inventoryCode: this.inventoryCode.code,
                refId: this.inventoryCode.id,
                qty: 1,
            }
            this.form.items.push(obj)
        },
        listCodeInventory() {
            axios.get(process.env.VUE_APP_API_URL + "/v1/inventory-mutations/code", {
                params: this.params,
                
            })
                .then((response) => {
                    this.inventoryCodes = response.data.data;

                })
                .catch((error) => {
                    console.log(error);
                });

        },
        listUser() {
            axios.get(process.env.VUE_APP_API_URL + "/v1/users")
                .then((response) => {
                    this.users = response.data.data.items;

                })
                .catch((error) => {
                    console.log(error);
                });

        },
        
        
        fetchData(){
            if(this.$route.params.id){
                axios.get(process.env.VUE_APP_API_URL + '/v1/inventory-mutations/' + this.$route.params.id, ).then((response) => {
                    this.form.mutationType = response.data.data.mutationType;
                    this.form.category = response.data.data.in.category;
                    this.form.note = response.data.data.in.note;
                    this.form.purchaseDate = response.data.data.in.purchaseDate;
                
                
            }).catch((error) => {
                console.log(error);
            });
            }
        }
        

    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        // this.fetchData();
        this.listCodeInventory();
        this.listUser();
    },

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
                                        @change="selectMutation"
                                        />
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div class="mb-4">
                                        <label for="">Alasan</label>
                                        <BFormRadioGroup
                                        size="lg"
                                        v-model="form.category"
                                        @change="selectCategory"
                                        :options="form.mutationType == 'in' ? reasonIn : reasonOut "
                                        name="radio-category"
                                        />
                                    </div>
                                </BCol>
                                <BCol md="6" v-if="form.mutationType !== 'out' && form.category !== 'purchase'">
                                    <div>
                                        <label>Kode Inventory <span class="text-danger">*</span></label>
                                        <select v-model="inventoryCode" class="form-select" @change="selectInventory">
                                            <option v-for="inventoryCode in inventoryCodes" :key="inventoryCode.code" :value="inventoryCode">{{ inventoryCode.code }}</option>
                                        </select>
                                    </div>
                                </BCol>
                                
                                <BRow class="align-items-center" v-if="form.category === 'purchase'">
                                    <label>Kode Inventory</label>
                                    <BCol md="11">
                                        <div>
                                            <input type="text" class="form-control" id="kode" placeholder="Kode Inventory" v-model="inventoryCode">
                                            
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
                                <BRow class="align-items-center" v-if="form.mutationType === 'out' ">
                                    <label>Kode Inventory</label>
                                    <BCol md="11">
                                        <div>
                                            <select v-model="inventoryCode" class="form-select" @change="selectInventory">
                                                <option v-for="inventoryCode in inventoryCodes" :key="inventoryCode.code" :value="inventoryCode">{{ inventoryCode.code }}</option>
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
                                <BCol md="6" v-if="form.mutationType == 'out' && form.category == 'use'">
                                    <label for="peminjam" class="form-label">Peminjam <span class="text-danger">*</span></label>
                                    <select class="form-select" v-model="form.userId">
                                        <option selected>Masukkan Peminjam</option>
                                        <option v-for="user in users" :key="user.id" :value="user.id">{{  user.fullName }}</option>
                                        
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
                                <BCol md="6" v-if="form.mutationType == 'out' && form.category == 'use'">
                                    <label for="note" class="form-label">Tanggal Dipinjam <span class="text-danger">*</span></label>
                                    <input type="date" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.useDate" equired>
                                    <!--<div class="input-group">
                                        <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.purchaseDate" required>
                                        <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                                    </div>
                                    -->
                                </BCol>
                                <BCol md="6" v-if="form.mutationType == 'out' && form.category == 'use'">
                                    <label for="note" class="form-label">Tanggal Pengingat Balik <span class="text-danger">*</span></label>
                                    <input type="date" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.dateUseReminder" required>
                                    <!-- <div class="input-group">
                                        <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" required>
                                        <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                                    </div> -->
                                </BCol>
                                <BCol md="6" v-if="form.mutationType == 'out' && form.category == 'lost'">
                                    <label for="note" class="form-label">Tanggal Hilang <span class="text-danger">*</span></label>
                                    <input type="date" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.dateLost" required>
                                    <!-- <div class="input-group">
                                        <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" required>
                                        <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                                    </div> -->
                                </BCol>
                            </BRow>
                            <div class="d-flex justify-content-end mt-4">
                                <div class="cta-right">
                                    <BButton variant="light" class="me-2">
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
