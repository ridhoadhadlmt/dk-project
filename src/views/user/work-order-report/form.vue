<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";
import TableComponent from "@/components/table.vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";

export default {
    name: "work-order-report-create",
    components: {
        Layout,
        HeaderPage,
        TableComponent,
        Multiselect,
        flatPickr,
    },
    data() {
        return {
            editActivityIndex: null,
            changeDocument: false,
            changePhoto: false,
            typeFleet : "",
            startedAtDate: "",
            startedAtTime: "",
            targetedAtDate: "",
            targetedAtTime: "",
            preview:{
                document: "",
                photo: "",
            },

            form: {
                code: "",
                fleetId: "",
                title: "",
                issueIds: [],
                type: "",
                periodic: "",
                category: "-",
                priority: "",
                startedAt: "",
                targetedAt: "",
                picId: "",
                photo: "",
                document: "",
                comment: "",
                startParameter: "",
                workOrderEstimation: "",
                tags: [],
                activities: [],
            },
            fleets: [],
            issues: [],
            users: [],
            inventories: [],
            tags: [
                {id: 1, name: 'Label 1'},
                {id: 2, name: 'Label 2'},
                {id: 3, name: 'Label 3'},
            ],
            options: [
                {label: 'Teknis', value: 'teknis'},
                {label: 'Non Teknis', value: 'nonteknis'},
            ],
            woTypes: [
                {id:1, name: 'Perbaikan'},
                {id:2, name: 'Perawatan'},
                {id:3, name: 'Penambahan'},
            ],
            data: [
                { id: 1, title: 'Lorem Ipsum', start_date: '11 Desember 2023', end_date: '23 April 2024', actual: '22 April 2024', total: "Rp.4.500.000"}
            ],
            periodics: [
                {value: 'short_term', text: 'Short Term'},
                {value: 'long_term', text: 'Long Term'},
            ],
            priority: [
                {value: 'critical', text: 'Critical'},
                {value: 'high', text: 'High'},
                {value: 'medium', text: 'Medium'},
                {value: 'low', text: 'Low'},
                {value: 'no_priority', text: 'No Priority'},
            ],
            units: [
                {value: 'Pcs', name: 'Pcs'},
                {value: 'Bungkus', name: 'Bungkus'},
            ],
            params: {
                page: 1,
                limit: 10,
                search: '',
                sortBy: 'id.desc',
            },
            config:{
                total_pages: 0,
                total_item: 0,
            },
            showModalActivity: false,
            formDataActivity: {
                title: '',
                startDate: '',
                endDate: '',
                actualFinishDate: '',
                total: 10,
                items: [
                    {
                        type: '',
                        inventoryId: '',
                        value: '',
                        qty: '',
                        unit: '',
                        price: 10,
                        total: 10
                    }
                ]
            },
            dataActivity: [],
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
                    title: 'Start Date',
                    key: 'startDate',
                    show: true,
                    order:true
                },
                {
                    title: 'Due Date',
                    key: 'endDate',
                    show: true,
                    order:true
                },
                {
                    title: 'Actual Finish Date',
                    key: 'actualFinishDate',
                    show: true,
                    order:true
                },
                {
                    title: 'Sub Total',
                    key: 'total',
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
        }
    },
    watch: {
    },
    methods: {
        showModalActivityMethod(){
            this.formDataActivity = {
                title: '',
                startDate: '',
                endDate: '',
                actualFinishDate: '',
                note: '',
                items: [
                    {
                        type: '',
                        inventoryId: '',
                        value: '',
                        qty: '',
                        unit: '',
                        price: 10,
                        total: 10
                    }
                ]
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


        fetchFleets() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/fleets').then((response) => {
                this.fleets = response.data.data.items;
            }).catch((error) => {
                console.log(error);
            });
        },
        fetchIssues() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/issues').then((response) => {
                this.issues = response.data.data.items;
            }).catch((error) => {
                console.log(error);
            });
        },
        fetchUsers() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/users').then((response) => {
                this.users = response.data.data.items;
            }).catch((error) => {
                console.log(error);
            });
        },
        fetchTags() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/tags').then((response) => {
                this.tags = response.data.data.items;
            }).catch((error) => {
                console.log(error);
            });
        },
        fetchInventories() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/inventories').then((response) => {
                this.inventories = response.data.data.items;
            }).catch((error) => {
                console.log(error);
            });
        },

        fetchData() {
            if(this.$route.params.id) {
                axios.get(process.env.VUE_APP_API_URL + '/v1/work-orders/' + this.$route.params.id).then((response) => {
                    const data = response.data.data;

                    this.form.code = data.code;
                    this.form.fleetId = data.fleetId;
                    this.form.title = data.title;
                    this.form.type = parseInt(data.type);
                    this.form.periodic = data.periodic;
                    this.form.category = data.category;
                    this.form.priority = data.priority;
                    this.form.startedAt = data.startedAt;
                    this.form.targetedAt = data.targetedAt;
                    this.form.picId = data.picId;
                    this.form.photo = data.photo;
                    this.form.document = data.document;
                    this.form.comment = data.comment;
                    this.form.startParameter = data.startParameter;
                    this.form.workOrderEstimation = data.workOrderEstimation;
                    this.form.tags = data.tags;
                    this.form.activities = data.activities;

                    this.startedAtDate = data.startedAt.split(' ')[0];
                    this.startedAtTime = moment(data.startedAt).format('HH:mm');
                    this.targetedAtDate = data.targetedAt.split(' ')[0];
                    this.targetedAtTime = moment(data.targetedAt).format('HH:mm');

                    this.form.issueIds = data.issues.map(item => item.issue.id);


                    this.dataActivity = data.activities.map((activity) => {
                        const items = activity.items.map((item) => {
                            return {
                                type: item.type,
                                inventoryId: item.inventoryId,
                                value: item.value,
                                qty: item.qty,
                                unit: item.unit,
                                price: item.price,
                                total: item.total
                            }
                        })
                        return {
                            title: activity.title,
                            startDate: activity.startDate,
                            endDate: activity.endDate,
                            total: activity.total,
                            actualFinishDate: activity.actualFinishDate,
                            note: activity.note,
                            items: items
                        }
                    });
                }).catch((error) => {
                    console.log(error);
                });
            }
        },

        typeFleetMethod(value) {
            this.typeFleet = this.fleets.find(fleet => fleet.id === value).fleetType.name;
            this.form.code = this.fleets.find(fleet => fleet.id === value).code;
        },
        selectTypeActivity(value, index) {
            this.formDataActivity.items[index].type = this.inventories.find(inventory => inventory.id === value).type;
        },

        copyItem(index) {
            // this.formDataActivity.items.push(this.formDataActivity.items[index]);
            const item = this.formDataActivity.items[index];
            this.formDataActivity.items.push({...item});
        },
        deleteItem(index) {
            this.formDataActivity.items.splice(index, 1);
        },
        submitActivity() {
            if(this.activityIndex == null) {
                this.dataActivity.push(this.formDataActivity);
            } else {
                this.dataActivity[this.activityIndex] = this.formDataActivity;
            }

            this.showModalActivity = false;
            this.formDataActivity = {
                title: '',
                startDate: '',
                endDate: '',
                actualFinishDate: '',
                note: '',
                items: [
                    {
                        type: '',
                        inventoryId: '',
                        value: '',
                        qty: '',
                        unit: '',
                        price: 10,
                        total: 10
                    }
                ]
            }
        },
        handleFileChange(event,type) {
            if(type === 'photo') {
                this.changePhoto = true;
            } else {
                this.changeDocument = true;
            }

            this.form[type] = event.target.files[0];
            this.preview[type] = URL.createObjectURL(event.target.files[0]);
        },
        async submit() {
            
            let photo = this.form.photo;
            let document = this.form.document;

            if(this.changePhoto) {
                photo = await this.uploadFile(this.form.photo,'photo')
            }
            if(this.changeDocument) {
                document = await this.uploadFile(this.form.document,'document')
            }

            const body = {
                ...this.form,
                startedAt: this.startedAtDate + ' ' + this.startedAtTime,
                targetedAt: this.targetedAtDate + ' ' + this.targetedAtTime,
                activities: this.dataActivity,
                photo: photo,
                document: document
            }

            if(this.$route.params.id) {
                axios.put(process.env.VUE_APP_API_URL + '/v1/work-orders/' + this.$route.params.id, body).then(() => {
                    Swal.fire("Berhasil!", "Berhasil mengubah data", "success");
                    this.$router.push('/work-order');
                }).catch((error) => {
                    console.log(error);
                });
            } else{
                axios.post(process.env.VUE_APP_API_URL + '/v1/work-orders', body).then(() => {
                    Swal.fire("Berhasil!", "Berhasil menambahkan data", "success");
                    this.$router.push('/work-order');
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        async uploadFile(file) {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(process.env.VUE_APP_API_URL + '/misc/upload', formData).catch(() => {
                Swal.fire("Gagal!", "Gagal mengupload file", "error");
                return false;
            });

            return response.data.data.location;
        },
        lineItemCalculate(index) {
            this.formDataActivity.items[index].total = this.formDataActivity.items[index].qty * this.formDataActivity.items[index].price;
            this.formDataActivity.total = this.formDataActivity.items.reduce((acc, item) => acc + item.total, 0);
        },

        deleteActivity(index) {
            this.dataActivity.splice(index, 1);
        },

        editActivity(index) {
            this.formDataActivity = this.dataActivity[index];
            this.showModalActivity = true;
            this.activityIndex = index;
        },

    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        this.fetchFleets();
        this.fetchIssues();
        this.fetchUsers();
        this.fetchData();
        this.fetchTags();
        this.fetchInventories();
    }

};
</script>

<template>
    <Layout>
        <HeaderPage title="Work Order Report" pageTitle="Work Order Report" />
        <BModal v-model="showModalActivity" hide-footer title="Tambah Aktifitas" centered  class="v-modal-custom" size="xl">
            <BForm @submit.prevent="submitActivity">
                <BRow>
                <BCol md="12" class="mb-3">
                    <div>
                        <label for="">Judul <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" placeholder="Masukkan judul" v-model="formDataActivity.title">
                    </div>
                </BCol>
                <BRow class="mb-3">
                    <BCol md="4">
                        <div>
                            <label for="" class="form-label">Start Date<span class="text-danger">*</span></label>
                            <div class="input-group">
                                <flat-pickr v-model="formDataActivity.startDate" class="form-control" id="date" placeholder="Pilih Tanggal" required></flat-pickr>
                                <!-- <input type="date" class="form-control" id="date" placeholder="Pilih Tanggal" v-model="formDataActivity.startDate" required> -->
                                <!-- <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span> -->
                            </div>
                        </div>
                    </BCol>
                    <BCol md="4">
                        <div>
                            <label for="" class="form-label">Due Date<span class="text-danger">*</span></label>
                            <div class="input-group">
                                <flat-pickr v-model="formDataActivity.endDate" class="form-control" id="date" placeholder="Pilih Tanggal" required></flat-pickr>
                                <!-- <input type="date" class="form-control" id="date" placeholder="Pilih Tanggal" v-model="formDataActivity.endDate" required> -->
                                <!-- <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span> -->
                            </div>
                        </div>
                    </BCol>
                    <BCol md="4">
                        <div>
                            <label for="" class="form-label">Actual Finish Date</label>
                            <div class="input-group">
                                <flat-pickr v-model="formDataActivity.actualFinishDate" class="form-control" id="date" placeholder="Pilih Tanggal" required></flat-pickr>
                                <!-- <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span> -->
                            </div>
                        </div>
                    </BCol>
                </BRow>
                <BCol md="12" class="mb-3">
                    <div>
                        <label for="">Note </label>
                        <textarea type="text" class="form-control" placeholder="Masukkan note" v-model="formDataActivity.note"></textarea>
                    </div>
                </BCol>

                <label for="" class="form-label">Line Items <span class="text-danger">*</span></label>
                <BRow class="mb-3" v-for="(item, index) in formDataActivity.items" :key="index">

                    <BCol md="2">
                        <div>
                            <multiselect v-model="formDataActivity.items[index].inventoryId" 
                                :options="inventories" 
                                :searchable="false" 
                                placeholder="Pilih Inventory" 
                                :allow-empty="false" 
                                value-prop="id" 
                                label="name" 
                                @select="(value) => selectTypeActivity(value, index)">
                                <template #singleLabel="{ option }"><strong>{{ option.name }}</strong></template>
                            </multiselect>
                        </div>
                    </BCol>
                    <BCol md="2">
                        <div>
                            <input type="text" class="form-control" placeholder="Masukkan Nama" v-model="formDataActivity.items[index].type" disabled>
                        </div>
                    </BCol>
                    <BCol md="2" class="pe-0">
                        <div>
                            <div class="input-group">
                                <input type="number" class="form-control" id="quantity" width="80%" placeholder="Quantity" required v-model="formDataActivity.items[index].qty" @change="lineItemCalculate(index)">
                                <select id="" class="form-select" required v-model="formDataActivity.items[index].unit">
                                    <option selected>Pilih Satuan</option>
                                    <option v-for="unit in units" :key="unit.id" :value="unit.value">{{ unit.name }}</option>
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
                                <input type="number" class="form-control" placeholder="Rp 0" v-model="formDataActivity.items[index].price" @change="lineItemCalculate(index)">
                            </div>
                            <div class="d-flex align-items-center mx-2">
                                <i class="las la-equals fs-22"></i>
                            </div>
                            <div>
                                <input type="number" class="form-control" disabled placeholder="Rp 0" v-model="formDataActivity.items[index].total">
                            </div>
                            <div class="d-flex align-items-center mx-2">
                                <BButton variant="link" class="p-1 rounded-circle" @click="copyItem(index)"><i class="bx bxs-copy-alt fs-22"></i></BButton>
                            </div>
                            <div class="d-flex align-items-center mx-2">
                                <BButton variant="link" class="p-1 rounded-circle d-flex align-items-center bg-light" @click="deleteItem(index)" v-if="formDataActivity.items.length > 1"><i class="bx bx-x fs-22"></i></BButton>
                            </div>
                        </div>
                    </BCol>
                </BRow>
                <BCol md="12">
                    <div>
                        <label for="">Subtotal </label>
                        <input type="number" class="form-control" placeholder="Rp0" disabled v-model="formDataActivity.total">
                    </div>
                </BCol>
            </BRow>
            </BForm>
            <div class="cta">
                
                <div class="d-flex justify-content-end mt-4">
                    <BButton variant="light" class="me-2" @click="showModalActivity = false">Kembali</BButton>
                    <BButton variant="dark" @click="submitActivity">Simpan</BButton>
                </div>
            </div>
        </BModal>
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
                                        <label for="code-fleet" class="form-label">Kode Fleet<span class="text-danger">*</span></label>
                                        <multiselect v-model="form.fleetId" deselect-label="Can't remove this value"
                                            value-prop="id" label="name" placeholder="Select one" :options="fleets"
                                            :searchable="false" :allow-empty="false" @select="typeFleetMethod">
                                            <template #singleLabel="{ option }"><strong>{{ option.name }}</strong></template>
                                        </multiselect>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="type-fleet" class="form-label">Tipe Fleet <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="type-fleet" disabled placeholder="Fleet" v-model="typeFleet" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="duration" class="form-label">Referensi Issue <span class="text-danger">*</span></label>
                                        <multiselect v-model="form.issueIds" mode="tags" value-prop="id" label="complaintTitle"
                                            :close-on-select="false" :searchable="true" :create-option="true" placeholder="Pilih Issue"
                                            :options="issues">
                                            <template #singleLabel="{ option }"><strong>{{ option.issueCode + ' - ' + option.complaintTitle }}</strong></template>
                                        </multiselect>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="title" class="form-label">Judul WO <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="title" placeholder="Masukkan judul wo" v-model="form.title" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="notification" class="form-label">Jenis WO <span class="text-danger">*</span></label>
                                        <multiselect v-model="form.type" :options="woTypes" :searchable="false" placeholder="Pilih Jenis WO" :allow-empty="false" value-prop="id" label="name">
                                            <template #singleLabel="{ option }"><strong>{{ option.name }}</strong></template>
                                        </multiselect>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="notification" class="form-label">Periodic WO <span class="text-danger">*</span></label>
                                        <BFormRadioGroup
                                        size="lg"
                                        v-model="form.periodic"
                                        :options="periodics"
                                        value-prop="value"
                                        label-prop="text"
                                        name="radio-options"
                                        />
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="notification" class="form-label">Prioritas<span class="text-danger">*</span></label>
                                        <multiselect v-model="form.priority" :options="priority" :searchable="false" placeholder="Pilih Prioritas" :allow-empty="false" value-prop="value" label="text">
                                            <template #singleLabel="{ option }"><strong>{{ option.text }}</strong></template>
                                        </multiselect>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="start-date" class="form-label">Tanggal Mulai <span class="text-danger">*</span></label>
                                    <BRow>
                                        <BCol md="6">
                                            <div class="input-group">
                                                <flat-pickr 
                                                    v-model="startedAtDate" 
                                                    class="form-control" 
                                                    id="date" 
                                                    placeholder="Pilih Tanggal" 
                                                    required 
                                                ></flat-pickr>
                                                <!-- <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span> -->
                                            </div>
                                        </BCol>
                                        <BCol md="6">
                                            <div class="input-group">
                                                <flat-pickr 
                                                    v-model="startedAtTime" 
                                                    class="form-control" 
                                                    id="date" 
                                                    placeholder="Pilih Jam" 
                                                    required 
                                                    :config="{enableTime: true, noCalendar: true}"
                                                ></flat-pickr>
                                                <!-- <input type="time" class="form-control" id="date" placeholder="Masukkan Jam" v-model="startedAtTime" required> -->
                                                <!-- <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/clock.svg" width="20"></span> -->
                                            </div>
                                        </BCol>
                                    </BRow>
                                </BCol>
                                <BCol md="6">
                                    <label for="target" class="form-label">Target <span class="text-danger">*</span></label>
                                    <BRow>
                                        <BCol md="6">
                                            <div class="input-group">
                                                <flat-pickr v-model="targetedAtDate" class="form-control" id="date" placeholder="Pilih Tanggal" required></flat-pickr>
                                                <!-- <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/calendar.svg" width="20"></span> -->
                                            </div>
                                        </BCol>
                                        <BCol md="6">
                                            <div class="input-group">
                                                <flat-pickr 
                                                    v-model="targetedAtTime" 
                                                    class="form-control" 
                                                    id="date" 
                                                    placeholder="Pilih Jam" 
                                                    required 
                                                    :config="{enableTime: true, noCalendar: true}"
                                                ></flat-pickr>
                                                <!-- <span class="input-group-text border-start-0 bg-transparent fs-22"><img src="@/assets/icons/clock.svg" width="20"></span> -->
                                            </div>
                                        </BCol>
                                    </BRow>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="notification" class="form-label">PIC Mekanik<span class="text-danger">*</span></label>
                                        <multiselect v-model="form.picId" :options="users" :searchable="false" placeholder="Pilih PIC Mekanik" :allow-empty="false" value-prop="id" label="fullName">
                                            <template #singleLabel="{ option }"><strong>{{ option.fullName }}</strong></template>
                                        </multiselect>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="document" class="form-label">Photo <span v-if="form.type === 'spareparts'" class="text-danger">*</span></label>
                                         <div class="input-group">
                                            <BFormFile v-model="form.photo" @change="handleFileChange($event,'photo')"></BFormFile>
                                            <span class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/image.svg" width="20"></span>
                                        </div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="document" class="form-label">Dokumen <span class="text-danger">*</span></label>
                                         <div class="input-group">
                                            <BFormFile v-model="form.document" @change="handleFileChange($event,'document')"></BFormFile>
                                            <span class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/doc.svg" width="20"></span>
                                        </div>
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div>
                                        <label for="title" class="form-label">Komen</label>
                                        <textarea name="" id="" cols="30" class="form-control" rows="10" v-model="form.comment" placeholder="Masukkan komen"></textarea>
                                    </div>
                                </BCol>
                                <BCol md="3">
                                    <div>
                                        <label for="title" class="form-label">Parameter Dimulai <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" id="title" placeholder="0" v-model="form.startParameter" required>
                                    </div>
                                </BCol>
                                <BCol md="3">
                                    <div>
                                        <label for="title" class="form-label">Estimasi Biaya <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" id="title" placeholder="0" v-model="form.workOrderEstimation" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="notification" class="form-label">Label Bebas<span class="text-danger">*</span></label>
                                        <multiselect v-model="form.tags" 
                                            :options="tags" 
                                            :searchable="false" 
                                            placeholder="Pilih Label Bebas" 
                                            mode="tags" 
                                            :close-on-select="false" 
                                            :create-option="true" 
                                            :allow-empty="false" 
                                            value-prop="tag" 
                                            label="tag">
                                            <template #singleLabel="{ option }"><strong>{{ option.name }}</strong></template>
                                        </multiselect>
                                    </div>
                                </BCol>
                            </BRow>
                        </BForm>
                    </BCardBody>
                </BCard>
            </BCol>
            <BCol xl="12">
                <div class="p-4 bg-white rounded-4">
                    <div class="d-flex flex-wrap justify-content-between py-lg-4">
                        <h4 class="card-title mb-0">Aktivitas</h4>
                        <div class="d-flex flex-wrap align-items-center mt-2 mt-lg-0" id="filter-button">
                            <div class="d-flex flex-wrap justify-content-sm-end me-2 mb-2 mb-lg-0" style="flex-grow: 1;">
                                <div class="search-box me-2" style="flex-grow: 1; max-width: 200px;">
                                    <input type="text" class="form-control" placeholder="Search..." style="width: 100%;" v-model="params.search">
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

                            <template #action="{ item, index }">
                                <BButton variant="link" class="link-dark fs-22" size="sm" @click="editActivity(index)">
                                    <img src="@/assets/icons/edit.svg" alt="pencil" />
                                </BButton>
                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" @click="deleteActivity(index)">
                                    <img src="@/assets/icons/delete.svg" alt="delete" />
                                </BButton>
                                <BButton variant="link" class="link-opacity-75 fs-22" size="sm" :to="`/program-maintenance/view/${item.id}`">
                                    <img src="@/assets/icons/view.svg" alt="eye" />
                                </BButton>
                            </template>

                            <template #pagination>  

                                <div class="d-flex justify-content-end mt-3">
                                    <button class="btn btn-light me-2">Kembali</button>
                                    <button class="btn btn-light me-2">Simpan sebagai Draft</button>
                                    <button class="btn btn-primary" @click="submit">Publish</button>
                                </div>
                            </template>
                        </table-component>
                    </div>
                </div>
            </BCol>
        </BRow>
    </Layout>
</template>