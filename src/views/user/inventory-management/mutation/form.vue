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
                category: "return",
                location: '',
                price: 10000,
                dateUse: "",
                dateLost: "",
                purchaseDate: "",
                returnDate: "",
                dateReturnReminder: "",
                vendor: "",
                note: "",
                items: [
                    {
                        inventoryCode: '',
                        qty: 1,
                    }
                ],
                
            },
            types: [
                {text : 'In', value: 'in'},
                {text : 'Out', value: 'out'},
            ],
            categoryOut: [
                {text : 'Dipinjam', value: 'use'},
                {text : 'Hilang', value: 'lost'},
                
            ],
            categoryIn : [
                {text : 'Pengembalian', value: 'return'},
                {text : 'Pembelian', value: 'purchase'},
            ],
            categories: [],
            data: [],
            inventoryCodes : [],
            codeItem: [],
            users : [],
            params: {
                inventoryId: this.$route.params.id,
            },
            selectedInventoryCode: null,
            items : [
            ],
            inventoryCode : '',
            
        };
    },
    watch: {
            
        },
    computed: {
        
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
                
                form.inventoryId = this.form.inventoryId
                form.mutationType = this.form.mutationType
                form.category = this.form.category
                form.purchaseDate = this.form.purchaseDate
                form.price = this.form.price
                form.vendor = this.form.vendor
                form.note = this.form.note
                form.location = this.form.location
                this.codeItem.forEach((item) => {
                    const obj = {
                        inventoryCode: item,
                        qty: 1,
                    }
                    form.items.push(obj)
                })
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
                this.codeItem.forEach((item) => {
                    const obj = {
                        inventoryCode: item.code,
                        refId: item.id,
                        qty: 1,
                    }
                    form.items.push(obj)
                })

                console.log(form)
                
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
        updateData(){
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
                axios.put(process.env.VUE_APP_API_URL + '/v1/inventory-mutations', form).then(()=> {
                    Swal.fire("Berhasil!", "Berhasil mengubah data", "success");
                    this.$router.push('/inventory-management/view/' + this.$route.params.id);
                }).catch((err) => {
                    Swal.fire("Gagal!", "Gagal mengubah data", "error");
                    console.log(err)
                    console.log(form)
                })
            }
            if(this.form.mutationType == 'in' && this.form.category == 'purchase'){
                const form = {
                    items: []
                }
                
                form.inventoryId = this.form.inventoryId
                form.mutationType = this.form.mutationType
                form.category = this.form.category
                form.purchaseDate = this.form.purchaseDate
                form.price = this.form.price
                form.vendor = this.form.vendor
                form.note = this.form.note
                form.location = this.form.location
                this.codeItem.forEach((item) => {
                    const obj = {
                        inventoryCode: item,
                        qty: 1,
                    }
                    form.items.push(obj)
                })
                axios.put(process.env.VUE_APP_API_URL + '/v1/inventory-mutations/' + this.$route.params.id, form).then(()=> {
                    Swal.fire("Berhasil!", "Berhasil mengubah data", "success");
                    this.$router.back()
                }).catch((err) => {
                    Swal.fire("Gagal!", "Gagal mengubah data", "error");
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
                axios.put(process.env.VUE_APP_API_URL + '/v1/inventory-mutations', form).then(()=> {
                    Swal.fire("Berhasil!", "Berhasil mengubah data", "success");
                    this.$router.push('/inventory-management/view/' + this.$route.params.id);
                }).catch((err) => {
                    Swal.fire("Gagal!", "Gagal mengubah data", "error");
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
                axios.put(process.env.VUE_APP_API_URL + '/v1/inventory-mutations', form).then(()=> {
                    Swal.fire("Berhasil!", "Berhasil mengubah data", "success");
                    this.$router.push('/inventory-management/view/' + this.$route.params.id);
                }).catch((err) => {
                    Swal.fire("Gagal!", "Gagal mengubah data", "error");
                    console.log(err)
                })
            }
        },
        handleAction(){
            if(this.$route.name === 'inventory-mutation-create' && this.$route.params.id){
                this.saveData();
            } 
            else{
                this.updateData();
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
        // inputInventory(){
        //     const obj = {
        //         inventoryCode: this.inventoryCode,
        //         qty: 1,
        //     }
        //     if(this.inventoryCode.length > 3){

        //         this.form.items.push(obj)
        //     }
        // },
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
        copyCode(index){
            const items = this.form.items[index]
            this.form.items.push({...items})
            
        },
        deleteCode(index){
            this.form.items.splice(index, 1)
        },
        fetchData(){
            if(this.$route.params.id){
                axios.get(process.env.VUE_APP_API_URL + '/v1/inventory-mutations/' + this.$route.params.id, ).then((response) => {
                    console.log(response.data.data)
                    this.form.mutationType = response.data.data.mutationType;
                    this.form.category = response.data.data.in.category;
                    this.form.note = response.data.data.in.note;
                    this.form.purchaseDate = response.data.data.in.purchaseDate.slice(0, 10);
                    this.form.price = response.data.data.in.price
                    this.form.vendor = response.data.data.in.vendor
                    this.form.location = response.data.data.in.location
                    const items = response.data.data.items
                    items.forEach((item, index) => {
                        this.codeItem[index] = item.inventoryCode
                    })
                    
                
                
            }).catch((error) => {
                console.log(error);
            });
            }
        },
        selectMutation(){
            
            if(this.form.mutationType == 'in'){
                this.form.category = 'return'
            } else{
                this.form.category = 'use'
                
            }
            

        

        }
        

    },
    
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        this.fetchData();
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
                                        @change="selectMutation($event)"
                                        />
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div class="mb-4">
                                        <label for="">Alasan</label>
                                        <BFormRadioGroup
                                        size="lg"
                                        v-model="form.category"
                                        :options="form.mutationType == 'in' ? categoryIn : categoryOut"
                                        />
                                    </div>
                                </BCol>
                                {{ test }}
                                <BCol md="6" v-if="form.mutationType !== 'out' && form.category !== 'purchase'">
                                    <div>
                                        <label>Kode Inventory <span class="text-danger">*</span></label>
                                        <!-- <select v-model="inventoryCode" class="form-select" @change="selectInventory">
                                            <option v-for="inventoryCode in inventoryCodes" :key="inventoryCode.code" :value="inventoryCode">{{ inventoryCode.code }}</option>
                                        </select> -->
                                        <BFormSelect
                                            :options="inventoryCodes"
                                            v-model="inventoryCode"
                                            text-field="code"
                                            :value-field="inventoryCode"
                                            @change="selectInventory"
                                        >
                                            <template #first>
                                                <BFormSelectOption value="" disabled>Pilih Kode</BFormSelectOption>
                                            </template>
                                        </BFormSelect>
                                    </div>
                                </BCol>
                                <BCol md="12" v-if="form.category !== 'return' && form.category !== 'use' && form.category !== 'lost' ">
                                    <label>Kode Inventory</label>
                                    <BRow class="align-items-center gy-3" v-for="(item, index) in form.items" :key="index">
                                        <BCol md="11">
                                            <div>
                                                <input type="text" class="form-control" id="kode" placeholder="Kode Inventory" v-model="codeItem[index]">
                                            </div>
                                        </BCol>
                                        <BCol md="1">
                                            <div class="d-flex">
                                                <div class="mx-1">
                                                    <BButton variant="light" class="rounded-circle" size="sm" @click="copyCode(index)">
                                                        <img src="@/assets/icons/copy.svg" width="12" alt="cancel" />
                                                    </BButton>
                                                </div>
                                                <div class="mx-1">
                                                    <BButton variant="light" class="rounded-circle" size="sm" @click="deleteCode(index)" v-if="form.items.length > 1">
                                                        <img src="@/assets/icons/cancel.svg" width="12" alt="cancel" />
                                                    </BButton>
                                                </div>
                                            </div>
                                        </BCol>
                                    </BRow>
                                </BCol>
                                <BCol md="12" v-if="form.mutationType === 'out' && form.category !== 'return' && form.category !== 'purchase'">
                                    <label>Kode Inventory</label>
                                    <BRow class="align-items-center gy-3" v-for="(item, index) in form.items" :key="index">
                                        <BCol md="11">
                                            <div>
                                                <!-- <select v-if="inventoryCodes.length" v-model="codeItem[index]" class="form-select" @change="selectInventory">
                                                    <option v-for="inventoryCode in inventoryCodes" :key="inventoryCode.code" :value="inventoryCode">{{ inventoryCode.code }}</option>
                                                </select> -->
                                                <BFormSelect
                                                    v-if="inventoryCodes.length"
                                                    :options="inventoryCodes"
                                                    v-model="codeItem[index]"
                                                    text-field="code"
                                                    :value-field="inventoryCode"
                                                    @change="selectInventory"
                                                >
                                                    <template #first>
                                                        <BFormSelectOption value="" disabled>Pilih Kode</BFormSelectOption>
                                                    </template>
                                                </BFormSelect>
                                                <input v-if="!inventoryCodes.length" type="text" class="form-control" id="kode" placeholder="Kode Inventory" v-model="codeItem[index]">
                                            </div>
                                        </BCol>
                                        <BCol md="1">
                                            <div class="d-flex">
                                                <div class="mx-1">
                                                    <BButton variant="light" class="rounded-circle" size="sm" @click="copyCode(index)">
                                                        <img src="@/assets/icons/copy.svg" width="12" alt="cancel" />
                                                    </BButton>
                                                </div>
                                                <div class="mx-1">
                                                    <BButton variant="light" class="rounded-circle" size="sm" @click="deleteCode(index)" v-if="form.items.length > 1">
                                                        <img src="@/assets/icons/cancel.svg" width="12" alt="cancel" />
                                                    </BButton>
                                                </div>
                                            </div>
                                        </BCol>
                                    </BRow>
                                </BCol>
                                <BCol md="6" v-if="form.mutationType == 'in' && form.category == 'purchase'">
                                    <label for="note" class="form-label">Harga/Unit <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="note" placeholder="Masukkan Vendor" v-model="form.price">
                                </BCol>
                                <BCol md="6" v-if="form.mutationType == 'in' && form.category == 'purchase'" >
                                    <label for="note" class="form-label">Tanggal Pembelian <span class="text-danger">*</span></label>
                                    <input type="date" class="form-control" id="date" placeholder="Pilih Tanggal" v-model="form.purchaseDate" required>
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
                                <BCol md="6" v-if="form.mutationType == 'out' && form.category !== 'lost'">
                                    <label for="peminjam" class="form-label">Peminjam <span class="text-danger">*</span></label>
                                    <!-- <select class="form-select" v-model="form.userId">
                                        <option selected>Masukkan Peminjam</option>
                                        <option v-for="user in users" :key="user.id" :value="user.id">{{  user.fullName }}</option>
                                    </select> -->
                                    <BFormSelect
                                        :options="users"
                                        v-model="form.userId"
                                        text-field="fullName"
                                        value-field="id"
                                    >
                                        <template #first>
                                            <BFormSelectOption value="" disabled>Pilih Peminjam</BFormSelectOption>
                                        </template>
                                    </BFormSelect>
                                    
                                </BCol>

                                <BCol md="6" v-if="form.mutationType == 'in' && form.category == 'return'">
                                    <label for="note" class="form-label">Tanggal Pengembalian <span class="text-danger">*</span></label>
                                    <input type="date" class="form-control" id="date" placeholder="Pilih Tanggal" v-model="form.returnDate" required>
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
                                <BCol md="6" v-if="form.mutationType == 'out' && form.category !== 'lost'">
                                    <label for="note" class="form-label">Tanggal Dipinjam <span class="text-danger">*</span></label>
                                    <input type="date" class="form-control" id="date" placeholder="Pilih Tanggal" v-model="form.dateUse" equired>
                                    <!--<div class="input-group">
                                        <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="form.purchaseDate" required>
                                        <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                                    </div>
                                    -->
                                </BCol>
                                <BCol md="6" v-if="form.mutationType == 'out' && form.category !== 'lost'">
                                    <label for="note" class="form-label">Tanggal Pengingat Balik <span class="text-danger">*</span></label>
                                    <input type="date" class="form-control" id="date" placeholder="Pilih Tanggal" v-model="form.dateReturnReminder" required>
                                    <!-- <div class="input-group">
                                        <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" required>
                                        <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                                    </div> -->
                                </BCol>
                                <BCol md="6" v-if="form.mutationType == 'out' && form.category == 'lost'">
                                    <label for="note" class="form-label">Tanggal Hilang <span class="text-danger">*</span></label>
                                    <input type="date" class="form-control" id="date" placeholder="Pilih Tanggal" v-model="form.dateLost" required>
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
                                    <BButton type="submit" variant="primary" @click="handleAction()">Simpan</BButton>

                                </div>
                            </div>
                        </BForm>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>
