<script>

import "flatpickr/dist/flatpickr.css";
import Layout from "@/layouts/main.vue";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderPage from "@/components/header-page.vue";
// import MultiSelect from 'vue-multiselect'
import multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

export default {
    name: "fleet-management-create",
    components: {
        Layout,
        HeaderPage,
        // MultiSelect,
        multiselect
    },
    data() {
        return {
            form: {
                code: "",
                serialNumber: "",
                name: "",
                fleetTypeId: "",
                width: 0,
                height: 0,
                length: 0,
                weight: 0,
                buyPrice: 0,
                parameter: "",
                fuelEfficiency: 0,
                fuelEfficiencyUnit: "liter",
                fuelType: "",
                transmition: "",
                additionalSpesification: "",
                year: null,
                merk: "",
                ownBy: "",
                operatorId: "",
                tags: [],
                notes: "",
                usedAt: "",
                ageEstimation: 0,
                terminalValue: 0,
                parameterValue: 0,
                attachments: [{}],
                projectLocation: "",
                tankCapacity: 0,
                status: "",
                photo: null,
                
                finance: {
                    downPayment: 0,
                    tenor: 0,
                    tenorUnit: "",
                    paymentDate: "",
                    firstPaymentAt: "",
                    endPaymentAt: "",
                    yearlyInterest: 5,
                    lastPayment: "",
                    paymentAmount: 0,
                },
                maintenancePrograms: [
                    {
                        maintenanceProgramId: '',
                        lastMaintenancePoint: 0,
                    }
                ],
            },
            config: {
                masked: false,
                prefix: 'Rp ',
                suffix: '',
                thousands: '.',
                decimal: ',',
                precision: 0,
                disableNegative: false,
                disabled: false,
                min: null,
                max: null,
                allowBlank: false,
                minimumNumberOfCharacters: 0,
                shouldRound: true,
                focusOnRight: false,
            },
            ownerships : [
                {name: 'Perusahaan', value: 'company'},
                {name: 'Financing', value: 'financing'},
            ],
            bbmTypes : [
                {name: 'Solar', value: 'solar'},
                {name: 'Bensin', value: 'bensin'},
            ],
            tags: [],
            fleetTypes : [],
            maintenancePrograms : [],
            parameters: [
                {label: 'Odometer', value: 'odometer'}
            ],
            status: [
                {label: 'Service', value: 'service'}
            ],
            years: [
                {label: '2024', value: '2024'}
            ],
            operators: [],
            programs: [],
            photo: null,
            document: [],
            dataMaintenanceProgram: [],
            dataTag: [],
            maintenanceProgramIndex: '',
        };
    },
    computed: {
        initialFile: {
            get() {
                if (typeof this.form.photo === 'string') {
                    console.log('benar')
                    return new File([this.form.photo], this.form.photo, { type: 'text/plain' })
                }

                return this.form.photo
            },
            set() {
                return this.form.photo
            },
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

        // selectTag(option){
        //     const value = []
        //     value.push(option)
        //     value.forEach((item) => {
        //         this.form.tags.push(item.value)
        //     })
        // },
        selectMaintenanceProgram(event, index){
            if(!this.$route.params.id){
                this.form.maintenancePrograms[index].maintenanceProgramId = event
            } else{
                this.dataMaintenanceProgram[index].maintenanceProgramId = event

            }

        },
        listDataFleetType() {
            axios.get(process.env.VUE_APP_API_URL + '/misc/fleet-types').then((response) => {
                this.fleetTypes = response.data.data
            }).catch((error) => {
                console.log(error);
            });
        },
        listDataMaintenanceProgram() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/maintenance-programs').then((response) => {
                this.maintenancePrograms = response.data.data.items
            }).catch((error) => {
                console.log(error);
            });
        },
        listDataOperator() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/users').then((response) => {
                this.operators = response.data.data.items
            }).catch((error) => {
                console.log(error);
            });
        },
        listDataTag() {
            axios.get(process.env.VUE_APP_API_URL + '/v1/tags').then((response) => {
                this.tags = response.data.data.items
            }).catch((error) => {
                console.log(error);
            });
        },
        uploadPhoto(event, type){
            console.log(type)
            this.photo = event.target.files[0]
            const formData = new FormData();
            formData.append('file', this.photo)
            axios.post(process.env.VUE_APP_API_URL + '/misc/upload', formData).then((res) => {
                this.form.photo = res.data.data.location
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal mengupload foto", "error");
                console.log((err));
            })
        },
        uploadAttachment(event, index){
            this.document[index] = event.target.files[0]
            const formData = new FormData();
            formData.append('file', this.document[index])
            axios.post(process.env.VUE_APP_API_URL + '/misc/upload', formData).then((res) => {
                this.form.attachments[index] = res.data.data.location
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal mengupload foto", "error");
                console.log((err));
            })
            
        },
        copyAttachment(index){
            const attachments = this.form.attachments[index]
            this.form.attachments.push({...attachments})
        },
        copyProgram(index){
            if(!this.$route.params.id){
                const programs = this.form.maintenancePrograms[index]
                this.form.maintenancePrograms.push({...programs})
            }
            else{
                const programs = this.dataMaintenanceProgram[index]
                this.dataMaintenanceProgram.push({...programs})

            }
        },
        deleteProgram(index){
            if(!this.$route.params.id){

                this.form.maintenancePrograms.splice(index, 1)
            }
            else{
                this.dataMaintenanceProgram.splice(index, 1)

            }
        },
        deleteAttachment(index){
            this.form.attachments.splice(index, 1)
        },
        handleAction(){
            if(this.$route.params.id){
                this.updateData()
            }
            else{
                this.saveData()
            }
        },
        saveData(){
            this.form.finance.lastPayment = this.form.finance.endPaymentAt
            this.form.usedAt = "2024-10-11"
            
            console.log(this.form)
            axios.post(process.env.VUE_APP_API_URL + '/v1/fleets', this.form).then(() => {
                Swal.fire("Berhasil", "Berhasil tambah data", "success");
                this.$router.push('/fleet-management')
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal tambah data", "error");
                console.log((err));
            })
        },
        updateData(){
            this.form.maintenancePrograms = this.dataMaintenanceProgram
            console.log(this.form)
            axios.put(process.env.VUE_APP_API_URL + '/v1/fleets/' + this.$route.params.id , this.form).then(() => {
                Swal.fire("Berhasil", "Berhasil update data", "success");
                this.$router.push('/fleet-management')
            }).catch((err) => {
                Swal.fire("Gagal!", "Gagal update data", "error");
                console.log((err));
            })
        },
        fetchData() {
            if(this.$route.params.id) {
                axios.get(process.env.VUE_APP_API_URL + '/v1/fleets/' + this.$route.params.id).then((response) => {
                    const data = response.data.data
                    this.form.photo = data.photo;
                    this.form.name = data.name;
                    this.form.fleetTypeId = data.fleetType.id;
                    this.form.serialNumber = data.serialNumber;
                    this.form.code = data.code;
                    this.form.status = data.status;
                    this.form.year = data.year;
                    this.form.merk = data.merk;
                    this.form.parameterValue = data.parameterValue;
                    this.form.parameter = data.parameter;
                    this.form.tankCapacity = data.tankCapacity;
                    this.form.width = data.widht;
                    this.form.height = data.height;
                    this.form.weight = data.wight;
                    this.form.length = data.length;
                    this.form.fuelEfficiency = data.fuelEfficiency;
                    this.form.fuelEfficiencyUnit = data.fuelEfficiencyUnit;
                    this.form.fuelType = data.fuelType;
                    this.form.transmition = data.transmition;
                    this.form.additionalSpesification = data.additionalSpesification;
                    this.form.notes = data.notes;
                    this.form.operatorId = data.operatorId;
                    this.form.projectLocation = data.projectLocation;
                    this.form.finance.downPayment = data.finance.downPayment
                    this.form.finance.paymentAmount = data.finance.paymentAmount
                    this.form.finance.endPaymentAt = data.finance.endPaymentAt.slice(0, 10)
                    this.form.finance.paymentDate = data.finance.paymentDate.slice(0, 10)
                    this.form.finance.yearlyInterest = data.finance.yearlyInterest
                    this.form.finance.lastPayment = data.finance.lastPayment.slice(0, 10)
                    this.form.finance.firstPaymentAt = data.finance.firstPaymentAt.slice(0,10)
                    this.form.finance.tenor = data.finance.tenor
                    this.form.finance.tenorUnit = data.finance.tenorUnit
                    this.form.ownBy = data.ownBy
                    this.form.usedAt = "2024-10-10"
                    this.form.terminalValue = data.terminalValue
                    this.form.buyPrice = data.buyPrice
                    this.form.ageEstimation = data.ageEstimation
                    this.dataTag = data.tags
                    this.form.tags = this.dataTag.map(item => item)
                    if(data.maintenancePrograms.length > 0){

                        this.dataMaintenanceProgram = data.maintenancePrograms.map((maintenanceProgram) => {
                            
                            return {
                                id: maintenanceProgram.id,
                                maintenanceProgramId: maintenanceProgram.maintenanceProgramId,
                                lastMaintenancePoint: maintenanceProgram.lastMaintenancePoint,
                                isDelete: false,
                            }
                            
                        })
                    } 
                    if(!this.dataMaintenanceProgram.length){
                        const data = {
                            maintenanceProgramId: '',
                            lastMaintenancePoint: 0,
                        }
                        this.dataMaintenanceProgram.push(data)
                        console.log(this.dataMaintenanceProgram)
                    }
                    
                    
                    
                
                    data.attachments.forEach((item, index) => {
                        this.form.attachments[index] = item
                    })
                }).catch((error) => {
                    console.log(error);
                });
            }
        },

    },
    mounted() {
        window.addEventListener("resize", this.resizerightcolumn);
        this.listDataFleetType();
        this.listDataMaintenanceProgram();
        this.listDataOperator();
        this.listDataTag();
        this.fetchData();
    }

};
</script>

<template>
    <Layout>
        <HeaderPage title="Fleet Management" link="/fleet-management" description="Fleet Management" :action="this.$route.params.id ? 'Edit Fleet' : 'Tambah Fleet'" />

        <BRow>
            <BCol xl="12">
                <BCard no-body>
                    <!-- <BCardHeader>
                        
                    </BCardHeader> -->

                    <BCardBody>
                        <BForm>
                            <BRow class="gy-4">
                                <BCol md="6">
                                    <div>
                                        <label for="photo" class="form-label">Foto Profil <span class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <BFormFile v-model="form.photo" @change="uploadPhoto($event, 'photo')"></BFormFile>
                                            <a :href="form.photo" target="_blank" class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/image.svg" width="20"></a>
                                        </div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="name" class="form-label">Nama Fleet <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="name" placeholder="Masukkan nama fleet" v-model="form.name" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="type" class="form-label">Tipe Fleet <span class="text-danger">*</span></label>
                                        <!-- <select id="type" class="form-select" v-model="form.fleetTypeId" required>
                                            <option selected>Pilih tipe fleet</option>
                                            <option v-for="fleetType in fleetTypes" :key="fleetType.id" :value="fleetType.id">{{ fleetType.name }}</option>
                                        </select> -->
                                        <BFormSelect
                                            :options="fleetTypes"
                                            v-model="form.fleetTypeId"
                                            text-field="name"
                                            value-field="id"
                                        >
                                            <template #first>
                                                <BFormSelectOption value="" disabled>Pilih Tipe</BFormSelectOption>
                                            </template>
                                        </BFormSelect>
                                    </div>
                                </BCol> 
                                <BCol md="6">
                                    <div>
                                        <label for="serial-number" class="form-label">VIN/SN <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="serial-number" placeholder="Masukkan VIN/SN" v-model="form.serialNumber" required>
                                    </div>
                                </BCol>
                                
                                <BCol md="6">
                                    <div>
                                        <label for="code" class="form-label">Kode Fleet <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="code" placeholder="Masukkan kode fleet" v-model="form.code" required>
                                    </div>
                                </BCol>
                                
                                <BCol md="6">
                                    <div>
                                        <label for="status" class="form-label">Status <span class="text-danger">*</span></label>
                                        <!-- <select class="form-select" v-model="form.status" required>
                                            <option v-for="(item, index) in status" :key="index" :value="item.value">{{ item.label }}</option>
                                        </select> -->
                                        <BFormSelect
                                            :options="status"
                                            v-model="form.status"
                                            text-field="label"
                                            value-field="value"
                                        >
                                            <template #first>
                                                <BFormSelectOption value="" disabled>Pilih Status</BFormSelectOption>
                                            </template>
                                        </BFormSelect>
                                    </div>
                                </BCol>
                                
                                <BCol md="6">
                                    <div>
                                        <label for="year" class="form-label">Tahun <span class="text-danger">*</span></label>
                                        <select id="year" class="form-select" v-model="form.year" required>
                                            <option v-for="(year, index) in years" :key="index" :value="year.value">{{ year.label }}</option>
                                        </select>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="merk" class="form-label">Merek <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="merk" placeholder="Masukkan merek" v-model="form.merk" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="parameter-value" class="form-label">Parameter Terbaru <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" id="parameter-value" placeholder="Masukkan merek" v-model="form.parameterValue" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="parameter" class="form-label">Parameter <span class="text-danger">*</span></label>
                                        <!-- <select id="parameter" class="form-select" v-model="form.parameter" required>
                                            <option v-for="(parameter, index) in parameters" :key="index" :value="parameter.value">{{ parameter.label }}</option>
                                        </select> -->
                                        <BFormSelect
                                            :options="parameters"
                                            v-model="form.parameter"
                                            text-field="label"
                                            value-field="value"
                                        >
                                            <template #first>
                                                <BFormSelectOption value="" disabled>Pilih Parameter</BFormSelectOption>
                                            </template>
                                        </BFormSelect>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="capacity" class="form-label">Kapasitas Tangki <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" v-model="form.tankCapacity" placeholder="0" aria-label="capacity" aria-describedby="capacity">
                                        <span class="input-group-text" id="capacity">ltr</span>
                                    </div>
                                </BCol>
                                <hr>
                                
                                <h3>Umum</h3>
                                <BCol md="6">
                                    <BRow>
                                        <label for="dimensi" class="form-label">Dimensi </label>                                        
                                        <BCol md="4">
                                            <div>
                                                <div class="input-group">
                                                    <input type="number" class="form-control border-end-0" id="width" placeholder="Lebar" v-model="form.width" required>
                                                    <div class="input-group-text bg-transparent border-start-0">
                                                        <span>m</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </BCol>
                                        <BCol md="4">
                                            <div>
                                                <div class="input-group">
                                                    <input type="number" class="form-control border-end-0" id="width" placeholder="Tinggi" v-model="form.height" required>
                                                    <div class="input-group-text bg-transparent border-start-0">
                                                        <span>m</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </BCol>
                                        <BCol md="4">
                                            <div>
                                                <div class="input-group">
                                                    <input type="number" class="form-control border-end-0" id="width" placeholder="Panjang" v-model="form.length" required>
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
                                        <input type="number" class="form-control" id="width" placeholder="0 kg" v-model="form.weight" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="efficiency" class="form-label">Efesiensi BBM (berdasarkan buku manual faktur) <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" v-model="form.fuelEfficiency" placeholder="0" aria-label="efficiency" aria-describedby="efficiency">
                                        <span class="input-group-text" id="efficiency">km/ltr</span>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="efficiency" class="form-label">Tipe BBM <span class="text-danger">*</span></label>
                                    <BFormRadioGroup
                                        size="lg"        
                                        v-model="form.fuelType"
                                        value-field="value"
                                        text-field="name"
                                        :options="bbmTypes"
                                        name="radio-fuelType"
                                    />
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="transmisi" class="form-label">Transmisi </label>
                                        <input type="text" class="form-control" id="transmisi" placeholder="Masukkan transmisi" v-model="form.transmition" required>
                                    </div>
                                </BCol>
                                <hr>
                                <BCol md="12">
                                    <div>
                                        <label for="transmisi" class="form-label">Spesifikasi tambahan </label>
                                        <textarea name="" id="" class="form-control" v-model="form.additionalSpesification" cols="30" rows="10"></textarea>
                                    </div>
                                </BCol>
                                <BCol md="12">
                                    <div>
                                        <label for="notes" class="form-label">Notes</label>
                                        <textarea name="" id="" class="form-control" v-model="form.notes" cols="30" rows="10"></textarea>
                                    </div>
                                </BCol>
                                <h3>Operasional</h3>
                                <BCol md="6">
                                    <div>
                                        <label for="operator" class="form-label">Operator <span class="text-danger">*</span></label>
                                        <!-- <select id="operator" class="form-select" v-model="form.operatorId" required>
                                            <option v-for="(operator, index) in operators" :key="index" :value="operator.id">{{ operator.fullName }}</option>
                                        </select> -->
                                        <BFormSelect
                                            :options="operators"
                                            v-model="form.operatorId"
                                            text-field="fullName"
                                            value-field="id"
                                        >
                                            <template #first>
                                                <BFormSelectOption value="" disabled>Pilih Operator</BFormSelectOption>
                                            </template>
                                        </BFormSelect>
                                        
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="tags" class="form-label">Label Bebas <span class="text-danger">*</span></label>
                                        <multiselect v-model="form.tags" mode="tags" value-prop="tag"
                                            label="tag" :close-on-select="false" :searchable="true"
                                            :create-option="true" placeholder="Label Bebas" :options="tags">
                                            <template #singleLabel="{ option }"><strong>{{ option.tag }}</strong></template>
                                        </multiselect>
                                    </div>
                                </BCol>
                                

                                <BCol v-if="!this.$route.params.id" md="12">
                                    <BRow  v-for="(maintenanceProgram, index) in form.maintenancePrograms" :key="index">
                                        <BCol md="6">
                                            <div>
                                                <label for="program-management" class="form-label">Program Maintenance <span class="text-danger">*</span></label>
                                                <div >
                                                    <!-- <select  id="program-management" v-model="form.maintenancePrograms[index].maintenanceProgramId" class="form-select" required @change="selectMaintenanceProgram($event.target.value, index)">
                                                        <option v-for="(maintenanceProgram, index) in  maintenancePrograms" :key="index" :value="maintenanceProgram.id">{{  maintenanceProgram.name }}</option>
                                                    </select> -->
                                                    <BFormSelect
                                                        :options="maintenancePrograms"
                                                        v-model="form.maintenancePrograms[index].maintenanceProgramId"
                                                        text-field="name"
                                                        value-field="id"
                                                        @change="selectMaintenanceProgram($event.target.value, index)"
                                                    >
                                                        <template #first>
                                                            <BFormSelectOption value="" disabled>Pilih Program</BFormSelectOption>
                                                        </template>
                                                    </BFormSelect>
                                                </div>
                                                
                                            </div>
                                        </BCol>
                                        <BCol md="6">
                                            <div>
                                                <label for="starting-point" class="form-label">Starting Point <span class="text-danger">*</span></label>
                                                <div class="d-flex justify-content-between">
                                                    <input type="number" class="form-control" v-model="form.maintenancePrograms[index].lastMaintenancePoint" placeholder="0 km" aria-label="starting-point" aria-describedby="starting-point">
                                                    <div class="d-flex align-items-center">
                                                        <BButton variant="link" @click="copyProgram(index)"><i class="bx bxs-copy fs-22"></i></BButton>
                                                    </div>
                                                    <div class="d-flex align-items-center">
                                                        <BButton variant="link" @click="deleteProgram(index)" class="p-1 d-flex align-items-center rounded-circle bg-light" v-if="form.maintenancePrograms.length > 1"><i class="bx bx-x fs-22"></i></BButton>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </BCol>
                                    </BRow>
                                </BCol>
                                <BCol md="12" v-if="this.$route.params.id">
                                    <BRow v-for="(maintenanceProgram, index) in dataMaintenanceProgram" :key="index">
                                        <BCol md="6">
                                            <div>
                                                <label for="program-management" class="form-label">Program Maintenance <span class="text-danger">*</span></label>
                                                <div >
                                                    <!-- <select  id="program-management" v-model="dataMaintenanceProgram[index].maintenanceProgramId" class="form-select" required @change="selectMaintenanceProgram($event.target.value, index)">
                                                        <option v-for="(maintenanceProgram, index) in  maintenancePrograms" :key="index" :value="maintenanceProgram.id">{{  maintenanceProgram.name }}</option>
                                                    </select> -->
                                                    <BFormSelect
                                                        :options="maintenancePrograms"
                                                        v-model="dataMaintenanceProgram[index].maintenanceProgramId"
                                                        text-field="name"
                                                        value-field="id"
                                                        @change="selectMaintenanceProgram($event.target.value, index)"
                                                    >
                                                        <template #first>
                                                            <BFormSelectOption value="" disabled>Pilih Program</BFormSelectOption>
                                                        </template>
                                                    </BFormSelect>
                                                </div>
                                                
                                            </div>
                                        </BCol>
                                        <BCol md="6">
                                            <div>
                                                <label for="starting-point" class="form-label">Starting Point <span class="text-danger">*</span></label>
                                                <div class="d-flex justify-content-between">
                                                    <input type="number" class="form-control" v-model="dataMaintenanceProgram[index].lastMaintenancePoint" placeholder="0 km" aria-label="starting-point" aria-describedby="starting-point">
                                                    <div class="d-flex align-items-center">
                                                        <BButton variant="link" @click="copyProgram(index)"><i class="bx bxs-copy fs-22"></i></BButton>
                                                    </div>
                                                    <div class="d-flex align-items-center">
                                                        <BButton variant="link" @click="deleteProgram(index)" class="p-1 d-flex align-items-center rounded-circle bg-light" v-if="dataMaintenanceProgram.length > 1"><i class="bx bx-x fs-22"></i></BButton>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </BCol>
                                    </BRow>
                                </BCol>
                                <BCol md="12">
                                    <BRow v-for="(attachment,index) in form.attachments" :key="index">
                                        <div>
                                            <label for="attachment" class="form-label">Attachment <span class="text-danger">*</span></label>
                                            <div class="mb-3 d-flex justify-content-between">
                                                <div class="input-group">
                                                    <BFormFile v-model="document[index]" @change="uploadAttachment($event, index)"></BFormFile>
                                                    <a :href="form.attachments[index]" target="_blank" class="input-group-text bg-transparent fs-22"><img src="@/assets/icons/doc.svg" width="20"></a>
                                                </div>
                                                <div class="d-flex align-items-center">
                                                    <BButton variant="link" @click="copyAttachment(index)"><i class="bx bxs-copy fs-22"></i></BButton>
                                                </div>
                                                <div class="d-flex align-items-center">
                                                    <BButton variant="link" @click="deleteAttachment(index)" class="p-1 d-flex align-items-center rounded-circle bg-light" v-if="this.form.attachments.length > 1"><i class="bx bx-x fs-22"></i></BButton>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </BRow>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="project-location" class="form-label">Lokasi Proyek <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" v-model="form.projectLocation" id="project-location" placeholder="Masukkan lokasi proyek" required>
                                    </div>
                                </BCol>
                                <hr>
                                <h3>Finance</h3>
                                <BCol md="6">
                                    <div>
                                        <label for="payment-amount" class="form-label">Harga Pembelian <span class="text-danger">*</span></label>
                                        <!-- <input type="number" class="form-control" v-model="form.finance.paymentAmount" id="payment-amount" placeholder="Rp 0" required> -->
                                        <money3 v-model="form.finance.paymentAmount" v-bind="config" class="form-control"></money3>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <label for="efficiency" class="form-label">Kepemilikan <span class="text-danger">*</span></label>
                                    <BFormRadioGroup
                                        size="lg"
                                        v-model="form.ownBy"
                                        value-field="value"
                                        text-field="name"
                                        :options="ownerships"
                                        name="radio-ownBy"
                                    />
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="attachment" class="form-label">Uang Muka <span class="text-danger">*</span></label>
                                        <!-- <input type="number" class="form-control" v-model="form.finance.downPayment" id="attachment" placeholder="Rp 0" required> -->
                                        <money3 v-model="form.finance.downPayment" v-bind="config" class="form-control"></money3>
                                    </div>
                                </BCol>
                                <BCol md="3">
                                    <div>
                                        <label for="first-payment-date" class="form-label">First Payment Date <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" v-model="form.finance.firstPaymentAt" id="first-payment-date" required>
                                    </div>
                                </BCol>
                                <BCol md="3">
                                    <div>
                                        <label for="end-payment-date" class="form-label">End Payment Date <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" v-model="form.finance.endPaymentAt" id="end-payment-date" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="tenor" class="form-label">Tenor <span class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <input type="number" v-model="form.finance.tenor" class="form-control w-75" placeholder="0 km" aria-label="tenor" aria-describedby="tenor">
                                            <!-- <select class="form-select" v-model="form.finance.tenorUnit">
                                                <option value="time">Kali</option>
                                                <option value="month">Bulan</option>
                                            </select> -->
                                            <BFormSelect
                                                v-model="form.finance.tenorUnit"
                                                text-field="name"
                                                value-field="id"
                                            >
                                                <template #first>
                                                    <BFormSelectOption value="" disabled>Pilih Tenor</BFormSelectOption>
                                                </template>
                                                <BFormSelectOption value="time">Kali</BFormSelectOption>
                                                <BFormSelectOption value="month">Bulan</BFormSelectOption>
                                            </BFormSelect>
                                        </div>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="nominal" class="form-label">Nominal Pembayaran <span class="text-danger">*</span></label>
                                        <!-- <input type="number" class="form-control" v-model="form.buyPrice" id="nominal" placeholder="Rp 0" required> -->
                                        <money3 v-model="form.buyPrice" v-bind="config" class="form-control"></money3>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="tenor" class="form-label">Tenor Ke<span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" v-model="form.finance.tenor" id="tenor" placeholder="Rp 0" required>
                                        
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="payment-date" class="form-label">Payment Date <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" v-model="form.finance.paymentDate" id="payment-date"  required>
                                    </div>
                                </BCol>
                                <BCol md="3">
                                    <div>
                                        <label for="first-payment-date" class="form-label">First Payment Date <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" v-model="form.finance.firstPaymentAt" id="first-payment-date" placeholder="Rp 0" required>
                                    </div>
                                </BCol>
                                <BCol md="3">
                                    <div>
                                        <label for="end-payment-date" class="form-label">End Payment Date <span class="text-danger">*</span></label>
                                        <input type="date" class="form-control" v-model="form.finance.endPaymentAt" id="end-payment-date" placeholder="Rp 0" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="age-estimate" class="form-label">Estimasi Umur <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" v-model="form.ageEstimation" id="age-estimate" placeholder="0" required>
                                    </div>
                                </BCol>
                                <BCol md="6">
                                    <div>
                                        <label for="terminal-value" class="form-label">Terminal Value <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control" v-model="form.terminalValue" id="terminal-value" placeholder="0" required>
                                    </div>
                                </BCol>
                            </BRow> 
                            <div class="d-flex justify-content-end mt-4">
                                <router-link to="/fleet-management">
                                    <BButton variant="light" class="me-2">Kembali</BButton>
                                </router-link>
                                <BButton type="submit" variant="primary" @click="handleAction()">Simpan</BButton>
                            </div>
                        </BForm>
                    </BCardBody>
                </BCard>
            </BCol>
        </BRow>
    </Layout>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>