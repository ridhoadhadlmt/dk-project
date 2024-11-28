<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";
import "@vueform/multiselect/themes/default.css";
import TableComponent from "@/components/table.vue";
import MultiSelect from "vue-multiselect";
// import SelectOption from "@vueform/multiselect";

export default {
    name: "maintenance-programs-create",
    components: {
        Layout,
        HeaderPage,
        TableComponent,
        MultiSelect,
        // SelectOption,
    },
    data() {
        return {
            headersActivity: [
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
                    title: 'Sub Total',
                    key: 'subtotal',
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
                parameterDuration: "",
                parameterDurationNotification: "",
                users: [],
                activities: [],
            },
            types: [
                {label: 'Teknis', value: 'teknis'},
                {label: 'Non Teknis', value: 'nonteknis'},
            ],
            itemTypes: [
                {label: 'Part', value: 'part'},
                {label: 'Tool', value: 'tool'},
            ],
            activity: {
                title: '',
                note: '',
                startDate: '',
                dueDate: '',
                actualFinishDate: '',
                subtotal: 0,
                items: [
                    {
                        type: '',
                        inventoryId: '',
                        unit: '',
                        value: '',
                        qty: 0,
                        price: 0,
                        total: 0,
                    },

                ],
            },
            activityItem: [],
            inventories: [],
            dataActivity: [],
            dataUser: [],
            items: [],
            params: {
                page: 1,
                limit: 10,
                search: '',
                sortBy: 'id.desc',
                maintenanceProgramId: '',
            },
            config:{
                total_pages: 0,
                total_item: 0,
            },
            item: {},
            valueUser: '',
            activityId: '',
            inventoryId: '',
            inventoryType: '',
            showModalActivity: false,
            showModalDelete: false,
        }
    },
    watch: {
        params: {
            handler(){
            },
            deep: true,
        }, 
        search: {
            handler(){
                if(this.search.length === 0 || this.search.length > 1){
                    this.params.search = this.search
                    if(this.timeout) clearTimeout(this.timeout)
                    this.timeout = setTimeout(() => {
                        this.listData()
                    }, 500)
                }
            }
        }
    },
    methods: {
        showModalActivityMethod(){
            this.activity = {
                title: '',
                note: '',
                startDate: '',
                dueDate: '',
                actualFinishDate: '',
                subtotal: 0,
                items: [
                    {
                        type: '',
                        inventoryId: '',
                        unit: '',
                        value: '',
                        qty: 0,
                        price: 0,
                        total: 0,
                    },

                ],
            }
            this.showModalActivity = true
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

        selectUser(){
            
            const users = []
            this.valueUser.forEach((item) => {
                users.push(item.id)
            })
            this.dataUser = users

        },
        saveData(){
            this.form.activities = this.dataActivity
            this.form.users = this.dataUser   
            axios.post(process.env.VUE_APP_API_URL + '/v1/maintenance-programs', this.form).then(() => {
                Swal.fire("Berhasil!", "Berhasil menambah data", "success");
                
                this.$router.push('/maintenance-programs')
            }).catch((error) => {
                console.log(error);
                Swal.fire("Gagal!", "Gagal menambah data", "error");
            });
        },
        updateData(){ 
            // const form = {}
            // form.code = this.form.code
            // form.name = this.form.name
            // form.type = this.form.type
            // form.parameterDuration = this.form.parameterDuration           
            // form.parameterDurationNotification = this.form.parameterDurationNotification     
            // form.users = this.form.users
            // form.activities = this.form.activities
            // console.log(form)
            axios.put(process.env.VUE_APP_API_URL + '/v1/maintenance-programs/' + this.$route.params.id, this.form).then(() => {
                Swal.fire("Berhasil!", "Berhasil update data", "success");
                this.activity = {}
                this.item = {}
                this.$router.push('/maintenance-programs')
            }).catch((error) => {
                console.log(error);
                Swal.fire("Gagal!", "Gagal update data", "error");
            });
        },
        showModalDeleteActivity(index){
            console.log(index)
            this.showModalDelete = true
        },
        deleteActivity(index){           
            this.dataActivity.splice(index, 1)
            this.showModalDelete = false
        },
      
        listDataInventory(){            
            axios.get(process.env.VUE_APP_API_URL + '/v1/inventories').then((response) => {
                this.inventories = response.data.data.items
            }).catch((error) => {
                console.log(error);
            });
        },
        saveModalData(){
            
            if(this.activityIndex == null){
                this.dataActivity.push(this.activity)
            }
            else{
                this.dataActivity[this.activityIndex] = this.activity
            }
            this.showModalActivity = false
            this.activity = {
                title: '',
                note: '',
                startDate: '',
                dueDate: '',
                actualFinishDate: '',
                items: [
                    {
                        type: '',
                        inventoryId: '',
                        unit: '',
                        value: '',
                        qty: 0,
                        price: 0,
                        total: 0,
                    },

                ],
            }
            

        },
        lineItemCalculate(index) {
            this.activity.items[index].total = this.activity.items[index].qty * this.activity.items[index].price;
            this.activity.subtotal = this.activity.items.reduce((acc, item) => acc + item.total, 0);
        },

        editActivity(index) {
            // this.activity = this.dataActivity[index];
            // this.activity.startDate = this.dataActivity[index].startDate.slice(0, 10);
            // this.activity.dueDate = this.dataActivity[index].dueDate.slice(0, 10);
            // this.activity.actualFinishDate = this.dataActivity[index].actualFinishDate.slice(0, 10);
            console.log(this.activity)
            this.showModalActivity = true;
            this.activityIndex = index;
        },
        handleAction(){
            if(this.$route.params.id){
                this.updateData()
            }
            else{
                this.saveData()
            }
        },
        selectTypeActivity(event, index) {
            this.activity.items[index].inventoryId = this.items[index].id
            this.activity.items[index].type = this.items[index].type
            
            // console.log(this.activity.items[index].type == this.inventories.find(inventory => inventory.id === event).type)
        },
        // selectTypeActivity(value, index) {
        //     console.log(value)
        //     console.log(index)
        //     // this.activity.items[index].type == this.inventories.find(inventory => inventory.id === event).type;
        //     console.log(this.inventories.find(inventory => inventory.id === event))
        // },
        

        fetchData() {
            if(this.$route.params.id){
                axios.get(process.env.VUE_APP_API_URL + '/v1/maintenance-programs/' + this.$route.params.id,{
                    
                }).then((response) => {
                    this.form.name = response.data.data.name
                    this.form.type = response.data.data.type
                    this.form.parameterDuration = response.data.data.parameterDuration
                    this.form.parameterDurationNotification = response.data.data.parameterDurationNotification
                    this.dataActivity = response.data.data.activities
                    response.data.data.users.forEach((item) => {
                        this.form.users.push(item.userId)
                    })
                    
                    this.dataActivity.forEach((item) => {
                        this.activityItem.title = item.title  
                        this.activityItem.note = item.note  
                        this.activityItem.startDate = item.startDate  
                        this.activityItem.dueDate = item.dueDate  
                        this.activityItem.subtotal = item.subtotal  
                        this.activityItem.actualFinishDate = item.actualFinishDate
                        this.activityItem.items = []
                        item.items.forEach(item => {
                            this.item.id = item.id
                            this.item.type = item.type
                            this.item.inventoryId = item.inventoryId
                            this.item.value = item.value
                            this.item.qty = item.qty
                            this.item.unit = item.unit
                            this.item.total = item.total
                            this.item.price = item.price
                            this.activityItem.items.push(this.item)
                            console.log(this.activityItem)
                        })
                        this.form.activities.push(this.activityItem)
                        console.log(this.form.activities)
                    })

                }).catch((error) => {
                    console.log(error);
                });
            }
            this.params.maintenanceProgramId = this.$route.params.id
        },
        
        listDataUser() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/users').then((response) => {
                this.users = response.data.data.items
                
            }).catch((error) => {
                console.log(error);
            });
        },
        copyItem(){
            this.activityItem = [
                ...this.activityItem,{
                    
                    unit: '',
                    value: '',
                    qty: 0,
                    price: 0,
                    total: 0,
                }
            ]
            
            this.activity.items.push(this.activityItem)

        },
        deleteItem(index){
            this.activity.items.splice(index, 1)
        }

    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        this.fetchData();
        this.listDataUser();
        this.listDataInventory();
    }

};
</script>

<template>
    <Layout>
        <HeaderPage title="Program Maintenance" pageTitle="Program Maintenance" />
        <BModal v-model="showModalDelete" hide-footer hide-header-close centered  class="v-modal-custom" size="sm">
            
            <div class="text-center">
                <b class="fs-14">Apakah anda yakin menghapus data ini?</b>
                <div class="d-flex justify-content-center mt-4">
                    <BButton variant="dark" class="me-2" @click="showModalDelete = false">Tidak</BButton>
                    <BButton variant="light" @click="deleteActivity(index)">Ya</BButton>
                </div>
            </div>
        </BModal>
        <BModal v-model="showModalActivity" hide-footer title="Tambah Aktifitas" centered  class="v-modal-custom" size="xl">
            <BForm>
                <BRow>
                <BCol md="12" class="mb-3">
                    <div>
                        <label for="">Judul <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" v-model="activity.title" placeholder="Masukkan judul">
                    </div>
                </BCol>
                <BRow class="mb-3">
                    <BCol md="4">
                        <div>
                            <label for="" class="form-label">Start Date<span class="text-danger">*</span></label>
                            <input type="date" class="form-control" id="date" placeholder="Pilih Tanggal" v-model="activity.startDate" required>
                            <!-- <div class="input-group">
                                <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="activity.startDate" required>
                                <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                            </div> -->
                        </div>
                    </BCol>
                    <BCol md="4">
                        <div>
                            <label for="" class="form-label">Due Date<span class="text-danger">*</span></label>
                            <input type="date" class="form-control" id="date" placeholder="Pilih Tanggal" v-model="activity.dueDate" required>
                            <!-- <div class="input-group">
                                <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="activity.dueDate" required>
                                <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                            </div> -->
                        </div>
                    </BCol>
                    <BCol md="4">
                        <div>
                            <label for="" class="form-label">Actual Finish Date</label>
                            <input type="date" class="form-control" id="date" placeholder="Pilih Tanggal" v-model="activity.actualFinishDate" required>
                            <!-- <div class="input-group">
                                <input type="text" class="form-control border-end-0" id="date" placeholder="Pilih Tanggal" v-model="activity.actualFinishDate" required>
                                <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span>
                            </div> -->
                        </div>
                    </BCol>
                </BRow>
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
                            <!-- <SelectOption v-model="activity.items[index].inventoryId" 
                                :options="inventories" 
                                :searchable="false" 
                                placeholder="Pilih Inventory" 
                                :allow-empty="false" 
                                value-prop="id" 
                                label="name" 
                                @select="(value) => selectTypeActivity(value, index)">
                                <template #singleLabel="{ option }"><strong>{{ option.name }}</strong></template>
                            </SelectOption> -->
                            <select id="type" v-model="items[index]" class="form-select" @change="selectTypeActivity($event.target.value, index)" required>
                                <option v-for="inventory in inventories" :key="inventory.id" :value="inventory">{{ inventory.type}}</option>
                            </select>

                        </div>
                    </BCol>
                    <BCol md="2">
                        <div>
                            <!-- <input type="text" class="form-control" placeholder="Masukkan Nama" v-model="activity.items[index].type" disabled> -->
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
                                <BButton variant="link" class="p-1 rounded-circle" @click="copyItem()"><i class="bx bxs-copy-alt fs-22"></i></BButton>
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
            <div class="cta">
                
                <div class="d-flex justify-content-end mt-4">
                    <BButton variant="light" @click="showModalActivity = false" class="me-2">Kembali</BButton>
                    <BButton variant="dark" @click="saveModalData()">Simpan</BButton>
                </div>
            </div>
            </BForm>
        </BModal>
        <BRow>
            <BCol xl="12">
                <BCard no-body>
                    <!-- <BCardHeader>
                        
                    </BCardHeader> -->

                    <BCardBody>
                        <BForm>
                            <BRow class="gy-4">
                                <BCol md="6" v-if="this.$route.params.id">
                                    <div>
                                        <label for="code" class="form-label">Kode Program<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="code" placeholder="Masukkan kode program" v-model="form.code" disabled required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="name" class="form-label">Nama Program<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="name" placeholder="Masukkan nama program" v-model="form.name" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="teknis" class="form-label">Teknis <span class="text-danger">*</span></label>
                                        <select id="teknis" class="form-select" v-model="form.type" required>
                                            <option v-for="type in types" :key="type.label">{{ type.label }}</option>
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="duration" class="form-label">Durasi Parameter <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="duration" placeholder="0" v-model="form.parameterDuration" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="notification" class="form-label">Notifikasi Sebelum Parameter <span class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="0" v-model="form.parameterDurationNotification" aria-label="notification" aria-describedby="notification">
                                            <span class="input-group-text" id="notification">Jam</span>
                                        </div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="assignment" class="form-label">Penugasan <span class="text-danger">*</span></label>
                                        <MultiSelect v-model="valueUser" :options="users" label="fullName" track-by="fullName" placeholder="Pilih Penugasan" @select="selectUser" :multiple="true"></MultiSelect>
                                    </div>
                                </BCol>
                            </BRow>
                           
                        </BForm>
                    </BCardBody>
                </BCard>
            </BCol>
            <BCol xl="12">
                <div class="p-0 bg-white rounded-4">
                    <div class="d-flex flex-wrap justify-content-between p-lg-4">
                        <h4 class="card-title mb-0">Aktivitas</h4>

                        <div v-if="!this.$route.params.id" class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                            <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                    <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="search">
                                    <i class="ri-search-line search-icon"></i>
                                </div>

                                <BButton variant="primary" class="btn btn-md" @click="showModalActivityMethod()" style="white-space: nowrap;">
                                    Tambah Aktivitas
                                </BButton>
                                
                            </div>
                        </div>
                    </div>
                    <div class="live-preview">
                        <table-component :headers="headersActivity" :data="dataActivity" :action="action" v-if="dataActivity.length > 0" @sort="sort($event.sortBy)">
                            <!-- NO -->
                            <template #no="{ index }">
                                {{ index + 1 }}
                            </template>
                            <!-- //Status -->
                            
                            <template #action="{ item, index }">
                                <BButton variant="link" class="link-dark fs-22" size="sm" @click="editActivity(index)">
                                    <img src="@/assets/icons/edit.svg" alt="pencil" />
                                </BButton>
                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="showModalDeleteActivity(index)">
                                    <img src="@/assets/icons/delete.svg" alt="delete" />
                                </BButton>
                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" :to="`/maintenance-programs/view/${item.id}`">
                                    <img src="@/assets/icons/view.svg" alt="eye" />
                                </BButton>
                            </template>

                            <template #pagination>  

                                <div class="d-flex justify-content-between mt-3" v-if="config.total_items >= 1">
                                    <div class="d-flex align-items-center">
                                        <!-- <label for="perPageSelect" class="me-2">Items per page:</label> -->
                                        <select id="perPageSelect" v-model="params.limit" class="form-select" >
                                            <option v-for="option in [10, 20, 30, 50]" :key="option" :value="option">{{ option }}</option>
                                        </select>
                                    </div>
                                    <div class="pagination-wrap hstack gap-2">
                                        <BButton class="page-item pagination-prev" variant="light"  :disabled="params.page <= 1" @click="params.page--">
                                            <i class="ri-arrow-left-s-line"></i>
                                        </BButton>
                                        <ul class="pagination listjs-pagination mb-0">
                                            <li :class="{active: pageNumber == params.page, disabled: pageNumber == '...'}" v-for="(pageNumber, index) in config.total_pages" :key="index" @click="changePage(pageNumber)">
                                            <BButton class="page" >{{ pageNumber }}</BButton>
                                            </li>
                                        </ul>
                                        <BButton class="page-item pagination-next" variant="light"  :disabled="params.page >= config.total_pages" @click="params.page++">
                                            <i class="ri-arrow-right-s-line"></i>
                                        </BButton>
                                    </div>
                                </div>
                            </template>
                        </table-component>
                    </div>
                    <div class="cta p-lg-4">
                        <div class="d-flex justify-content-end">
                            <BButton variant="light" class="me-2">
                                <router-link to="/maintenance-programs">Kembali</router-link>
                            </BButton>
                            <BButton variant="dark" @click="handleAction()">Simpan</BButton>
                        </div>
                    </div>
                </div>
            </BCol>
        </BRow>
    </Layout>
</template>

<style scoped>
.modal .modal-body{
    overflow-y: auto;
    height: 800px;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>