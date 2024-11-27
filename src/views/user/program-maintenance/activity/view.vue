<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";


export default {
    name: "program-maintenance-view",
    components: {
        Layout,
    },
    data() {
        return {
            activity : {
                title: '',
                note: '',
                subtotal: 0,
                items: [
                    {
                        id: '',
                        type: '',
                        inventoryId: '',
                        value: '',
                        qty: 0,
                        unit: '',
                        price: 0,
                        total: 0,
                    }
                ],
            },
            items: [],
            inventories: [],
           
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


        fetchData() {
            if(this.$route.params.id){
                axios.get(process.env.VUE_APP_API_URL + '/v1/maintenance-program-activities/' + this.$route.params.id).then((response) => {
                    this.activity = response.data.data
                    response.data.data.items.forEach((item, index) => {
                        // console.log(index)
                        this.items[index] = item
                        // this.activity.items[index].inventoryId = this.items[index].id
                        // this.activity.items[index].type = this.items[index].type
                        // this.activity.items.push(this.items[index])
                    })
                    // console.log(this.activity.items)
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        listDataInventory(){            
            axios.get(process.env.VUE_APP_API_URL + '/v1/inventories').then((response) => {
                this.inventories = response.data.data.items
            }).catch((error) => {
                console.log(error);
            });
        },
        copyItem(index){
            const item = this.activity.items[index]
            // console.log(item)
            this.activity.items.push({...item})
        },
        deleteItem(index){
            this.activity.items.splice(index, 1)
        },
        selectTypeActivity(event, index) {
            this.activity.items[index].inventoryId = this.items[index].id
            this.activity.items[index].type = this.items[index].type
            
        },

        

    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        this.fetchData();
        this.listDataInventory();
    }

};
</script>

<template>
    <Layout>
        <HeaderPage title="Program Maintenance" pageTitle="Program Maintenance" />
        
        <BRow>
            <BCol xl="12">
                <BCard no-body>
                    <BCardBody>
                        <BForm>
                            <BRow class="gy-4">
                                <BCol md="12" class="mb-3">
                                    <div>
                                        <label for="">Judul <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" v-model="activity.title" placeholder="Masukkan judul">
                                    </div>
                                </BCol>
                                <BCol md="12" class="mb-3">
                                    <div>
                                        <label for="">Note</label>
                                        <input type="text" class="form-control" v-model="activity.note" placeholder="Masukkan note">
                                    </div>
                                </BCol>
                                <BRow class="mb-3" v-for="(item, index) in activity.items" :key="index">
                                    <label for="" class="form-label">Line Items <span class="text-danger">*</span></label>
                                    <BCol md="2">
                                        <div>
                                           
                                            <select id="type" v-model="items[index]" class="form-select" @change="selectTypeActivity($event.target.value, index)" required>
                                                <option v-for="inventory in inventories" :key="inventory.id" :value="inventory">{{ inventory.type}}</option>
                                            </select>

                                        </div>
                                    </BCol>
                                    <BCol md="2">
                                        <div>
                                            <select id="" class="form-select" v-model="activity.items[index].value" required>
                                                <option selected>Sparepart</option>
                                            </select>
                                        </div>
                                    </BCol>
                                    <BCol md="2" class="pe-0">
                                        <div>
                                            <div class="input-group">
                                                <input type="text" class="form-control" v-model="activity.items[index].qty" id="quantity" width="80%" placeholder="Quantity" required @change="lineItemCalculate(index)">
                                                <select id="unit" class="form-select" v-model="activity.items[index].unit" required>
                                                    <option selected>Pcs</option>
                                                </select>
                                            </div>
                                        </div>
                                    </BCol>
                                    
                                    <BCol md="6" class="p-0">
                                        <div class="d-flex justify-content-between">
                                            <div class="d-flex align-items-center mx-2">
                                                <i class="bx bx-x fs-22"></i>
                                            </div>
                                            <div>
                                                <input type="number" class="form-control" v-model="activity.items[index].price" placeholder="Rp0" @change="lineItemCalculate(index)">
                                            </div>
                                            <div class="d-flex align-items-center mx-2">
                                                <i class="las la-equals fs-22"></i>
                                            </div>
                                            <div>
                                                <input type="number" class="form-control" v-model="activity.items[index].total" placeholder="Rp0" disabled>
                                            </div>
                                            <div class="d-flex align-items-center mx-2">
                                                <BButton variant="link" class="p-1 rounded-circle" @click="copyItem(index)"><i class="bx bxs-copy-alt fs-22"></i></BButton>
                                            </div>
                                            <div class="d-flex align-items-center mx-2">
                                                <BButton variant="link" class="p-1 rounded-circle d-flex align-items-center bg-light" @click="deleteItem(index)" v-if="activity.items.length > 1"><i class="bx bx-x fs-22"></i></BButton>
                                            </div>
                                        </div>
                                    </BCol>
                                </BRow>
                                <BCol md="12">
                                    <div>
                                        <label for="">Subtotal </label>
                                        <input type="text" v-model="activity.subtotal" class="form-control" placeholder="Rp0" disabled>
                                    </div>
                                </BCol>
                            </BRow>
                            <div class="d-flex justify-content-end mt-4">
                                <BButton variant="light" class="me-2">Edit</BButton>
                            </div>
                        </BForm>
                    </BCardBody>
                </BCard>
            </BCol>\
        </BRow>
    </Layout>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>